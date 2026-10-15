import { buildCavaquinhoVoicingAudit } from '../src/db/cavaquinho/voicingAudit';

process.stdout.write(
  `${JSON.stringify(buildCavaquinhoVoicingAudit(), null, 2)}\n`
);
