import React from "react";

export interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption";
  component?: React.ElementType;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "text"
    | "textSecondary"
    | "textDisabled";
  align?: "left" | "center" | "right";
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  children: React.ReactNode;
  className?: string;
  gutterBottom?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  component,
  color = "text",
  align = "left",
  weight = "regular",
  children,
  className = "",
  gutterBottom = false,
  ...props
}) => {
  const variantMap: Record<
    string,
    { element: React.ElementType; classes: string }
  > = {
    h1: { element: "h1", classes: "text-4xl md:text-5xl" },
    h2: { element: "h2", classes: "text-3xl md:text-4xl" },
    h3: { element: "h3", classes: "text-2xl md:text-3xl" },
    h4: { element: "h4", classes: "text-xl md:text-2xl" },
    h5: { element: "h5", classes: "text-lg md:text-xl" },
    h6: { element: "h6", classes: "text-base md:text-lg" },
    subtitle1: { element: "h6", classes: "text-lg" },
    subtitle2: { element: "h6", classes: "text-base" },
    body1: { element: "p", classes: "text-base" },
    body2: { element: "p", classes: "text-sm" },
    caption: { element: "span", classes: "text-xs" },
  };

  const colorMap: Record<string, string> = {
    primary: "text-blue-600",
    secondary: "text-red-600",
    error: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
    text: "text-neutral-900",
    textSecondary: "text-neutral-600",
    textDisabled: "text-neutral-400",
  };

  const weightMap: Record<string, string> = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const alignMap: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Component = component || variantMap[variant].element;
  const gutterBottomClass = gutterBottom ? "mb-4" : "";

  return (
    <Component
      className={`${variantMap[variant].classes} ${colorMap[color]} ${weightMap[weight]} ${alignMap[align]} ${gutterBottomClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
