import React from "react";

const ChangeCursor = (
  text?: string,
  color?: string,
  size?: string,
  textColor?: string
) => {
  const getCursor = document.getElementById("moving_cursor");

  if (getCursor !== undefined && getCursor !== null) {
    getCursor?.style.setProperty(`--mv-color`, `${color}`);
    getCursor?.style.setProperty(`--text-color`, `${textColor}`);
    getCursor?.style.setProperty(`--size`, `${size}`);
    getCursor.innerHTML = `<span class="mv_text">${text}</span>`;
  }
  return;
};

const ResetCursor = () => {
  const getCursor = document.getElementById("moving_cursor");
  if (getCursor !== undefined && getCursor !== null) {
    getCursor?.style.removeProperty(`--mv-color`);
    getCursor?.style.removeProperty(`--size`);
    getCursor.innerHTML = ``;
  }
  return;
};

export { ChangeCursor, ResetCursor };
