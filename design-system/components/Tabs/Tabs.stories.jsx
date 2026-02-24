import React, { useState } from 'react';
import Tabs from './Tabs';

const defaultTabs = [
  { id: 'business-identifiers', label: 'Business Identifiers' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'products', label: 'Products' },
  { id: 'tags', label: 'Tags' },
  { id: 'contract-terms', label: 'Contract Terms' },
];

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

export const Default = () => {
  const [activeTabId, setActiveTabId] = useState('contacts');
  return (
    <Tabs
      tabs={defaultTabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    />
  );
};
