// src/types/data.ts
export interface ConcordItem {
  English?: string;
  Ghor?: string;
}

export interface FeatureItem {
  feature?: string[]; // Assuming feature is an array of strings
}

export interface Attestation {
  code?: string;
  timestamp?: string;
  ghor?: string;
  english?: string;
  script?: string;
  audio?: string; // Optional audio URL
  concord?: ConcordItem[];
  features?: FeatureItem[];
  comment?: string;
  // Add other properties if your JSON has them
}