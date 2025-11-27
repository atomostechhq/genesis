// import React, { forwardRef } from 'react';

// interface SplitButtonProps {
//   children: React.ReactNode;
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
//   appearance?: 'primary' | 'secondary' | 'warning' | 'danger';
// }

// const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
//   ({ children, className = '', size = 'md', appearance = 'primary', ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={`inline-flex  ${className}`}
//         {...props}
//       >
//         {children}
//       </div>
//     );
//   }
// );

// SplitButton.displayName = 'SplitButton';

// export default SplitButton;


import React, { forwardRef } from 'react';

interface SplitButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  appearance?: 'primary' | 'secondary' | 'warning' | 'danger';
  compact?: boolean;
}

const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  ({ children, className = '', size = 'md', appearance = 'primary', compact = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex ${compact ? 'gap-0' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SplitButton.displayName = 'SplitButton';

export default SplitButton;