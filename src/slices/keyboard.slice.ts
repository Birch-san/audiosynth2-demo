import {createAction, createReducer} from "@reduxjs/toolkit";

export interface Note {
  frequency: number
}
export interface KeyboardState {
  notes: Note[],
}
function initialState(): KeyboardState {
  return {
    notes: [{
      frequency: 440
    }, {
      frequency: 880
    }, {
      frequency: 1320
    }],
  }
}

// const slice = createSlice({
//   name: 'keyboard',
//   initialState: {
//     notes: [] as Note[]
//   },
//   reducers: {
//
//   }
// })

export function eqNote(left: Note, right: Note) {
  return left.frequency === right.frequency
}

export function eqNotes(left: Note[], right: Note[]) {
  return left.length === right.length
  && left.reduce(
    (acc: boolean, leftNote: Note, index: number): boolean =>
      acc && eqNote(leftNote, right[index]),
      true)
}

export type Scale = {}

export const keyboardActions = {
  makeScale: createAction<Scale>('makeScale')
}
export const keyboardReducer = createReducer(initialState(), builder =>
  builder
    .addCase(keyboardActions.makeScale, (state, action) => {
      return state
    }))

