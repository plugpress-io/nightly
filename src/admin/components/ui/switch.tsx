import * as React from 'react';
import { cn } from '../../lib/utils';

const Switch = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'relative inline-flex h-6 w-11 cursor-pointer appearance-none rounded-full border border-input bg-muted transition-colors',
        'checked:border-primary checked:bg-primary',
        'after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-background after:shadow after:transition-transform',
        'checked:after:translate-x-5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Switch.displayName = 'Switch';

export { Switch };
