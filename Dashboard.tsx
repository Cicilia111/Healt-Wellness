import React, { useState } from 'react';
import { Activity, Flame, Timer, Heart, Target, Plus, Calendar, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    timeframe: '',
    description: ''
  });
  const [personalGoals, setPersonalGoals] = useState([
    {
      title: 'Run a Marathon',
      target: 'Complete 42.2km',
      timeframe: '6 months',
      description: 'Train and complete my first full marathon',
      progress: 30
    },
    {
      title: 'Weight Loss',
      target: 'Lose 10kg',
      timeframe: '4 months',
      description: 'Reach target weight through diet and exercise',
      progress: 45
    }
  ]);

  const activityData = [
    { day: 'Mon', steps: 8000, calories: 2200 },
    { day: 'Tue', steps: 10000, calories: 2400 },
    { day: 'Wed', steps: 9000, calories: 2300 },
    { day: 'Thu', steps: 12000, calories: 2600 },
    { day: 'Fri', steps: 7500, calories: 2100 },
    { day: 'Sat', steps: 11000, calories: 2500 },
    { day: 'Sun', steps: 9500, calories: 2350 },
  ];

  const metrics = [
    { icon: Activity, label: 'Steps', value: '10,234', color: 'from-violet-500 to-purple-500' },
    { icon: Flame, label: 'Calories', value: '2,345', color: 'from-orange-500 to-red-500' },
    { icon: Timer, label: 'Active Minutes', value: '45', color: 'from-emerald-500 to-teal-500' },
    { icon: Heart, label: 'Heart Rate', value: '72 bpm', color: 'from-pink-500 to-rose-500' },
  ];

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.timeframe) {
      setPersonalGoals([
        ...personalGoals,
        {
          ...newGoal,
          progress: 0
        }
      ]);
      setNewGoal({
        title: '',
        target: '',
        timeframe: '',
        description: ''
      });
      setShowAddGoal(false);
    }
  };

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = personalGoals.filter((_, i) => i !== index);
    setPersonalGoals(updatedGoals);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-0"
            >
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                    {metric.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            Weekly Activity
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="steps"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                  name="Steps"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="calories"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316', strokeWidth: 2 }}
                  name="Calories"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Goals</h2>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
              onClick={() => setShowAddGoal(true)}
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>
          <div className="space-y-4">
            {personalGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{goal.title}</h3>
                    <p className="text-white/80 text-sm">{goal.description}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="text-white/60 hover:text-white/90 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    <span>{goal.target}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{goal.timeframe}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm font-medium">{goal.progress}% Complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Personal Goal</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., Run a Marathon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target
                </label>
                <input
                  type="text"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., Complete 42.2km"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeframe
                </label>
                <input
                  type="text"
                  value={newGoal.timeframe}
                  onChange={(e) => setNewGoal({ ...newGoal, timeframe: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="e.g., 6 months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your goal..."
                />
              </div>
              <Button
                className="w-full gap-2"
                onClick={handleAddGoal}
                disabled={!newGoal.title || !newGoal.target || !newGoal.timeframe}
              >
                <Plus className="h-5 w-5" />
                Add Goal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;