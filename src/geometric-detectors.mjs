// Exact complete-intersection detector certificates for Fermat fourfolds.
// Sparse monomials: six x exponents followed by powers of mu and c.
// Coefficients are BigInt; reduction is exact in the stated coefficient ring.
// See research/geometric-certificates.md for the geometric argument and limits.

function check(ok,msg){if(!ok)throw new Error(msg);}

function addTerm(p,e,b){
  if(b===0n)return;
  if(e[7]>=3){const n=[...e];const q=Math.floor(n[7]/3);n[7]%=3;return addTerm(p,n,b*2n**BigInt(q));}
  if(e[6]>=4){const a=[...e],c=[...e];a[6]-=2;c[6]-=4;addTerm(p,a,b);addTerm(p,c,-b);return;}
  const k=e.join(','),v=(p.get(k)||0n)+b;if(v===0n)p.delete(k);else p.set(k,v);
}

function term(xs=[0,0,0,0,0,0],mu=0,c=0,b=1n){const p=new Map();addTerm(p,[...xs,mu,c],b);return p;}

function constant(b){return term(undefined,0,0,BigInt(b));}

function x(i){const a=[0,0,0,0,0,0];a[i]=1;return term(a);}

function add(...ps){const out=new Map();for(const p of ps)for(const [k,v] of p)addTerm(out,k.split(',').map(Number),v);return out;}

function scale(p,b){const out=new Map();for(const [k,v] of p)addTerm(out,k.split(',').map(Number),v*BigInt(b));return out;}

function sub(p,q){return add(p,scale(q,-1));}

function mul(...ps){let out=constant(1);for(const p of ps){const next=new Map();for(const [a,b] of out)for(const [c,d] of p){const u=a.split(',').map(Number),v=c.split(',').map(Number);addTerm(next,u.map((s,i)=>s+v[i]),b*d);}out=next;}return out;}

function pow(p,n){let r=constant(1);for(let i=0;i<n;i++)r=mul(r,p);return r;}

function diff(p,i){const out=new Map();for(const [k,v] of p){const e=k.split(',').map(Number);if(e[i]){const b=e[i]--;addTerm(out,e,v*BigInt(b));}}return out;}

function jacobianDet(polys){const mat=polys.map(p=>Array.from({length:6},(_,i)=>diff(p,i)));function walk(row,cols){if(row===6)return constant(1);let r=new Map();for(let j=0;j<cols.length;j++){const c=cols[j];if(mat[row][c].size)r=add(r,scale(mul(mat[row][c],walk(row+1,cols.filter((_,k)=>k!==j))),j%2?-1:1));}return r;}return walk(0,[0,1,2,3,4,5]);}

function jacReduce(p){return new Map([...p].filter(([k])=>k.split(',').map(Number).slice(0,6).every(e=>e<=4)));}

function support(p){const s=new Map();for(const [k,v] of p){const a=k.split(',').map(Number);const key=a.slice(0,6).map(x=>x+1).join(',');if(!s.has(key))s.set(key,[]);s.get(key).push({mu:a[6],cubeRoot:a[7],coefficient:v.toString()});}return [...s].sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,coefficient])=>({character:key.split(',').map(Number),coefficient:coefficient.sort((a,b)=>a.mu-b.mu||a.cubeRoot-b.cubeRoot)}));}

function leadingExponent(p,order){return [...p.keys()].map(k=>k.split(',').map(Number).slice(0,6)).sort((a,b)=>{for(const i of order)if(a[i]!==b[i])return b[i]-a[i];return 0;})[0];}

function seeds(){const mu=term(undefined,1),c=term(undefined,0,1),i=pow(mu,3);const v=Array.from({length:6},(_,j)=>x(j));const [a,b,d,e,f,g]=v;
  const linear=(u,w)=>[sub(u,mul(mu,w)),add(...Array.from({length:6},(_,j)=>mul(pow(u,5-j),pow(mul(mu,w),j))))];
  const quad=(u,w,z)=>{const t=mul(c,w,z);return [sub(pow(u,2),t),add(pow(u,4),mul(pow(u,2),t),pow(t,2))];};
  const cubic=(A,B)=>[add(A,mul(i,B)),sub(A,mul(i,B))];
  return [{name:'linear',pairs:[linear(a,b),linear(d,e),linear(f,g)],order:[0,2,4,1,3,5]},{name:'aoki-shioda',pairs:[quad(a,b,d),cubic(add(pow(b,3),pow(d,3)),pow(e,3)),linear(f,g)],order:[0,3,4,1,2,5]},{name:'type-3',pairs:[quad(a,b,d),quad(e,f,g),cubic(add(pow(b,3),pow(d,3)),add(pow(f,3),pow(g,3)))],order:[0,3,5,1,2,4]}];
}

