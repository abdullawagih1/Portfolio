export type Publication = {
  title: string;
  journal: string;
  year: string;
  summary: string;
  /**
   * Optional fields intentionally left undefined until confirmed against the
   * publisher record. Do not fabricate values here — leave undefined and the
   * UI will simply omit that line rather than guessing.
   */
  doi?: string;
  volume?: string;
  issue?: string;
  externalUrl?: string;
};

export const publication: Publication = {
  title: "Automated Blood Cancer Detection Models Based on Transfer Learning",
  journal: "Indonesian Journal of Electrical Engineering and Computer Science",
  year: "2024",
  summary:
    "Proposed a transfer-learning approach to blood cancer detection using pre-trained convolutional neural network models.",
  // doi, volume, issue, and externalUrl are intentionally omitted — they were
  // not present in the verified source material. Add them here once confirmed
  // against the publisher record; the publication page will pick them up
  // automatically.
};
