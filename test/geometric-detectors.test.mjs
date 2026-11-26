import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { baseCertificates, coverage, formula } from '../src/geometric-detectors.mjs';
import { enumerate } from '../src/fermat.mjs';

const certs=baseCertificates();
test('exact factorizations, coprime leading terms, Jacobian determinants',()=>{
  assert.deepEqual(certs.map(c=>c.terms.length),[125,20,16]);
  assert.deepEqual([...new Set(certs[1].terms.map(t=>[...t.character.slice(0,4)].sort((a,b)=>a-b).join(',')))].sort(),['1,3,4,4','2,2,3,5']);
  assert.ok(certs[2].terms.some(t=>[...t.character].sort((a,b)=>a-b).join(',')==='1,1,4,4,4,4'));
});
const expected=[{"degree":6,"primitiveHodge":1751,"linear":1001,"aokiShiodaAdditional":720,"type3Additional":30,"covered":1751,"uncovered":0},{"degree":12,"primitiveHodge":52991,"linear":15101,"aokiShiodaAdditional":2880,"type3Additional":30,"covered":18011,"uncovered":34980},{"degree":18,"primitiveHodge":264671,"linear":61601,"aokiShiodaAdditional":5040,"type3Additional":30,"covered":66671,"uncovered":198000},{"degree":24,"primitiveHodge":745211,"linear":159941,"aokiShiodaAdditional":7200,"type3Additional":30,"covered":167171,"uncovered":578040},{"degree":30,"primitiveHodge":2106431,"linear":329561,"aokiShiodaAdditional":9360,"type3Additional":30,"covered":338951,"uncovered":1767480},{"degree":36,"primitiveHodge":1923971,"linear":589901,"aokiShiodaAdditional":11520,"type3Additional":30,"covered":601451,"uncovered":1322520},{"degree":42,"primitiveHodge":5661851,"linear":960401,"aokiShiodaAdditional":13680,"type3Additional":30,"covered":974111,"uncovered":4687740},{"degree":48,"primitiveHodge":3911651,"linear":1460501,"aokiShiodaAdditional":15840,"type3Additional":30,"covered":1476371,"uncovered":2435280}];
const actual=expected.map(r=>coverage(r.degree,certs));
test('sextic certificate and full coverage',()=>{
  const c=JSON.parse(readFileSync(new URL('../data/sextic-geometric-certificate.json',import.meta.url),'utf8'));
  assert.deepEqual(c.seeds,certs);
  assert.deepEqual(c.coverage,actual[0]);
  assert.deepEqual([actual[0].linear,actual[0].aokiShiodaAdditional,actual[0].type3Additional,actual[0].uncovered],[1001,720,30,0]);
  for(const row of actual[0].witnesses)for(const w of Object.values(row.witnesses))assert.deepEqual(w.permutation.map(i=>w.seed[i]),row.character);
});
test('coverage formula, all recorded degrees and independent baseline',()=>{
  for(let i=0;i<expected.length;i++){
    const {witnesses,...r}=actual[i];
    assert.deepEqual(r,expected[i]);
    const f=formula(r.degree);
    assert.equal(r.aokiShiodaAdditional,f.aokiShiodaAdditional);
    assert.equal(r.type3Additional,f.type3Additional);
    if(r.degree<=18){
      const baseline=enumerate(r.degree);
      assert.equal(r.primitiveHodge,baseline.primitiveHodge);
      assert.equal(r.linear,baseline.pairedCharacters);
    }
  }
  const csv='degree,primitive_hodge,linear,aoki_shioda_additional,type3_additional,covered,uncovered\n'+actual.map(r=>[r.degree,r.primitiveHodge,r.linear,r.aokiShiodaAdditional,r.type3Additional,r.covered,r.uncovered].join(',')).join('\n')+'\n';
  assert.equal(readFileSync(new URL('../data/fermat-geometric-coverage.csv',import.meta.url),'utf8'),csv);
});
test('invalid degrees rejected',()=>{for(const d of [0,5,7,49,50,NaN])assert.throws(()=>coverage(d,certs));});
