import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Brain, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: 'Activity Tracking',
      description: 'Monitor your workouts and daily activities',
      gradient: 'from-cyan-400 to-blue-500',
      delay: '0',
    },
    {
      icon: Heart,
      title: 'Health Metrics',
      description: 'Track vital health statistics and progress',
      gradient: 'from-pink-500 to-rose-500',
      delay: '100',
    },
    {
      icon: Brain,
      title: 'Smart Goals',
      description: 'Set and achieve personalized fitness goals',
      gradient: 'from-amber-400 to-orange-500',
      delay: '200',
    },
    {
      icon: Salad,
      title: 'Nutrition Planning',
      description: 'Log meals and track nutritional intake',
      gradient: 'from-emerald-400 to-teal-500',
      delay: '300',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-violet-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/30 to-purple-500/30 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-5xl w-full text-center relative px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-transparent bg-clip-text animate-gradient pb-2">
            Welcome to HealthTrack
          </h1>
          <p className="text-xl text-gray-600 mb-12 animate-fade-in animation-delay-200">
            Your personal companion for a healthier lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${feature.gradient} text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <Button
          size="lg"
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-600 hover:via-blue-600 hover:to-violet-600 text-lg px-8 py-3 h-auto transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Welcome;