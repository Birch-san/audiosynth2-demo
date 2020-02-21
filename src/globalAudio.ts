import {AudioSynth, VoiceFactory, voiceProfiles} from "@birch-san/audiosynth2";

export interface GlobalAudio {
  ctx: AudioContext,
  analyser: AnalyserNode,
  synth: AudioSynth,
  voiceFactory: VoiceFactory
}

function initGlobalAudio(): GlobalAudio {
  const ctx = new AudioContext()

  const analyser = ctx.createAnalyser()
  analyser.connect(ctx.destination)

  /** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode} */
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-50, ctx.currentTime);
  compressor.knee.setValueAtTime(40, ctx.currentTime);
  compressor.ratio.setValueAtTime(12, ctx.currentTime);
  compressor.attack.setValueAtTime(0, ctx.currentTime);
  compressor.release.setValueAtTime(0.25, ctx.currentTime);
  compressor.connect(analyser)

  const synth = new AudioSynth({ctx})
  const voiceProfile = voiceProfiles.piano
  const voiceFactory = synth.makeVoiceFactory(voiceProfile)

  return {
    ctx,
    analyser,
    synth,
    voiceFactory
  }
}

export const globalAudio = initGlobalAudio();
