# Code Reel Recorder

A beautiful, terminal-style web application for creating code reels with typing animations and highlighting effects. Perfect for recording programming tutorials, code demonstrations, and educational content.

## ✨ Features

### 🎨 Terminal/IDE Interface
- **Dark Mode Design**: Professional dark theme resembling popular IDEs
- **VS Code-like Font**: JetBrains Mono for optimal code readability
- **macOS-style Controls**: Red, yellow, and green dots in the header
- **Syntax Highlighting**: Powered by CodeMirror with multiple themes
- **Responsive Design**: Works perfectly on all screen sizes

### 📝 Code Input & Preview
- **Advanced Code Editor**: CodeMirror integration with syntax highlighting
- **Real-time Preview**: See your code as it types out
- **Typing Animation**: Character-by-character typing effect
- **Play Controls**: Start, stop, and reset preview functionality

### 🎯 Highlighting & Emphasis
- **Custom Highlighting**: Wrap code in `[[highlight]]...[[/highlight]]` for background highlighting
- **Bold Emphasis**: Use `[[bold]]...[[/bold]]` for text emphasis
- **Animated Effects**: Smooth fade-in animations for highlights and emphasis
- **Visual Feedback**: Clear visual distinction for emphasized code

### 🎮 Interactive Controls
- **Play Button**: Start the typing animation
- **Reset Button**: Clear the preview
- **Toggle Input**: Hide/show the code input area for clean recordings
- **Download Code**: Save your code snippets as files
- **Theme Switcher**: Cycle between different color themes

### ⌨️ Keyboard Shortcuts
- `Ctrl+Enter`: Play preview
- `Ctrl+R`: Reset preview
- `Ctrl+H`: Toggle input visibility
- `Ctrl+S`: Download code

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Download all files to a directory
2. Open `index.html` in your web browser
3. Start creating code reels!

### File Structure
```
CodeReelRecorder/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

## 📖 Usage Guide

### Basic Usage
1. **Write Code**: Use the code editor on the left to write your code
2. **Add Highlights**: Wrap important parts in `[[highlight]]...[[/highlight]]`
3. **Add Emphasis**: Use `[[bold]]...[[/bold]]` for bold text
4. **Play Preview**: Click the Play button to see the typing animation
5. **Record**: Use screen recording software to capture the preview

### Advanced Features

#### Custom Highlighting
```javascript
function [[highlight]]calculateSum[[/highlight]](a, b) {
    return [[bold]]a + b[[/bold]];
}
```

#### Multiple Highlights
```javascript
// You can use multiple highlights in the same code
const [[highlight]]result[[/highlight]] = [[bold]]calculateSum[[/bold]](5, 10);
console.log([[highlight]]result[[/highlight]]);
```

#### Theme Switching
- Click the theme toggle button in the header
- Cycles through Dracula, Monokai, and One Dark themes

#### Clean Recording Mode
- Click the eye icon to hide the code input area
- Perfect for clean screen recordings without the editor visible

## 🎨 Customization

### Changing Typing Speed
```javascript
// Access the global instance
window.codeReelRecorder.setTypingSpeed(30); // Faster
window.codeReelRecorder.setTypingSpeed(100); // Slower
```

### Adding Custom Themes
1. Add new theme CSS to `styles.css`
2. Update the theme array in `script.js`
3. The theme toggle will automatically include your new theme

### Custom Highlight Colors
Modify the CSS variables in `styles.css`:
```css
.highlight {
    background: #your-color-here;
}
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations
- **JavaScript ES6+**: Modern JavaScript with classes and async/await
- **CodeMirror**: Advanced code editor
- **Google Fonts**: JetBrains Mono for optimal code display

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- Optimized for smooth 60fps animations
- Efficient typing algorithm
- Minimal memory footprint
- No external dependencies except CDN libraries

## 🎬 Recording Tips

### For Best Results
1. **Use Full Screen**: Maximize your browser for clean recordings
2. **Hide Input**: Toggle the input area off for distraction-free previews
3. **Plan Your Highlights**: Mark important code sections before recording
4. **Test Timing**: Practice the typing speed for your content
5. **Use Keyboard Shortcuts**: Faster workflow during recording

### Recommended Settings
- **Typing Speed**: 50ms per character (default)
- **Theme**: Dracula (best contrast for recordings)
- **Font Size**: 14px (optimal for most screen sizes)

## 🐛 Troubleshooting

### Common Issues

**CodeMirror not loading**
- Check internet connection (CDN required)
- Try refreshing the page
- Ensure JavaScript is enabled

**Typing animation too fast/slow**
- Use `window.codeReelRecorder.setTypingSpeed(ms)` to adjust

**Highlights not showing**
- Ensure proper tag format: `[[highlight]]text[[/highlight]]`
- Check for typos in tag names

**Download not working**
- Ensure browser allows downloads
- Check if any security software is blocking downloads

## 🤝 Contributing

This is a standalone application, but suggestions and improvements are welcome!

### Development
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Feature Requests
- Add more themes
- Support for different programming languages
- Export to different formats
- Custom animation effects

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **CodeMirror**: For the excellent code editor
- **JetBrains**: For the JetBrains Mono font
- **VS Code**: For design inspiration
- **Dracula Theme**: For the beautiful color scheme

---

**Happy Coding! 🚀**

Create amazing code reels and share your knowledge with the world! 