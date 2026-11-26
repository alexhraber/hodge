# Hodge

A computational and theoretical investigation of the rational Hodge conjecture through algebraic geometry, arithmetic, geometric detection, and formal verification.

**Objective:** establish the conjecture or construct a rigorously verified counterexample. No general proof is claimed.

Started 25 November 2026. The first research session studies divisorial support, primitive intersection pairings, and the character decomposition of Fermat fourfolds.

## Reproduce

Requires Node.js 20+; no external packages or network access for computations.

~~~sh
node --test
node src/cli.mjs
node src/cli.mjs 6 8 20
node src/cli.mjs --json 6
~~~

The last command lists every residual sorted character pattern and its exact permutation multiplicity. The CSV can be regenerated with `node src/cli.mjs > data/fermat-fourfolds.csv`.

## Geometric certificates

The second investigation computes primitive complete-intersection cycle classes exactly, proves full sextic coverage using symmetry, and extends the nonlinear constructions to every degree divisible by six. See [geometric certificates](research/geometric-certificates.md), [detector data](data/fermat-geometric-coverage.csv), [sextic coefficient certificate](data/sextic-geometric-certificate.json), and [next research obligation](research/correspondence-obligation.md).

~~~sh
node src/detector-cli.mjs
node src/detector-cli.mjs --json 6
~~~

## Research record

- [Mathematical foundations and reductions](research/reductions.md)
- [Fermat fourfold experiment and findings](research/fermat.md)
- [Open obligations and next experiments](research/roadmap.md)
- [References and status of external results](research/references.md)
- [Claim ledger](research/claims.md)
- [Exact enumerator](src/fermat.mjs), [tests](test/fermat.test.mjs), [generated CSV](data/fermat-fourfolds.csv), [sextic residual patterns](data/sextic-residual.json)

The principal numerical result reproduces the published sextic primitive rational Hodge dimension of 1,751 and linear-cycle rank of 1,001. The 750-dimensional difference is a deficit of the linear-cycle construction, not a counterexample to the conjecture. The geometric certificate now independently reproduces the published nonlinear coverage: 720 Aoki–Shioda and 30 type-3 dimensions, using exact determinant coefficients and symmetry projectors.

The divisor-support and detection reductions are consequences of established Hodge theory. They are not claimed as original theorems, and their central universal existence statements remain open. The calculations establish algebraic spanning for the sextic using the cited residue theorem, and a uniform lower bound for multiples of six. They do not establish the algebraicity of arbitrary Hodge classes.

## Research discipline

Each claim must state its hypotheses and status. Distinguish classical results, conditional deductions, exact arithmetic, independently reproduced literature, open conjectures, and kernel-checked formal proofs. Negative experiments must remain recorded. No simulated or assumed proof receipt is admissible.

No Lean proof is claimed or included in this initial commit. See the roadmap for the proposed formalization boundary.
