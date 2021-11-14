import React from 'react';

interface SwitchProps {
  value: string;
  label: string;
}

export const Switch = (props: SwitchProps) => {
  const { value, label } = props;

  return (
    <div className="mb-4">
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-green-300 appearance-none cursor-pointer" />
        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-green-300 cursor-pointer"></label>
      </div>
      <label className="text-xs text-gray-700">{label}</label>
    </div>
  )
}
