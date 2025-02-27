import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Activity, BarChart3, Home, Settings as SettingsIcon, User } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ActivityTracking from './pages/ActivityTracking';
import NutritionTracking from './pages/NutritionTracking';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

function App() {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Activity, label: 'Activity', path: '/activity' },
    { icon: BarChart3, label: 'Nutrition', path: '/nutrition' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="flex flex-col lg:flex-row min-h-screen">
                <Navbar items={navItems} />
                <main className="flex-1 p-4 lg:p-6 mt-16 lg:mt-0">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/activity" element={<ActivityTracking />} />
                    <Route path="/nutrition" element={<NutritionTracking />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;