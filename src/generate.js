import { generate } from './tools'
import db from './db'
import fs from 'fs'
import path from 'path'

const createDirIfNeeded = () =>
  fs.existsSync(path.join(__dirname, '..', 'lib'))
  ? true
  : fs.mkdir(path.join(__dirname, '..', 'lib')) && true

const generateJSON = instrument =>
  fs.writeFile(path.join(__dirname, '..', 'lib', `${instrument}.json`), JSON.stringify(generate(db[instrument])))

const processCommand = (json) =>
  json
  ? createDirIfNeeded() && Object.keys(db).map(instrument => generateJSON(instrument))
  : console.log(JSON.stringify(
    Object.assign(...Object.keys(db).map(instrument => ({ [instrument]: generate(db[instrument]) })))
  ))

const json = process.argv.length > 2 && process.argv[2] === 'json'

processCommand(json)
