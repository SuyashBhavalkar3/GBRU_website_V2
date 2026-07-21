export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

export interface SubmissionDetails {
  applicationId: string;
  submissionDate: string;
  status: string;
  note: string;
}

export const MOCK_SUBMISSION_DETAILS: SubmissionDetails = {
  applicationId: 'BA-2026-00125',
  submissionDate: '15 July 2026',
  status: 'Under Review',
  note: 'We are verifying your farm credentials and ambassador experience. No further action is needed at this time.',
};

export const MOCK_TIMELINE_STEPS: TimelineStep[] = [
  {
    id: '1',
    title: 'Application Submitted',
    description: 'Your documents were successfully received on July 15.',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Review in Progress',
    description: 'Our specialist team is evaluating your eligibility and reach.',
    status: 'active',
  },
  {
    id: '3',
    title: 'Approval Decision',
    description: 'Final notification will be sent via SMS and Email.',
    status: 'pending',
  },
];

export const MOCK_USER = {
  name: 'Rajesh Kumar',
  role: 'Applicant',
};
