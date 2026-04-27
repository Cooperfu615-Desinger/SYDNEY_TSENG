import { assetPath } from "../utils/assets.js";

export const works = [
  {
    id: "dancing-queen",
    title: "Bubble Bobble",
    category: "Mobile Slot",
    role: "Sound Design",
    description: "8-bit sound system under strict brand constraints.",
    image: assetPath("/images/works/dancing-queen-cover.png"),
    audio: assetPath("/audio/1-bubble_bobble.wav"),
    video: assetPath("/video/jk8-commercial.mov"),
  },
  {
    id: "wings-of-desire",
    title: "Branded Audio Experience",
    category: "Narrative Game",
    role: "Sound Design",
    description: "Full audio system aligned with brand identity.",
    image: assetPath("/images/works/wings-of-desire-cover.png"),
    audio: assetPath("/audio/3-japanese_artist_collab.mp3"),
    video: assetPath("/video/jk8-commercial.mov"),
  },
  {
    id: "tequila-shots",
    title: "Experimental Exhibition Sound",
    category: "Mobile Slot",
    role: "Sound Design",
    description: "Abstract sound design balancing tension and texture.",
    image: assetPath("/images/works/tequila-shots-cover.png"),
    video: assetPath("/video/jk8-commercial.mov"),
  },
  {
    id: "saturday-event-djs",
    title: "Festival-Inspired Soundscape",
    category: "Event",
    role: "Sound Design",
    description: "Thai-inspired music shaped by local sound culture.",
    image: assetPath("/images/works/saturday-event-djs-cover.png"),
    audio: assetPath("/audio/4-thailand-exclusive-songkran-festival.mp3"),
    video: assetPath("/video/jk8-commercial.mov"),
  },
];

export const soundLabCategories = [
  {
    id: "click-spin",
    title: "Click / Spin",
    icon: "power",
    description: "Tactile starts that set everything in motion.",
    samples: [
      {
        id: "bubble-bobble",
        title: "Bubble Bobble",
        subtitle: "Under the sea",
        audio: assetPath("/audio/1-bubble_bobble.wav"),
      },
      {
        id: "japanese-artist-collab",
        title: "Japanese Artist Collab",
        subtitle: "Yummy candy",
        audio: assetPath("/audio/3-japanese_artist_collab.mp3"),
      },
      {
        id: "songkran-festival",
        title: "Songkran Festival",
        subtitle: "The Great Aztec",
        audio: assetPath("/audio/4-thailand-exclusive-songkran-festival.mp3"),
      },
    ],
  },
  {
    id: "reward",
    title: "Reward",
    icon: "star",
    description: "Moments that feel good and keep you coming back.",
    samples: [
      {
        id: "reward-pop",
        title: "Reward Pop",
        subtitle: "Bright win",
        audio: assetPath("/audio/3-japanese_artist_collab.mp3"),
      },
      {
        id: "coin-smile",
        title: "Coin Smile",
        subtitle: "Small prize",
        audio: assetPath("/audio/1-bubble_bobble.wav"),
      },
      {
        id: "festival-bonus",
        title: "Festival Bonus",
        subtitle: "Big moment",
        audio: assetPath("/audio/4-thailand-exclusive-songkran-festival.mp3"),
      },
    ],
  },
  {
    id: "transition",
    title: "Transition",
    icon: "waves",
    description: "Smooth moves that guide the player forward.",
    samples: [
      {
        id: "soft-swipe",
        title: "Soft Swipe",
        subtitle: "Menu move",
        audio: assetPath("/audio/1-bubble_bobble.wav"),
      },
      {
        id: "scene-shift",
        title: "Scene Shift",
        subtitle: "New space",
        audio: assetPath("/audio/3-japanese_artist_collab.mp3"),
      },
      {
        id: "night-cut",
        title: "Night Cut",
        subtitle: "Event jump",
        audio: assetPath("/audio/4-thailand-exclusive-songkran-festival.mp3"),
      },
    ],
  },
];
