# Code Reel Recorder

A modern, React-based web application designed for creating and recording code demonstrations with streaming animations and custom highlighting effects.

## ✨ Features

### 🎬 **Streaming Code Animation**
- **Character-by-character typing effect** - Code appears as if being typed in real-time
- **Smooth animations** - Optimized for 60fps performance with hardware acceleration
- **Customizable speed** - Adjustable typing speed for different recording needs

### 🎨 **Custom Highlighting & Emphasis**
- **Dynamic highlighting** - Wrap code in `[[highlight]]...[[/highlight]]` for background highlighting
- **Bold emphasis** - Use `[[bold]]...[[/bold]]` for bold text effects
- **Customizable colors** - Color picker to change highlight colors in real-time
- **Syntax highlighting** - Automatic highlighting for JavaScript keywords, strings, numbers, and comments

### 🌙 **Theme Support**
- **Dark/Light Mode** - Toggle between dark and light themes
- **VS Code-like appearance** - Professional IDE styling with JetBrains Mono font
- **Consistent theming** - All components adapt to theme changes

### 💻 **Code Editor Features**
- **CodeMirror integration** - Full-featured code editor with syntax highlighting
- **Line numbers** - Professional editor layout with numbered lines
- **Scrollable content** - Handle large code files with proper scrolling
- **Download functionality** - Save code snippets as text files

### 🎯 **Recording-Ready Interface**
- **Clean UI** - Minimal interface perfect for screen recording
- **Hide input option** - Toggle code input visibility for clean preview-only recordings
- **Responsive design** - Works across different screen sizes
- **Full-screen support** - Optimized for large displays and recording

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-reel-recorder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Basic Workflow

1. **Write your code** in the Code Input section
2. **Add highlighting** using `[[highlight]]your code[[/highlight]]`
3. **Add emphasis** using `[[bold]]your code[[/bold]]`
4. **Click Play** to see the streaming animation
5. **Record your screen** while the code types out

### Highlighting Examples

```javascript
// Basic highlighting
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

// Example usage
const [[highlight]]result[[/highlight]] = calculateFibonacci(10);
console.log(`Fibonacci(10) = ${result}`);
```

### Customization

- **Change highlight color** - Use the color picker in the header
- **Toggle theme** - Click the sun/moon icon to switch between dark and light modes
- **Hide input** - Use the eye icon to show only the preview for clean recordings
- **Download code** - Use the download icon to save your code snippet

## 🛠️ Technical Details

### Built With
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **CodeMirror 6** - Professional code editor
- **CSS3** - Custom styling with theme support

### Key Components
- `CodeReelRecorder.tsx` - Main application component
- `CodeReelRecorder.css` - Styling with theme support
- Custom animation system using React hooks and `useEffect`

### Animation System
The streaming animation uses a state-driven approach:
- **Character processing** - Converts `[[highlight]]` and `[[bold]]` tags to HTML
- **State management** - Uses `currentIndex` to track animation progress
- **useEffect timer** - Smooth timing with `setTimeout` and cleanup
- **Hardware acceleration** - CSS transforms for optimal performance

## 🎥 Recording Tips

### For Best Results
1. **Use a dark theme** - Better contrast for recordings
2. **Hide the input** - Clean preview-only view for final recordings
3. **Choose highlight colors** - Use colors that work well with your recording software
4. **Full-screen mode** - Maximize browser window for clean recordings
5. **Test your setup** - Record a short test to check audio and video quality

### Recommended Settings
- **Resolution**: 1920x1080 or higher
- **Frame rate**: 30fps or 60fps
- **Codec**: H.264 for compatibility
- **Audio**: Clear microphone with noise reduction

## 🔧 Development

### Project Structure
```
code-reel-recorder/
├── public/
├── src/
│   ├── components/
│   │   ├── CodeReelRecorder.tsx
│   │   └── CodeReelRecorder.css
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── package.json
└── README.md
```

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Customization
- **Add new themes** - Modify the theme objects in `CodeReelRecorder.tsx`
- **Change fonts** - Update font imports in CSS files
- **Add languages** - Install additional CodeMirror language packages
- **Modify animations** - Adjust timing in the `useEffect` animation logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CodeMirror** - For the excellent code editor
- **JetBrains Mono** - For the beautiful programming font
- **React Team** - For the amazing framework
- **VS Code** - For inspiration on the IDE-like interface

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy coding and recording!** 🎬✨
