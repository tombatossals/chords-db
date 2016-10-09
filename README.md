# chords-db
This is a javascript database of string instruments chords. Open, free to use, easily improved with more chords. 
Contributions are welcomed, still a lot of chords (and instruments) missing. 
Use the pull request feature of Github to add your desired chords if you want to contribute.

Take a look at the chords database of an instrument to understand the schema used to register new chords.
For example, let's take a look at the Csus2 chords of guitar. We can see this information in the C/sus2.js file:

```
export default {
  key: 'D',
  suffix: 'sus2',
  positions: [{
    frets: [ 0, 3, 2, 0, -1, -1 ],
    fingers: [ 0, 3, 1, 0, 0, 0 ]
  },
  {
    frets: [ 5, 5, 7, 7, 5, -1 ],
    fingers: [ 1, 1, 4, 3, 1, 0 ],
    barres: 5
  }]
}

```

Each *position* define a new chord variation of the Dsus2 chord.
We must define the *frets* needed to obtain the chord in the respective strings.
We can define the *fingers* information for easy reading of the chord.
If the chord need to barre some string, we will define if in the *barre* field.

This information will render this two chords using an SVG renderer:

![Dsus2](https://github.com/tombatossals/react-chords/raw/master/public/img/dsus2.png "Dsus2")

I'm using this database with a react and SVG chord renderer utility, you can find it here:

[react-chords](https://tombatossals.github.io/react-chords)
