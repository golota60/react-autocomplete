import React, { InputHTMLAttributes } from "react";
import "./TextInput.scss";

interface TextInputProps {
  className?: string;
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
}

const TextInput = ({
  className = "",
  value,
  onChange,
  placeholder = "",
}: TextInputProps) => {
  return (
    <input
      className={`generic-input ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid="generic-input"
    />
  );
};

export default TextInput;
