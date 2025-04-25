import React, { useState } from "react";
import Input, { InputProps } from "../../atoms/Input/Input";
import Icon from "../../atoms/Icon/Icon";

export interface FormFieldProps extends Omit<InputProps, "rightIcon"> {
  showPasswordToggle?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  type = "text",
  showPasswordToggle = false,
  showClearButton = false,
  onClear,
  value = "",
  onChange,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  // Password visibility toggle handler
  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  // Only show password toggle for password fields
  const passwordToggle =
    type === "password" && showPasswordToggle ? (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="focus:outline-none"
        aria-label={
          inputType === "password" ? "Show password" : "Hide password"
        }
      >
        <Icon
          name={inputType === "password" ? "visibility" : "visibility_off"}
          color="neutral"
        />
      </button>
    ) : null;

  // Clear button
  const clearButton =
    showClearButton && value && onClear ? (
      <button
        type="button"
        onClick={onClear}
        className="focus:outline-none"
        aria-label="Clear input"
      >
        <Icon name="close" color="neutral" />
      </button>
    ) : null;

  // Combine both icons if needed
  const rightIcon =
    passwordToggle || clearButton ? (
      <div className="flex items-center space-x-1">
        {clearButton}
        {passwordToggle}
      </div>
    ) : undefined;

  return (
    <Input
      type={inputType}
      value={value}
      onChange={onChange}
      rightIcon={rightIcon}
      {...props}
    />
  );
};

export default FormField;
