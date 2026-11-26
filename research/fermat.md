# Fermat fourfolds: exact arithmetic experiment

Consider the smooth complex Fermat hypersurface

$$X_d=\{x_0^d+\cdots+x_5^d=0\}\subset\mathbb P^5,\quad d\ge2.$$

## Character criterion

The diagonal roots-of-unity action splits primitive cohomology over a cyclotomic splitting field into one-dimensional character eigenspaces indexed by ordered tuples
$a=(a_0,\ldots,a_5)\in\{1,\ldots,d-1\}^6$ with $\sum a_i=0\bmod d$.

The Hodge type is determined by the sum of least positive residues; a rational Hodge subspace requires the entire Galois orbit to have type $(2,2)$. Thus the rational primitive Hodge dimension equals the number of characters for which

$$\sum_{i=0}^5 (t a_i\bmod d)=3d\quad\forall t\in(\mathbb Z/d\mathbb Z)^\times.$$

This is a count of ordered characters, not a count of Galois orbits. See Shioda (1979).

For the standard linear planes obtained by pairing the six coordinates and imposing equations $x_i=\zeta x_j$, $\zeta^d=-1$, the character criterion for their primitive span is that the entries can be grouped into three pairs summing to $d$. Indeed, the character-period formula vanishes off such pairings and is nonzero on the compatible characters; the diagonal group translates isolate each contributing eigenspace. This is the linear-cycle interpretation from the literature, not an independently implemented period or intersection-matrix calculation. In particular we label the software output "paired characters."

For sorted tuples, complementary pairing is equivalent to $a_i+a_{5-i}=d$ for $i=0,1,2$: the minimum must pair with the maximum and one can induct on the remaining multiset. Such tuples automatically pass every unit test. The sorted enumeration weights each pattern by $6!/\prod_v m_v!$ to recover the ordered count, where $m_v$ is its multiplicity.

## Results

| Degree | Primitive rational Hodge dimension | Paired characters | Residual |
|--:|--:|--:|--:|
| 3 | 20 | 20 | 0 |
| 4 | 141 | 141 | 0 |
| 5 | 400 | 400 | 0 |
| 6 | 1751 | 1001 | 750 |
| 7 | 1860 | 1860 | 0 |
| 8 | 5881 | 3301 | 2580 |
| 9 | 8000 | 5120 | 2880 |
| 10 | 19881 | 7761 | 12120 |
| 12 | 52991 | 15101 | 37890 |
| 18 | 264671 | 61601 | 203070 |
| 20 | 346381 | 87661 | 258720 |

The residual measures failure of the linear-cycle span to exhaust the rational primitive Hodge space. It says nothing by itself about whether nonlinear algebraic cycles exist.

The sextic $d=6$ reproduces the published result: 1,751 primitive rational Hodge dimensions, with 1,001 supplied by linear cycles. Braun et al. (2024), Theorem 1, construct a basis adding 720 Aoki–Shioda cycles and 30 type-3 cycles. Their theorem settles the sextic example; our code reproduces its arithmetic counts, not their nonlinear cycle construction.

## Explicit obstruction to linear-only generation

The sextic tuple $(1,1,4,4,4,4)$ has residue sum 18. The units modulo six are 1 and 5, and the latter transforms it into $(5,5,2,2,2,2)$, also of sum 18. Neither tuple has a complementary pair. Each sorted pattern has permutation multiplicity 15. This accounts for 30 ordered residual characters in these two permutation families; it does not identify a new Hodge counterexample.

## Reproduction

The main enumerator traverses sorted integer tuples with sum $3d$, prunes impossible prefixes, checks every unit exactly, and weights each result. It uses integer-safe JavaScript arithmetic with a degree guard at 50. The independent reference test instead traverses every ordered tuple for degrees at most 10 and searches possible pairings recursively. An independent Python combinations-with-replacement implementation also reproduced the eleven reported counts during preparation.

The experiment includes no floating-point Hodge membership tests, no numerical rank threshold, and no purported proof of the rational Hodge conjecture for arbitrary varieties.

## Provenance

Initial research conversation and reconstruction: 25 November 2026. The original transient enumeration source was not available in the publishing session; the code here is a new reproducible implementation of the stated criterion. These numerical results and reductions are not asserted to be new to the literature.
