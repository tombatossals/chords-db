import { generate } from './tools';
import db from './db';
import fs from 'fs';
import path from 'path';

const createDirIfNeeded = () =>
  fs.existsSync(path.join(__dirname, '..', 'lib')) ||
  fs.mkdirSync(path.join(__dirname, '..', 'lib'));

const generateJSON = instrument =>
  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', `${instrument}.json`),
    JSON.stringify(generate(db[instrument]))
  );

const prettyObjectToJSON = obj => JSON.stringify(obj, null, 4);

const getInstrumentsDB = () =>
  Object.assign(
    ...Object.keys(db).map(instrument => ({
      [instrument]: generate(db[instrument])
    }))
  );

const getNumberOfPositions = suffixes =>
  suffixes.reduce((sum, suffix) => sum + suffix.positions.length, 0);

const getNumberOfChords = chords =>
  Object.keys(chords).reduce(
    (sum, key) => sum + getNumberOfPositions(chords[key]),
    0
  );

const generateIndex = db => {
  fs.writeFileSync(
    path.join(__dirname, '..', 'lib', `instruments.json`),
    JSON.stringify(
      Object.assign(
        ...Object.keys(db).map(instrument => ({
          [instrument]: Object.assign(db[instrument].main, {
            numberOfChords: getNumberOfChords(db[instrument].chords)
          })
        }))
      )
    )
  );
  return true;
};

const processCommand = json =>
  json
    ? createDirIfNeeded() &&
      generateIndex(db) &&
      Object.keys(db).map(instrument => generateJSON(instrument))
    : console.log(prettyObjectToJSON(getInstrumentsDB()));

const json = process.argv.length > 2 && process.argv[2] === 'json';

processCommand(json);
