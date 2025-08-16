import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface NumericInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
  prefix?: string;
  suffix?: string;
  allowDecimal?: boolean;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    min = 0, 
    max, 
    step = 1, 
    showControls = false,
    prefix,
    suffix,
    allowDecimal = true,
    ...props 
  }, ref) => {
    
    const handleIncrement = () => {
      const newValue = value + step;
      if (!max || newValue <= max) {
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      const newValue = value - step;
      if (newValue >= min) {
        onChange(newValue);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (allowDecimal) {
        const numericValue = parseFloat(inputValue) || 0;
        onChange(numericValue);
      } else {
        const numericValue = parseInt(inputValue) || 0;
        onChange(numericValue);
      }
    };

    if (showControls) {
      return (
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={handleDecrement}
            disabled={value <= min}
            className="h-10 w-10 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            {prefix && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {prefix}
              </span>
            )}
            <Input
              ref={ref}
              type="number"
              value={value}
              onChange={handleInputChange}
              className={cn(
                "text-center",
                prefix && "pl-8",
                suffix && "pr-8",
                className
              )}
              step={allowDecimal ? "0.01" : "1"}
              min={min}
              max={max}
              {...props}
            />
            {suffix && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {suffix}
              </span>
            )}
          </div>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={handleIncrement}
            disabled={max !== undefined && value >= max}
            className="h-10 w-10 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          ref={ref}
          type="number"
          value={value}
          onChange={handleInputChange}
          className={cn(
            prefix && "pl-8",
            suffix && "pr-8",
            className
          )}
          step={allowDecimal ? "0.01" : "1"}
          min={min}
          max={max}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
NumericInput.displayName = "NumericInput";

interface ButtonGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; }[];
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, value, onValueChange, options, variant = "outline", size = "sm", ...props }, ref) => (
    <div ref={ref} className={cn("grid gap-2", className)} {...props}>
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? "default" : variant}
          size={size}
          onClick={() => onValueChange(option.value)}
          className="text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
);
ButtonGroup.displayName = "ButtonGroup";

export { NumericInput, ButtonGroup };