import React, { useState } from 'react';

interface DropdownProps {
  className: string;
  label?: string;
  options: Array<string | number>;
  initialValue?: number;
  onChange?: (item: any) => void;
}

export const Dropdown = (props: DropdownProps) => {
  const { className, options, initialValue = 0, label = "", onChange = (selectedData: any) => {} } = props;
  const [selectedIndex, setSelectedIndex] = useState(initialValue);
  const [opened, setOpened] = useState(false);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button type="button" aria-expanded="true" aria-haspopup="true" 
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-1.5 py-0.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer" 
          onClick={(e) => {
            e.preventDefault();
            setOpened((opened) => !opened);
          }}
        >
          {label}{options[selectedIndex]}
          <svg className={`-mr-1 ml-2 h-5 w-5 ${opened ? "transform rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${opened ? "block" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        <div className="py-1" role="none">
          {options.map((option: number | string, index: number) => 
            <a href="#" key={index} role="menuitem" className={`text-gray-700 block px-4 py-2 text-sm ${index === selectedIndex ? "font-semibold" : "font-normal"}`}
              onClick={(e) => {
                e.preventDefault();
                setOpened(false);
                setSelectedIndex(index);
                onChange(option);
              }}
            >
              {option}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
