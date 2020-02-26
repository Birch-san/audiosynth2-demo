import React from "react";
import {Key} from "./Key";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {eqNotes, Keyboards, Note, NoteType} from "./slices/keyboard.slice";
import {globalAudio} from "./globalAudio";
import {NoteOff} from "@birch-san/audiosynth2";
import styles from "./Keyboard.module.scss"

// export interface KeyboardState {
//   notes: Note[]
// }
// export interface KeyboardAction {
//
// }
// function initialState(): KeyboardState {
//   return {
//     notes: []
//   }
// }
// const reducer: Reducer<KeyboardState, KeyboardAction> = (state: KeyboardState, action: KeyboardAction): KeyboardState => {
//   return state;
// }

export interface KeyboardProps {
  keyboard: Keyboards
}

interface NoteState {
  noteOff? : NoteOff
}

export const Keyboard: React.FC<KeyboardProps> = ({ keyboard }) => {
  // const dispatch = useDispatch()
  // const [{ notes }, dispatch] = useReducer(reducer, initialState())
  const notes = useSelector((state: RootState): Note<NoteType>[] => state.keyboard.keyboards[keyboard].notes, eqNotes)
  const baseFreq = notes.length ? notes[0].frequency : 0
  function toXPos(frequency: number) {
    return Math.log2(frequency) * 700
  }
  const xOffset = toXPos(baseFreq)
  function makeNote(note: Note<NoteType>): JSX.Element {
    const { frequency } = note
    const noteState: NoteState = {}
    function noteOn() {
      const { noteOff, gainNode } = globalAudio.voiceFactory(frequency).noteOn(globalAudio.ctx)
      noteState.noteOff = noteOff
      gainNode.connect(globalAudio.analyser)
      // console.log(noteState.activeNote)
    }
    function noteOff() {
      noteState.noteOff && noteState.noteOff()
    }
    return <Key
      style={{
        left: toXPos(frequency) - xOffset,
        top: (note.type === 'harmonic' && 100 * note.repeat) || undefined
      }}
      key={frequency}
      noteOn={noteOn}
      noteOff={noteOff}
      note={note}
    />
  }
  return (
    <div className={styles.keyboard}>
      { notes.map(makeNote) }
    </div>
  )
}
