import cavaquinho from './cavaquinho';
import suffixes from './cavaquinho/suffixes';
import {
  chordTones,
  positionPitchClasses,
  suffixFormulaMap,
} from './cavaquinho.test-helpers';

const sourceConfirmedRequiredToneOmissions = {
  'C:dim:2': [3],
  'C:dim:5': [6],
  'C:dim7:2': [3],
  'C:dim7:5': [6],
  'C:dim7:8': [9],
  'Db:dim:2': [3],
  'Db:dim:5': [6],
  'Db:dim7:2': [3],
  'Db:dim7:5': [6],
  'Db:dim7:8': [9],
  'D:dim:2': [3],
  'D:dim:5': [6],
  'D:dim7:2': [3],
  'D:dim7:5': [6],
  'D:dim7:8': [9],
  'Eb:7:1': [4],
  'Eb:dim:2': [3],
  'Eb:dim:5': [6],
  'Eb:dim7:2': [3],
  'Eb:dim7:5': [6],
  'Eb:dim7:8': [9],
  'E:dim:2': [3],
  'E:dim:5': [6],
  'E:dim7:2': [3],
  'E:dim7:5': [6],
  'E:dim7:8': [9],
  'F:dim:2': [3],
  'F:dim:5': [6],
  'F:dim7:2': [3],
  'F:dim7:5': [6],
  'F:dim7:8': [9],
  'Gb:dim:2': [3],
  'Gb:dim:5': [6],
  'Gb:dim7:2': [3],
  'Gb:dim7:5': [6],
  'Gb:dim7:8': [9],
  'G:minor:1': [3],
  'G:dim:2': [3],
  'G:dim:5': [6],
  'G:dim7:2': [3],
  'G:dim7:5': [6],
  'G:dim7:8': [9],
  'Ab:minor:1': [3],
  'Ab:m7:1': [3],
  'Ab:dim:2': [3],
  'Ab:dim:5': [6],
  'Ab:dim7:2': [3],
  'Ab:dim7:5': [6],
  'Ab:dim7:8': [9],
  'A:minor:1': [3],
  'A:dim:2': [3],
  'A:dim:5': [6],
  'A:dim7:2': [3],
  'A:dim7:5': [6],
  'A:dim7:8': [9],
  'Bb:minor:1': [3],
  'Bb:m7:1': [3],
  'Bb:dim:2': [3],
  'Bb:dim:5': [6],
  'Bb:dim7:2': [3],
  'Bb:dim7:5': [6],
  'Bb:dim7:8': [9],
  'B:minor:1': [3],
  'B:dim:2': [3],
  'B:dim:5': [6],
  'B:dim7:2': [3],
  'B:dim7:5': [6],
  'B:dim7:8': [9],
};

const eachCavaquinhoPosition = () =>
  Object.keys(cavaquinho.chords).flatMap((key) =>
    cavaquinho.chords[key].flatMap((chord) =>
      chord.positions.map((position, index) => ({
        key,
        suffix: chord.suffix,
        position,
        positionNumber: index + 1,
      }))
    )
  );

describe('cavaquinho suffix theory contracts', () => {
  it('maps every cavaquinho suffix to a theory formula', () => {
    suffixes.map((suffix) => {
      expect(suffixFormulaMap[suffix]).toBeDefined();
      expect(suffixFormulaMap[suffix].allowed).toEqual(expect.any(Array));
      expect(suffixFormulaMap[suffix].required).toEqual(expect.any(Array));
    });
  });

  it('does not contain notes outside the suffix formula', () => {
    eachCavaquinhoPosition().map(({ key, suffix, position, positionNumber }) => {
      const formula = suffixFormulaMap[suffix];
      const allowed = chordTones(key, formula.allowed);
      const actual = positionPitchClasses(position);
      const unexpected = actual.filter((note) => !allowed.includes(note));

      expect({ key, suffix, positionNumber, unexpected }).toEqual({
        key,
        suffix,
        positionNumber,
        unexpected: [],
      });
    });
  });

  it('records every missing defining tone as an explicit source exception', () => {
    const seenOmissions = {};

    eachCavaquinhoPosition().map(({ key, suffix, position, positionNumber }) => {
      const id = [key, suffix, positionNumber].join(':');
      const formula = suffixFormulaMap[suffix];
      const actual = positionPitchClasses(position);
      const missingIntervals = formula.required.filter((interval) => {
        const tone = chordTones(key, [interval])[0];
        return !actual.includes(tone);
      });
      const allowedOmissions = sourceConfirmedRequiredToneOmissions[id] || [];
      const unrecorded = missingIntervals.filter((interval) => !allowedOmissions.includes(interval));

      if (missingIntervals.length) {
        seenOmissions[id] = missingIntervals;
      }

      expect({ id, unrecorded }).toEqual({ id, unrecorded: [] });
    });

    expect(seenOmissions).toEqual(sourceConfirmedRequiredToneOmissions);
  });
});
