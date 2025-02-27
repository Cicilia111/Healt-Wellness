import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const userProfile = {
    name: 'Guest User',
    email: 'Sign in to edit',
    phone: 'Sign in to edit',
    location: 'Sign in to edit',
    birthdate: 'Sign in to edit',
    joinDate: 'Guest Mode',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Guest',
  };

  const stats = [
    { label: 'Workouts', value: '0' },
    { label: 'Active Days', value: '0' },
    { label: 'Goals Met', value: '0' },
    { label: 'Badges', value: '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
          Profile
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.location.href = '/login'}
        >
          Sign In to Edit
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={userProfile.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full bg-gray-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-1">{userProfile.name}</h2>
              <p className="text-gray-600 text-sm">{userProfile.joinDate}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-violet-600">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{userProfile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{userProfile.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Birth Date</p>
                <p className="font-medium">{userProfile.birthdate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Health Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Height</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Type</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Allergies</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Preferred Workout Time</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fitness Level</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weekly Goal</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Notifications</span>
              <span className="font-medium">Sign in to edit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;