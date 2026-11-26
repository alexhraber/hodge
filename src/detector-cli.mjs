import { baseCertificates, coverage, formula } from './geometric-detectors.mjs';
const args=process.argv.slice(2);
const degrees=args.filter(x=>x!=='--json').map(Number);
const certs=baseCertificates();
const rows=(degrees.length?degrees:[6,12,18,24,30,36,42,48]).map(d=>coverage(d,certs));
for(const r of rows){
  const f=formula(r.degree);
  if(r.aokiShiodaAdditional!==f.aokiShiodaAdditional||r.type3Additional!==f.type3Additional)throw new Error('formula disagreement');
}
if(args.includes('--json'))console.log(JSON.stringify({seeds:certs,coverage:rows},null,2));
else{
  console.log('degree,primitive_hodge,linear,aoki_shioda_additional,type3_additional,covered,uncovered');
  for(const {degree,primitiveHodge,linear,aokiShiodaAdditional,type3Additional,covered,uncovered} of rows)console.log([degree,primitiveHodge,linear,aokiShiodaAdditional,type3Additional,covered,uncovered].join(','));
}
