// Exact finite enumeration for Fermat fourfolds; no floating-point approximations.
// All counts are safe integers: at d <= 50, (d-1)^6 < 2^53.
function gcd(a,b){while(b!==0){[a,b]=[b,a%b];}return a;}

function validateDegree(d){if(!Number.isSafeInteger(d)||d<2||d>50)throw new RangeError("degree must be an integer from 2 through 50");}

function units(d){validateDegree(d);return Array.from({length:d-1},(_,i)=>i+1).filter(t=>gcd(t,d)===1);}

function admissible(a,d,u=units(d)){validateDegree(d);return a.length===6&&a.every(x=>Number.isInteger(x)&&x>0&&x<d)&&u.every(t=>a.reduce((s,x)=>s+(t*x)%d,0)===3*d);}

function paired(a,d){if(a.length!==6)return false;const b=[...a].sort((x,y)=>x-y);return b.slice(0,3).every((x,i)=>x+b[5-i]===d);}

function multiplicity(a){const counts=new Map();for(const x of a)counts.set(x,(counts.get(x)||0)+1);const factorial=[1,1,2,6,24,120,720];return 720/[...counts.values()].reduce((v,k)=>v*factorial[k],1);}

function* sortedTuples(d,prefix=[],remaining=3*d,min=1){const k=6-prefix.length;if(k===0){if(remaining===0)yield prefix;return;}const lo=Math.max(min,remaining-(k-1)*(d-1));const hi=Math.min(d-1,Math.floor(remaining/k));for(let x=lo;x<=hi;x++)yield*sortedTuples(d,[...prefix,x],remaining-x,x);}

function enumerate(d){validateDegree(d);const u=units(d);let hodge=0,linear=0;const residualPatterns=[];for(const a of sortedTuples(d)){if(!admissible(a,d,u))continue;const weight=multiplicity(a);hodge+=weight;if(paired(a,d))linear+=weight;else residualPatterns.push({tuple:a,multiplicity:weight});}return {degree:d,primitiveHodge:hodge,pairedCharacters:linear,residual:hodge-linear,residualPatterns};}

export { units, admissible, paired, multiplicity, enumerate };
