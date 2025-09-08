# Weather App

A simple weather application that shows current weather and 3-day forecasts for any city.

## Live Demo

https://sumitroy38.github.io/weather-app

## Features

- Current weather display
- 3-day weather forecast
- Search by city name
- Location-based weather
- Responsive design

## Tech Stack

- React.js
- Tailwind CSS
- WeatherAPI
- Lucide React (icons)

## Setup

### Prerequisites
- Node.js installed on your machine
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/sumitroy38/weather-app.git
cd weather-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open http://localhost:3000 in your browser

### API Key Setup

This app uses WeatherAPI.com for weather data.

1. Sign up at https://weatherapi.com/
2. Get your free API key
3. Replace the API key in `src/App.js`:
```javascript
const API_KEY = 'your-api-key-here';
```

## Build for Production

```bash
npm run build
```

## Deploy to GitHub Pages

1. Install gh-pages
```bash
npm install --save-dev gh-pages
```

2. Add these to your package.json:
```json
"homepage": "https://yourusername.github.io/weather-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy
```bash
npm run deploy
```

## Project Structure

```
src/
  App.js          # Main component
  index.js        # Entry point
  index.css       # Styles
public/
  index.html      # HTML template
package.json      # Dependencies
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## License

MIT License
