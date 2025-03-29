import React from 'react';
import { useContent } from '@/context/content';
import { Logo } from './common/Logo';
import { ThemeToggle } from './common/ThemeToggle';
import { DesktopNav } from './navigation/DesktopNav';
import { MobileMenu } from './navigation/MobileMenu';
import { MobileMenuButton } from './navigation/MobileMenuButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { content } = useContent();
  const { navigation } = content;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Logo />

        <DesktopNav navigation={navigation} />

        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle className="mr-2" />
          <MobileMenuButton 
            isOpen={isOpen} 
            onClick={toggleMenu}
          />
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        navigation={navigation}
        onClose={closeMenu}
      />
    </nav>
  );
};

export default Navbar;
