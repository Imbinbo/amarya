// Centralized content for the Amarya luxury resort site.

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stays', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Dining', href: '#dining' },
  { label: 'Offers', href: '#offers' },
  { label: 'Contact', href: '#contact' },
] as const;

export type Room = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: string;
  size: string;
  amenities: string[];
};

export const ROOMS: Room[] = [
  {
    id: 'garden',
    name: 'Garden Pavilion Suite',
    description:
      'A serene sanctuary nestled within lush tropical gardens, where floor-to-ceiling glass blurs the line between interior and nature.',
    image:
      'https://images.pexels.com/photos/36749692/pexels-photo-36749692.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    price: 480,
    capacity: '2 Guests',
    size: '65 m²',
    amenities: ['Private terrace', 'Rain shower', 'Garden view', 'King bed'],
  },
  {
    id: 'ocean',
    name: 'Oceanfront Villa',
    description:
      'Wake to the sound of the tide in a light-filled villa framed by uninterrupted views of the turquoise horizon.',
    image:
      'https://images.pexels.com/photos/27626174/pexels-photo-27626174.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    price: 720,
    capacity: '2 Guests',
    size: '95 m²',
    amenities: ['Ocean view', 'Private plunge pool', 'Outdoor shower', 'King bed'],
  },
  {
    id: 'canopy',
    name: 'Canopy Treehouse Reserve',
    description:
      'Suspended above the rainforest canopy, an architectural retreat of warm timber, soft linen, and dappled forest light.',
    image:
      'https://images.pexels.com/photos/14025904/pexels-photo-14025904.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    price: 980,
    capacity: '2 Guests',
    size: '120 m²',
    amenities: ['Treetop deck', 'Freestanding tub', 'Forest view', 'King bed'],
  },
  {
    id: 'lagoon',
    name: 'Lagoon Private Estate',
    description:
      'An expansive over-water estate with a private infinity pool, butler service, and direct lagoon access.',
    image:
      'https://images.pexels.com/photos/28054888/pexels-photo-28054888.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    price: 1450,
    capacity: '4 Guests',
    size: '210 m²',
    amenities: ['Private pool', 'Butler service', 'Lagoon access', '2 bedrooms'],
  },
];

export type Experience = {
  id: string;
  title: string;
  blurb: string;
  image: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'pool',
    title: 'Infinity Pool',
    blurb: 'A horizon-edge pool that melts into the ocean at golden hour.',
    image:
      'https://images.pexels.com/photos/6774097/pexels-photo-6774097.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'spa',
    title: 'Spa & Wellness',
    blurb: 'Holistic rituals drawn from ancient healing and botanical alchemy.',
    image:
      'https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'dining',
    title: 'Fine Dining',
    blurb: 'Seasonal tasting menus crafted from land, sea, and foraged gardens.',
    image:
      'https://images.pexels.com/photos/1327393/pexels-photo-1327393.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'nature',
    title: 'Nature Walks',
    blurb: 'Guided forest excursions through ancient canopies and hidden trails.',
    image:
      'https://images.pexels.com/photos/6433765/pexels-photo-6433765.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'adventure',
    title: 'Adventure Activities',
    blurb: 'Kayak hidden coves, chase waterfalls, and ride the tropical tides.',
    image:
      'https://images.pexels.com/photos/6736774/pexels-photo-6736774.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'candlelight',
    title: 'Private Candlelight Dinner',
    blurb: 'A bespoke dinner for two beneath the stars on a private shoreline.',
    image:
      'https://images.pexels.com/photos/9500413/pexels-photo-9500413.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
];

export const GALLERY_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/7748791/pexels-photo-7748791.jpeg?auto=compress&cs=tinysrgb&h=1100&w=1400',
    alt: 'Aerial view of the resort with lush gardens and pools',
    span: 'lg:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/35236021/pexels-photo-35236021.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Infinity pool overlooking the ocean',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/14923418/pexels-photo-14923418.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Tropical beach at sunset with palm trees',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/14025907/pexels-photo-14025907.jpeg?auto=compress&cs=tinysrgb&h=1100&w=1100',
    alt: 'Serene villa bedroom with canopy bed',
    span: 'lg:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/23696832/pexels-photo-23696832.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Sunset over the tropical resort pool',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/12130177/pexels-photo-12130177.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Romantic candlelit beach dinner',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/14150566/pexels-photo-14150566.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Luxury resort in Bali surrounded by greenery',
    span: 'lg:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/38407790/pexels-photo-38407790.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
    alt: 'Relaxing spa massage with oil',
    span: '',
  },
];

