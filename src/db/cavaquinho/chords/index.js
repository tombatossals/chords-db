import C from './C/index';
import Db from './Db/index';
import D from './D/index';
import Eb from './Eb/index';
import E from './E/index';
import F from './F/index';
import Gb from './Gb/index';
import G from './G/index';
import Ab from './Ab/index';
import A from './A/index';
import Bb from './Bb/index';
import B from './B/index';
import { applyHistoricalVoicings } from '../historicalVoicings';
import { deriveSuffixVoicings } from '../deriveSuffixVoicings';

const chords = {
  C,
  Db,
  D,
  Eb,
  E,
  F,
  Gb,
  G,
  Ab,
  A,
  Bb,
  B,
};

export default deriveSuffixVoicings(applyHistoricalVoicings(chords));
