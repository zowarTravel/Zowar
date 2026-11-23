export type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  /** Hero photo, reused as the card thumbnail on the Journal page and homepage. */
  image: string;
  imageAlt: string;
};

export const posts: Post[] = [
  {
    slug: "driving-in-jordan",
    title: "Driving in Jordan: Renting a Car, Road Rules & the Best Routes",
    description:
      "What you need to rent a car, what it costs, insurance, speed cameras and checkpoints, the best routes to Petra and Wadi Rum, and why you should skip driving in Amman.",
    tag: "Travel Planning",
    readTime: "12 min read",
    image: "/images/blog/jordan-camel-crossing-road-sign.jpg",
    imageAlt: "A camel crossing road sign in front of desert mountains in southern Jordan",
  },
  {
    slug: "what-to-eat-in-jordan",
    title: "What to Eat in Jordan: 15 Dishes to Try",
    description:
      "Mansaf, maqluba, musakhan, falafel, knafeh and more: the dishes that define Jordanian food, how to eat them, and where to find them in Amman.",
    tag: "Food Guide",
    readTime: "12 min read",
    image: "/images/blog/tabbouleh-jordanian-food.jpg",
    imageAlt: "A plate of fresh tabbouleh with Jordanian mezze",
  },
  {
    slug: "jordan-pass",
    title: "Is the Jordan Pass Worth It? Prices, Savings & Who Should Skip It",
    description:
      "2026 prices, what the pass covers, how the visa fee waiver works, real savings examples, and the situations where it costs more than it saves.",
    tag: "Travel Planning",
    readTime: "7 min read",
    image: "/images/blog/amman-view-from-ruins.jpg",
    imageAlt: "View over Amman from the Citadel ruins",
  },
  {
    slug: "amman-in-winter",
    title: "Amman in Winter: What to Expect from December to February",
    description:
      "Temperatures, rain and the occasional snow day, why buildings feel colder inside, what to pack, winter food, and which day trips are best this time of year.",
    tag: "Travel Planning",
    readTime: "8 min read",
    image: "/images/blog/amman-cafe-city-view.jpg",
    imageAlt: "Café with a view over Amman's hills",
  },
  {
    slug: "is-amman-safe",
    title: "Is Amman Safe to Visit Right Now? A Local's Honest Answer",
    description:
      "What the US, UK and Canadian advisories say, what daily life in Amman looks like this year, what to do if you hear a siren, and how to decide for yourself.",
    tag: "Travel Safety",
    readTime: "10 min read",
    image: "/images/blog/grand-husseini-mosque-downtown-amman.jpg",
    imageAlt: "The Grand Husseini Mosque in downtown Amman on an ordinary afternoon",
  },
  {
    slug: "3-days-in-amman",
    title: "3 Days in Amman: The Complete Itinerary",
    description:
      "Rainbow Street and Weibdeh, the Citadel and Roman Theatre, day trips to Jerash and the Dead Sea — how to spend three days in Amman properly.",
    tag: "Travel Itinerary",
    readTime: "12 min read",
    image: "/images/blog/amman-city-panoramic.jpg",
    imageAlt: "Panoramic view of Amman, Jordan from Jabal Amman hill",
  },
  {
    slug: "things-to-do-amman",
    title: "Things to Do in Amman, Jordan",
    description:
      "The Citadel, Roman Theatre, Jordan Museum, Darat Al Funun, Rainbow Street, Weibdeh, and the Zowar experience — the complete local guide to Amman's best places to spend time.",
    tag: "Travel Guide",
    readTime: "16 min read",
    image: "/images/blog/amman-downtown-lookout.jpg",
    imageAlt: "A visitor at a lookout over downtown Amman and the limestone houses of the hills beyond",
  },
  {
    slug: "things-to-do-amman-locals",
    title: "Things to Do in Amman – Local Experiences",
    description:
      "Pottery workshops, free outdoor cinema above the city, live music in Weibdeh, a Friday market on Rainbow Street, and a self-guided food walk through the neighbourhood.",
    tag: "Local Guide",
    readTime: "12 min read",
    image: "/images/blog/amman-colourful-mural.jpg",
    imageAlt: "Colourful street mural in Amman's Weibdeh neighbourhood",
  },
  {
    slug: "best-restaurants-rainbow-street",
    title: "Best Restaurants on Rainbow Street, Amman",
    description:
      "From Sufra and Shams El Balad to Maisa Space, Namliyeh, Wild Jordan Café, Books@Café, and Al-Quds Falafel — where to eat on Rainbow Street.",
    tag: "Food Guide",
    readTime: "14 min read",
    image: "/images/blog/rainbow-street--blue-gate-bougainvillea.jpg",
    imageAlt: "Blue gate and bougainvillea on Rainbow Street, Amman",
  },
  {
    slug: "best-breakfast-amman",
    title: "Best Breakfast Places in Amman, Jordan",
    description:
      "Traditional spots like Al-Quds Falafel, Abu Jbara and Khashoka alongside modern takes at Shams El Balad, Rumman Collective and Blue Fig — the definitive local guide.",
    tag: "Food Guide",
    readTime: "12 min read",
    image: "/images/blog/amman-traditional-cafe-interior.jpg",
    imageAlt: "Traditional café interior on Rainbow Street Amman with colourful cushions and city view",
  },
  {
    slug: "rainbow-street-guide",
    title: "Rainbow Street, Amman: History, Cinema & Complete Guide",
    description:
      "How a residential ridge became a cultural street, the story of the 1957 Rainbow Cinema, and everything to do, eat, and see there today.",
    tag: "Neighbourhood Guide",
    readTime: "8 min read",
    image: "/images/blog/rainbow-street-sign-amman.jpg",
    imageAlt: "AL-RAINBOW St. street sign on a pole with bougainvillea flowers and stone buildings in Jabal Amman",
  },
  {
    slug: "weibdeh-neighbourhood-guide",
    title: "Jabal Al-Weibdeh: Amman's Creative Quarter",
    description:
      "Darat Al Funun, the Jordan National Gallery, Rumi Café, and the quiet stone lanes of one of Amman's most atmospheric neighbourhoods.",
    tag: "Neighbourhood Guide",
    readTime: "7 min read",
    image: "/images/blog/amman-weibdeh-street-mural.jpg",
    imageAlt: "Large street mural on a building wall in Jabal Al-Weibdeh Amman — woman in yellow dress with a bird and lemon",
  },
  {
    slug: "traditional-hummus-recipe",
    title: "Traditional Jordanian Hummus Recipe",
    description:
      "The authentic method — dried chickpeas, high-quality tahini, ice-cold water, and the techniques that separate Jordanian hummus from everything else.",
    tag: "Recipe",
    readTime: "6 min read",
    image: "/images/blog/hummus-and-zowar-puzzle.jpg",
    imageAlt: "Hummus with olive oil and fresh bread on a table alongside a phone showing the Zowar puzzle experience",
  },
];
