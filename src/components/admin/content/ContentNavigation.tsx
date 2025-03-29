import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Home, 
  LogIn, 
  Palette 
} from 'lucide-react';

interface ContentNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'homepage', label: 'Página Inicial', icon: Home },
  { id: 'login', label: 'Página de Login', icon: LogIn },
  { id: 'dashboard', label: 'Painel de Controlo', icon: LayoutDashboard },
  { id: 'branding', label: 'Marca', icon: Palette }
];

const ContentNavigation: React.FC<ContentNavigationProps> = ({
  activeSection,
  onSectionChange
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSectionChange(section.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {section.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ContentNavigation;
