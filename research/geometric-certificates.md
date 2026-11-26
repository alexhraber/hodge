# Geometric detectors: exact sextic certificates and a uniform extension

## Status

Independent computational reproduction of a known theorem for the Fermat sextic, and a derived constructive lower bound for every degree divisible by six. No claim of novelty relative to the Fermat-cycle literature, no claim about the integral Hodge conjecture, and no general solution for arbitrary projective varieties.

Sources: Braun, Fortin, Lopez Garcia and Villaflor Loyola, [JHEP 06 (2024) 046](https://doi.org/10.1007/JHEP06(2024)046), §§2.2–3 and equations (2.13), (2.15), (2.17); [HTML preprint](https://arxiv.org/html/2401.00470v2). The determinant-to-cycle-class theorem is Villaflor Loyola, [Periods of Complete Intersection Algebraic Cycles](https://arxiv.org/abs/1812.03964). Shioda's 1979 character criterion identifies rational Hodge eigenspaces. This work independently derives determinants from the cycle equations and verifies support; it does not reproduce the papers' proof of the period theorem.

## 1. Geometric inputs

Let $F_d=\sum_{j=0}^5 x_j^d$, $X_d=V(F_d)\subset\mathbb P^5$, $c^3=2$ with $c>0$, $\mu=\exp(\pi i/6)$, and $i=\mu^3$.

For $d=6$ take the three published complete-intersection seeds:

- $C$: $x_0-\mu x_1=x_2-\mu x_3=x_4-\mu x_5=0$.
- $S$: $x_0^2-cx_1x_2=x_1^3+x_2^3+i x_3^3=x_4-\mu x_5=0$.
- $T$: $x_0^2-cx_1x_2=x_3^2-cx_4x_5=x_1^3+x_2^3+i(x_4^3+x_5^3)=0$.

Their scheme-theoretic codimensions in projective space are three. In lexicographic orders with the selected leading variables first, the three leading monomials are coprime pure powers: $(x_0,x_2,x_4)$ for $C$, $(x_0^2,x_3^3,x_4)$ for $S$, and $(x_0^2,x_3^2,x_5^3)$ for $T$. Pairwise coprime leading monomials give a Groebner basis; the quotient has dimension three as a graded affine ring, hence dimension two projectively. This suffices for the complete-intersection cycle theorem; smoothness of these subschemes is not assumed. The fundamental cycle is taken with scheme multiplicities.

For each seed construct the complementary polynomials $g_j$ so $F_6=\sum_{j=1}^3 f_jg_j$. Three identities suffice:

$$
(u-\mu v)\sum_{j=0}^{5}u^{5-j}(\mu v)^j=u^6+v^6,
$$
$$
(u^2-cvw)(u^4+cu^2vw+c^2v^2w^2)=u^6-2v^3w^3,
$$
$$
(A+iB)(A-iB)=A^2+B^2.
$$

For $S$, choose $A=x_1^3+x_2^3$, $B=x_3^3$; for $T$ choose $A=x_1^3+x_2^3$, $B=x_4^3+x_5^3$. The cross terms cancel. The code verifies the polynomial identity before reducing modulo any ideal.

## 2. Exact class computation

Use the field $\mathbb Q(\mu,c)$, computed in the free integral coefficient basis $\mu^r c^s$, $0\le r<4$, $0\le s<3$, with relations $\mu^4=\mu^2-1$ and $c^3=2$. The basis is independent: $\mu$ has degree four and the cubic $z^3-2$ has no root in $\mathbb Q(\mu)$ (a degree-three root field cannot embed in a degree-four extension), hence the cubic remains irreducible there. Thus nonzero reduced coefficients represent genuinely nonzero complex numbers.

The primitive class of each complete intersection is represented, up to a nonzero common normalization factor, by the polynomial

$$P_Z=\det\frac{\partial(f_1,g_1,f_2,g_2,f_3,g_3)}{\partial(x_0,\ldots,x_5)}
\bmod (x_0^5,\ldots,x_5^5).$$

This is the cited complete-intersection residue theorem. The program differentiates and expands the determinant with exact integer arithmetic; it does not enter the published class polynomials as assumptions. A term $x^\beta$ indexes the character $a=\beta+\mathbf 1$ in the residue basis. Each resulting term has degree 12 before adding $\mathbf1$.

The computed seed support sizes are 125, 20 and 16, respectively. The $S$ support in the first four coordinates consists of permutations of $(1,3,4,4)$ or $(2,2,3,5)$, with a complementary pair in the last two. The $T$ support has sorted patterns $(1,2,2,4,4,5)$, $(1,1,4,4,4,4)$ and $(2,2,2,2,5,5)$. The first is linear-covered; the last two are indecomposable.

## 3. From nonzero coefficients to algebraic spanning

Let $G_d=(\mathbb Z/d)^6/\Delta$ be the diagonal automorphism group. The eigenspaces in primitive cohomology are one-dimensional and indexed by the characters $a$ with nonzero entries and zero sum modulo $d$. If a cycle class has nonzero coefficient in character $a$, applying the group algebra projector

$$e_a=\frac{1}{|G_d|}\sum_{g\in G_d}\chi_a(g)^{-1}g$$

isolates a nonzero element of that eigenspace (use the inverse action convention if the representation is written contravariantly). All translates are algebraic; the complex span of their primitive classes therefore contains the eigenspace. Permutations of coordinates transport support, so a sorted pattern certificate accounts for every ordered permutation of that pattern.

This is a rank certificate, not an assertion that a nonzero component alone spans a whole multi-dimensional space. The multiplicity-one property and the availability of the whole diagonal orbit are essential. The rational span has dimension equal to the complex dimension of its scalar extension. Moreover the full Galois-orbit projector $\sum_{a\in O}e_a$ has rational coefficients, providing a rational combination of cycle translates. On $X_d$ the nonprimitive correction is a rational multiple of the square of the hyperplane class and is algebraic.

The code records a seed and permutation witness for each covered sorted pattern. At $d=6$ every one of the 1,751 Hodge characters is covered. The contributions are 1,001 linear, 720 additional Aoki–Shioda, and 30 additional type-3. This independently reproduces the rational spanning result of Braun et al. and Shioda without searching for a large intersection matrix or importing the published list of independent cycles. It specifies an orbit-generated spanning set and rational character projections, not a selected list of 1,751 individual independent surfaces.

## 4. Uniform extension to degree $d=6k$

A full coordinate-power pullback $X_{6k}\to X_6$ provides scaled characters $ka$. More is possible by pulling back only the first four coordinates of the $S$ construction, retaining the entire degree-$d$ linear pair support.

Choose $\rho$ with $\rho^d=-1$. Use the cycles

$$S_k:\quad x_0^{2k}-cx_1^kx_2^k=0,\qquad
x_1^{3k}+x_2^{3k}+i x_3^{3k}=0,\qquad
x_4-\rho x_5=0;$$

$$T_k:\quad x_0^{2k}-cx_1^kx_2^k=0,\qquad
x_3^{2k}-cx_4^kx_5^k=0,\qquad
x_1^{3k}+x_2^{3k}+i(x_4^{3k}+x_5^{3k})=0.$$

The same factorization identities and leading-monomial arguments apply. In particular these are actual complete-intersection surfaces in $X_d$, not merely candidate Hodge tuples. For the linear factor $u-\rho v$ use the degree-$d$ geometric-series quotient; its two-by-two Jacobian determinant is

$$d\rho\sum_{j=0}^{d-2}u^{d-2-j}(\rho v)^j,$$

whose coefficients are nonzero. The chain rule applied to the first four substituted variables in $S_k$ multiplies the four-variable determinant by $k^4\prod_{j=0}^3 x_j^{k-1}$. It maps character entries to $ka_j$ in those four coordinates. A monomial killed by a sextic Jacobian generator remains killed after substitution and the chain rule, and all surviving monomials remain distinct and survive. For $T_k$ the same argument applies to all six variables, with multiplier $k^6\prod_{j=0}^5 x_j^{k-1}$. Thus the support formulas for all positive integers $k$ follow algebraically, rather than extrapolating from finite experiments.

The resulting additional $S_k$ characters are permutations of either

$$(k,3k,4k,4k,r,d-r),\qquad (2k,2k,3k,5k,r,d-r),\quad 1\le r<d.$$

Neither four-coordinate multiset is complementary-paired. Adding a complementary pair cannot make it fully complementary-paired, because its imbalance between each value and its complement is unchanged.

Count the ordered characters by two disjoint cases. If $r$ is divisible by $k$, scaling the sextic enumeration gives exactly 720. If $r$ is not divisible by $k$, exactly two entries are not multiples of $k$, so their positions are uniquely identifiable. There are $\binom62$ choices of positions, $d-6$ ordered possibilities for the pair's first entry, two disjoint four-entry multisets, and $4!/2!=12$ orderings for each. This gives $360(d-6)$ additional characters beyond the scaled sextic case. The type-3 seed adds the scaled permutations of the two indecomposable sextic patterns, 15 each; none contains a complementary pair. Consequently:

$$\boxed{\dim A_d\ \ge\ L_d+360(d-4)+30,\quad 6\mid d}$$

where $A_d$ is the primitive rational algebraic-cycle span and $L_d$ is the linear-cycle rank. Equality holds for the span generated by these three families, because all seed supports were computed and their translates cannot introduce other characters. This does not assert equality for the span of all algebraic cycles.

There is also an elementary closed form for $L_d$ for even $d$. Write $m=d/2-1$ for the number of non-self-complementary pairs of values; a balanced six-tuple has $j$ copies of the central pair $(d/2,d/2)$, and $3-j$ ordinary pairs distributed among the $m$ pair types. Summing the multinomial weights gives

$$L_d=720\left[\binom m3+\frac{m(m-1)}4+\frac m{36}+\frac{\binom m2+m/4}{2!}+\frac{m}{4!}+\frac1{6!}\right].$$

The summands correspond to central multiplicities 0, 2, 4, 6; this formula concerns the linear families only.

## 5. Reproducible outcomes

| Degree | Primitive Hodge dimension | Linear | Aoki–Shioda added | Type-3 added | Total covered | Uncovered by these families |
|---:|---:|---:|---:|---:|---:|---:|
| 6 | 1751 | 1001 | 720 | 30 | 1751 | 0 |
| 12 | 52991 | 15101 | 2880 | 30 | 18011 | 34980 |
| 18 | 264671 | 61601 | 5040 | 30 | 66671 | 198000 |
| 24 | 745211 | 159941 | 7200 | 30 | 167171 | 578040 |
| 30 | 2106431 | 329561 | 9360 | 30 | 338951 | 1767480 |
| 36 | 1923971 | 589901 | 11520 | 30 | 601451 | 1322520 |
| 42 | 5661851 | 960401 | 13680 | 30 | 974111 | 4687740 |
| 48 | 3911651 | 1460501 | 15840 | 30 | 1476371 | 2435280 |

Run:

~~~sh
node src/detector-cli.mjs
node src/detector-cli.mjs --json 6
node --test
~~~

The program checks all degree multiples of six from 6 through 48 (integer-safe counts). The mathematical support and lower-bound proof has no such finite-degree restriction. The committed JSON contains exact determinant coefficients and sorted character witnesses for the sextic, and the CSV records the expanded-degree experiment. The tests cross-check the previous enumerator for degrees 6, 12 and 18.

The open remainder is a failure of these specific constructions, never evidence against the Hodge conjecture. The next problem is to enlarge the detector algebra using other lower-degree factors and correspondences, and to establish an analogous multiplicity-one or more general generation mechanism beyond Fermat symmetry. Neither follows automatically from this experiment.