function baseCertificates(){const F=add(...Array.from({length:6},(_,i)=>pow(x(i),6)));return seeds().map(({name,pairs,order})=>{
  check(sub(F,add(...pairs.map(([f,g])=>mul(f,g)))).size===0,name+' factorization failed');
  const leading=pairs.map(([f])=>leadingExponent(f,order));check(leading.every(e=>e.filter(v=>v>0).length===1)&&new Set(leading.map(e=>e.findIndex(v=>v>0))).size===3,name+' leading monomials not coprime pure powers');
  const det=jacReduce(jacobianDet(pairs.flat()));check(det.size>0,name+' zero determinant');const terms=support(det);check(terms.every(t=>t.character.reduce((a,b)=>a+b,0)===18),name+' wrong residue degree');
  return {name,order,leading,terms};});}

function gcd(a,b){while(b){[a,b]=[b,a%b];}return a;}

function admissible(a,d){return a.length===6&&a.every(v=>Number.isInteger(v)&&v>0&&v<d)&&Array.from({length:d-1},(_,i)=>i+1).filter(t=>gcd(t,d)===1).every(t=>a.reduce((s,x)=>s+(t*x)%d,0)===3*d);}

function multiplicity(a){const counts=new Map();for(const x of a)counts.set(x,(counts.get(x)||0)+1);const f=[1,1,2,6,24,120,720];return 720/[...counts.values()].reduce((n,k)=>n*f[k],1);}

function paired(a,d){return a.slice(0,3).every((x,i)=>x+a[5-i]===d);}

function* sortedTuples(d,prefix=[],remaining=3*d,min=1){const k=6-prefix.length;if(k===0){if(remaining===0)yield prefix;return;}for(let x=Math.max(min,remaining-(k-1)*(d-1));x<=Math.min(d-1,Math.floor(remaining/k));x++)yield*sortedTuples(d,[...prefix,x],remaining-x,x);}

function sortCharacter(a){return [...a].sort((x,y)=>x-y);}

function coverage(d,certs=baseCertificates()){check(Number.isInteger(d)&&d>=6&&d<=48&&d%6===0,'degree must be a multiple of six from 6 through 48');const k=d/6;
  const maps=new Map();
  const remember=(name,seed)=>{const sorted=sortCharacter(seed);check(admissible(sorted,d),name+' produced non-Hodge tuple '+sorted);const key=sorted.join(',');if(!maps.has(key))maps.set(key,{character:sorted,witnesses:{}});const w=maps.get(key).witnesses;if(!w[name]){const perm=[0,1,2,3,4,5].sort((i,j)=>seed[i]-seed[j]||i-j);w[name]={seed,permutation:perm};}};
  for(let a=1;a<d;a++)for(let b=1;b<d;b++)for(let c=1;c<d;c++)remember('linear',[a,d-a,b,d-b,c,d-c]);
  for(const {character:a} of certs.find(c=>c.name==='aoki-shioda').terms)for(let r=1;r<d;r++)remember('aoki-shioda',[...a.slice(0,4).map(v=>v*k),r,d-r]);
  for(const {character:a} of certs.find(c=>c.name==='type-3').terms)remember('type-3',a.map(v=>v*k));
  let total=0,linear=0,as=0,t3=0,uncovered=0;const witnesses=[];for(const a of sortedTuples(d)){if(!admissible(a,d))continue;const n=multiplicity(a);total+=n;const w=maps.get(a.join(','))?.witnesses;if(w?.linear){check(paired(a,d),'linear misclassification');linear+=n;}else if(w?.['aoki-shioda'])as+=n;else if(w?.['type-3'])t3+=n;else uncovered+=n;if(w)witnesses.push({character:a,multiplicity:n,witnesses:w});}
  check(linear+as+t3+uncovered===total,'coverage partition');
  return {degree:d,primitiveHodge:total,linear,aokiShiodaAdditional:as,type3Additional:t3,covered:linear+as+t3,uncovered,witnesses};
}

function formula(d){check(Number.isSafeInteger(d)&&d>=6&&d%6===0&&d<=48,'degree out of implementation range');return {aokiShiodaAdditional:360*(d-4),type3Additional:30};}

export { baseCertificates, coverage, formula };
