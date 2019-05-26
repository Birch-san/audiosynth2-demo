import { AudioSynth, voiceProfiles } from 'audiosynth2'

const ctx = new AudioContext()
const synth = new AudioSynth({ctx})
const voiceProfile = voiceProfiles.piano;
const factory = synth.makeVoiceFactory(voiceProfile);
const voice = factory(220);
// const generator = voice.generate(ctx.currentTime);
// const arr = new Float32Array(100);
// for (let i=0; i<100; i++) {
//   const generated = generator.next();
//   if (generated.done) {
//     break;
//   }
//   arr[i] = generated.value;
// }
// getScriptProcessor(ctx, voice)
// const activeVoice = voice.noteOn(ctx);
// setTimeout(() => activeVoice.noteOff(), 2000)
// voice.playFor(ctx, 1)
// voice.playInFor(ctx, 1, 1)
// voice.after(1, voice.playFor.bind(voice, ctx, 1))
voice.fluent()
.playFor(1)
.playFromFor(1, 1)
.perform(ctx)

export const _ = null;