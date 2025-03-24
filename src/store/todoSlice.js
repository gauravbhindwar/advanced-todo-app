import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWeather = createAsyncThunk(
  'todos/fetchWeather',
  async (location, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      )
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message || 'Could not fetch weather data')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Network error: Could not fetch weather data')
    }
  }
)

// Add new function to load tasks
export const loadTasks = createAsyncThunk(
  'todos/loadTasks',
  async () => {
    try {
      const tasksString = localStorage.getItem('tasks');
      if (!tasksString) return [];
      const tasks = JSON.parse(tasksString);
      return Array.isArray(tasks) ? tasks : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }
);

const initialState = {
  tasks: [],
  weatherData: {},
  error: null,
  loading: false
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isOutdoor: action.payload.isOutdoor || false,
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        task.priority = priority
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, completed } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        task.completed = completed
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem('tasks');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.weatherData = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  }
})

export const { addTask, deleteTask, updateTaskPriority, updateTaskStatus, clearTasks } = todoSlice.actions
export default todoSlice.reducer
