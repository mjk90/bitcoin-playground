import React from 'react';
import { copyToClipboard } from '../../helpers';

interface CopyButtonProps {
  value: string;
}

export const CopyButton = (props: CopyButtonProps) =>
  <span onClick={() => copyToClipboard(props.value)}
    className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs leading-none text-white 
      bg-purple-400 hover:bg-purple-500 cursor-pointer rounded-full float-right ${!!props.value ? "" : "hidden"}`}>
    Copy
  </span>;