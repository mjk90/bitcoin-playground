import { useState } from "react";

export interface UseInputProps {
  initialValue: string;
  label?: string;
  validate?: (value: string) => string;
}

const useInput = (props: UseInputProps) => {
  const { initialValue, label = "", validate = (value: string) => "" } = props;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (event: any) => setValue(event.target.value);
  const handleValidate = () => {
    const err = validate(value);
    setError(err);
    return !err;
  };

  return {
    value,
    label,
    error,
    setValue,
    onChange: handleChange,
    validate: handleValidate
  };
};

export default useInput;