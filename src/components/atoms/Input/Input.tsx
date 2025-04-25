import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "outlined" | "filled";
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      variant = "outlined",
      size = "md",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID for the input if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
    };

    // Variant classes
    const variantClasses = {
      outlined: "bg-white border border-neutral-300 focus:border-blue-500",
      filled:
        "bg-neutral-100 border border-transparent focus:bg-white focus:border-blue-500",
    };

    // Input base classes
    const inputBaseClasses = `
      rounded-md
      w-full
      transition-colors
      duration-200
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-500 
      disabled:opacity-60 
      disabled:bg-neutral-100 
      disabled:cursor-not-allowed
      ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
      ${leftIcon ? "pl-10" : ""}
      ${rightIcon ? "pr-10" : ""}
    `;

    // Width classes
    const widthClasses = fullWidth ? "w-full" : "w-auto";

    return (
      <div className={`${widthClasses} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`${inputBaseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper-text`
                  : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper-text`}
            className="mt-1 text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
