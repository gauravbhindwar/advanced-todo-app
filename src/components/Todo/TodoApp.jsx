import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTaskStatus, deleteTask, loadTasks } from '../../store/todoSlice'
import { logoutAndClearTasks } from '../../store/authSlice'
import WeatherWidget from '../Weather/WeatherWidget'
import { getCurrentCity } from '../../utils/location'

const TodoApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.todos.tasks);
  
  const [task, setTask] = useState({ 
    title: '', 
    priority: 'medium', 
    isOutdoor: false,
    location: '' 
  });
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const initializeLocation = async () => {
      setIsLoadingLocation(true);
      setLocationError(null);
      try {
        const city = await getCurrentCity();
        setTask(prev => ({ ...prev, location: city }));
      } catch (error) {
        setLocationError('Could not detect your location. Please enter city manually.');
        console.error('Failed to get location:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };
    initializeLocation();
  }, []);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('');

    if (!task.title.trim()) {
      setValidationError('Please enter a task title');
      return;
    }

    if (task.isOutdoor && !task.location.trim()) {
      setValidationError('Please enter a location for outdoor activity');
      return;
    }

    dispatch(addTask(task))
    setTask(prev => ({ 
      title: '', 
      priority: 'medium', 
      isOutdoor: false, 
      location: prev.location 
    }))
  }

  const handleLogout = () => {
    dispatch(logoutAndClearTasks());
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="flex justify-between items-center p-2 sm:p-4 bg-gray-800/50 rounded-b-xl backdrop-blur-sm border-b border-gray-700/50 shadow-md z-30">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Todo List
        </h1>
        <button 
          onClick={handleLogout}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-sm"
        >
          Logout
        </button>
      </header>

      <div className="flex-1 relative grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 p-2 sm:p-6 lg:p-8 overflow-hidden">
        {/* Task List Section */}
        <div className={`flex flex-col overflow-hidden bg-gray-900 border border-gray-800 rounded-lg shadow-md transition-all duration-300 ease-in-out z-10 ${
          isFormVisible ? 'lg:order-2' : 'order-1'
        } ${isFormVisible ? 'h-[40vh] lg:h-[calc(100vh-8rem)]' : 'h-[calc(100vh-12rem)]'}`}>
          {/* Task List Header */}
          <div className="flex justify-between items-center p-3 bg-gray-800/50 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Tasks</h2>
            <span className="text-sm text-gray-400">{tasks.length} items</span>
          </div>
          
          {/* Task List Content */}
          <div className="flex-1 overflow-auto">
            <div className="h-full">
              <style>
                {`
                  ::-webkit-scrollbar {
                    width: 8px;
                  }
                  ::-webkit-scrollbar-thumb {
                    background-color: #4B5563;
                    border-radius: 4px;
                  }
                  ::-webkit-scrollbar-track {
                    background-color: #1F2937;
                  }
                `}
              </style>
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`group flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg shadow-md ${
                    task.priority === 'high' ? 'bg-red-600/10 border-l-4 border-red-600' :
                    task.priority === 'medium' ? 'bg-yellow-500/10 border-l-4 border-yellow-500' :
                    'bg-green-500/10 border-l-4 border-green-500'
                  } bg-gray-900 border-b border-gray-800 transform transition-all duration-300 hover:scale-[1.02]`}
                  style={{ minHeight: '60px' }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => dispatch(updateTaskStatus({ id: task.id, completed: e.target.checked }))}
                      className="rounded-lg border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`block text-sm sm:text-base ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                        {task.title}
                      </span>
                      {task.isOutdoor && (
                        <span className="block mt-0.5 text-xs sm:text-sm text-gray-400 truncate">
                          📍 {task.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                      {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                    </span>
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-red-600 text-white hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Task Form Section */}
        <div className={`fixed lg:relative inset-x-0 bottom-0 lg:inset-auto space-y-3 sm:space-y-6 overflow-auto transition-all duration-300 ease-in-out bg-gray-900 lg:bg-transparent z-40 ${
          isFormVisible 
            ? 'lg:order-1 translate-y-0 opacity-100' 
            : 'order-2 translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100'
        } ${isFormVisible ? 'max-h-[70vh] lg:max-h-none' : 'h-0 lg:h-auto'}`}>
          <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4 bg-gray-900 p-3 sm:p-5 rounded-xl border border-gray-700 shadow-md">
            {validationError && (
              <div className="bg-red-900/30 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-sm text-red-200">{validationError}</p>
              </div>
            )}
            <div className="space-y-2 sm:space-y-3">
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-sm"
                placeholder="What needs to be done?"
              />
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
                <div className="flex flex-col justify-center gap-1 sm:gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-200">Priority</label>
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="w-full px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex flex-col justify-center gap-1 sm:gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-200">Outdoor Activity</label>
                  <label className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 cursor-pointer hover:bg-gray-700 transition-colors shadow-sm">
                    <input
                      type="checkbox"
                      className="rounded-lg border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                      checked={task.isOutdoor}
                      onChange={(e) => setTask({ ...task, isOutdoor: e.target.checked })}
                    />
                    <span className="text-sm sm:text-base">Yes</span>
                  </label>
                </div>
              </div>
            </div>

            {task.isOutdoor && (
              <div className="space-y-1">
                {locationError && (
                  <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-2 rounded-lg text-xs text-yellow-200">
                    <p>{locationError}</p>
                    {!isLoadingLocation && (
                      <p className="mt-1 text-yellow-300/70">Enter your city name below.</p>
                    )}
                  </div>
                )}
                <input
                  type="text"
                  className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-gray-900/50 border border-gray-600 text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder={isLoadingLocation ? "Detecting location..." : "Enter your city name"}
                  value={task.location}
                  onChange={(e) => setTask({ ...task, location: e.target.value })}
                  disabled={isLoadingLocation}
                />
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-2 sm:py-3.5 px-4 text-sm sm:text-base rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95] shadow-lg hover:shadow-indigo-500/25"
            >
              Add Task
            </button>
          </form>

          {task.isOutdoor && <WeatherWidget location={task.location} />}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsFormVisible(prev => !prev)}
          className={`lg:hidden fixed right-4 bottom-4 w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center transform transition-all duration-300 z-50 ${
            isFormVisible ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Form Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-30 ${
          isFormVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFormVisible(false)}
      />
    </div>
  )
}

export default TodoApp
