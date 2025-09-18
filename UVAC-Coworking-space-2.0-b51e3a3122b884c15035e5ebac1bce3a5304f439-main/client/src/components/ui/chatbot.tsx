import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface ChatBotProps {
  messages: {
    general: string[];
    business: string[];
    limited: string[];
    casual: string[];
  };
  position: 'bottom-right' | 'bottom-left';
  triggerText?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ messages, position, triggerText = 'Chat with Us' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'business' | 'limited' | 'casual' | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category as 'general' | 'business' | 'limited' | 'casual');
  };

  return (
    <div
      className={`fixed ${position === 'bottom-right' ? 'right-4' : 'left-4'} bottom-4 z-50`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{triggerText}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedCategory === 'general' ? 'default' : 'outline'}
                onClick={() => handleCategorySelect('general')}
                className="w-full"
              >
                General
              </Button>
              <Button
                variant={selectedCategory === 'business' ? 'default' : 'outline'}
                onClick={() => handleCategorySelect('business')}
                className="w-full"
              >
                Business
              </Button>
              <Button
                variant={selectedCategory === 'limited' ? 'default' : 'outline'}
                onClick={() => handleCategorySelect('limited')}
                className="w-full"
              >
                Limited Offers
              </Button>
              <Button
                variant={selectedCategory === 'casual' ? 'default' : 'outline'}
                onClick={() => handleCategorySelect('casual')}
                className="w-full"
              >
                Casual
              </Button>
            </div>

            {selectedCategory && (
              <div className="space-y-2">
                {messages[selectedCategory].map((message, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    {message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
