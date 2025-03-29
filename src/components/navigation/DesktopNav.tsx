import { MenuItem } from '@/types/content';
import { NavLink } from './NavLink';
import { ThemeToggle } from '../common/ThemeToggle';

interface DesktopNavProps {
  navigation: MenuItem[];
}

export const DesktopNav = ({ navigation }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <NavLink key={item.id} to={item.url}>
          {item.label}
        </NavLink>
      ))}
      <ThemeToggle className="ml-2" />
    </div>
  );
};
