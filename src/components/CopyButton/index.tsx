import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'state/popupReducer';
import { PopupState, RootState } from 'state/types';
import { copyToClipboard } from '../../helpers';

interface CopyButtonProps {
  value: string | number;
  className?: string;
}

export const CopyButton = (props: CopyButtonProps) => {
  const dispatch = useDispatch();
  return (
    <span onClick={() => {
        copyToClipboard(props.value.toString());
        dispatch(showMessage({ message: "Value copied!", color: "purple" }));
      }}
      className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs leading-none text-white
        bg-purple-400 hover:bg-purple-500 cursor-pointer rounded-full float-right ${!!props.value ? "" : "hidden"} ${props.className}`}>
      Copy
    </span>
  )
};
