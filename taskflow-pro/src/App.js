import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Plus, X, Calendar, Users, Clock, CheckCircle, Circle, AlertCircle, MoreVertical, Filter, User, LogOut, Bell, Hash, ChevronDown, ChevronRight, Trash2, Edit2, Save, MessageSquare, Send, Activity, Sun, Moon, Sparkles, TrendingUp, Zap, Award, Target, Briefcase, ArrowUp, ArrowDown, Check } from 'lucide-react';

const TaskManagementPlatform = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Application State
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);
  
  // Real-time collaboration simulation
  const [collaboratorActions, setCollaboratorActions] = useState([]);
  
  // Toast notification system
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  
  // Initialize demo data
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        // Initialize projects
        const demoProjects = [
          { id: 1, name: 'Product Launch', color: 'bg-gradient-to-r from-blue-500 to-blue-600', taskCount: 12, progress: 65 },
          { id: 2, name: 'Website Redesign', color: 'bg-gradient-to-r from-purple-500 to-purple-600', taskCount: 8, progress: 45 },
          { id: 3, name: 'Mobile App', color: 'bg-gradient-to-r from-green-500 to-green-600', taskCount: 15, progress: 80 },
          { id: 4, name: 'Marketing Campaign', color: 'bg-gradient-to-r from-orange-500 to-orange-600', taskCount: 6, progress: 30 }
        ];
        setProjects(demoProjects);
        
        // Initialize tasks
        const demoTasks = [
          {
            id: 1,
            title: 'Design new landing page',
            description: 'Create mockups for the new landing page design with improved conversion focus',
            status: 'in-progress',
            priority: 'high',
            projectId: 2,
            assignees: ['John Doe', 'Jane Smith'],
            dueDate: '2025-08-15',
            createdAt: new Date().toISOString(),
            comments: 3,
            attachments: 2,
            completedSubtasks: 2,
            totalSubtasks: 5,
            tags: ['design', 'ui/ux']
          },
          {
            id: 2,
            title: 'Implement authentication system',
            description: 'Set up JWT-based authentication with refresh tokens',
            status: 'in-progress',
            priority: 'critical',
            projectId: 3,
            assignees: ['Alex Chen'],
            dueDate: '2025-08-14',
            createdAt: new Date().toISOString(),
            comments: 5,
            attachments: 1,
            completedSubtasks: 3,
            totalSubtasks: 4,
            tags: ['backend', 'security']
          },
          {
            id: 3,
            title: 'Database optimization',
            description: 'Optimize PostgreSQL queries and add proper indexing',
            status: 'todo',
            priority: 'high',
            projectId: 3,
            assignees: ['Sarah Wilson'],
            dueDate: '2025-08-20',
            createdAt: new Date().toISOString(),
            comments: 1,
            attachments: 0,
            completedSubtasks: 0,
            totalSubtasks: 3,
            tags: ['database', 'performance']
          },
          {
            id: 4,
            title: 'User research interviews',
            description: 'Conduct 10 user interviews for product feedback',
            status: 'completed',
            priority: 'medium',
            projectId: 1,
            assignees: ['Emily Brown'],
            dueDate: '2025-08-10',
            createdAt: new Date().toISOString(),
            comments: 8,
            attachments: 4,
            completedSubtasks: 10,
            totalSubtasks: 10,
            tags: ['research', 'user-feedback']
          },
          {
            id: 5,
            title: 'Set up Redis caching',
            description: 'Implement Redis for session management and caching',
            status: 'todo',
            priority: 'medium',
            projectId: 3,
            assignees: ['Mike Johnson'],
            dueDate: '2025-08-18',
            createdAt: new Date().toISOString(),
            comments: 2,
            attachments: 1,
            completedSubtasks: 0,
            totalSubtasks: 2,
            tags: ['backend', 'infrastructure']
          }
        ];
        setTasks(demoTasks);
        
        // Simulate online users
        setOnlineUsers([
          { id: 1, name: 'John Doe', avatar: 'JD', status: 'active', role: 'Developer' },
          { id: 2, name: 'Jane Smith', avatar: 'JS', status: 'active', role: 'Designer' },
          { id: 3, name: 'Alex Chen', avatar: 'AC', status: 'idle', role: 'Backend Engineer' },
          { id: 4, name: 'Sarah Wilson', avatar: 'SW', status: 'active', role: 'DevOps' }
        ]);
        
        setIsLoading(false);
        showToast('Welcome back! You have 3 new notifications', 'info');
      }, 800);
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        const actions = [
          { user: 'John Doe', action: 'updated', target: 'Design new landing page', icon: Edit2 },
          { user: 'Jane Smith', action: 'commented on', target: 'Database optimization', icon: MessageSquare },
          { user: 'Alex Chen', action: 'completed', target: 'a subtask', icon: CheckCircle },
          { user: 'Sarah Wilson', action: 'assigned you to', target: 'a task', icon: User },
          { user: 'Emily Brown', action: 'added', target: 'new task to Product Launch', icon: Plus }
        ];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        setCollaboratorActions(prev => [...prev, {
          id: Date.now(),
          ...randomAction,
          timestamp: new Date().toLocaleTimeString()
        }].slice(-5));
        
        // Add to notifications occasionally
        if (Math.random() > 0.7) {
          setNotifications(prev => [...prev, {
            id: Date.now(),
            message: `${randomAction.user} ${randomAction.action} ${randomAction.target}`,
            timestamp: new Date().toLocaleTimeString(),
            read: false,
            icon: randomAction.icon
          }].slice(-10));
        }
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);
  
  // Authentication handler
  const handleLogin = () => {
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        setCurrentUser({
          id: 1,
          name: 'Current User',
          email: loginForm.email,
          avatar: 'CU',
          role: 'Product Manager'
        });
        setIsAuthenticated(true);
        setAuthToken('demo-jwt-token-' + Date.now());
        setIsLoading(false);
      }
    }, 1000);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthToken(null);
    showToast('Logged out successfully', 'success');
  };
  
  // Drag and Drop handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStatus(status);
  };
  
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      updateTaskStatus(draggedTask.id, newStatus);
      showToast(`Task moved to ${newStatus.replace('-', ' ')}`, 'success');
    }
    setDraggedTask(null);
    setDragOverStatus(null);
  };
  
  // Task operations
  const createTask = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      comments: 0,
      attachments: 0,
      completedSubtasks: 0,
      totalSubtasks: 0,
      tags: []
    };
    setTasks([newTask, ...tasks]);
    setShowNewTaskModal(false);
    showToast('Task created successfully', 'success');
    
    // Simulate real-time update
    setCollaboratorActions(prev => [...prev, {
      id: Date.now(),
      user: currentUser.name,
      action: 'created',
      target: taskData.title,
      icon: Plus,
      timestamp: new Date().toLocaleTimeString()
    }].slice(-5));
  };
  
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    setCollaboratorActions(prev => [...prev, {
      id: Date.now(),
      user: currentUser.name,
      action: 'moved',
      target: `"${task.title}" to ${newStatus.replace('-', ' ')}`,
      icon: ArrowUp,
      timestamp: new Date().toLocaleTimeString()
    }].slice(-5));
  };
  
  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTask(null);
    showToast('Task deleted', 'success');
    
    setCollaboratorActions(prev => [...prev, {
      id: Date.now(),
      user: currentUser.name,
      action: 'deleted',
      target: task.title,
      icon: Trash2,
      timestamp: new Date().toLocaleTimeString()
    }].slice(-5));
  };
  
  // Filtered tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.projectId === parseInt(selectedProject));
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [tasks, selectedProject, filterStatus, searchQuery]);
  
  // Stats calculation
  const stats = useMemo(() => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status === 'completed').length;
    const inProgress = filteredTasks.filter(t => t.status === 'in-progress').length;
    const todo = filteredTasks.filter(t => t.status === 'todo').length;
    const critical = filteredTasks.filter(t => t.priority === 'critical').length;
    
    return { total, completed, inProgress, todo, critical, completionRate: total ? Math.round((completed / total) * 100) : 0 };
  }, [filteredTasks]);
  
  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 transform transition-all hover:scale-[1.02] relative border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-4 shadow-lg transform transition-transform hover:rotate-12">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">TaskFlow Pro</h1>
            <p className="text-purple-200">Collaborative Task Management Platform</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white placeholder-purple-300"
                  placeholder="demo@example.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  disabled={isLoading}
                />
                <User className="absolute right-3 top-3.5 w-5 h-5 text-purple-300" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-white placeholder-purple-300"
                placeholder="Enter any password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-purple-200 text-sm">Demo Mode: Enter any email and password</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Main Application
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} flex transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col transition-all duration-300 shadow-xl`}>
        <div className={`p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:rotate-12">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>TaskFlow Pro</h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Team Workspace</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-blue-100'}`}>
              <div className="flex items-center justify-between">
                <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-xs font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stats.completionRate}%</span>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completion</p>
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-purple-50 to-purple-100'}`}>
              <div className="flex items-center justify-between">
                <Target className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-xs font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{stats.inProgress}</span>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>In Progress</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => setSelectedProject('all')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-[1.02] ${
                selectedProject === 'all' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                  : darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5" />
                  <span className="font-medium">All Tasks</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  selectedProject === 'all'
                    ? 'bg-white/20 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {tasks.length}
                </span>
              </div>
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Projects
            </h3>
            <div className="space-y-1">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id.toString())}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-[1.02] ${
                    selectedProject === project.id.toString() 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                      : darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${project.color}`} />
                      <span className="font-medium">{project.name}</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      selectedProject === project.id.toString()
                        ? 'bg-white/20 text-white'
                        : darkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {project.taskCount}
                    </span>
                  </div>
                  <div className="ml-6">
                    <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-1`}>
                      <div 
                        className={`h-1 rounded-full transition-all ${
                          selectedProject === project.id.toString() 
                            ? 'bg-white/50' 
                            : project.color
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        {/* Online Users */}
        <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Team Online
          </h3>
          <div className="space-y-2">
            {onlineUsers.slice(0, 3).map(user => (
              <div
                key={user.id}
                className={`flex items-center space-x-3 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
                    user.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                  } rounded-full border-2 ${darkMode ? 'border-gray-800' : 'border-white'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{user.role}</p>
                </div>
              </div>
            ))}
            <button className={`w-full text-center py-2 text-xs font-medium ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}>
              View all {onlineUsers.length + 50} members →
            </button>
          </div>
        </div>
        
        {/* User Profile */}
        <div className={`p-4 ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} border-t`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                {currentUser?.avatar}
              </div>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser?.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 shadow-sm transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-xl">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="Search tasks, projects, or people..."
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2.5 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2.5 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-96 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } rounded-2xl shadow-2xl border z-50 overflow-hidden`}>
                    <div className={`p-4 ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} border-b`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                          {notifications.filter(n => !n.read).length} new
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No new notifications</p>
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-4 ${
                            darkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-100'
                          } border-b transition-colors cursor-pointer`}>
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                darkMode ? 'bg-gray-700' : 'bg-gray-100'
                              }`}>
                                {notif.icon && <notif.icon className="w-4 h-4 text-purple-500" />}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{notif.message}</p>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notif.timestamp}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setShowNewTaskModal(true)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">New Task</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Task Board */}
        <div className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(col => (
                <div key={col} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 animate-pulse`}>
                  <div className={`h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mb-4`}></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(item => (
                      <div key={item} className={`h-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {['todo', 'in-progress', 'completed'].map(status => (
                <div 
                  key={status} 
                  className={`${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } rounded-2xl border shadow-sm transition-all ${
                    dragOverStatus === status ? 'ring-2 ring-purple-500 scale-[1.02]' : ''
                  }`}
                  onDragOver={(e) => handleDragOver(e, status)}
                  onDrop={(e) => handleDrop(e, status)}
                  onDragLeave={() => setDragOverStatus(null)}
                >
                  <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {status === 'todo' && (
                          <div className="p-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg">
                            <Circle className="w-5 h-5 text-white" />
                          </div>
                        )}
                        {status === 'in-progress' && (
                          <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                        )}
                        {status === 'completed' && (
                          <div className="p-2 bg-gradient-to-r from-green-400 to-green-500 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className={`font-semibold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {status.replace('-', ' ')}
                          </h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {filteredTasks.filter(t => t.status === status).length} tasks
                          </p>
                        </div>
                      </div>
                      <button className={`p-1 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}>
                        <MoreVertical className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3 min-h-[500px]">
                    {filteredTasks
                      .filter(task => task.status === status)
                      .map(task => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          onClick={() => setSelectedTask(task)}
                          className={`${
                            darkMode ? 'bg-gray-700 hover:bg-gray-650 border-gray-600' : 'bg-gray-50 hover:bg-white border-gray-200'
                          } rounded-xl p-4 cursor-pointer transition-all transform hover:scale-[1.02] hover:shadow-lg border group`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className={`font-semibold flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                              }}
                              className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg ${
                                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                          
                          <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                          
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {task.tags.map((tag, idx) => (
                                <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${
                                  darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs mb-3">
                            <span className={`px-2.5 py-1 rounded-full font-medium ${
                              task.priority === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                              task.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                            }`}>
                              {task.priority}
                            </span>
                            
                            <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {task.totalSubtasks > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                  {task.completedSubtasks}/{task.totalSubtasks}
                                </span>
                              </div>
                              <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-1.5 overflow-hidden`}>
                                <div 
                                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full transition-all"
                                  style={{ width: `${(task.completedSubtasks / task.totalSubtasks) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {task.assignees.slice(0, 3).map((assignee, idx) => (
                                <div
                                  key={idx}
                                  className="w-7 h-7 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white dark:border-gray-700"
                                  title={assignee}
                                >
                                  {assignee.split(' ').map(n => n[0]).join('')}
                                </div>
                              ))}
                              {task.assignees.length > 3 && (
                                <div className={`w-7 h-7 ${
                                  darkMode ? 'bg-gray-600 border-gray-700' : 'bg-gray-200 border-white'
                                } rounded-full flex items-center justify-center text-xs font-semibold border-2`}>
                                  +{task.assignees.length - 3}
                                </div>
                              )}
                            </div>
                            
                            <div className={`flex items-center space-x-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {task.comments > 0 && (
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span className="text-xs">{task.comments}</span>
                                </div>
                              )}
                              {task.attachments > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Briefcase className="w-3.5 h-3.5" />
                                  <span className="text-xs">{task.attachments}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Real-time Activity Feed */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-6 py-3 transition-colors duration-300`}>
          <div className="flex items-center space-x-4 text-sm">
            <div className="p-2 bg-gradient-to-r from-green-400 to-green-500 rounded-lg">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 flex items-center space-x-6 overflow-x-auto">
              {collaboratorActions.map(action => (
                <div key={action.id} className={`flex items-center space-x-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                } whitespace-nowrap animate-fadeIn`}>
                  <action.icon className="w-3.5 h-3.5 text-purple-500" />
                  <span className="font-medium">{action.user}</span>
                  <span>{action.action}</span>
                  <span className="font-medium">{action.target}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>• {action.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-xl shadow-2xl transform transition-all animate-slideIn flex items-center space-x-3 ${
              toast.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              toast.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-blue-500 to-blue-600'
            } text-white`}
          >
            {toast.type === 'success' && <Check className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        ))}
      </div>
      
      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-slideIn shadow-2xl border`}>
            <div className={`p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Task</h2>
                </div>
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className={`p-2 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Task Title
                </label>
                <input
                  id="task-title"
                  type="text"
                  className={`w-full px-4 py-2.5 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                  placeholder="Enter task title..."
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  id="task-description"
                  rows="3"
                  className={`w-full px-4 py-2.5 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                  placeholder="Describe the task..."
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Project
                  </label>
                  <select
                    id="task-project"
                    className={`w-full px-4 py-2.5 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    className={`w-full px-4 py-2.5 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Due Date
                  </label>
                  <input
                    id="task-duedate"
                    type="date"
                    className={`w-full px-4 py-2.5 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className={`px-5 py-2.5 ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  } border rounded-xl transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const title = document.getElementById('task-title').value;
                    const description = document.getElementById('task-description').value;
                    const project = document.getElementById('task-project').value;
                    const priority = document.getElementById('task-priority').value;
                    const dueDate = document.getElementById('task-duedate').value;
                    
                    if (title && description && dueDate) {
                      createTask({
                        title,
                        description,
                        status: 'todo',
                        priority,
                        projectId: parseInt(project),
                        assignees: [currentUser.name],
                        dueDate
                      });
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all animate-slideIn shadow-2xl border`}>
            <div className={`p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTask.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTask.priority === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    selectedTask.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                    selectedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {selectedTask.priority}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className={`p-2 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Description
                    </h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{selectedTask.description}</p>
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Status
                    </h3>
                    <select
                      value={selectedTask.status}
                      onChange={(e) => {
                        updateTaskStatus(selectedTask.id, e.target.value);
                        setSelectedTask({...selectedTask, status: e.target.value});
                        showToast('Status updated', 'success');
                      }}
                      className={`px-4 py-2.5 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          JD
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className="font-medium">John Doe</span> added a comment
                          </p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Great progress on this! The implementation looks solid.
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          JS
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className="font-medium">Jane Smith</span> changed status to In Progress
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>5 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className={`flex-1 px-4 py-2.5 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        } border rounded-xl focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                      <button className="p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Assignees
                    </h3>
                    <div className="space-y-2">
                      {selectedTask.assignees.map((assignee, idx) => (
                        <div key={idx} className={`flex items-center space-x-3 p-2 rounded-xl ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } transition-colors cursor-pointer`}>
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{assignee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Due Date
                    </h3>
                    <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Project
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        projects.find(p => p.id === selectedTask.projectId)?.color
                      }`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {projects.find(p => p.id === selectedTask.projectId)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {selectedTask.tags && selectedTask.tags.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.tags.map((tag, idx) => (
                          <span key={idx} className={`text-xs px-3 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => deleteTask(selectedTask.id)}
                    className={`w-full px-4 py-2.5 ${
                      darkMode 
                        ? 'border-red-800 text-red-400 hover:bg-red-900/20' 
                        : 'border-red-300 text-red-600 hover:bg-red-50'
                    } border rounded-xl transition-all flex items-center justify-center space-x-2`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TaskManagementPlatform;