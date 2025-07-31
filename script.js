// Code Reel Recorder - Main JavaScript File
// Handles all interactive functionality including typing animations, highlighting, and UI controls

class CodeReelRecorder {
    constructor() {
        this.editor = null;
        this.isPlaying = false;
        this.typingSpeed = 30; // milliseconds per character (faster for smoother experience)
        this.currentTheme = 'dracula';
        this.isInputHidden = false;
        
        this.init();
    }

    init() {
        this.initializeCodeMirror();
        this.setupEventListeners();
        this.loadSampleCode();
    }

    // Initialize CodeMirror editor
    initializeCodeMirror() {
        const textarea = document.getElementById('codeEditor');
        
        this.editor = CodeMirror.fromTextArea(textarea, {
            mode: 'javascript',
            theme: this.currentTheme,
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2,
            indentWithTabs: false,
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers'],
            extraKeys: {
                'Ctrl-Space': 'autocomplete'
            }
        });

        // Set initial content
        this.editor.setValue('');
        
        // Refresh editor after initialization
        setTimeout(() => {
            this.editor.refresh();
        }, 100);
    }

    // Setup all event listeners
    setupEventListeners() {
        // Play button
        const playBtn = document.getElementById('playBtn');
        playBtn.addEventListener('click', () => this.playPreview());

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => this.resetPreview());

        // Test button
        const testBtn = document.getElementById('testBtn');
        testBtn.addEventListener('click', () => this.testFormatting());

        // Toggle input visibility
        const toggleInput = document.getElementById('toggleInput');
        toggleInput.addEventListener('click', () => this.toggleInputVisibility());

