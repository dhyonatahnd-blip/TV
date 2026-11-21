import { TV_IMAGES } from '../config/defaults';
import { MusicTrack } from '../types/tv';

/**
 * Generates real, playable PCM WAV audio Blob URLs in memory for the built-in
 * Konkord Studio ambient tracks so HTML5 <audio> playback, seeking, duration,
 * and volume work genuinely without relying on fragile external MP3 hosts.
 */
function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function generateChordProgressionWav(
  chords: number[][],
  durationSeconds: number,
  tempoBpm: number
): string {
  const sampleRate = 22050;
  const totalSamples = Math.floor(sampleRate * durationSeconds);
  const samples = new Float32Array(totalSamples);
  const chordDuration = durationSeconds / chords.length;
  const beatSeconds = 60 / tempoBpm;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const chordIdx = Math.min(chords.length - 1, Math.floor(t / chordDuration));
    const localT = t - chordIdx * chordDuration;
    const chord = chords[chordIdx];

    // Smooth crossfade envelope per chord
    const fadeIn = Math.min(1, localT / 0.45);
    const fadeOut = Math.min(1, (chordDuration - localT) / 0.45);
    const chordEnv = fadeIn * fadeOut;

    // Warm pad harmonics
    let pad = 0;
    for (let n = 0; n < chord.length; n++) {
      const freq = chord[n];
      const detune = 1 + (n % 2 === 0 ? 0.002 : -0.002);
      pad += Math.sin(2 * Math.PI * freq * t) * 0.14;
      pad += Math.sin(2 * Math.PI * freq * detune * t) * 0.08;
      pad += Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.05;
    }

    // Subtle arpeggio pulse synced to tempo
    const step = Math.floor(t / (beatSeconds * 0.5));
    const stepT = t % (beatSeconds * 0.5);
    const arpFreq = chord[step % chord.length] * 2;
    const arpEnv = Math.exp(-stepT * 6.5) * 0.11;
    const arp = Math.sin(2 * Math.PI * arpFreq * t) * arpEnv;

    // Master fade at track boundaries
    const masterIn = Math.min(1, t / 0.8);
    const masterOut = Math.min(1, (durationSeconds - t) / 1.2);
    samples[i] = (pad * chordEnv + arp) * masterIn * masterOut;
  }

  const blob = encodeWav(samples, sampleRate);
  return URL.createObjectURL(blob);
}

export function createBuiltInStudioTracks(): MusicTrack[] {
  const horizonUrl = generateChordProgressionWav(
    [
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
      [110.0, 130.81, 164.81, 196.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 349.23], // G6
    ],
    24,
    78
  );

  const obsidianUrl = generateChordProgressionWav(
    [
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [116.54, 146.83, 174.61, 220.0], // Bbmaj7
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
      [110.0, 138.59, 164.81, 220.0],  // A7sus
    ],
    24,
    72
  );

  const midnightUrl = generateChordProgressionWav(
    [
      [164.81, 196.0, 246.94, 293.66], // Em7
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
      [196.0, 246.94, 293.66, 369.99], // Gmaj7
      [146.83, 185.0, 220.0, 293.66],  // D6
    ],
    24,
    84
  );

  return [
    {
      id: 'konkord-horizon',
      title: 'Konkord Horizon (Ambient Mix)',
      artist: 'Konkord Sound Lab',
      album: 'Virtual Lounge Sessions',
      coverImage: TV_IMAGES.musicStudio,
      sourceType: 'synth',
      src: horizonUrl,
      synthPreset: 'horizon',
    },
    {
      id: 'obsidian-lounge',
      title: 'Obsidian Lounge',
      artist: 'Konkord Sound Lab',
      album: 'Late Night Grid',
      coverImage: TV_IMAGES.heroCinema,
      sourceType: 'synth',
      src: obsidianUrl,
      synthPreset: 'obsidian',
    },
    {
      id: 'midnight-prim',
      title: 'Midnight Reflection',
      artist: 'Konkord Sound Lab',
      album: 'Second Life Acoustics',
      coverImage: TV_IMAGES.primfeedSocial,
      sourceType: 'synth',
      src: midnightUrl,
      synthPreset: 'midnight',
    },
  ];
}
