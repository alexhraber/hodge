# Foundations and reductions

## Problem

Let $X$ be a smooth complex projective variety of dimension $n$. Write

$$H^k(X,\mathbb C)=\bigoplus_{a+b=k}H^{a,b}(X),\qquad
\operatorname{Hdg}^p(X)=H^{2p}(X,\mathbb Q)\cap H^{p,p}(X).$$

The rational Hodge conjecture asserts that the cycle class map
$\mathrm{CH}^p(X)_{\mathbb Q}\to\operatorname{Hdg}^p(X)$ is surjective.
In particular every such class is a finite rational combination of classes of codimension-$p$ algebraic subvarieties. Rational coefficients are essential.

The base cases $p=0$ and $p=1$ are classical (connected components and the Lefschetz $(1,1)$ theorem).

## R1. Universal divisor support is equivalent to rational Hodge

**Status: established conditional reduction using classical results; support assertion open in general.**

Consider the assertion DS: for every smooth projective $X$ and every rational Hodge class $\alpha$ of positive codimension $p$, there is a proper algebraic divisor $D$ with $\alpha|_{X\setminus D}=0$.

If the Hodge conjecture holds, a finite union of positive-codimension cycle supports is contained in a divisor (choose a sufficiently high degree hypersurface section through the union). Hence DS follows.

Conversely assume DS for all smooth projective varieties and all positive codimensions. We can work componentwise, with $1\le p\le n$. Let $\widetilde D$ be the disjoint union of smooth projective resolutions of the irreducible components of the reduced divisor $D$, with proper map $f:\widetilde D\to X$.

By the localization sequence in homology with closed supports and the coniveau description via resolutions, the image of homology of $D$ in the pure homology of $X$ equals the image of homology of $\widetilde D$. The weight filtration matters here: lower-dimensional gluing contributions in singular $D$ cannot contribute to the relevant pure weight quotient. Equivalently, using Poincare duality, the supported degree-$2p$ classes are the image of

$$f_*:H^{2p-2}(\widetilde D,\mathbb Q)(-1)\longrightarrow H^{2p}(X,\mathbb Q).$$

Here the twist makes the morphism one of pure rational Hodge structures; it is not an assertion that all homology of a singular divisor lifts to a resolution. See Voisin (2025), the discussion of coniveau and its description by Gysin maps.

The Hodge structures involved are polarizable. Their semisimplicity splits the surjection onto its image, so the Hodge class $\alpha$ lifts to a rational Hodge class of type $(p-1,p-1)$ before the twist. Induction on $p$, starting with $p=0$ (or the Lefschetz theorem at $p=1$), represents the lifts by algebraic cycles. Proper pushforward yields an algebraic cycle representing $\alpha$.

Thus DS universally implies rational Hodge. It is the $N^1$ support condition on rational Hodge classes, not a proved construction of the required divisors.

## R2. Smooth ample divisors cannot support nonzero primitive middle classes

**Status: classical consequence.**

Let $X$ be a smooth projective fourfold and $D$ a smooth ample divisor. Put $L=[D]\smile-$, and let $i:D\hookrightarrow X$. Weak Lefschetz gives the isomorphism $i^*:H^2(X,\mathbb Q)\to H^2(D,\mathbb Q)$.

The localization/Gysin sequence for this smooth divisor gives

$$\ker[H^4(X,\mathbb Q)\to H^4(X\setminus D,\mathbb Q)]
=\operatorname{im}i_* = L H^2(X,\mathbb Q),$$

where the last equality follows from $i_*i^*(\beta)=L\beta$.

Hard Lefschetz gives $H^4=P_L^4\oplus LH^2$, where $P_L^4=\ker(L:H^4\to H^6)$. Hence a nonzero $L$-primitive rational $(2,2)$ class cannot be supported on this smooth ample divisor. This restriction is relative to the same polarization $L$; it does not assert that all smooth divisors for unrelated polarizations are impossible supports. Singular divisors, other supports and different geometric constructions remain available.

## R3. Geometric detection on fourfolds

**Status: equivalence; universal detector existence is open.**

Fix a rational ample class $h$ on $X$, now a smooth projective fourfold, and let
$V=H^4(X,\mathbb Q)\cap H^{2,2}(X)\cap P_h^4$.

The Hodge–Riemann bilinear relations give a positive-definite pairing on $V_{\mathbb R}$:

$$Q(\alpha,\beta)=\int_X\alpha\smile\beta.$$

Let $W$ be the rational span of primitive projections of algebraic surface classes. A primitive projection of a rational $(2,2)$ class differs from it by $h\beta$ for a rational $(1,1)$ class $\beta\in H^2(X,\mathbb Q)$, by the rational Lefschetz decomposition. Since $\beta$ is algebraic by Lefschetz $(1,1)$, the primitive projections of algebraic classes are themselves algebraic. The nonprimitive rational $(2,2)$ classes are likewise algebraic.

For a primitive $\alpha$, its pairing with a surface class equals the pairing with the primitive projection, since $\int_X\alpha\smile h\beta=0$.

If $W$ is proper in $V$, the rational, positive-definite pairing yields a nonzero rational vector in $W^\perp$. Consequently rational Hodge for fourfolds is equivalent to:

$$\forall\,0\ne\alpha\in V,\quad
\exists\text{ algebraic surface }Z\subset X:
\int_Z\alpha\ne0.$$

If all Hodge classes are algebraic, the same detection statement follows immediately from positivity, since a nonzero class has nonzero self-pairing. Other codimensions on a fourfold follow from the classical cases and hard Lefschetz.

For higher even-dimensional varieties a signed Hodge–Riemann pairing gives an analogous statement about spanning the primitive middle space by primitive projections. Turning that into actual algebraicity requires controlling the algebraicity of the nonprimitive pieces; do not silently assume the Lefschetz standard conjecture or arbitrary algebraic primitive projectors.

## R4. Singular-divisor research direction

For a projective resolution $f:Y\to D\subset X$ of a divisor in a fourfold, $f_*$ of a rational $(1,1)$ class is algebraic by Lefschetz $(1,1)$ on $Y$. The hoped-for construction chooses $D$ and such a class $\beta$ so that

$$\int_X\alpha\smile f_*\beta=\int_Y f^*\alpha\smile\beta\ne0.$$

This is a detector, not yet a method for producing one from arbitrary $\alpha$. Merely choosing a singular divisor, adding exceptional divisors, or obtaining a nonzero cohomological restriction does not guarantee a nonzero pairing with a rational $(1,1)$ class. Any claimed universal method must address this precise gap.

Compare existing coniveau and singularity-of-normal-functions approaches before asserting novelty.
