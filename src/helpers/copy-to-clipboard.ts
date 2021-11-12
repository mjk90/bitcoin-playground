const createHiddenTextArea = (text: string): HTMLTextAreaElement => {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return textArea;
}

export const copyToClipboard = (text: string): boolean => {
  let result: boolean;
  let textArea = createHiddenTextArea(text);

  try {
      result = document.execCommand('copy');
  } catch (err) {
      console.log("Could not copy text", err);
      result = false;
  }
  
  document.body.removeChild(textArea)
  return result;
};
