/* global it, describe, expect */

import cavaquinho from './cavaquinho';
import { processString } from '../tools';

describe('cavaquinho finger placement', () => {
  Object.keys(cavaquinho.chords).map((key) =>
    cavaquinho.chords[key].map((chord) =>
      chord.positions.map((position, positionIndex) => {
        if (!position.fingers) return null;

        return it(`${key} ${chord.suffix} position ${
          positionIndex + 1
        } should not reuse one finger across an open string`, () => {
          const fingerValues = processString(position.fingers);

          fingerValues.forEach((finger) => {
            if (finger === 0) return;

            const positions = fingerValues.reduce((result, value, index) => {
              if (value === finger) result.push(index);
              return result;
            }, []);

            if (positions.length < 2) return;

            expect(
              fingerValues.slice(
                positions[0],
                positions[positions.length - 1] + 1
              )
            ).not.toContain(0);
          });
        });
      })
    )
  );

  it('C minor first position assigns separate fingers around its open string', () => {
    const minor = cavaquinho.chords.C.find((chord) => chord.suffix === 'minor');
    expect(minor.positions[0]).toMatchObject({
      frets: [1, 0, 1, 1],
      fingers: '1023',
    });
    expect(minor.positions[0].barres).toBeUndefined();
    expect(minor.positions[0].capo).toBeUndefined();
  });

  it('A sus2 first position assigns separate fingers around its open string', () => {
    const sus2 = cavaquinho.chords.A.find((chord) => chord.suffix === 'sus2');
    expect(sus2.positions[0]).toMatchObject({
      frets: [2, 2, 0, 2],
      fingers: '1203',
    });
    expect(sus2.positions[0].barres).toBeUndefined();
    expect(sus2.positions[0].capo).toBeUndefined();
  });
});
