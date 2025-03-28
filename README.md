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

**Desktop Mode**
![Login Page](https://github.com/user-attachments/assets/7580537c-a615-49c4-81c7-9291e83cd523)

![SignUp Page](https://github.com/user-attachments/assets/95b03ca8-e661-425f-b0ff-65df6708ebd2)

![Todo Dashboard](https://github.com/user-attachments/assets/b6ac9bd5-6681-492c-8463-86bf0cc3a401)

![Screenshot 2025-03-24 232936](https://github.com/user-attachments/assets/b9eae390-ddd7-49b1-84eb-daa1739c2080)

![Screenshot 2025-03-24 232947](https://github.com/user-attachments/assets/636d7c59-62ae-4f7b-8219-93cdd8fd7eee)

**Mobile Design**

![Login Page](https://github.com/user-attachments/assets/f9696728-4e8e-4f6e-ac40-fe7b2887366e)

![Signup](https://github.com/user-attachments/assets/5a8e3c0f-8e7a-460e-a231-5ec7bc573d53)

![Img 3](https://github.com/user-attachments/assets/6d2048dd-a287-4b82-84f3-11ac6b96e6e9)

![Img 4](https://github.com/user-attachments/assets/9e5a5236-4d85-4ae3-9b5c-d7f4f4c526a9)

![Img 5](https://github.com/user-attachments/assets/934d6974-6587-43a7-9400-86ca2fee9b40)

![Img 6](https://github.com/user-attachments/assets/2a5b8419-3705-4d0f-9459-b5b747e3227a)

![Img 7](https://github.com/user-attachments/assets/64d6c7df-2d73-4363-b548-b6607156ea85)

![Img 8](https://github.com/user-attachments/assets/cb1edb9f-1d64-49d5-853e-a7284281bc01)

![Img 9](https://github.com/user-attachments/assets/6cb4dc3b-8dc8-472e-a9d0-450bfac3d59a)






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
