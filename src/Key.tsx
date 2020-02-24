import React, {CSSProperties, useState} from "react";
import {Note} from "./slices/keyboard.slice";
import styles from "./Key.module.scss"

export interface KeyProps {
  note: Note
  noteOn: () => void
  noteOff: () => void
  style?: CSSProperties
}

export const Key: React.FC<KeyProps> = ({ style, note, noteOn, noteOff }) => {
  const [depressed, setDepressed] = useState(false)
  function noteOnAndDepress() {
    setDepressed(true)
    return noteOn()
  }
  function noteOffAndRelease() {
    setDepressed(false)
    return noteOff()
  }
  function dragMouseOver(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (event.buttons === 1) {
      noteOnAndDepress();
    }
  }
  function formatNote(frequency: number) {
    return frequency.toFixed(0)
  }
  return (
    <button
      className={`${styles.key} ${depressed ? styles.depressed : ''}`}
      style={style}
      onMouseDown={noteOnAndDepress}
      onMouseOut={noteOffAndRelease}
      onMouseUp={noteOffAndRelease}
      onMouseOver={dragMouseOver}
    >{formatNote(note.frequency)}</button>
  )
}