        // Download button
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener('click', () => this.downloadCode());

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Terminal control dots (visual only)
        const controlDots = document.querySelectorAll('.control-dot');
        controlDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                // Add visual feedback
                dot.style.opacity = '0.5';
                setTimeout(() => {
                    dot.style.opacity = '1';
                }, 200);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.playPreview();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.resetPreview();
                        break;
                    case 'h':
                        e.preventDefault();
                        this.toggleInputVisibility();
                        break;
                    case 's':
                        e.preventDefault();
                        this.downloadCode();
                        break;
                }
            }
        });
    }

    // Load sample code for demonstration
    loadSampleCode() {
        const sampleCode = `// Sample JavaScript Function with Highlighting
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
console.log(\`Sum: \${sum}\`);`;

        this.editor.setValue(sampleCode);
    }

    // Play the preview with typing animation
    async playPreview() {
        if (this.isPlaying) return;

        const code = this.editor.getValue();
        const previewOutput = document.getElementById('previewOutput');
        const playBtn = document.getElementById('playBtn');

        this.isPlaying = true;
        playBtn.disabled = true;
        playBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
            Playing...
        `;

        // Clear previous output
        previewOutput.innerHTML = '';

        try {
            await this.typeCode(code, previewOutput);
        } catch (error) {
            console.error('Error during typing animation:', error);
            previewOutput.innerHTML = '<span class="error">Error during preview</span>';
        } finally {
            this.isPlaying = false;
            playBtn.disabled = false;
            playBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
                Play
            `;
        }
    }

    // Type code with animation
    async typeCode(code, outputElement) {
        // First, process the entire code to remove tags and apply formatting
        const processedCode = this.processCodeForStreaming(code);
        const characters = this.splitIntoCharacters(processedCode);
        
        let output = '';
        let currentSpan = '';
        let inSpan = false;
        
        // Use requestAnimationFrame for smoother rendering
        const animate = async () => {
            for (let i = 0; i < characters.length; i++) {
                const char = characters[i];
                
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
                
                // Update output with syntax highlighting
                const formattedOutput = this.addSyntaxHighlighting(output);
                outputElement.innerHTML = formattedOutput + '<span class="typing-cursor"></span>';
                
                // Use requestAnimationFrame for smoother rendering
                await new Promise(resolve => {
                    setTimeout(resolve, this.typingSpeed * 0.6);
                });
            }
            
            // Remove cursor after completion
            const finalOutput = this.addSyntaxHighlighting(output);
            outputElement.innerHTML = finalOutput;
            
            console.log('Final formatted output:', finalOutput);
        };
        
        animate();
    }

    // Process code for streaming (remove tags and apply formatting)
    processCodeForStreaming(code) {
        console.log('Processing code for streaming:', code);
        
        // First, replace all formatting tags with HTML spans
        let processed = code;
        
        // Replace highlight tags
        processed = processed.replace(/\[\[highlight\]\](.*?)\[\[\/highlight\]\]/g, '<span class="highlight">$1</span>');
        
        // Replace bold tags
        processed = processed.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<span class="bold">$1</span>');
        
        console.log('Processed code:', processed);
        return processed;
    }

    // Split processed code into characters for streaming
    splitIntoCharacters(processedCode) {
        const characters = [];
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
    }

    // Process formatting tags
    processFormatting(text) {
        // Process custom formatting tags first
        text = text.replace(/\[\[highlight\]\](.*?)\[\[\/highlight\]\]/g, '<span class="highlight">$1</span>');
        text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<span class="bold">$1</span>');
        
        // Then add basic syntax highlighting to non-formatted parts
        text = this.addSyntaxHighlighting(text);
        
        return text;
    }

    // Add basic syntax highlighting
    addSyntaxHighlighting(text) {
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
    }

    // Process formatting tags (for static processing)
    processFormatting(text) {
        // Process custom formatting tags first
        text = text.replace(/\[\[highlight\]\](.*?)\[\[\/highlight\]\]/g, '<span class="highlight">$1</span>');
        text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<span class="bold">$1</span>');
        
        // Then add basic syntax highlighting to non-formatted parts
        text = this.addSyntaxHighlighting(text);
        
        return text;
    }

    // Reset preview
    resetPreview() {
        const previewOutput = document.getElementById('previewOutput');
        previewOutput.innerHTML = '';
    }

    // Toggle input section visibility
    toggleInputVisibility() {
        const codeSection = document.getElementById('codeSection');
        const toggleBtn = document.getElementById('toggleInput');
        
        this.isInputHidden = !this.isInputHidden;
        
        if (this.isInputHidden) {
            codeSection.classList.add('hidden');
            toggleBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            `;
        } else {
            codeSection.classList.remove('hidden');
            toggleBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            `;
        }
    }

    // Download code as file
    downloadCode() {
        const code = this.editor.getValue();
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code-snippet.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Toggle theme
    toggleTheme() {
        const themes = ['dracula', 'monokai', 'one-dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.currentTheme = themes[nextIndex];
        
        this.editor.setOption('theme', this.currentTheme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
    }

    // Utility function for delays
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get current code content
    getCode() {
        return this.editor.getValue();
    }

    // Set code content
    setCode(code) {
        this.editor.setValue(code);
    }

    // Change typing speed
    setTypingSpeed(speed) {
        this.typingSpeed = speed;
    }

    // Get current typing speed
    getTypingSpeed() {
        return this.typingSpeed;
    }

    // Debug function to test formatting
    testFormatting() {
        const testCode = `function [[highlight]]test[[/highlight]]() {
    const [[bold]]value[[/bold]] = 42;
    return value;
}`;
        
        const formatted = this.processFormatting(testCode);
        console.log('Test formatting result:', formatted);
        
        // Test the streaming function
        const previewOutput = document.getElementById('previewOutput');
        this.typeCode(testCode, previewOutput);
        
        return formatted;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.codeReelRecorder = new CodeReelRecorder();
    
    // Add some helpful console messages
    console.log('🚀 Code Reel Recorder initialized!');
    console.log('📝 Keyboard shortcuts:');
    console.log('  Ctrl+Enter: Play preview');
    console.log('  Ctrl+R: Reset preview');
    console.log('  Ctrl+H: Toggle input visibility');
    console.log('  Ctrl+S: Download code');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeReelRecorder;
} 