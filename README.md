# C1 Fluency Sprint - German Vocabulary App

A modern, interactive web application for learning German C1-level vocabulary with 560+ terms across 8 weeks of curriculum.

## Features

- 📚 **8 Weeks of Vocabulary** - 560 German terms with definitions, examples, and grammatical info
- 🔍 **Global Search** - Search across all weeks or filter by current week
- 🎴 **Interactive Flashcards** - 3D flip cards for active recall practice
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide icons

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main application component
    └── index.css           # Global styles
```

## Vocabulary Data

The app includes vocabulary organized by weekly themes:

1. **Berufliche Laufbahn** - Career development
2. **Deine Wohnsituation** - Living situation
3. **Sozialleben & Lieblingsmenschen** - Social life
4. **Technologie im Alltag** - Technology in daily life
5. **Dafür brenne ich: Leidenschaften** - Passions
6. **Ein besonderes Reiseerlebnis** - Travel experiences
7. **Wichtige Ereignisse in deiner Kultur** - Cultural events
8. **Lustige oder peinliche Anekdoten** - Funny anecdotes

## Usage

### List View
- Browse vocabulary by week
- See all terms with definitions and examples
- Click week badges to navigate
- Use search to find specific terms

### Flashcard Mode
- Click on cards to flip and reveal definitions
- Navigate with arrow buttons or keyboard
- Track your progress through the deck

### Search
- Toggle between "All Weeks" and "This Week" search modes
- Search matches terms, definitions, and examples
- Click "Open week" to jump to the source week of any result

## License

This project is for educational purposes.

## Author

Built for the German AI Academy C1 Sprint program.
