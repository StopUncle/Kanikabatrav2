/**
 * How many downloads a book purchase gets.
 *
 * One counter covers every file behind the token, and there are six of
 * them: the book as PDF and EPUB, plus both addendums in both formats.
 * A buyer who simply takes everything once has already spent 6 of the
 * old cap of 10, so a couple of browser retries, a resumed download, or
 * a second device pushed honest readers over the line. They then hit a
 * message accusing them of 10 downloads they had not made, and the only
 * way out was emailing support.
 *
 * 30 leaves room for every file to be fetched several times across
 * devices while still capping outright link sharing. The window in
 * `Purchase.expiresAt` (30 days) is the real anti-piracy control here,
 * not this number.
 */
export const BOOK_MAX_DOWNLOADS = 30;
