/* global describe, expect, it */

import {
  classifyVoicing,
  getPlayedMidi,
  isReusableVoicing,
} from './chordTheory';

describe('cavaquinho chord theory', () => {
  it('classifies a complete augmented voicing', () => {
    const position = { frets: [5, 4, 0, 1] };
    const analysis = classifyVoicing(position, 'G', 'aug');

    expect(analysis.classification).toEqual('complete');
    expect(analysis.additions).toEqual([]);
    expect(analysis.omissions).toEqual([]);
  });

  it('accepts a valid incomplete voicing with every essential tone', () => {
    const position = { frets: [5, 4, 5, 2] };
    const analysis = classifyVoicing(position, 'G', '69');

    expect(analysis.classification).toEqual('incomplete');
    expect(analysis.omissions).toEqual([9, 2]);
    expect(analysis.missingEssential).toEqual([]);
    expect(isReusableVoicing(position, 'G', '69')).toEqual(true);
  });

  it('rejects a voicing with an additional pitch class', () => {
    const position = { frets: [1, 1, 1, 1] };
    const analysis = classifyVoicing(position, 'C', 'dim');

    expect(analysis.classification).toEqual('additional');
    expect(analysis.additions).toEqual([8]);
    expect(isReusableVoicing(position, 'C', 'dim')).toEqual(false);
  });

  it('classifies a diminished seventh with one omitted tone as incomplete', () => {
    const analysis = classifyVoicing({ frets: [1, 2, 7, -1] }, 'C', 'dim7');

    expect(analysis.classification).toEqual('incomplete');
    expect(analysis.omissions).toEqual([0]);
    expect(analysis.additions).toEqual([]);
  });

  it('preserves MIDI pitches for a physical position', () => {
    expect(getPlayedMidi({ frets: [5, 4, 0, 1] })).toEqual([55, 59, 59, 63]);
  });
});
