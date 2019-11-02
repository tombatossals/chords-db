const newchords = require('../chords.json');

const get_suffixes = keys => keys.map(key => (key ? key.substr(1) : 'major'));
const keys = Object.keys(newchords);

const suffixes = get_suffixes(keys);
console.log(JSON.stringify(newchords[keys[0]]));
console.log(suffixes);
