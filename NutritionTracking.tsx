import React from 'react';
import { Apple, Coffee, Pizza, Plus, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NutritionTracking = () => {
  const meals = [
    {
      type: 'Breakfast',
      icon: Coffee,
      items: [
        { name: 'Oatmeal', calories: 150, protein: '6g', carbs: '27g', fat: '3g' },
        { name: 'Banana', calories: 105, protein: '1g', carbs: '27g', fat: '0g' },
      ],
    },
    {
      type: 'Lunch',
      icon: Pizza,
      items: [
        { name: 'Chicken Salad', calories: 350, protein: '25g', carbs: '15g', fat: '12g' },
      ],
    },
    {
      type: 'Snacks',
      icon: Apple,
      items: [
        { name: 'Mixed Nuts', calories: 180, protein: '6g', carbs: '6g', fat: '16g' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Nutrition Tracking</h1>
        <Button size="lg" className="w-full sm:w-auto gap-2">
          <Plus className="h-5 w-5" />
          Add Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Today's Meals</h2>
            </div>

            <div className="space-y-6">
              {meals.map((meal) => {
                const Icon = meal.icon;
                return (
                  <div key={meal.type} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">{meal.type}</h3>
                    </div>
                    <div className="space-y-2">
                      {meal.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.calories} calories
                            </p>
                          </div>
                          <div className="text-sm text-gray-600 flex gap-3">
                            <span>P: {item.protein}</span>
                            <span>C: {item.carbs}</span>
                            <span>F: {item.fat}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calories</span>
                <span className="font-medium">785/2000</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '39%' }} />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="font-medium">38g</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="font-medium">75g</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="font-medium">31g</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Water Intake</h2>
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Goal</span>
                <span className="font-medium">1.5/2.5L</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '60%' }} />
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Water
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracking;