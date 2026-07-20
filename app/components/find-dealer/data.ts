export interface Dealer {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone?: string;
  hours?: string;
  tags?: string[];
  badgeLabel?: string;
  badgeVariant?: 'top-rated' | 'processing' | 'partner' | 'none';
  rating?: number;
  expanded?: boolean;
}

export const MOCK_DEALERS: Dealer[] = [
  {
    id: '1',
    name: 'Heartland Agronomy Center',
    distance: '1.2 miles',
    address: '4820 Innovation Way, Des Moines, IA 50313',
    phone: '(515) 555-0110',
    tags: ['SALES', 'SERVICE', 'SPARE PARTS'],
    badgeLabel: 'TOP RATED',
    badgeVariant: 'top-rated',
    expanded: true,
  },
  {
    id: '2',
    name: 'Prairie Field Solutions',
    distance: '3.8 miles',
    address: '1250 Cordell Drive, Ankeny, IA 50021',
    hours: 'Open: 7:00 AM - 6:00 PM',
    tags: ['SERVICE', 'PARTS'],
    rating: 4.7,
    badgeVariant: 'none',
    expanded: false,
  },
  {
    id: '3',
    name: 'Central State Machinery',
    distance: '8.1 miles',
    address: '442 Industrial Parkway, Grimes, IA 50111',
    badgeLabel: 'Processing...',
    badgeVariant: 'processing',
    expanded: false,
  },
  {
    id: '4',
    name: 'Vanguard Agri-Supply',
    distance: '9.2 miles',
    address: '800 West Oak St, Johnston, IA 50131',
    phone: '(515) 555-0184',
    tags: ['SALES'],
    badgeLabel: 'Official Partner',
    badgeVariant: 'partner',
    expanded: false,
  },
];

export const MAP_PINS = [
  { id: 'pin1', label: 'Western Iowa Implement', top: '28%', left: '48%' },
  { id: 'pin2', label: 'Central Ag Solutions', top: '32%', left: '72%' },
  { id: 'pin3', label: 'Heritage Tractor', top: '44%', left: '62%' },
  { id: 'pin4', label: 'Mason City', top: '38%', left: '80%' },
  { id: 'pin5', label: 'Cedar Rapids', top: '46%', left: '84%' },
  { id: 'pin6', label: 'Central Ag Tractor', top: '54%', left: '82%' },
  { id: 'pin7', label: 'Ottumwa', top: '56%', left: '73%' },
  { id: 'pin8', label: 'Des Moines (Selected)', top: '36%', left: '58%', active: true },
];
