export interface Stat {
  id: string;
  label: string;
  value: string;
  iconName: 'users' | 'check-circle' | 'banknote';
}

export interface Tier {
  id: string;
  name: string;
  status: 'reached' | 'current' | 'locked';
  iconName: 'heart' | 'star' | 'medal' | 'gem';
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface Referral {
  id: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  subLabel: string;
  mobile: string;
  dateReferred: string;
  status: 'reward-earned' | 'verified' | 'registered' | 'pending';
}

export const MOCK_USER = {
  name: 'Rajesh Kumar',
  role: 'Official GBRU Brand Ambassador',
  approvalDate: '20 July 2026',
  referralCode: 'AGRI-PRO-123',
  avatarUrl: '/rajesh-avatar.jpg',
};

export const MOCK_STATS: Stat[] = [
  {
    id: '1',
    label: 'TOTAL REFERRALS',
    value: '0',
    iconName: 'users',
  },
  {
    id: '2',
    label: 'SUCCESSFUL REFERRALS',
    value: '0',
    iconName: 'check-circle',
  },
  {
    id: '3',
    label: 'REWARDS EARNED',
    value: '₹0.00',
    iconName: 'banknote',
  },
];

export const MOCK_TIERS: Tier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    status: 'reached',
    iconName: 'heart',
  },
  {
    id: 'silver',
    name: 'Silver',
    status: 'locked',
    iconName: 'star',
  },
  {
    id: 'gold',
    name: 'Gold',
    status: 'locked',
    iconName: 'medal',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    status: 'locked',
    iconName: 'gem',
  },
];

export const MOCK_HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Invite a Farmer',
    description: 'Share your unique portal link via WhatsApp or SMS.',
  },
  {
    step: 2,
    title: 'Farmer Registers',
    description: 'They register their GBRU product warranty using your link.',
  },
  {
    step: 3,
    title: 'Verification',
    description: 'Our team verifies the purchase and product warranty details.',
  },
  {
    step: 4,
    title: 'Earn Rewards',
    description: 'Receive your referral bonus directly in your digital wallet.',
    highlight: true,
  },
];

export const STATUS_STYLES: Record<
  Referral['status'],
  { label: string; bgClass: string; textClass: string; dotClass: string }
> = {
  'reward-earned': {
    label: 'Reward Earned',
    bgClass: 'bg-[#009E38]',
    textClass: 'text-white',
    dotClass: 'bg-white',
  },
  verified: {
    label: 'Verified',
    bgClass: 'bg-[#DBEAFE]',
    textClass: 'text-[#2563EB]',
    dotClass: 'bg-[#2563EB]',
  },
  registered: {
    label: 'Registered',
    bgClass: 'bg-[#FEF3C7]',
    textClass: 'text-[#D97706]',
    dotClass: 'bg-[#D97706]',
  },
  pending: {
    label: 'Pending',
    bgClass: 'bg-[#E5E7EB]',
    textClass: 'text-[#4B5563]',
    dotClass: 'bg-[#4B5563]',
  },
};

export const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    initials: 'JS',
    avatarBg: 'bg-[#00A63E]',
    avatarText: 'text-white',
    name: 'John Simmons',
    subLabel: 'Central Valley Precinct',
    mobile: '-',
    dateReferred: 'Oct 12, 2023',
    status: 'reward-earned',
  },
  {
    id: '2',
    initials: 'MW',
    avatarBg: 'bg-[#E5E7EB]',
    avatarText: 'text-[#374151]',
    name: 'Maria Williams',
    subLabel: 'Green Pastures Co-op',
    mobile: '+1 (555) 345-6789',
    dateReferred: 'Oct 14, 2023',
    status: 'verified',
  },
  {
    id: '3',
    initials: 'RH',
    avatarBg: 'bg-[#E5E7EB]',
    avatarText: 'text-[#374151]',
    name: 'Robert Hadden',
    subLabel: 'Highland Agronomy',
    mobile: '+1 (555) 456-7890',
    dateReferred: 'Oct 15, 2023',
    status: 'registered',
  },
  {
    id: '4',
    initials: 'AL',
    avatarBg: 'bg-[#E5E7EB]',
    avatarText: 'text-[#374151]',
    name: 'Anna Lee',
    subLabel: 'Riverside Plantation',
    mobile: '+1 (555) 567-8901',
    dateReferred: 'Oct 16, 2023',
    status: 'pending',
  },
  {
    id: '5',
    initials: 'DK',
    avatarBg: 'bg-[#DCFCE7]',
    avatarText: 'text-[#15803D]',
    name: 'David King',
    subLabel: 'Sunset Valley Orchards',
    mobile: '+1 (555) 678-9012',
    dateReferred: 'Oct 17, 2023',
    status: 'reward-earned',
  },
];
