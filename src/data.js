const USERS = {
  'radhika@gmail.com': {
    email: 'radhika@gmail.com',
    name: 'Radhika',
    homeLabel: "Radhika's Home",
    password: 'garden123',
  },
  'sarmad@gmail.com': {
    email: 'sarmad@gmail.com',
    name: 'Sarmad',
    homeLabel: "Sarmad's Home",
    password: 'garden123',
  },
}

const GARDEN_DATA = {
  'radhika@gmail.com': {
    weather: {
      temperature: '18C',
      condition: 'Partly Cloudy',
      description: 'Great day for checking leaves and adjusting watering.',
      humidity: '61%',
      rain: '20%',
      wind: '8 km/h',
    },
    activePlants: [
      { name: 'Tomatoes', status: 'Fruiting', stage: 'Week 6' },
      { name: 'Basil', status: 'Growing well', stage: 'Week 3' },
      { name: 'Mint', status: 'Needs pruning', stage: 'Week 4' },
      { name: 'Lettuce', status: 'Ready soon', stage: 'Week 5' },
    ],
    alerts: [
      { title: 'Pests', text: 'Check basil and mint for aphids and leaf damage.' },
      { title: 'Weather', text: 'Light rain expected later today. Hold off on watering.' },
      { title: 'Soil', text: 'Top beds are drying faster than usual.' },
    ],
    growthLog: [
      { date: 'Mon', note: 'Pruned tomato vines and removed yellow leaves.' },
      { date: 'Wed', note: 'Added compost and checked moisture levels.' },
      { date: 'Fri', note: 'Harvested basil and watered raised bed 2.' },
    ],
    resources: [
      'How to plant tomatoes',
      'How to maintain mint',
      'Garden layout guide',
      'Watering schedule',
    ],
    plants: [
      {
        name: 'Tomatoes',
        status: 'Fruiting',
        care: 'Water deeply every 2 days and check for yellow leaves.',
      },
      {
        name: 'Basil',
        status: 'Growing well',
        care: 'Pinch flower buds and harvest from the top leaves.',
      },
      {
        name: 'Mint',
        status: 'Needs pruning',
        care: 'Trim long stems and keep soil lightly moist.',
      },
      {
        name: 'Lettuce',
        status: 'Ready soon',
        care: 'Harvest outer leaves first and protect from harsh afternoon sun.',
      },
    ],
    backyardItems: [
      {
        id: 'bed-1',
        type: 'bed',
        name: 'Raised Bed 1',
        x: 80,
        y: 100,
        w: 240,
        h: 120,
        color: '#8fbc8f',
      },
      {
        id: 'plant-1',
        type: 'plant',
        name: 'Tomato',
        x: 160,
        y: 140,
        w: 80,
        h: 80,
        lastWateredAt: '2026-07-26',
      },
      {
        id: 'plant-2',
        type: 'plant',
        name: 'Basil',
        x: 380,
        y: 220,
        w: 80,
        h: 80,
        lastWateredAt: '2026-07-28',
      },
    ],
  },
  'sarmad@gmail.com': {
    weather: {
      temperature: '21C',
      condition: 'Sunny',
      description: 'Good day for watering and moving seedlings.',
      humidity: '48%',
      rain: '10%',
      wind: '5 km/h',
    },
    activePlants: [
      { name: 'Cucumbers', status: 'Climbing well', stage: 'Week 4' },
      { name: 'Parsley', status: 'Needs thinning', stage: 'Week 2' },
      { name: 'Rosemary', status: 'Healthy', stage: 'Week 8' },
    ],
    alerts: [
      { title: 'Sunlight', text: 'Move lettuce to partial shade during peak afternoon hours.' },
      { title: 'Watering', text: 'Use deep watering on the cucumber bed tomorrow morning.' },
    ],
    growthLog: [
      { date: 'Tue', note: 'Installed trellis support for cucumbers.' },
      { date: 'Thu', note: 'Trimmed rosemary and checked soil drainage.' },
    ],
    resources: [
      'How to build trellises',
      'Herb pruning guide',
      'Seedling transplant tips',
    ],
    plants: [
      {
        name: 'Cucumbers',
        status: 'Climbing well',
        care: 'Train vines upward and water at the base.',
      },
      {
        name: 'Parsley',
        status: 'Needs thinning',
        care: 'Remove crowded stems to encourage stronger growth.',
      },
      {
        name: 'Rosemary',
        status: 'Healthy',
        care: 'Keep the bed well drained and prune lightly after flowering.',
      },
    ],
    backyardItems: [
      {
        id: 'bed-1',
        type: 'bed',
        name: 'Herb Bed',
        x: 90,
        y: 120,
        w: 220,
        h: 110,
        color: '#c6a16f',
      },
      {
        id: 'plant-1',
        type: 'plant',
        name: 'Cucumber',
        x: 210,
        y: 160,
        w: 80,
        h: 80,
        lastWateredAt: '2026-08-10',
      },
    ],
  },
}

function getAllowedUser(email) {
  if (!email) return null
  return USERS[email.trim().toLowerCase()] ?? null
}

function getGardenData(email) {
  if (!email) return null
  return GARDEN_DATA[email.trim().toLowerCase()] ?? null
}

module.exports = {
  getAllowedUser,
  getGardenData,
}
