# Claim ledger

| ID | Statement | Status | Evidence / boundary |
|---|---|---|---|
| HC | Rational cycle class map surjective on every smooth complex projective variety | Open | Clay problem statement |
| R1 | Universal divisor support equivalent to HC | Classical conditional deduction | Localization, weights/coniveau, semisimplicity, induction; research/reductions.md |
| DS | Every positive-codimension rational Hodge class vanishes outside some divisor | Open | Equivalent to HC when universal |
| R2 | Smooth ample divisor supports no nonzero middle class primitive for its own polarization on a fourfold | Classical consequence | Weak/hard Lefschetz and Gysin |
| R3 | Algebraic surface detection equivalent to HC for fourfolds | Classical conditional deduction | Hodge–Riemann and Lefschetz (1,1) |
| DET | Every nonzero rational primitive Hodge class on a fourfold has an algebraic surface detector | Open | Missing geometric construction |
| F1 | Fermat character criterion | Literature | Shioda 1979 |
| F2 | Complementary-pair criterion for standard linear-cycle character span | Literature | Period computation; Braun et al. 2024 and references |
| F3 | Eleven exact character count rows | Computationally reproduced | data/fermat-fourfolds.csv; independent enumeration checks |
| F4 | Sextic dimension 1,751 and linear rank 1,001 | Reproduced literature | Braun et al., Theorem 1 |
| F5 | Sextic nonlinear cycles fill residual 750 | Independently reproduced via exact determinants and character projectors | 720 Aoki–Shioda + 30 type-3; research/geometric-certificates.md |
| F6 | Sextic witness (1,1,4,4,4,4) passes unit tests but is not complementary-paired | Exact arithmetic | test/fermat.test.mjs |
| G1 | Three complete-intersection seed determinants have support sizes 125, 20, 16 | Exact polynomial computation | Factorization and leading terms checked; sextic certificate JSON |
| G2 | Full sextic rational primitive algebraic span | Reproduction using published residue theorem and symmetry | All 1,751 ordered characters covered; no independent proof of residue theorem |
| G3 | For d divisible by 6 the three families span exactly linear rank + 360(d−4) + 30 | Derived theorem for this specific span; novelty not asserted | Mixed four-coordinate substitution, chain rule and combinatorial count; checked degrees 6–48 |
| G4 | General correspondence generation criterion | Conditional module-theoretic observation | Full multiplicities required; no universal algebra assumed |
| SING | Universal construction of singular-support detectors | Research direction, unproved | R4 |
| LEAN | Kernel-checked formal proof of general HC | Not delivered | No Lean build or claim of formal verification |

No novelty claim is made for the initial reductions or enumerations. The code implements exact arithmetic and explicit cycle-class polynomial calculations. It does not compute arbitrary Hodge classes, verify the cited period theorem itself, or settle the general conjecture.
