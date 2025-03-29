import { Link } from 'react-router-dom';
import { useBranding } from '@/hooks/use-branding';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl'
};

export const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const { siteName, logo } = useBranding();

  return (
    <Link to="/" className={cn('flex items-center space-x-2', className)}>
      <img 
        src={logo} 
        alt={`${siteName} Logo`} 
        className={cn(sizeClasses[size])}
      />
      {showText && (
        <span className={cn('font-bold', textSizeClasses[size])}>
          {siteName}
        </span>
      )}
    </Link>
  );
};
