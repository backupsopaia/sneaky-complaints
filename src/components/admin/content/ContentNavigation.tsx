
import React from 'react';
import { Text, Image, Bell } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentNavigationProps {
  section: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ContentNavigation: React.FC<ContentNavigationProps> = ({ 
  section, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <TabsList className="grid grid-cols-3 w-full max-w-md">
      <TabsTrigger 
        value="text"
        onClick={() => setActiveTab('text')}
        className="flex items-center gap-2"
      >
        <Text className="h-4 w-4" />
        <span>Textos</span>
      </TabsTrigger>
      <TabsTrigger 
        value="images"
        onClick={() => setActiveTab('images')}
        className="flex items-center gap-2"
      >
        <Image className="h-4 w-4" />
        <span>Imagens</span>
      </TabsTrigger>
      <TabsTrigger 
        value="notifications"
        onClick={() => setActiveTab('notifications')}
        className="flex items-center gap-2"
      >
        <Bell className="h-4 w-4" />
        <span>Notificações</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ContentNavigation;
