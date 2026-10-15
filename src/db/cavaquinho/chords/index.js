import chords from './source';
import { applyHistoricalVoicings } from '../historicalVoicings';
import { deriveSuffixVoicings } from '../deriveSuffixVoicings';
import { normalizeSourceVoicings } from '../normalizeSourceVoicings';

const normalized = normalizeSourceVoicings(chords).chords;

export default deriveSuffixVoicings(applyHistoricalVoicings(normalized));
