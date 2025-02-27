import React, { useState } from 'react';
import { Book, MessageCircle, Mail, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HelpCenterProps {
  onClose: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onClose }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const gettingStartedContent = {
    title: 'Getting Started with HealthTrack',
    sections: [
      {
        title: 'Welcome to HealthTrack',
        content: 'HealthTrack is your all-in-one fitness companion designed to help you achieve your health and wellness goals. Our platform offers comprehensive tracking for workouts, nutrition, and personal goals.'
      },
      {
        title: 'Setting Up Your Profile',
        content: 'Start by creating your profile and setting your preferences. You can customize your workout preferences, set notification preferences, and choose your preferred theme.'
      },
      {
        title: 'Activity Tracking',
        content: 'Track your workouts with our intuitive interface. Choose from pre-defined workout types or create custom exercises. Monitor your progress with real-time timers and completion tracking.'
      },
      {
        title: 'Nutrition Monitoring',
        content: 'Log your meals and track your nutritional intake. Set daily goals for calories, macronutrients, and water intake. View detailed summaries of your dietary habits.'
      },
      {
        title: 'Goal Setting',
        content: 'Create personalized fitness goals and track your progress. Whether it\'s weight loss, muscle gain, or improving endurance, HealthTrack helps you stay on track.'
      }
    ]
  };

  const faqContent = {
    title: 'Frequently Asked Questions',
    questions: [
      {
        question: 'How do I start a workout?',
        answer: 'Navigate to the Activity Tracking page and select a workout type (Cardio, Strength, or HIIT). Click on the workout card to begin, and use the timer controls to track your exercises.'
      },
      {
        question: 'Can I create custom exercises?',
        answer: 'Yes! In the Activity Tracking page, scroll down to the "Custom Exercise" section. Enter the exercise name and duration, then click "Add Exercise" to add it to your workout.'
      },
      {
        question: 'How do I track my nutrition?',
        answer: 'Use the Nutrition Tracking page to log your meals and monitor your daily intake. Add meals using the "Add Meal" button and track your water intake throughout the day.'
      },
      {
        question: 'How do I set personal goals?',
        answer: 'Visit the Goals page and click "Set New Goal". Enter your goal details, including the target and timeframe. You can track your progress and update goals as needed.'
      },
      {
        question: 'Can I change the app theme?',
        answer: 'Yes! Go to Settings and click on the Theme option to toggle between light and dark mode. Your preference will be saved automatically.'
      }
    ]
  };

  const documentationContent = {
    title: 'Documentation',
    sections: [
      {
        title: 'Features Overview',
        content: 'Detailed guide to all HealthTrack features including activity tracking, nutrition monitoring, goal setting, and progress tracking.'
      },
      {
        title: 'Workout Types',
        content: 'Learn about different workout categories: Cardio for endurance, Strength for muscle building, and HIIT for intense interval training.'
      },
      {
        title: 'Nutrition Tracking',
        content: 'Understanding macronutrients, setting dietary goals, and using the meal logging system effectively.'
      },
      {
        title: 'Progress Monitoring',
        content: 'How to track your fitness journey, view statistics, and analyze your performance over time.'
      }
    ]
  };

  const helpSections = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using HealthTrack',
      content: gettingStartedContent,
    },
    {
      icon: MessageCircle,
      title: 'FAQ',
      description: 'Find answers to common questions',
      content: faqContent,
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      content: {
        title: 'Contact Support',
        email: 'creation@iciltech.co.za',
        additionalContacts: [
          {
            title: 'Technical Support',
            email: 'support@healthtrack.com',
            hours: '24/7'
          },
          {
            title: 'General Inquiries',
            email: 'info@healthtrack.com',
            hours: 'Mon-Fri, 9am-5pm'
          }
        ]
      }
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Detailed guides and documentation',
      content: documentationContent,
    },
  ];

  const renderContent = () => {
    const section = helpSections.find(s => s.title === selectedSection);
    if (!section) return null;

    switch (section.title) {
      case 'Getting Started':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold dark:text-white">{section.content.title}</h3>
            {section.content.sections.map((s, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">{s.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{s.content}</p>
              </div>
            ))}
          </div>
        );

      case 'FAQ':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold dark:text-white">{section.content.title}</h3>
            {section.content.questions.map((q, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">{q.question}</h4>
                <p className="text-gray-600 dark:text-gray-300">{q.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'Contact Support':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold dark:text-white">{section.content.title}</h3>
            <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 dark:text-white">Primary Contact</h4>
              <a
                href={`mailto:${section.content.email}`}
                className="text-violet-600 dark:text-violet-400 hover:underline"
              >
                {section.content.email}
              </a>
            </div>
            {section.content.additionalContacts.map((contact, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">{contact.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Email:{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">Hours: {contact.hours}</p>
              </div>
            ))}
          </div>
        );

      case 'Documentation':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold dark:text-white">{section.content.title}</h3>
            {section.content.sections.map((s, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 dark:text-white">{s.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{s.content}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-semibold dark:text-white">
            {selectedSection || 'Help Center'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedSection ? setSelectedSection(null) : onClose()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {selectedSection ? 'Back to Help Center' : 'Close'}
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
          {!selectedSection ? (
            <div className="grid gap-6">
              {helpSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.title}
                    onClick={() => setSelectedSection(section.title)}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full text-left"
                  >
                    <div className="p-2 bg-violet-50 dark:bg-violet-900 rounded-lg">
                      <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium dark:text-white flex items-center justify-between">
                        {section.title}
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;