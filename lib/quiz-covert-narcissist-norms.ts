// HSNS norms.
//
// Source: Hendin, H. M., & Cheek, J. M. (1997). "Assessing
// Hypersensitive Narcissism: A Reexamination of Murray's Narcism
// Scale." Journal of Research in Personality, 31(4), 588-599.
// Original undergraduate sample n = 535.
//
// Single subscale, range 10-50, M = 26.7, SD = 6.6 (Hendin & Cheek
// 1997 pooled sample). Replications in Pincus et al. 2009 (PNI
// validation), Glover et al. 2012, and Bukowski et al. 2017 report
// means within ~1 unit and SDs within ~0.5 across non-clinical
// samples; the original is the canonical calibration target.

export interface SubscaleNorms {
  mean: number;
  sd: number;
  min: number;
  max: number;
}

export const COVERT_NARCISSIST_NORMS: SubscaleNorms = {
  mean: 26.7,
  sd: 6.6,
  min: 10,
  max: 50,
};
