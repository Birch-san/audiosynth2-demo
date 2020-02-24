import {createAction, createReducer} from "@reduxjs/toolkit";
import {takeIterator} from "../util/IterationUtils";

export interface Note {
  frequency: number
  inScale: boolean
}
export interface KeyboardState {
  notes: Note[],
}

function* chromaticDegreesInMajor(): IterableIterator<boolean> {
  while(true) {
    yield true; // 0
    yield false;
    yield true;
    yield false;
    yield true;
    yield true;
    yield false;
    yield true;
    yield false;
    yield true;
    yield false;
    yield true;
  }
}

function* generateChromaticScale(baseFreq: number, scaleClassifier: IterableIterator<boolean>): IterableIterator<Note> {
  let i = 0;
  while(true) {
    const inScale = scaleClassifier.next().value;
    const frequency = baseFreq * Math.pow(2, i++ / 12)
    yield { frequency, inScale }
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
  const notes: Note[] = [...takeIterator(
    generateChromaticScale(
      220,
      chromaticDegreesInMajor()
    ),
    13
  )];

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

