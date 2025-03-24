# Advanced Todo Application

A feature-rich todo application built with React, Redux Toolkit, and TailwindCSS. This application combines task management with weather integration and location-based features.

## Features

- **User Authentication**
  - Secure signup and login functionality
  - Local storage persistence
  - Session management

- **Task Management**
  - Create, read, update, and delete tasks
  - Priority levels (Low, Medium, High)
  - Task completion tracking
  - Visual priority indicators

- **Weather Integration**
  - Real-time weather data for outdoor tasks
  - Automatic location detection
  - Manual city input option
  - Weather conditions display (temperature, humidity, wind)

- **Responsive Design**
  - Mobile-first approach
  - Slide-up task form on mobile
  - Adaptive layout for different screen sizes
  - Modern UI with animations

## Screenshots

[Add your screenshots here]

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14.0.0 or higher)
- npm or yarn
- A modern web browser
- OpenWeather API key (free tier works fine)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd advanced-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your OpenWeather API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   - Open your browser
   - Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Todo/
│   │   └── TodoApp.jsx
│   └── Weather/
│       └── WeatherWidget.jsx
├── store/
│   ├── authSlice.js
│   ├── todoSlice.js
│   └── index.js
├── utils/
│   ├── location.js
│   └── storage.js
└── App.jsx
```

## Key Features Implementation

### Authentication
- Local storage-based authentication
- Username/password validation
- Error handling and user feedback

### Task Management
- Tasks are persisted in local storage
- Priority-based visual indicators
- Outdoor activity tracking with weather integration

### Weather Integration
- Real-time weather data fetching
- Automatic location detection
- Manual city input with validation
- Weather conditions display for outdoor tasks

### Mobile Responsiveness
- Adaptive layout using Tailwind CSS
- Slide-up form on mobile devices
- Touch-friendly interface
- Smooth animations and transitions

## Technology Stack

- **Frontend Framework**: React
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Build Tool**: Vite
- **API Integration**: OpenWeather API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeather API for weather data
- React Icons for the icon set
- Tailwind CSS for the styling framework
