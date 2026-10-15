import cavaquinho from './cavaquinho';
import suffixes from './cavaquinho/suffixes';
import {
  chordTones,
  positionPitchClasses,
  suffixFormulaMap,
} from './cavaquinho.test-helpers';

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
    eachCavaquinhoPosition().map(
      ({ key, suffix, position, positionNumber }) => {
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
      }
    );
  });

  it('allows one defining-tone omission only for diminished sevenths', () => {
    eachCavaquinhoPosition().map(
      ({ key, suffix, position, positionNumber }) => {
        const id = [key, suffix, positionNumber].join(':');
        const formula = suffixFormulaMap[suffix];
        const actual = positionPitchClasses(position);
        const missingIntervals = formula.required.filter((interval) => {
          const tone = chordTones(key, [interval])[0];
          return !actual.includes(tone);
        });
        const validOmission =
          missingIntervals.length === 0 ||
          (suffix === 'dim7' && missingIntervals.length === 1);
        expect({ id, missingIntervals, validOmission }).toEqual({
          id,
          missingIntervals,
          validOmission: true,
        });
      }
    );
  });
});
