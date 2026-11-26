import { enumerate } from './fermat.mjs';
const defaults = [3,4,5,6,7,8,9,10,12,18,20];
const args = process.argv.slice(2);
const json = args.includes('--json');
const degrees = args.filter(a => a !== '--json').map(Number);
const rows = (degrees.length ? degrees : defaults).map(enumerate);
if (json) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  console.log('degree,primitive_hodge,paired_characters,residual');
  for (const r of rows) console.log([r.degree,r.primitiveHodge,r.pairedCharacters,r.residual].join(','));
}
