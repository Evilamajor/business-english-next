export interface ResourceItem {
  slug: string;
  title: string;
  url: string;
  category: string;
  description: string;
}

export const resourcesData: ResourceItem[] = [
  {
    slug: "keith-academy",
    title: "Keith Speaking Academy",
    url: "https://keithspeakingacademy.com/",
    category: "Speaking",
    description: "Structured IELTS speaking system and fluency training.",
  },
  {
    slug: "bbc-learning",
    title: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    category: "Listening",
    description: "Daily English lessons, pronunciation and vocabulary.",
  },
  {
    slug: "youglish",
    title: "YouGlish",
    url: "https://youglish.com/",
    category: "Pronunciation",
    description: "Real-world pronunciation examples from YouTube.",
  },
  {
    slug: "cambridge-write-improve",
    title: "Cambridge Write & Improve",
    url: "https://writeandimprove.com/",
    category: "Writing",
    description: "Automatic writing correction and feedback tool.",
  },
  {
    slug: "ted-talks",
    title: "TED Talks",
    url: "https://www.ted.com/talks",
    category: "Advanced Listening",
    description: "High-level talks to improve listening and vocabulary.",
  },
];
