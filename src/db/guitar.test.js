/* global it, describe, expect */

import guitar from './guitar'

describe('Guitar Chords', () => {
  describe('Strings', () =>
    it('Should have 6 strings', () => expect(guitar.strings).toEqual(6))
  )

  describe('Types', () =>
    guitar.types.map(type =>
      it(`Type suffix ${type.suffix} should have a description`, () => expect(type.name).toBeDefined())
    )
  )

  describe('Chords', () => {
    Object.keys(guitar.chords).map(key => {
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
              it(`The chord ${key}${chord.suffix} should have a defined key property`, () => expect(chord.key).toEqual(key))
              it(`The chord ${key}${chord.suffix} should have a defined suffix property`, () => expect(chord.suffix).toBeDefined())
              it(`The chord ${key}${chord.suffix} should have a list of positions`, () => expect(chord.positions).toBeInstanceOf(Array))
            })

            describe(`Positions`, () =>
              chord.positions.map((position, index) => {
                it(`The ${index} position fingers array should have 6 values`, () => expect(position.fingers.length).toEqual(6))
                it(`The ${index} position fingers array should have values lower than 5`, () => expect(Math.max(...position.fingers)).toBeLessThan(5))
                it(`The ${index} position fingers array should have values higher or equal to 0`, () => expect(Math.min(...position.fingers)).toBeGreaterThanOrEqual(0))
              })
            )
          })
        )
      })
    })
  })
})
