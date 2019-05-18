import { AudioSynth, voiceProfiles, getScriptProcessor } from 'audiosynth2'

const ctx = new AudioContext()
const synth = new AudioSynth({ctx})
const voiceProfile = voiceProfiles.piano;
const factory = synth.makeVoiceFactory(voiceProfile);
const voice = factory(220);
const generator = voice.generate();
const arr = new Float32Array(100);
for (let i=0; i<100; i++) {
  const generated = generator.next();
  if (generated.done) {
    break;
  }
  arr[i] = generated.value;
}
getScriptProcessor(ctx, voice)

export const _ = null;