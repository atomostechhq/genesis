"use client";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import { RiCloseLine } from '@remixicon/react';
import { cn } from '../utils/utils';
import Button from './Button';

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: string;
  height?: string;
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  setIsOpen,
  children,
  position = 'right',
  width = 'w-80',
  height = 'h-64',
  className,
  showCloseButton = true,
  closeOnOutsideClick = true,
}) => {
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  // Prevent body scroll when open, restore previous value on cleanup
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape (listener only attached while open)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="fixed inset-0 z-[1000000000000] bg-black/50"
        onClick={() => closeOnOutsideClick && handleClose()}
      />
      <div
        className={cn(
          'fixed z-[1000000000000] bg-white p-4 shadow-xl',
          position === 'right' && `top-0 right-0 ${width} h-full`,
          position === 'left' && `top-0 left-0 ${width} h-full`,
          position === 'top' && `top-0 left-0 w-full ${height}`,
          position === 'bottom' && `bottom-0 left-0 w-full ${height}`,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button
            size="sm"
            variant="outlined"
            intent="default-outlined"
            onClick={handleClose}
            startIcon={<RiCloseLine size={20} />}
            aria-label="Close drawer"
            className="absolute right-4 top-3 border-none p-1"
          />
        )}
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;