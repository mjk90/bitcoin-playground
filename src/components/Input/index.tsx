import React, { useEffect, useState } from 'react';
import { CopyButton } from '..';

interface InputProps {
  className?: string;
  label?: string;
  value: string | number;
  error?: string;
  copyButton?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (item: any) => void;
}

export const Input = (props: InputProps) => {
  const { value, className = "w-full mb-4", error = "", label = "", copyButton = false, readOnly = false, disabled = false, onChange = (val: any) => { } } = props;

  return (
    <div className={className}>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
        {label} {copyButton ? <CopyButton value={value} /> : ""}
      </label>
      <input
        className={`border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none ${error ? "border-red-500" : ""}`}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={`${label}...`}
        value={value}
        onChange={onChange} />
      <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
    </div>
  )
}
