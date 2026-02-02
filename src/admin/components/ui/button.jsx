import * as React from 'react';
import { cn } from '../../lib/utils';

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses = 'h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const Button = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <button
    ref={ref}
    className={cn(sizeClasses, variantClasses[variant], className)}
    {...props}
  />
));

Button.displayName = 'Button';

export { Button };
