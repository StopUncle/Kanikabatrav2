// Sociopath Test norms.
//
// Source: Levenson, M. R., Kiehl, K. A., & Fitzpatrick, C. M. (1995).
// "Assessing psychopathic attributes in a noninstitutionalized
// population." Journal of Personality and Social Psychology, 68(1),
// 151-158, Table 1.
//
// Sample: n=487 university undergraduates, mixed-sex, US.
// Subsequent replications (Lynam et al. 1999, Brinkley et al. 2001,
// Sellbom 2011) report mean and SD values within ~1 unit of these for
// non-institutional samples; the original is the canonical reference
// and is the calibration target here.
//
// NOTE: These norms are non-institutional (college students). Forensic
// or clinical samples score higher. Surfacing the source on the results
// page (a "compared to general-population norms" footnote) keeps the
// interpretation honest.

export interface SubscaleNorms {
  /** Population mean. */
  mean: number;
  /** Population standard deviation. */
  sd: number;
  /** Theoretical minimum score for the subscale. */
  min: number;
  /** Theoretical maximum score for the subscale. */
  max: number;
}

export const SOCIOPATH_NORMS = {
  primary: {
    mean: 31.0,
    sd: 6.7,
    min: 16,
    max: 64,
  },
  secondary: {
    mean: 20.2,
    sd: 4.6,
    min: 10,
    max: 40,
  },
} as const satisfies Record<"primary" | "secondary", SubscaleNorms>;
