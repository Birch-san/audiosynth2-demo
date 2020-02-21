import React from "react";
import {Key} from "./Key";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {eqNotes, Note} from "./slices/keyboard.slice";
import {globalAudio} from "./globalAudio";
import {NoteOff} from "@birch-san/audiosynth2";

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

// export interface KeyboardProps {
//   notes: Note[]
// }

interface NoteState {
  noteOff? : NoteOff
}

export const Keyboard: React.FC = () => {
  // const dispatch = useDispatch()
  // const [{ notes }, dispatch] = useReducer(reducer, initialState())
  const notes = useSelector((state: RootState): Note[] => state.keyboard.notes, eqNotes)
  function makeNote(note: Note): JSX.Element {
    const { frequency } = note
    const noteState: NoteState = {}
    const noteOn = () => {
      const { noteOff, gainNode } = globalAudio.voiceFactory(frequency).noteOn(globalAudio.ctx)
      noteState.noteOff = noteOff
      gainNode.connect(globalAudio.analyser)
      // console.log(noteState.activeNote)
    }
    const noteOff = () => {
      noteState.noteOff && noteState.noteOff()
    }
    return <Key key={frequency} noteOn={noteOn} noteOff={noteOff} note={note}/>
  }
  return (
    <ul>
      { notes.map(makeNote) }
    </ul>
  )
}
