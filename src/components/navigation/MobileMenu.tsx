import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/types/content';
import { NavLink } from './NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  navigation: MenuItem[];
  onClose: () => void;
}

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const MobileMenu = ({ isOpen, navigation, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="md:hidden"
        >
          <div className="flex flex-col space-y-4 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
