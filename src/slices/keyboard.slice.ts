import {createAction, createReducer} from "@reduxjs/toolkit";
import {takeIterator} from "../util/IterationUtils";

export interface Note {
  frequency: number
}
export interface KeyboardState {
  notes: Note[],
}

function* generateChromaticScale(baseFreq: number) {
  let i = 0;
  while(true) {
    yield baseFreq * Math.pow(2, i++ / 12);
  }
}

function initialState(): KeyboardState {
  // const notes: Note[] = [{
  //   frequency: 440
  // }, {
  //   frequency: 880
  // }, {
  //   frequency: 1320
  // }]
  const notes: Note[] = [...takeIterator(generateChromaticScale(220), 13)]
    .map(frequency => ({
      frequency
    }));

  return {
    notes,
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

