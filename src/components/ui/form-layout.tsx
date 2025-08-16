import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, icon, children, ...props }, ref) => (
    <Card ref={ref} className={cn("p-6 space-y-4", className)} {...props}>
      {(title || description || icon) && (
        <div className="flex items-start gap-3">
          {icon && (
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="font-semibold text-base text-foreground mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  )
);
FormSection.displayName = "FormSection";

interface FormStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
}

const FormStep = React.forwardRef<HTMLDivElement, FormStepProps>(
  ({ className, step, title, description, children, isActive = true, isCompleted = false, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
          isCompleted 
            ? "bg-primary text-primary-foreground" 
            : isActive 
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
        )}>
          {step}
        </div>
        <div>
          <h4 className="font-semibold text-base">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className={cn(
        "ml-11 space-y-4",
        !isActive && "opacity-50 pointer-events-none"
      )}>
        {children}
      </div>
    </div>
  )
);
FormStep.displayName = "FormStep";

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, children, columns = 2, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
);
FormRow.displayName = "FormRow";

interface FormHintProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "warning" | "success" | "error";
  children: React.ReactNode;
}

const FormHint = React.forwardRef<HTMLDivElement, FormHintProps>(
  ({ className, type = "info", children, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "p-3 rounded-lg text-sm border",
        type === "info" && "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300",
        type === "warning" && "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300",
        type === "success" && "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300",
        type === "error" && "bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
);
FormHint.displayName = "FormHint";

export { FormSection, FormStep, FormRow, FormHint };