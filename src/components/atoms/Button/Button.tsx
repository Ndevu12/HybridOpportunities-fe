import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "outline" | "neutral" | "text";
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isLoading = false,
  className = "",
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-5 py-2.5 text-lg rounded-lg",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-gradient-primary text-white hover:shadow-lg focus:ring-blue-500",
    secondary:
      "bg-gradient-secondary text-white hover:shadow-lg focus:ring-purple-500",
    success:
      "bg-gradient-success text-white hover:shadow-lg focus:ring-green-500",
    danger:
      "bg-gradient-danger text-white hover:shadow-lg focus:ring-red-500",
    outline:
      "bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
    neutral:
      "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus:ring-neutral-500",
    text: "bg-transparent text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  // Width classes
  const widthClasses = isFullWidth ? "w-full" : "";

  // Disabled classes
  const disabledClasses =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
