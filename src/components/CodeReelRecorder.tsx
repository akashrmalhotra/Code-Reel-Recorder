import React, { useState, useRef, useCallback, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import './CodeReelRecorder.css';

interface CodeReelRecorderProps {}

const CodeReelRecorder: React.FC<CodeReelRecorderProps> = () => {
  const [code, setCode] = useState<string>(`// Sample JavaScript Function with Highlighting
function [[highlight]]calculateFibonacci[[/highlight]](n) {
    if (n <= 1) return n;
    
    let [[bold]]prev = 0[[/bold]];
    let [[bold]]current = 1[[/bold]];
    
    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
}

// Example usage with highlighting
const [[highlight]]result[[/highlight]] = calculateFibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);

// Another example with bold emphasis
const [[bold]]numbers[[/bold]] = [1, 2, 3, 4, 5];
const [[highlight]]sum[[/highlight]] = numbers.reduce((a, b) => a + b, 0);
console.log(\`Sum: \${sum}\`);`);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [previewOutput, setPreviewOutput] = useState<string>('');
  const [isInputHidden, setIsInputHidden] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('dracula');
  const [typingSpeed] = useState<number>(30);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [processedCharacters, setProcessedCharacters] = useState<string[]>([]);
  const [highlightColor, setHighlightColor] = useState<string>('#264f78');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // Custom light theme for CodeMirror
  const lightTheme = EditorView.theme({
    "&": {
      color: "#333333",
      backgroundColor: "#ffffff"
    },
    ".cm-gutters": {
      backgroundColor: "#f8f9fa",
      color: "#666666",
      border: "none"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#e0e0e0"
    },
    ".cm-content": {
      caretColor: "#333333"
    },
    ".cm-cursor": {
      borderLeftColor: "#333333"
    },
    ".cm-selectionBackground": {
      backgroundColor: "#add6ff"
    },
    "&.cm-focused .cm-selectionBackground": {
      backgroundColor: "#add6ff"
    },
    ".cm-line": {
      padding: "0 4px 0 4px",
      lineHeight: "1.5"
    }
  });
  
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Process code for streaming (remove tags and apply formatting)
  const processCodeForStreaming = useCallback((code: string): string => {
    let processed = code;
    
    // Replace highlight tags
    processed = processed.replace(/\[\[highlight\]\](.*?)\[\[\/highlight\]\]/g, '<span class="highlight">$1</span>');
    
    // Replace bold tags
    processed = processed.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<span class="bold">$1</span>');
    
    return processed;
  }, []);

  // Add basic syntax highlighting
  const addSyntaxHighlighting = useCallback((text: string): string => {
    // Comments (but not inside HTML tags)
    text = text.replace(/(?<!<[^>]*)(\/\/.*?)(?![^<]*>)/g, '<span class="comment">$1</span>');
    
    // Strings (but not inside HTML tags)
    text = text.replace(/(?<!<[^>]*)(["'`])((?:(?!\1)[^\\]|\\.)*\1)(?![^<]*>)/g, '<span class="string">$1$2$1</span>');
    
    // Numbers (but not inside HTML tags)
    text = text.replace(/(?<!<[^>]*)\b(\d+(?:\.\d+)?)\b(?![^<]*>)/g, '<span class="number">$1</span>');
    
    // Keywords (but not inside HTML tags)
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'class', 'new', 'this', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'delete', 'void', 'with', 'debugger', 'default', 'switch', 'case', 'break', 'continue', 'do', 'in', 'of', 'yield', 'async', 'await', 'static', 'extends', 'super', 'enum', 'interface', 'type', 'namespace', 'module', 'declare', 'abstract', 'implements', 'protected', 'public', 'private', 'readonly', 'get', 'set'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`(?<!<[^>]*)\\b${keyword}\\b(?![^<]*>)`, 'g');
      text = text.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Function calls (but not inside HTML tags)
    text = text.replace(/(?<!<[^>]*)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((?![^<]*>)/g, '<span class="function">$1</span>(');
    
    return text;
  }, []);

  // Split processed code into characters for streaming
  const splitIntoCharacters = useCallback((processedCode: string): string[] => {
    const characters: string[] = [];
    let i = 0;
    
    while (i < processedCode.length) {
      // Check for HTML tags
      if (processedCode.substring(i, i + 25) === '<span class="highlight">') {
        characters.push('<span class="highlight">');
        i += 25;
      } else if (processedCode.substring(i, i + 21) === '<span class="bold">') {
        characters.push('<span class="bold">');
        i += 21;
      } else if (processedCode.substring(i, i + 7) === '</span>') {
        characters.push('</span>');
        i += 7;
      } else {
        characters.push(processedCode[i]);
        i++;
      }
    }
    
    return characters;
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isPlaying || processedCharacters.length === 0) return;
    
    if (currentIndex >= processedCharacters.length) {
      setIsPlaying(false);
      return;
    }
    
    const timer = setTimeout(() => {
      let output = '';
      let currentSpan = '';
      let inSpan = false;
      
      for (let i = 0; i <= currentIndex; i++) {
        const char = processedCharacters[i];
        
        // Handle HTML spans
        if (char === '<span class="highlight">') {
          inSpan = true;
          currentSpan = '<span class="highlight">';
          continue;
        } else if (char === '<span class="bold">') {
          inSpan = true;
          currentSpan = '<span class="bold">';
          continue;
        } else if (char === '</span>') {
          inSpan = false;
          output += currentSpan + '</span>';
          currentSpan = '';
          continue;
        }
        
        if (inSpan) {
          currentSpan += char;
        } else if (char === '\n') {
          output += '\n';
        } else {
          output += char;
        }
      }
      
      const formattedOutput = addSyntaxHighlighting(output);
      setPreviewOutput(formattedOutput);
      setCurrentIndex(currentIndex + 1);
    }, typingSpeed * 0.6);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, processedCharacters, addSyntaxHighlighting, typingSpeed]);

  // Play preview
  const playPreview = useCallback(() => {
    console.log('Play button clicked');
    if (isPlaying) return;
    
    const processedCode = processCodeForStreaming(code);
    const characters = splitIntoCharacters(processedCode);
    
    console.log('Starting animation with', characters.length, 'characters');
    setProcessedCharacters(characters);
    setCurrentIndex(0);
    setPreviewOutput('');
    setIsPlaying(true);
  }, [isPlaying, code, processCodeForStreaming, splitIntoCharacters]);

  // Reset preview
  const resetPreview = useCallback(() => {
    setIsPlaying(false);
    setPreviewOutput('');
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  // Toggle input visibility
  const toggleInputVisibility = useCallback(() => {
    setIsInputHidden(!isInputHidden);
  }, [isInputHidden]);

  // Download code
  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-snippet.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Dynamic highlight color styles */}
      <style>
        {`
          .highlight {
            background: ${highlightColor} !important;
            color: #ffffff !important;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
            box-shadow: 0 0 0 1px ${highlightColor}33;
            will-change: background-color, color;
            transform: translateZ(0);
          }
        `}
      </style>
      
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="control-dot close"></div>
          <div className="control-dot minimize"></div>
          <div className="control-dot maximize"></div>
        </div>
        <div className="terminal-title">Code Reel Recorder</div>
        <div className="header-controls">
          <div className="color-picker-container">
            <label htmlFor="highlight-color" className="color-label">Highlight:</label>
            <input
              id="highlight-color"
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="color-picker"
              title="Choose highlight color"
            />
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Code Input Section */}
        <div className={`code-section ${isInputHidden ? 'hidden' : ''}`}>
          <div className="section-header">
            <h3>Code Input</h3>
            <div className="section-controls">
              <button className="control-btn" onClick={toggleInputVisibility} title="Hide/Show Input">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button className="control-btn" onClick={downloadCode} title="Download Code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="editor-container">
            <CodeMirror
              value={code}
              onChange={(value) => setCode(value)}
              theme={isDarkMode ? dracula : lightTheme}
              extensions={[javascript()]}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
              }}
            />
          </div>
          <div className="formatting-help">
            <span className="help-text">Use [[highlight]]...[[/highlight]] for highlighting</span>
            <span className="help-text">Use [[bold]]...[[/bold]] for emphasis</span>
          </div>
        </div>

                {/* Preview Section */}
        <div className="preview-section">
          <div className="section-header">
            <h3>Preview</h3>
            <div className="section-controls">
              <button 
                className={`play-btn ${isPlaying ? 'playing' : ''}`} 
                onClick={playPreview}
                disabled={isPlaying}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
                {isPlaying ? 'Playing...' : 'Play'}
              </button>
 
                <button className="control-btn" onClick={resetPreview} title="Reset Preview">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1,4 1,10 7,10"></polyline>
                    <path d="M3.51,15a9,9,0,1,0,2.13-9.36L1,10"></path>
                  </svg>
                </button>
            </div>
          </div>
          <div className="preview-editor-container">
            <div className="preview-gutters">
              {(() => {
                const lines = previewOutput.split('\n');
                return lines.map((_, index) => (
                  <div key={index} className="preview-line-number">
                    {index + 1}
                  </div>
                ));
              })()}
            </div>
            <div 
              className="preview-output"
              dangerouslySetInnerHTML={{ 
                __html: previewOutput + (isPlaying ? '<span class="typing-cursor"></span>' : '') 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReelRecorder; 