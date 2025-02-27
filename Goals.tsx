import React, { useState } from 'react';
import { Target, TrendingUp, Scale, Clock, Plus, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Goals = () => {
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
    }
  ]);

  const goals = [
    {
      icon: Scale,
      title: 'Weight Goal',
      current: '75 kg',
      target: '70 kg',
      progress: 60,
      timeframe: '3 months',
    },
    {
      icon: Clock,
      title: 'Weekly Activity',
      current: '3 hours',
      target: '5 hours',
      progress: 60,
      timeframe: '1 week',
    },
    {
      icon: TrendingUp,
      title: 'Daily Steps',
      current: '8,000',
      target: '10,000',
      progress: 80,
      timeframe: 'Daily',
    },
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Goals</h1>
        <Button 
          size="lg" 
          className="gap-2"
          onClick={() => setShowAddGoal(true)}
        >
          <Target className="h-5 w-5" />
          Set New Goal
        </Button>
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div
              key={goal.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">{goal.title}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current: {goal.current}</span>
                  <span>Target: {goal.target}</span>
                </div>
                
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Timeframe: {goal.timeframe}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {goal.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-6">Personal Goals</h2>
        <div className="grid gap-4">
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

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Recent Achievements</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Consistent Activity',
              description: 'Completed workouts 3 days in a row',
              date: '2 days ago',
            },
            {
              title: 'Step Goal Champion',
              description: 'Reached 10,000 steps goal for 5 consecutive days',
              date: '1 week ago',
            },
            {
              title: 'Weight Milestone',
              description: 'Lost 2kg towards your goal',
              date: '2 weeks ago',
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              <span className="text-sm text-gray-600">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;