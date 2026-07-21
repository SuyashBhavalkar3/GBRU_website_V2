'use client';

import React, { useState, useMemo } from 'react';
import ReferralsFilterBar from './ReferralsFilterBar';
import ReferralsTable from './ReferralsTable';
import ReferralsPagination from './ReferralsPagination';
import { MOCK_REFERRALS } from './data';

export default function MyReferralsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReferrals = useMemo(() => {
    return MOCK_REFERRALS.filter((item) => {
      // 1. Search Query Filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subLabel.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Filter
      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <section className="w-full">
      {/* Search & Filter Bar */}
      <ReferralsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Referrals Data Table */}
      <ReferralsTable referrals={filteredReferrals} />

      {/* Pagination Footer */}
      <ReferralsPagination totalCount={48} pageSize={5} />
    </section>
  );
}
