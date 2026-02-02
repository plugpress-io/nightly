import * as React from 'react';
import { cn } from '../../lib/utils';

type PageShellProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
};

export const PageShell = ({ title, description, className, children, ...props }: PageShellProps) => (
  <section className={cn('space-y-6', className)} {...props}>
    <header className="space-y-1">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </header>
    {children}
  </section>
);
