/* global it, describe, expect */

import guitar from './guitar'
import { strChord2array } from '../tools'

describe('Guitar Chords', () => {
  describe('Strings', () =>
    it('Should have 6 strings', () => expect(guitar.main.strings).toEqual(6))
  )

  describe('Types', () =>
    guitar.types.map(type =>
      it(`Type suffix ${type.suffix} should have a description`, () => expect(type.name).toBeDefined())
    )
  )

  Object.keys(guitar.chords).map(key =>
    describe(`Key ${key} chords`, () => {
      const chords = guitar.chords[key]

      it(`Should not have duplicated suffixes`, () => {
        let seen = new Set()
        const duplicates = chords.some(chord => seen.size === seen.add(chord.suffix).size)
        expect(duplicates).toBe(false)
      })

      chords.map(chord =>
        describe(`Chord ${chord.key}${chord.suffix}`, () => {
          describe('General properties', () => {
            it(`The chord ${key}${chord.suffix} should have a defined key property`, () => expect(chord.key).toEqual(key.replace('sharp', '#')))
            it(`The chord ${key}${chord.suffix} should have a defined suffix property`, () => expect(chord.suffix).toBeDefined())
            it(`The chord ${key}${chord.suffix} should have a list of positions`, () => expect(chord.positions).toBeInstanceOf(Array))
          })

          describe(`Positions`, () =>
            chord.positions.map((position, index) => {
              const frets = Array.isArray(position.frets) ? position.frets : strChord2array(position.frets)
              const effectiveFrets = frets.filter(f => f > 0)
              describe(`Frets`, () => {
                it(`The ${index + 1} position frets array should have 6 values`, () => expect(frets.length).toEqual(6))
                it(`The ${index + 1} position frets array should have values lower than 16`, () => expect(Math.max(...frets)).toBeLessThan(16))
                it(`The ${index + 1} position frets array should have at most 4 fingers of distance`, () => expect(Math.max(...effectiveFrets) - Math.min(...effectiveFrets)).toBeLessThan(5))
              })

              if (position.fingers) {
                describe(`Fingers`, () => {
                  const fingers = Array.isArray(position.fingers) ? position.fingers : strChord2array(position.fingers)
                  it(`The ${index + 1} position fingers array should have 6 values`, () => expect(fingers.length).toEqual(6))
                  it(`The ${index + 1} position fingers array should have values lower than 5`, () => expect(Math.max(...fingers)).toBeLessThan(5))
                  it(`The ${index + 1} position fingers array should have values higher or equal to 0`, () => expect(Math.min(...fingers)).toBeGreaterThanOrEqual(0))
                })
              }

              if (position.barres) {
                describe(`Barres`, () => {
                  const barres = Array.isArray(position.barres) ? position.barres : [ position.barres ]
                  barres.map(barre => {
                    it(`The barre ${barre} should have frets`, () => expect(frets.indexOf(barre)).not.toEqual(-1))
                    it(`The barre ${barre} should have two strings at least`, () => expect(frets.indexOf(barre)).not.toEqual(frets.lastIndexOf(barre)))
                  })
                })
              }
            })
          )
        })
      )
    })
  )
})
