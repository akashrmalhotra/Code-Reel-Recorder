# Demo Examples for Code Reel Recorder

Here are some example code snippets you can copy and paste into the Code Reel Recorder to test different features:

## 1. Basic JavaScript Function

```javascript
// Simple function with highlighting
function [[highlight]]calculateArea[[/highlight]](width, height) {
    return [[bold]]width * height[[/bold]];
}

// Usage example
const area = calculateArea(10, 5);
console.log(\`Area: \${area}\`);
```

## 2. React Component Example

```javascript
import React, { useState } from 'react';

function [[highlight]]Counter[[/highlight]]() {
    const [[bold]][count, setCount][[/bold]] = useState(0);
    
    const handleIncrement = () => {
        setCount([[highlight]]count + 1[[/highlight]]);
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>
                [[bold]]Increment[[/bold]]
            </button>
        </div>
    );
}
```

## 3. CSS Animation Example

```css
/* Keyframe animation with highlighting */
@keyframes [[highlight]]fadeIn[[/highlight]] {
    from {
        opacity: [[bold]]0[[/bold]];
        transform: translateY(20px);
    }
    to {
        opacity: [[bold]]1[[/bold]];
        transform: translateY(0);
    }
}

.fade-in-element {
    animation: fadeIn 0.5s ease-out;
}
```

## 4. Python Algorithm

```python
def [[highlight]]binary_search[[/highlight]](arr, target):
    left, right = [[bold]]0, len(arr) - 1[[/bold]]
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return [[highlight]]mid[[/highlight]]
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

## 5. HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>[[highlight]]My Website[[/highlight]]</title>
</head>
<body>
    <header>
        <h1>[[bold]]Welcome[[/bold]]</h1>
    </header>
    <main>
        <p>This is a [[highlight]]sample page[[/highlight]].</p>
    </main>
</body>
</html>
```

## 6. Node.js Server

```javascript
const express = require('express');
const app = express();

app.get('/[[highlight]]api/users[[/highlight]]', (req, res) => {
    const users = [
        { id: 1, name: [[bold]]'John'[[/bold]] },
        { id: 2, name: [[bold]]'Jane'[[/bold]] }
    ];
    res.json(users);
});

app.listen(3000, () => {
    console.log('[[highlight]]Server running on port 3000[[/highlight]]');
});
```

## 7. Database Query

```sql
SELECT 
    [[highlight]]user_id[[/highlight]],
    [[bold]]username[[/bold]],
    email,
    created_at
FROM users 
WHERE [[highlight]]active = true[[/highlight]]
ORDER BY created_at DESC;
```

## Tips for Better Recordings

1. **Use Highlights Sparingly**: Don't over-highlight - focus on key concepts
2. **Mix Highlight Types**: Combine `[[highlight]]` and `[[bold]]` for variety
3. **Plan Your Flow**: Think about the story you're telling with the code
4. **Test Timing**: Practice with different typing speeds
5. **Clean Code**: Use proper indentation and formatting

## Keyboard Shortcuts Reminder

- `Ctrl+Enter`: Play preview
- `Ctrl+R`: Reset preview  
- `Ctrl+H`: Toggle input visibility
- `Ctrl+S`: Download code

Happy recording! 🎬 