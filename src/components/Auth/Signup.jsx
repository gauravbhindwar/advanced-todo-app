import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearError } from '../../store/authSlice'
import { FiUser, FiLock } from 'react-icons/fi'

const Signup = ({ onToggleMode }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' })
  const dispatch = useDispatch()
  const error = useSelector(state => state.auth.error)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (credentials.password !== credentials.confirmPassword) {
      dispatch(setError('Passwords do not match'))
      return
    }
    dispatch(signup({ username: credentials.username, password: credentials.password }))
  }

  const handleInputChange = () => {
    if (error) dispatch(clearError())
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
      <h2 className='text-3xl font-extrabold text-center mb-8 text-white'>Create an account</h2>
      {error && <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 p-4 rounded mb-6">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Username</label>
          <div className="relative flex items-center">
            <FiUser className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="Choose a username"
              value={credentials.username}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value })
                handleInputChange()
              }}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <div className="relative flex items-center">
            <FiLock className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="Create a password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value })
                handleInputChange()
              }}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Confirm Password</label>
          <div className="relative flex items-center">
            <FiLock className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="Confirm your password"
              value={credentials.confirmPassword}
              onChange={(e) => {
                setCredentials({ ...credentials, confirmPassword: e.target.value })
                handleInputChange()
              }}
              required
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/20"
        >
          Create Account
        </button>
        <button 
          type="button" 
          className="w-full text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium" 
          onClick={onToggleMode}
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  )
}

export default Signup
