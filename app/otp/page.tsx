import Otp from '@/components/Otp';
import React from 'react';

export const metadata = {
  title: 'Verify OTP - GBRU',
  description: 'Verify your phone number with OTP',
};

export default function OtpPage() {
  return (
    <main>
      <Otp />
    </main>
  );
}
