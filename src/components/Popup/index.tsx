import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { PopupState, RootState } from "state/types";

export const Popup = () => {
  const { data: { index, message, color }, error, loading }: PopupState = useSelector((state: RootState) => state.popup);
  const [show, setShow] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if(message) {
      if (timer.current) clearTimeout(timer.current);
      setShow(true);
      timer.current = setTimeout(() => setShow(false), 2000);
    }
  }, [index, message]);

  return (
    <div className={`fixed top-4 right-4 bg-${color}-500 rounded text-white text-sm font-bold px-4 py-1 shadow ${show ? "" : "hidden"}`}>
      {message}
    </div>
  )
}
