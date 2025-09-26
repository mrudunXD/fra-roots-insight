// Mock data for FRA claims and geographical features
export interface FRAClaim {
  id: string;
  name: string;
  claimType: 'IFR' | 'CFR' | 'CR';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  state: string;
  district: string;
  coordinates: [number, number]; // [lng, lat]
  area: number; // in hectares
  submittedDate: string;
  lastUpdated: string;
  documents?: string[];
  description?: string;
}

export interface Village {
  id: string;
  name: string;
  coordinates: [number, number];
  population: number;
  state: string;
  district: string;
}

export interface GeographicalFeature {
  id: string;
  type: 'forest' | 'water' | 'agricultural' | 'settlement';
  name: string;
  coordinates: [number, number][];
  area: number;
  properties: Record<string, any>;
}

// Mock FRA Claims data
export const mockClaims: FRAClaim[] = [
  {
    id: 'claim_001',
    name: 'Tribal Community Land Claim - Jharkhand',
    claimType: 'IFR',
    status: 'approved',
    state: 'Jharkhand',
    district: 'Ranchi',
    coordinates: [85.3240, 23.3441],
    area: 150.5,
    submittedDate: '2024-01-15',
    lastUpdated: '2024-03-20',
    documents: ['land_survey.pdf', 'community_certificate.pdf'],
    description: 'Traditional grazing and farming land used by tribal community for generations.'
  },
  {
    id: 'claim_002',
    name: 'Forest Rights Claim - Odisha',
    claimType: 'CFR',
    status: 'pending',
    state: 'Odisha',
    district: 'Koraput',
    coordinates: [82.7121, 18.8137],
    area: 89.3,
    submittedDate: '2024-02-10',
    lastUpdated: '2024-09-15',
    documents: ['forest_map.pdf'],
    description: 'Community forest management rights for sustainable livelihood.'
  },
  {
    id: 'claim_003',
    name: 'Individual Forest Rights - Chhattisgarh',
    claimType: 'IFR',
    status: 'under_review',
    state: 'Chhattisgarh',
    district: 'Bastar',
    coordinates: [81.9661, 19.0728],
    area: 25.7,
    submittedDate: '2024-03-05',
    lastUpdated: '2024-09-10',
    documents: ['individual_claim.pdf', 'residence_proof.pdf'],
    description: 'Individual farming rights on ancestral land.'
  },
  {
    id: 'claim_004',
    name: 'Community Resource Rights - Madhya Pradesh',
    claimType: 'CR',
    status: 'rejected',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    coordinates: [80.3700, 22.5977],
    area: 200.1,
    submittedDate: '2024-01-20',
    lastUpdated: '2024-08-30',
    documents: ['community_resolution.pdf'],
    description: 'Rights over water bodies and minor forest produce.'
  },
  {
    id: 'claim_005',
    name: 'Tribal Forest Rights - Jharkhand',
    claimType: 'CFR',
    status: 'approved',
    state: 'Jharkhand',
    district: 'Gumla',
    coordinates: [84.5399, 23.0438],
    area: 320.8,
    submittedDate: '2024-02-28',
    lastUpdated: '2024-07-15',
    documents: ['tribal_certificate.pdf', 'forest_boundary.pdf'],
    description: 'Community forest rights for traditional practices and conservation.'
  }
];

// Mock Villages data
export const mockVillages: Village[] = [
  {
    id: 'village_001',
    name: 'Birsa Nagar',
    coordinates: [85.3240, 23.3441],
    population: 1200,
    state: 'Jharkhand',
    district: 'Ranchi'
  },
  {
    id: 'village_002',
    name: 'Koraput Village',
    coordinates: [82.7121, 18.8137],
    population: 850,
    state: 'Odisha',
    district: 'Koraput'
  },
  {
    id: 'village_003',
    name: 'Bastar Settlement',
    coordinates: [81.9661, 19.0728],
    population: 650,
    state: 'Chhattisgarh',
    district: 'Bastar'
  }
];

// Mock Geographical Features
export const mockFeatures: GeographicalFeature[] = [
  {
    id: 'forest_001',
    type: 'forest',
    name: 'Saranda Forest',
    coordinates: [[85.2, 23.2], [85.4, 23.2], [85.4, 23.4], [85.2, 23.4]],
    area: 2500,
    properties: { forestType: 'Sal Forest', biodiversity: 'High' }
  },
  {
    id: 'water_001',
    type: 'water',
    name: 'Subarnarekha River',
    coordinates: [[85.1, 23.1], [85.5, 23.5]],
    area: 150,
    properties: { waterType: 'River', seasonal: false }
  },
  {
    id: 'agricultural_001',
    type: 'agricultural',
    name: 'Paddy Fields',
    coordinates: [[85.0, 23.0], [85.2, 23.0], [85.2, 23.1], [85.0, 23.1]],
    area: 180,
    properties: { cropType: 'Rice', irrigation: 'Rain-fed' }
  }
];

// States and Districts data
export const statesData = [
  { value: 'all', label: 'All States' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh' }
];

export const districtsData = [
  { value: 'all', label: 'All Districts' },
  { value: 'ranchi', label: 'Ranchi' },
  { value: 'gumla', label: 'Gumla' },
  { value: 'koraput', label: 'Koraput' },
  { value: 'bastar', label: 'Bastar' },
  { value: 'mandla', label: 'Mandla' }
];

export const claimTypesData = [
  { value: 'all', label: 'All Types' },
  { value: 'IFR', label: 'Individual Forest Rights' },
  { value: 'CFR', label: 'Community Forest Rights' },
  { value: 'CR', label: 'Community Resource Rights' }
];

export const statusData = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'under_review', label: 'Under Review' }
];