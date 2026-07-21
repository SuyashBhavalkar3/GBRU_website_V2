export interface ReferralDetails {
  sentVia: string;
  referenceId: string;
}

export interface NextStep {
  step: number;
  title: string;
  description: string;
  status: 'active' | 'upcoming';
}

export const MOCK_REFERRAL_DETAILS: ReferralDetails = {
  sentVia: 'WhatsApp',
  referenceId: '#REF-88291',
};

export const MOCK_NEXT_STEPS: NextStep[] = [
  {
    step: 1,
    title: 'Farmer Receives Link',
    description: 'The invitation link is delivered instantly via the selected channel.',
    status: 'active',
  },
  {
    step: 2,
    title: 'Farmer Registers Product',
    description: 'Your peer registers their GBRU machinery or equipment using your link.',
    status: 'upcoming',
  },
  {
    step: 3,
    title: 'You Earn Rewards',
    description: 'Credits and premium tier benefits are added to your dashboard.',
    status: 'upcoming',
  },
];
