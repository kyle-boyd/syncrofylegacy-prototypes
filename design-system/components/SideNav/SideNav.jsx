import React, { useState } from 'react';
import styled from '@emotion/styled';
import SideNavItem from '../SideNavItem';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 240px;
  flex: 1;
  min-height: 0;
  align-self: stretch;
  background-color: ${({ theme }) => theme.palette.sea};
  color: ${({ theme }) => theme.palette.white};
  flex-shrink: 0;
`;

const MainList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const BottomSection = styled.div`
  margin-top: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.constants.spacing2x};
`;

const COMPLIANCE_SUB_IDS = ['chargeback', 'transactions', 'configuration'];
const COMPLIANCE_SUB_LABELS = ['Chargeback', 'Transactions', 'Configuration'];

const MAIN_ITEMS = [
  { id: 'dashboards', iconName: 'DASHBOARD', label: 'Dashboards' },
  { id: 'orders', iconName: 'SHOPPING_CART', label: 'Orders' },
  { id: 'shipments', iconName: 'TRUCK', label: 'Shipments' },
  {
    id: 'compliance',
    iconName: 'DOCUMENT',
    label: 'Compliance',
    isExpandable: true,
  },
  { id: 'documents', iconName: 'DOCUMENT', label: 'Documents' },
  { id: 'line-items', iconName: 'DOCUMENT', label: 'Line Items' },
  { id: 'files', iconName: 'FOLDER', label: 'Files' },
  { id: 'exceptions', iconName: 'EXCEPTION', label: 'Exceptions' },
  { id: 'reports', iconName: 'BAR_CHART', label: 'Reports' },
  { id: 'partners', iconName: 'PEOPLE', label: 'Partners' },
  { id: 'products', iconName: 'BOOK', label: 'Products' },
];

export default function SideNav({
  activeId = 'partners',
  hasPartnersNotification = true,
  onNavigate,
  onCollapse,
}) {
  const [complianceExpanded, setComplianceExpanded] = useState(false);

  const complianceSubItems = COMPLIANCE_SUB_IDS.map((subId, i) => ({
    label: COMPLIANCE_SUB_LABELS[i],
    isActive: activeId === subId,
    onClick: (e) => onNavigate?.(subId, { id: subId, label: COMPLIANCE_SUB_LABELS[i] }, e),
  }));

  const handleItemClick = (id, item, e) => {
    if (item.isExpandable) {
      setComplianceExpanded((prev) => !prev);
    } else {
      onNavigate?.(id, item, e);
    }
  };

  return (
    <Nav role="navigation" aria-label="Side navigation">
      <MainList>
        {MAIN_ITEMS.map((item) => (
          <SideNavItem
            key={item.id}
            iconName={item.iconName}
            label={item.label}
            isActive={activeId === item.id}
            hasNotification={item.id === 'partners' && hasPartnersNotification}
            isExpandable={item.isExpandable ?? false}
            isExpanded={item.id === 'compliance' ? complianceExpanded : false}
            subItems={item.id === 'compliance' ? complianceSubItems : []}
            onClick={(e) => handleItemClick(item.id, item, e)}
            aria-current={activeId === item.id ? 'page' : undefined}
          />
        ))}
      </MainList>
      <BottomSection>
        <SideNavItem
          iconName="SETTINGS"
          label="Settings"
          isActive={false}
          onClick={(e) => onNavigate?.('settings', { id: 'settings', label: 'Settings' }, e)}
        />
        <SideNavItem
          iconName="CHEVRON_LEFT"
          label="Collapse"
          isActive={false}
          onClick={(e) => onCollapse?.(e)}
        />
      </BottomSection>
    </Nav>
  );
}
