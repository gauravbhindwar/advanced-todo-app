import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestStoragePermission } from '../utils/storage'
import { clearTasks } from './todoSlice';

const loadState = async () => {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.warn('Storage permission denied');
      return { users: [] };
    }
    
    const serializedState = localStorage.getItem('authState');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return {
      ...(serializedState ? JSON.parse(serializedState) : {}),
      users
    };
  } catch (err) {
    return { users: [] };
  }
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    return await loadState();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    users: [],
    storagePermission: null
  },
  reducers: {
    signup: (state, action) => {
      const { username, password } = action.payload
      const userExists = state.users.some(user => user.username === username)
      
      if (userExists) {
        state.error = 'Username already exists'
        return
      }
      
      state.users.push({ username, password })
      localStorage.setItem('users', JSON.stringify(state.users))
      state.isAuthenticated = true
      state.user = username
      state.error = null
      localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, user: username }))
    },
    login: (state, action) => {
      const { username, password } = action.payload
      const user = state.users.find(u => u.username === username && u.password === password)
      
      if (user) {
        state.isAuthenticated = true
        state.user = username
        state.error = null
        localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, user: username }))
      } else {
        state.error = 'Invalid credentials'
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('authState');
      // Tasks will be cleared through the thunk action
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.error = 'Failed to load authentication state';
      });
  }
});

// Export the logout action separately
const { login, signup, setError, clearError, logout } = authSlice.actions;

// Fix the logout thunk
export const logoutAndClearTasks = () => (dispatch) => {
  dispatch(clearTasks());
  dispatch(logout());
};

// Export all actions except logout (since we're using the thunk)
export { login, signup, setError, clearError };
export default authSlice.reducer;
