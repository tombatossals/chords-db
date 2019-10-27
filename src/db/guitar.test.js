/* global it, describe, expect */

import guitar from './guitar';
import { strChord2array, chord2midi, processString } from '../tools';

describe('Guitar Chords', () => {
  describe('Strings', () => {
    it('Should have 6 strings', () => expect(guitar.main.strings).toEqual(6));
  });

  describe('Types', () => {
    guitar.suffixes.map(suffix =>
      it(`Type suffix ${suffix} should have a description`, () =>
        expect(suffix).toBeDefined())
    );
  });

  describe(`Test Cmajor midi notes`, () => {
    it(`Should match [ 48, 52, 55, 60, 64 ]`, () => {
      const Cmajor = guitar.chords.C.find(chord => chord.suffix === 'major');
      const midiNotes = chord2midi(
        processString(Cmajor.positions[0].frets),
        guitar.tunings['standard']
      );
      const CmajorNotes = [48, 52, 55, 60, 64];
      expect(JSON.stringify(midiNotes)).toEqual(JSON.stringify(CmajorNotes));
    });
  });

  Object.keys(guitar.chords).map(key =>
    describe(`Key ${key.replace('sharp', '#')}`, () => {
      const chords = guitar.chords[key];

      it(`Should not have duplicated suffixes`, () => {
        let seen = new Set();
        const duplicates = chords.some(
          chord => seen.size === seen.add(chord.suffix).size
        );
        expect(duplicates).toBe(false);
      });

      chords.map(chord =>
        describe(`Suffix ${chord.key}${chord.suffix}`, () => {
          describe('General properties', () => {
            it(`The chord ${key}${chord.suffix} should have a defined key property`, () =>
              expect(chord.key).toEqual(key.replace('sharp', '#')));
            it(`The chord ${key}${chord.suffix} should have a defined suffix property`, () =>
              expect(chord.suffix).toBeDefined());
            it(`The chord ${key}${chord.suffix} should have a list of positions`, () =>
              expect(chord.positions).toBeInstanceOf(Array));
          });

          describe(`Positions`, () => {
            chord.positions.map((position, index) => {
              const frets = Array.isArray(position.frets)
                ? position.frets
                : strChord2array(position.frets);
              const effectiveFrets = frets.filter(f => f > 0);
              describe(`Frets`, () => {
                it(`The ${index +
                  1} position frets array should have 6 values`, () =>
                  expect(frets.length).toEqual(6));
                it(`The ${index +
                  1} position frets array should have values lower than 16`, () =>
                  expect(Math.max(...frets)).toBeLessThan(16));
                it(`The ${index +
                  1} position frets array should have at most 4 fingers of distance`, () =>
                  expect(
                    Math.max(...effectiveFrets) - Math.min(...effectiveFrets)
                  ).toBeLessThanOrEqual(guitar.main.fretsOnChord));
              });

              if (position.fingers) {
                describe(`Fingers`, () => {
                  const fingers = Array.isArray(position.fingers)
                    ? position.fingers
                    : strChord2array(position.fingers);
                  it(`The ${index +
                    1} position fingers array should have 6 values`, () =>
                    expect(fingers.length).toEqual(6));
                  it(`The ${index +
                    1} position fingers array should have values lower than 5`, () =>
                    expect(Math.max(...fingers)).toBeLessThan(5));
                  it(`The ${index +
                    1} position fingers array should have values higher or equal to 0`, () =>
                    expect(Math.min(...fingers)).toBeGreaterThanOrEqual(0));
                });
              }

              if (position.barres) {
                describe(`Barres`, () => {
                  const barres = Array.isArray(position.barres)
                    ? position.barres
                    : [position.barres];
                  barres.map(barre => {
                    it(`The position ${index +
                      1}, barre ${barre} should have frets`, () =>
                      expect(frets.indexOf(barre)).not.toEqual(-1));
                    it(`The position ${index +
                      1}, barre ${barre} should have two strings at least`, () =>
                      expect(frets.indexOf(barre)).not.toEqual(
                        frets.lastIndexOf(barre)
                      ));
                  });
                });
              }
            });
          });
        })
      );
    })
  );
});