export type Offer = {
  id: string;
  tag: string;
  title: string;
  description: string;
  details: string;
  image: string;
  featured?: boolean;
};

export const OFFERS: Offer[] = [
  {
    id: 'honeymoon',
    tag: 'Romance',
    title: 'Honeymoon Haven',
    description:
      'Five nights in an Oceanfront Villa with a private candlelight dinner, couples spa ritual, and sunset cruise.',
    details: '5 nights · from $3,480',
    image:
      'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
    featured: true,
  },
  {
    id: 'seasonal',
    tag: 'Limited',
    title: 'Seasonal Escape',
    description:
      'Save 25% on stays of four nights or more, with daily breakfast and a complimentary nature excursion.',
    details: '4 nights · from $1,690',
    image:
      'https://images.pexels.com/photos/23696833/pexels-photo-23696833.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'weekend',
    tag: 'Quick Trip',
    title: 'Weekend Retreat',
    description:
      'A two-night revitalising break with spa credit, late checkout, and a guided sunrise forest walk.',
    details: '2 nights · from $890',
    image:
      'https://images.pexels.com/photos/5785063/pexels-photo-5785063.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
  {
    id: 'family',
    tag: 'Family',
    title: 'Family Discovery',
    description:
      'Connecting suites, kids adventure club, and a private lagoon cabana for an unforgettable family holiday.',
    details: '6 nights · from $4,200',
    image:
      'https://images.pexels.com/photos/5616280/pexels-photo-5616280.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  origin: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      'The most serene place we have ever stayed. Every detail was considered, from the dawn forest walk to the candlelit dinner on the sand. Pure poetry.',
    name: 'Eleanor & James Whitfield',
    origin: 'London, United Kingdom',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'Amarya redefined luxury for us. It is not opulence — it is the feeling of being completely held by nature while wrapped in comfort.',
    name: 'Sofia Marchetti',
    origin: 'Milan, Italy',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'Our honeymoon was beyond imagination. The private villa, the sunset cruise, the spa — we did not want to leave. We are already planning our return.',
    name: 'Aarav & Priya Mehta',
    origin: 'Mumbai, India',
    rating: 5,
  },
  {
    id: '4',
    quote:
      'From the moment the boat arrived at the jetty, we were in another world. The staff anticipate your every need before you know it yourself.',
    name: 'Hannah Lindqvist',
    origin: 'Stockholm, Sweden',
    rating: 5,
  },
];

export const NEARBY = [
  { name: 'International Airport', distance: '45 min by road + boat' },
  { name: 'UNESCO Rainforest Reserve', distance: '20 min' },
  { name: 'Coral Reef Snorkel Bay', distance: '10 min by boat' },
  { name: 'Local Artisan Village', distance: '15 min' },
  { name: 'Hidden Waterfall Trek', distance: '35 min' },
  { name: 'Sunset Point Cape', distance: '12 min' },
];

export const HERO_IMAGE =
  'https://images.pexels.com/photos/14150566/pexels-photo-14150566.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2400';
export const ABOUT_IMAGE_PRIMARY =
  'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1000';
export const ABOUT_IMAGE_SECONDARY =
  'https://images.pexels.com/photos/1488515/pexels-photo-1488515.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200';
export const DINING_IMAGE =
  'https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=1100&w=1600';
export const DINING_PLATE_IMAGE =
  'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=1100&w=900';
export const FINAL_CTA_IMAGE =
  'https://images.pexels.com/photos/14923403/pexels-photo-14923403.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2400';
export const LOCATION_IMAGE =
  'https://images.pexels.com/photos/417351/pexels-photo-417351.jpeg?auto=compress&cs=tinysrgb&h=900&w=1300';
