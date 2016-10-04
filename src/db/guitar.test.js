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
      const chords = guitar.chords[key]
      chords.map(chord =>
        it(`The chord ${key}${chord.suffix} should have a defined key property`, () => expect(chord.key).toEqual(key))
      )

      chords.map(chord =>
        it(`The chord ${key}${chord.suffix} should have a defined suffix property`, () => expect(chord.suffix).toBeDefined())
      )

      chords.map(chord =>
        it(`The chord ${key}${chord.suffix} should have a list of positions`, () => expect(chord.positions).toBeInstanceOf(Array))
      )
    })
  })
})
