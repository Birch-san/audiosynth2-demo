import {createAction, createReducer} from "@reduxjs/toolkit";
import {takeIterator} from "../util/IterationUtils";

export type NoteType
  = 'chromatic'
  | 'harmonic';
export interface NoteAbstract<T extends NoteType> {
  type: T
  frequency: number
}
export interface NoteChromatic extends NoteAbstract<'chromatic'> {
  inScale: boolean
}
export interface NoteHarmonic extends NoteAbstract<'harmonic'> {
  repeat: number
}
export type Note<T extends NoteType>
  = NoteChromatic
  | NoteHarmonic
// export interface Note {
//   type: NoteType
//   frequency: number
//   inScale: boolean
// }

export interface KeyboardState<T extends NoteType> {
  notes: Note<T>[]
}
export interface KeyboardsState {
  keyboards: Record<Keyboards, KeyboardState<NoteType>>
  // keyboards: {
  //   [key in Keyboards]: Note[]
  // }
}

export const keyboards = {
  chromEq: 'chromEq',
  harmonics: 'harmonics',
} as const;

export type Keyboards = keyof typeof keyboards;

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

function* generateChromaticScale(baseFreq: number, scaleClassifier: IterableIterator<boolean>): IterableIterator<NoteChromatic> {
  let i = 0;
  while(true) {
    const inScale = scaleClassifier.next().value;
    const frequency = baseFreq * Math.pow(2, i++ / 12)
    yield { type: 'chromatic', frequency, inScale }
  }
}

function* generateHarmonicSpans(baseFreq: number, nthHarmonic: number, repeats: number): IterableIterator<NoteHarmonic> {
  for (let repeat = 0; repeat < repeats; repeat++) {
    const spanBaseFreq = baseFreq / (repeat + 1)
    for (const { frequency } of takeIterator(generateHarmonics(spanBaseFreq), nthHarmonic)) {
      yield { type: 'harmonic', frequency, repeat }
    }
  }
}

function* generateHarmonics(baseFreq: number): IterableIterator<Pick<NoteHarmonic, 'frequency'>> {
  // yield { frequency: baseFreq, inScale: true }
  // let numerator = 2;
  // let denominator = 1;
  // while(true) {
  //   const frequency = baseFreq * numerator++ / denominator++
  //   yield { frequency, inScale: true }
  // }

  let i = 1
  while (true) {
    const frequency = baseFreq * i++
    yield { frequency }
  }
}

function initialState(): KeyboardsState {
  // const notes: Note[] = [{
  //   frequency: 440,
  //   inScale: true,
  // }, {
  //   frequency: 880,
  //   inScale: true,
  // }, {
  //   frequency: 1320,
  //   inScale: true,
  // }]
  const chromEqNotes: NoteChromatic[] = [...takeIterator(
    generateChromaticScale(
      220,
      chromaticDegreesInMajor()
    ),
    13
  )];

  // const nthHarmonic = 8
  // const repeats = 3
  // const harmonicNotes: NoteHarmonic[] = [...takeIterator(
  //   generateHarmonics(220),
  //   nthHarmonic,
  //   repeats
  // )]

  const harmonicNotes: NoteHarmonic[] = [...generateHarmonicSpans(220, 5, 3)]

  return {
    keyboards: {
      chromEq: {
        notes: chromEqNotes
      },
      harmonics: {
        notes: harmonicNotes
      }
    }
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

export function eqNote(left: Note<NoteType>, right: Note<NoteType>) {
  return left.frequency === right.frequency
}

export function eqNotes(left: Note<NoteType>[], right: Note<NoteType>[]) {
  return left.length === right.length
  && left.reduce(
    (acc: boolean, leftNote: Note<NoteType>, index: number): boolean =>
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

