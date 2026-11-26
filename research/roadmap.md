# Research roadmap

The unresolved general question is universal algebraic detection (equivalently, on fourfolds, primitive rational Hodge spanning). A useful experiment must advance the geometric construction rather than just recount Hodge characters.

## P0 — establish reproducible geometric certificates

1. Reproduce the published sextic 1,001 + 720 + 30 basis using explicit cycle equations and exact intersection or period computations. Preserve cycle ideals, codimensions, smoothness/singularity hypotheses, pushforward maps, and exact rank certificates.
2. Generate Galois and permutation orbit representatives of residual characters, keeping ordered character multiplicities separate from orbit counts.
3. Develop a detector coverage matrix: candidate algebraic surfaces vs. residual eigenspaces, and certify rank over a specified exact field. Compare with known bases first. A nonzero pairing is a detector; full rank is the spanning certificate.
4. Extend to degrees 8, 9, 10, 12, 18, and 20, using published Shioda inductive constructions and other known results. Do not infer an open case merely from a nonzero linear deficit.

## P1 — singular support

Find explicit singular divisor constructions with a smooth projective resolution and certified rational divisor classes whose Gysin images have nonzero primitive projections. Determine which characters these can detect in the Fermat test cases.

Track failures, including exceptional classes whose pushforward vanishes. Relate any proposed construction to coniveau and normal-function literature. The eventual goal is a construction valid for arbitrary rational primitive Hodge classes on arbitrary smooth projective fourfolds.

## P2 — formal verification

Start with the arithmetic kernel: residue-unit invariance, complementary-pair characterization, multiset weights, enumeration coverage and exact certificates. Formalize the conditional linear-algebra detection lemma next. Then inventory prerequisites for cohomology, polarizations, Gysin maps, mixed Hodge support and cycle-class functoriality.

Compare existing Lean work on the Hodge conjecture, especially the OpenAI CM-abelian statement and formalization. Do not represent imported axioms, sorry-filled statements, conditional abstract lemmas, or finite enumeration as a formal proof of the general conjecture. Pin toolchain and dependencies and retain kernel-check output when a Lean project is introduced.

## Exit criteria

A successful proof must close the universal existence obligation with all hypotheses explicit. A counterexample must be a rational Hodge class and prove it is outside the span of *all* algebraic cycle classes, not just any chosen family. Independent review and reproducible proof artifacts are required before any claim of resolution.
