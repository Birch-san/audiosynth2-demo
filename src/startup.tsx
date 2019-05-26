import { AudioSynth, voiceProfiles } from 'audiosynth2'

const ctx = new AudioContext()
const synth = new AudioSynth({ctx})
const voiceProfile = voiceProfiles.piano;
const factory = synth.makeVoiceFactory(voiceProfile);
// const voice = factory(220);
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
factory(220)
.fluent()
.playFor(1)
// .playFromFor(1, 1.5)
.perform(ctx)

factory(440)
.fluent()
.playFor(1)
.perform(ctx)

factory(660)
.fluent()
.playFor(1)
.perform(ctx)

factory(880)
.fluent()
.playFor(1)
.perform(ctx)

factory(1100)
.fluent()
.playFor(1)
.perform(ctx)

factory(1320)
.fluent()
.playFor(1)
.perform(ctx)

factory(1540)
.fluent()
.playFor(1)
.perform(ctx)

factory(1760)
.fluent()
.playFor(1)
.perform(ctx)

factory(1980)
.fluent()
.playFor(1)
.perform(ctx)

// factory(2227.5)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(2475)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(2722.5)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(2970)
// .fluent()
// .playFor(1)
// .perform(ctx)

// factory(3217.5)
// .fluent()
// .playFor(1)
// .perform(ctx)

export const _ = null;