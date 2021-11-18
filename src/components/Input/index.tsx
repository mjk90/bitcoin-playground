import React, { ReactElement, useState } from 'react';
import { CopyButton } from '..';

interface InputProps {
  className?: string;
  label?: string;
  value: string | number;
  error?: string;
  privateField?: boolean;
  copyButton?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (item: any) => void;
  labelContent?: ReactElement;
  testid?: string;
}

export const Input = (props: InputProps) => {
  const { value, className = "w-full mb-4", error = "", privateField = false, label = "", copyButton = false, readOnly = false, disabled = false, onChange = (val: any) => { }, labelContent, testid } = props;
  const [hidden, setHidden] = useState(privateField);

  return (
    <div className={className}>
      <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 flex flex-col sm:block">
        <span>{label}</span> {copyButton ? <CopyButton value={value} className="max-w-min" /> : ""}{labelContent}
        {privateField ? <span onClick={() => setHidden(!hidden)}
            className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs leading-none text-white max-w-min mt-1 sm:mt-0
              cursor-pointer rounded-full float-right ${value ? "" : "hidden"} ${hidden ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500" }`}>
            {hidden ? "Show" : "Hide"}
          </span> : ""}
      </label>
      <input type={hidden ? "password" : "text"}
        className={`border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none ${error ? "border-red-500" : ""}`}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={`${label}...`}
        value={value}
        onChange={onChange}
        data-testid={testid} />
      <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
    </div>
  )
}
