import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { enumerate, admissible, paired, multiplicity } from '../src/fermat.mjs';

function brute(d){if(d>10)throw new RangeError("brute reference limited to degree 10");const u=Array.from({length:d-1},(_,i)=>i+1).filter(t=>{for(let k=2;k<=t;k++)if(t%k===0&&d%k===0)return false;return true;});let h=0,l=0;const visit=(a)=>{if(a.length===6){if(!u.every(t=>a.reduce((s,x)=>s+(t*x)%d,0)===3*d))return;h++;const match=(b)=>b.length===0||b.slice(1).some((x,i)=>x+b[0]===d&&match(b.slice(1).filter((_,j)=>j!==i)));if(match(a))l++;return;}for(let x=1;x<d;x++)visit([...a,x]);};visit([]);return [h,l];}

const expected = [[3,20,20],[4,141,141],[5,400,400],[6,1751,1001],[7,1860,1860],[8,5881,3301],[9,8000,5120],[10,19881,7761],[12,52991,15101],[18,264671,61601],[20,346381,87661]];
for (const [d,h,l] of expected) {
  test('regression degree '+d, () => {
    const r=enumerate(d);
    assert.equal(r.primitiveHodge,h);
    assert.equal(r.pairedCharacters,l);
    assert.equal(r.residual,h-l);
    assert.equal(r.residualPatterns.reduce((s,p)=>s+p.multiplicity,0),h-l);
  });
  if (d<=10) test('independent ordered enumeration degree '+d, () => assert.deepEqual(brute(d),[h,l]));
}
test('quadric and invalid degrees', () => {
  assert.equal(enumerate(2).primitiveHodge,1);
  for(const d of [0,1,2.5,51,NaN]) assert.throws(()=>enumerate(d),RangeError);
});
test('sextic witness and conjugate', () => {
  for(const a of [[1,1,4,4,4,4],[5,5,2,2,2,2]]) {
    assert.ok(admissible(a,6));
    assert.ok(!paired(a,6));
    assert.equal(multiplicity(a),15);
  }
  assert.ok(paired([1,2,3,3,4,5],6));
  assert.ok(!admissible([0,0,3,3,6,6],6));
});
test('committed CSV equals recomputed output', () => {
  const expectedCSV = 'degree,primitive_hodge,paired_characters,residual\n'+expected.map(([d])=>{
    const r=enumerate(d);return [d,r.primitiveHodge,r.pairedCharacters,r.residual].join(',');
  }).join('\n')+'\n';
  assert.equal(readFileSync(new URL('../data/fermat-fourfolds.csv',import.meta.url),'utf8'),expectedCSV);
});
