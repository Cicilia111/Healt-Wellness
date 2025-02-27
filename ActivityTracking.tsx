import React, { useState, useEffect } from 'react';
import { Play, Clock, BarChart, History, X, Plus, Dumbbell, User, CheckCircle, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ActivityTracking = () => {
  const navigate = useNavigate();
  const [activeWorkout, setActiveWorkout] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [customExercise, setCustomExercise] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [customExercises, setCustomExercises] = useState<Array<{ name: string; duration: string }>>([]);
  
  const [exerciseTimers, setExerciseTimers] = useState<{ [key: string]: number }>({});
  const [exerciseStatus, setExerciseStatus] = useState<{ [key: string]: 'pending' | 'active' | 'completed' | 'paused' }>({});
  const [timerIntervals, setTimerIntervals] = useState<{ [key: string]: number }>({});

  const workoutTypes = [
    {
      icon: Clock,
      title: 'Cardio',
      duration: '30-45 min',
      calories: '300-400',
      description: 'Improve heart health and endurance',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      iconColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=100&w=1500&h=600',
      exercises: [
        { name: 'Running', duration: '20' },
        { name: 'Cycling', duration: '30' },
        { name: 'Jump Rope', duration: '10' },
        { name: 'Swimming', duration: '45' },
        { name: 'Rowing', duration: '20' }
      ]
    },
    {
      icon: BarChart,
      title: 'Strength',
      duration: '45-60 min',
      calories: '400-500',
      description: 'Build muscle and increase metabolism',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      iconColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=100&w=1500&h=600',
      exercises: [
        { name: 'Bench Press', duration: '15' },
        { name: 'Squats', duration: '15' },
        { name: 'Deadlifts', duration: '15' },
        { name: 'Shoulder Press', duration: '10' },
        { name: 'Pull-ups', duration: '10' }
      ]
    },
    {
      icon: History,
      title: 'HIIT',
      duration: '20-30 min',
      calories: '250-350',
      description: 'Intense intervals for maximum results',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      iconColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&q=100&w=1500&h=600',
      exercises: [
        { name: 'Burpees', duration: '5' },
        { name: 'Mountain Climbers', duration: '5' },
        { name: 'Box Jumps', duration: '5' },
        { name: 'Sprint Intervals', duration: '10' },
        { name: 'Kettlebell Swings', duration: '5' }
      ]
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startExerciseTimer = (workoutTitle: string, exerciseName: string, duration: string) => {
    const key = `${workoutTitle}-${exerciseName}`;
    const durationInSeconds = parseInt(duration) * 60;
    
    if (timerIntervals[key]) {
      clearInterval(timerIntervals[key]);
    }

    setExerciseStatus(prev => ({ ...prev, [key]: 'active' }));
    setExerciseTimers(prev => ({ ...prev, [key]: durationInSeconds }));

    const intervalId = window.setInterval(() => {
      setExerciseTimers(prev => {
        const newTime = prev[key] - 1;
        if (newTime <= 0) {
          clearInterval(timerIntervals[key]);
          setExerciseStatus(prevStatus => ({ ...prevStatus, [key]: 'completed' }));
          return { ...prev, [key]: 0 };
        }
        return { ...prev, [key]: newTime };
      });
    }, 1000);

    setTimerIntervals(prev => ({ ...prev, [key]: intervalId }));
  };

  const pauseExerciseTimer = (workoutTitle: string, exerciseName: string) => {
    const key = `${workoutTitle}-${exerciseName}`;
    clearInterval(timerIntervals[key]);
    setExerciseStatus(prev => ({ ...prev, [key]: 'paused' }));
  };

  const resetExerciseTimer = (workoutTitle: string, exerciseName: string, duration: string) => {
    const key = `${workoutTitle}-${exerciseName}`;
    clearInterval(timerIntervals[key]);
    setExerciseStatus(prev => ({ ...prev, [key]: 'pending' }));
    setExerciseTimers(prev => ({ ...prev, [key]: parseInt(duration) * 60 }));
  };

  const completeExercise = (workoutTitle: string, exerciseName: string) => {
    const key = `${workoutTitle}-${exerciseName}`;
    clearInterval(timerIntervals[key]);
    setExerciseStatus(prev => ({ ...prev, [key]: 'completed' }));
  };

  useEffect(() => {
    return () => {
      Object.values(timerIntervals).forEach(intervalId => clearInterval(intervalId));
    };
  }, [timerIntervals]);

  useEffect(() => {
    let interval: number;
    if (activeWorkout) {
      interval = setInterval(() => {
        setWorkoutTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeWorkout]);

  const handleStartWorkout = (workoutTitle: string) => {
    setSelectedWorkout(workoutTitle);
    setActiveWorkout(true);
    setWorkoutTimer(0);
  };

  const handleEndWorkout = () => {
    setActiveWorkout(false);
    setSelectedWorkout(null);
    setWorkoutTimer(0);
    Object.values(timerIntervals).forEach(intervalId => clearInterval(intervalId));
    setExerciseTimers({});
    setExerciseStatus({});
    setTimerIntervals({});
  };

  const handleAddCustomExercise = () => {
    if (customExercise && customDuration) {
      setCustomExercises([...customExercises, { name: customExercise, duration: customDuration }]);
      setCustomExercise('');
      setCustomDuration('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
          Activity Tracking
        </h1>
        <div className="flex items-center gap-4">
          {activeWorkout ? (
            <>
              <div className="text-lg font-semibold text-emerald-600">
                {formatTime(workoutTimer)}
              </div>
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 gap-2"
                onClick={handleEndWorkout}
              >
                <X className="h-5 w-5" />
                End Workout
              </Button>
            </>
          ) : (
            <Button 
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => navigate('/login')}
            >
              <User className="h-5 w-5" />
              Sign In
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutTypes.map((workout) => {
          const Icon = workout.icon;
          const isSelected = selectedWorkout === workout.title;
          return (
            <div
              key={workout.title}
              className={`${
                isSelected ? 'ring-2 ring-offset-2 ring-violet-500' : ''
              } rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-lg overflow-hidden`}
              onClick={() => !activeWorkout && handleStartWorkout(workout.title)}
            >
              <div className={`${workout.color} p-6`}>
                <div className="relative mb-4 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                  <div className="absolute top-4 left-4 flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Icon className={`h-6 w-6 ${workout.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white drop-shadow-md">
                      {workout.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-2 text-white/90">
                  <p>Duration: {workout.duration}</p>
                  <p>Calories: {workout.calories}</p>
                  <p className="text-sm">{workout.description}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-white font-semibold">Exercises:</p>
                  {workout.exercises.map((exercise, index) => {
                    const key = `${workout.title}-${exercise.name}`;
                    const status = exerciseStatus[key] || 'pending';
                    const timer = exerciseTimers[key] || parseInt(exercise.duration) * 60;

                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center rounded-lg p-3 transition-colors ${
                          status === 'completed' 
                            ? 'bg-white/30' 
                            : status === 'active'
                            ? 'bg-white/20 ring-2 ring-white/50'
                            : 'bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white">{exercise.name}</span>
                          <span className="text-white/80">
                            {formatTime(timer)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {status === 'pending' && (
                            <Button
                              size="sm"
                              className="bg-white/20 hover:bg-white/30"
                              onClick={(e) => {
                                e.stopPropagation();
                                startExerciseTimer(workout.title, exercise.name, exercise.duration);
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {status === 'active' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-white/20 hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  pauseExerciseTimer(workout.title, exercise.name);
                                }}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-white/20 hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  completeExercise(workout.title, exercise.name);
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {status === 'paused' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-white/20 hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startExerciseTimer(workout.title, exercise.name, exercise.duration);
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-white/20 hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetExerciseTimer(workout.title, exercise.name, exercise.duration);
                                }}
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {status === 'completed' && (
                            <Button
                              size="sm"
                              className="bg-white/20 hover:bg-white/30"
                              onClick={(e) => {
                                e.stopPropagation();
                                resetExerciseTimer(workout.title, exercise.name, exercise.duration);
                              }}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Custom Exercise</h2>
          <Button
            onClick={handleAddCustomExercise}
            className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            disabled={!customExercise || !customDuration}
          >
            <Plus className="h-5 w-5" />
            Add Exercise
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise Name
            </label>
            <input
              type="text"
              value={customExercise}
              onChange={(e) => setCustomExercise(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="e.g., Push-ups"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="e.g., 15"
            />
          </div>
        </div>

        {customExercises.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Added Exercises</h3>
            {customExercises.map((exercise, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-5 w-5 text-violet-500" />
                  <span>{exercise.name}</span>
                </div>
                <span className="text-gray-600">{exercise.duration} min</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-lg shadow-xl text-white">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-violet-500/30 rounded-md">
                  <Clock className="h-5 w-5 text-violet-300" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Morning Run</h4>
                  <p className="text-sm text-violet-300">30 minutes • 3.2 km</p>
                </div>
              </div>
              <span className="text-sm font-medium text-violet-300">
                {i === 0 ? 'Today' : i === 1 ? 'Yesterday' : '2 days ago'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTracking;