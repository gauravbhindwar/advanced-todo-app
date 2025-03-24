import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from './store/authSlice'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import TodoApp from './components/Todo/TodoApp'

function App() {
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode)
  }

  const getBackgroundClass = () => {
    if (isAuthenticated) {
      return 'bg-gradient-to-br from-gray-900 to-gray-800'
    }
    return isLoginMode 
      ? 'bg-gradient-to-br from-blue-900 via-gray-900 to-cyan-900'
      : 'bg-gradient-to-br from-cyan-900 via-gray-900 to-blue-900'
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundClass()}`}>
      <div className='container mx-auto px-4 py-8'>
        {!isAuthenticated ? (
          isLoginMode ? (
            <Login onToggleMode={toggleAuthMode} />
          ) : (
            <Signup onToggleMode={toggleAuthMode} />
          )
        ) : (
          <TodoApp />
        )}
      </div>
    </div>
  )
}

export default App
