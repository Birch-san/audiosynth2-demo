import React, { useRef, useLayoutEffect, useReducer, useEffect, useState } from 'react';
import { useRaf } from 'react-use'

import { AudioSynth, voiceProfiles } from 'audiosynth2'

// const ctx = new AudioContext()
// const synth = new AudioSynth({ctx})
// const voiceProfile = voiceProfiles.piano;
// const factory = synth.makeVoiceFactory(voiceProfile);
// // const voice = factory(220);
// // const generator = voice.generate(ctx.currentTime);
// // const arr = new Float32Array(100);
// // for (let i=0; i<100; i++) {
// //   const generated = generator.next();
// //   if (generated.done) {
// //     break;
// //   }
// //   arr[i] = generated.value;
// // }
// // getScriptProcessor(ctx, voice)
// // const activeVoice = voice.noteOn(ctx);
// // setTimeout(() => activeVoice.noteOff(), 2000)
// // voice.playFor(ctx, 1)
// // voice.playInFor(ctx, 1, 1)
// // voice.after(1, voice.playFor.bind(voice, ctx, 1))
// factory(220)
// .fluent()
// .playFor(1)
// // .playFromFor(1, 1.5)
// .perform(ctx)

// factory(440)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(660)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(880)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(1100)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(1320)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(1540)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(1760)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(1980)
// .fluent()
// .playFor(1)
// .perform(ctx)

// // factory(2227.5)
// // .fluent()
// // .playFor(1)
// // .perform(ctx)

// // factory(2475)
// // .fluent()
// // .playFor(1)
// // .perform(ctx)

// // factory(2722.5)
// // .fluent()
// // .playFor(1)
// // .perform(ctx)

// // factory(2970)
// // .fluent()
// // .playFor(1)
// // .perform(ctx)

// // factory(3217.5)
// // .fluent()
// // .playFor(1)
// // .perform(ctx)

// const [w, h]: [number, number] = [512, 400]

// interface NewSamples {
    
// }

const newSamplesReducer: React.Reducer<number[], number[]>
= (prevState: number[], action: number[]): number[] => {
    return prevState
}

interface Faves {
    ctx: AudioContext
    // synth: AudioSynth
    // factory: VoiceFactory
    gainNode: GainNode
    analyser: AnalyserNode
}

// const VisualDumb: React.FC<VisualProps> = ({ width, height }) => {
// }

// export interface VisualProps2 extends VisualProps {
//     analyser: AnalyserNode
// }

// const Visual2: React.FC<VisualProps2> = ({ width, height, analyser }) => {
//     // const [samples, newSamples] = useReducer(newSamplesReducer, [])
//     const canvasRef = useRef<HTMLCanvasElement>(null)

//     useLayoutEffect(() => {
//         const canvas = canvasRef.current
//         if (!canvas) {
//             return
//         }
//         const ctx2d = canvas.getContext('2d')
//         if (!ctx2d) {
//             return
//         }
//         ctx2d.clearRect(0, 0, width, height)
//         samples.forEach((sample: number) => {

//         })
//     })

//     return (
//         <canvas ref={canvasRef} width={width} height={height}></canvas>
//     )
// }

// type AnyCallback = (...args: any[]) => void
type AnyCallback = (...args: any[]) => void
/** @see {@link https://github.com/facebook/react/issues/14195} */
const useAnimationFrame = (callback: AnyCallback) => {
    const callbackRef = useRef<AnyCallback>(callback);
    useLayoutEffect(
      () => callbackRef.current = callback,
      [callback]
    );
  
    const loop: AnyCallback = () => {
      frameRef.current = requestAnimationFrame(loop)
      callbackRef.current()
    };
  
    const frameRef = useRef<number>()
    useLayoutEffect(() => {
      frameRef.current = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(frameRef.current!)
    }, [])
  };


export interface VisualProps {
    width: number
    height: number
}

interface Analysis {
    analyser: AnalyserNode
    buffer: Uint8Array
}

const Visual: React.FC<VisualProps> = ({ width, height }) => {
    // const [faves, setFaves] = useState<Faves|null>(null)
    // const [analyser, setAnalyser] = useState<AnalyserNode|null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctx2dRef = useRef<CanvasRenderingContext2D>()
    const analysisRef = useRef<Analysis>()
    // const elapsed = useRaf()

    // runs just once
    useEffect(() => {
        const ctx = new AudioContext()
        const analyser = ctx.createAnalyser()
        analyser.connect(ctx.destination)
        const synth = new AudioSynth({ctx})
        const voiceProfile = voiceProfiles.piano
        const factory = synth.makeVoiceFactory(voiceProfile)
        const { noteOff, gainNode } = factory(220).noteOn(ctx)
        gainNode.connect(analyser)
        setTimeout(noteOff, 1000)

        analysisRef.current = {
            analyser,
            buffer: new Uint8Array(analyser.frequencyBinCount)
        }


        // setAnalyser(analyser)
        // requestAnimationFrame()
        // factory(220)
        // .fluent()
        // .playFor(1)
        // .perform(ctx)
        // setFaves({
        //     ctx,
        //     synth,
        //     factory,
        // })
        // setFaves({
        //     ctx,
        //     gainNode,
        //     analyser,
        // })
    }, [])

    useAnimationFrame(() => {
        const ctx2d = ctx2dRef.current
        if (!ctx2d) {
            return
        }
        if (!analysisRef.current) {
            return
        }
        const { analyser, buffer } = analysisRef.current
        analyser.getByteTimeDomainData(buffer)
        ctx2d.clearRect(0, 0, width, height)

        // ctx2d.fillStyle = 'rgb(200, 200, 200)';
        // ctx2d.fillRect(0, 0, width, height);

        ctx2d.lineWidth = 2;
        ctx2d.strokeStyle = 'rgb(0, 0, 0)';

        const sliceWidth = width * 1.0 / buffer.length;

        ctx2d.beginPath()

        buffer.forEach((sample: number, ix: number) => {
            const v = sample / 128.0
            const y = v * height / 2;
            const x = sliceWidth * ix

            if(ix) {
                ctx2d.lineTo(x, y)
            } else {
                ctx2d.moveTo(x, y)
            }
        })

        ctx2d.lineTo(width, height/2);
        ctx2d.stroke();
    })

    useEffect(() => {
        const canvas = canvasRef.current!
        ctx2dRef.current = canvas.getContext('2d') || undefined
    }, [])

    // useEffect(() => {
    //     if (!faves) {
    //         return
    //     }
    //     console.log(faves)
    // })

    // if (!analyser) {
    //     return
    // }

    return (
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    )
}

export default Visual
// export const _ = null;