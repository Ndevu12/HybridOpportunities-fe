import React from "react";

export interface BadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  rounded?: "full" | "md";
}

const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  rounded = "full",
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-red-100 text-red-800",
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark",
    error: "bg-error-light text-error-dark",
    neutral: "bg-neutral-100 text-neutral-800",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  // Rounded classes
  const roundedClasses = {
    full: "rounded-full",
    md: "rounded-md",
  };

  return (
    <span
      className={`inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
