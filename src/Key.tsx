import React, {CSSProperties} from "react";
import {Note} from "./slices/keyboard.slice";
import styles from "./Key.module.scss"

export interface KeyProps {
  note: Note
  noteOn: () => void
  noteOff: () => void
  style?: CSSProperties
}

export const Key: React.FC<KeyProps> = ({ style, note, noteOn, noteOff }) => {
  function dragMouseOver(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (event.buttons === 1) {
      noteOn();
    }
  }
  function formatNote(frequency: number) {
    return frequency.toFixed(0)
  }
  return (
    <div className={styles.key} style={style}>
        <button onMouseDown={noteOn} onMouseOut={noteOff} onMouseOver={dragMouseOver}>{formatNote(note.frequency)}</button>
    </div>
  )
}
