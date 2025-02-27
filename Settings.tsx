import React, { useState } from 'react';
import { Bell, Moon, Sun, Volume2, Globe, Shield, HelpCircle, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSound } from '@/lib/sounds';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import HelpCenter from '@/components/HelpCenter';

const Settings = () => {
  const navigate = useNavigate();
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    theme: 'light',
    language: 'English',
    privacy: 'private'
  });

  const handleSignOut = async () => {
    try {
      if (settings.sound) playSound('click');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    if (settings.sound) playSound('click');
    setSettings(prev => ({ ...prev, theme: newTheme }));
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, sound: !prev.sound }));
    playSound('click');
  };

  const toggleNotifications = () => {
    if (settings.sound) playSound('click');
    setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  const cyclePrivacy = () => {
    const privacyOptions = ['public', 'private', 'friends'];
    const currentIndex = privacyOptions.indexOf(settings.privacy);
    const nextIndex = (currentIndex + 1) % privacyOptions.length;
    if (settings.sound) playSound('click');
    setSettings(prev => ({ ...prev, privacy: privacyOptions[nextIndex] }));
  };

  const cycleLanguage = () => {
    const languages = ['English', 'Spanish', 'French', 'German'];
    const currentIndex = languages.indexOf(settings.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    if (settings.sound) playSound('click');
    setSettings(prev => ({ ...prev, language: languages[nextIndex] }));
  };

  const settingsGroups = [
    {
      title: 'App Preferences',
      settings: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Manage your notification preferences',
          value: settings.notifications,
          action: toggleNotifications,
          displayValue: settings.notifications ? 'On' : 'Off',
        },
        {
          icon: Volume2,
          label: 'Sound',
          description: 'Workout sounds and alerts',
          value: settings.sound,
          action: toggleSound,
          displayValue: settings.sound ? 'On' : 'Off',
        },
        {
          icon: settings.theme === 'dark' ? Moon : Sun,
          label: 'Theme',
          description: 'Choose between light and dark mode',
          value: settings.theme,
          action: toggleTheme,
          displayValue: settings.theme === 'light' ? 'Light' : 'Dark',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      settings: [
        {
          icon: Shield,
          label: 'Privacy',
          description: 'Manage your privacy settings',
          value: settings.privacy,
          action: cyclePrivacy,
          displayValue: settings.privacy.charAt(0).toUpperCase() + settings.privacy.slice(1),
        },
        {
          icon: Globe,
          label: 'Language',
          description: 'Choose your preferred language',
          value: settings.language,
          action: cycleLanguage,
          displayValue: settings.language,
        },
      ],
    },
    {
      title: 'Support',
      settings: [
        {
          icon: HelpCircle,
          label: 'Help Center',
          description: 'Get help with HealthTrack',
          action: () => setShowHelpCenter(true),
          displayValue: '',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
        Settings
      </h1>

      <div className="space-y-6">
        {settingsGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold dark:text-white mb-4">{group.title}</h2>
              <div className="space-y-2">
                {group.settings.map((setting) => {
                  const Icon = setting.icon;
                  return (
                    <button
                      key={setting.label}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      onClick={setting.action}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-violet-50 dark:bg-violet-900 rounded-lg">
                          <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium dark:text-white">{setting.label}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        {setting.displayValue && <span>{setting.displayValue}</span>}
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Account</h2>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-between text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 gap-2"
            onClick={handleSignOut}
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Sign Out
            </span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showHelpCenter && <HelpCenter onClose={() => setShowHelpCenter(false)} />}
    </div>
  );
};

export default Settings;