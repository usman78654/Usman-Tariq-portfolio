export type ProjectVideo = {
  src: string;
  poster: string;
  label: string;
  kind: string;
  description: string;
  steps: string[];
};

// Only register supplied or repository-backed media. Illustrations are not
// evidence of the live system, and missing recordings must not be fabricated.
export const projectVideos: Record<string, ProjectVideo> = {
  mindplay: {
    src: "/projects/mindplay-walkthrough.mp4",
    poster: "/projects/mindplay-poster.png",
    label: "Mindplay visual workflow walkthrough",
    kind: "VISUAL WALKTHROUGH / ANIMATED EXPLANATION",
    description:
      "User-supplied animation explaining headset setup, calibration, and hands-free gaming. This is an illustrated concept walkthrough, not a recording of the running prototype or a validation of its accuracy.",
    steps: [
      "Fit the EEG headset and prepare the signal stream.",
      "Calibrate the signals before issuing game commands.",
      "Combine motor imagery, intentional blinks, and head motion for hands-free interaction.",
    ],
  },
  "ecommerce-qa": {
    src: "/projects/proshop-qa-walkthrough.webm",
    poster: "/projects/proshop-qa.png",
    label: "Recorded ProShop QA walkthrough",
    kind: "ACTUAL RECORDING / QA WALKTHROUGH",
    description:
      "Actual repository walkthrough. QA work on Brad Traversy's ProShop v2, not authorship of the shop. Silent screen recording; findings are described in the case study evidence.",
    steps: [],
  },
};
