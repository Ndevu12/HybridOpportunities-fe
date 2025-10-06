import React from "react";
import Typography from "../../atoms/Typography/Typography";

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  elevation?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
  elevation = "sm",
  border = false,
  hoverable = false,
  onClick,
  ...props
}) => {
  const elevationClasses = {
    none: "",
    sm: "shadow-card",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const borderClasses = border ? "border border-neutral-200" : "";
  const hoverClasses = hoverable
    ? "transition-all duration-300 hover:shadow-hover hover:transform hover:scale-[1.01]"
    : "";
  const cursorClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden ${elevationClasses[elevation]} ${borderClasses} ${hoverClasses} ${cursorClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-5 border-b border-neutral-100">
          {title && (
            <Typography variant="h5" weight="semibold">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body2"
              color="textSecondary"
              className={title ? "mt-1" : ""}
            >
              {subtitle}
            </Typography>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-neutral-100">{footer}</div>
      )}
    </div>
  );
};

export default Card;
