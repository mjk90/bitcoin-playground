import { useState } from "react";

export interface UseInputProps {
  value: string | number;
  label?: string;
  onChange?: (value: string) => void;
  validate?: (value: string | number) => string;
}

const useInput = (props: UseInputProps) => {
  const { value, label = "", onChange = (value: string) => {}, validate = (value: string | number) => "" } = props;
  const [error, setError] = useState("");

  const handleValidate = () => {
    const err = validate(value);
    setError(err);
    return !err;
  };

  return {
    value,
    label,
    error,
    onChange,
    validate: handleValidate
  };
};

export default useInput;