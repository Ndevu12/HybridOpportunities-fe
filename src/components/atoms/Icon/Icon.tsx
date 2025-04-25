import React from "react";

export interface IconProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "neutral"
    | "white"
    | "inherit";
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  color = "inherit",
  className = "",
  ...props
}) => {
  // Size classes
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Color classes
  const colorMap = {
    primary: "text-blue-600",
    secondary: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    neutral: "text-neutral-600",
    white: "text-white",
    inherit: "",
  };

  return (
    <span
      className={`material-symbols-outlined align-middle ${sizeMap[size]} ${colorMap[color]} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
};

export default Icon;
