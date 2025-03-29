import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink = ({ to, children, className, onClick }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium text-muted-foreground hover:text-primary transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
