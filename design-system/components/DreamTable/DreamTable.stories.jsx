import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import DreamTable from './DreamTable';
import Button from '../Button';

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status' },
  { key: 'date', title: 'Date' },
];
const data = [
  { id: '1', name: 'Item A', status: 'Active', date: '2024-01-01' },
  { id: '2', name: 'Item B', status: 'Pending', date: '2024-01-02' },
];

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

export default {
  title: 'Components/DreamTable',
  component: DreamTable,
};

export const Default = {
  args: { columns, data },
};

const columnsWithActions = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status' },
  { key: 'date', title: 'Date' },
  { key: 'actions', title: '' },
];
function renderCell(col, value, row) {
  if (col.key === 'actions') {
    return (
      <ActionsCell>
        <Button
          iconOnly="EDIT"
          kind="transparent"
          color="blue"
          size="extraSmall"
          onClick={() => action('edit')(row)}
          aria-label="Edit"
        />
        <Button
          iconOnly="DELETE"
          kind="transparent"
          color="red"
          size="extraSmall"
          onClick={() => action('delete')(row)}
          aria-label="Delete"
        />
      </ActionsCell>
    );
  }
  return value;
}

export const WithRowActions = {
  args: {
    columns: columnsWithActions,
    data,
    renderCell,
  },
};

// Expandable rows (Contacts-style)
const contactColumns = [
  { key: 'name', title: 'Name' },
  { key: 'contactType', title: 'Contact Type' },
  { key: 'partnerAccess', title: 'Partner Access' },
  { key: 'compliance', title: 'Compliance' },
  { key: 'lastModified', title: 'Last Modified' },
  { key: 'actions', title: '' },
];
const contactData = [
  {
    id: '1',
    name: 'michael.rabinowitz@coenterpri...',
    contactType: 'Business',
    partnerAccess: 'No',
    compliance: 'No',
    lastModified: '10/09/2025',
    email: 'michael.rabinowitz@coenterprise.com',
    phone: 'Not provided',
    notes: 'Edit to add notes',
    address: 'Not provided',
    jobTitle: 'Not provided',
    office: 'Not provided',
  },
  {
    id: '2',
    name: 'Jim Luneke',
    contactType: 'Business',
    partnerAccess: 'No',
    compliance: 'No',
    lastModified: '12/03/2024',
    email: 'jim.luneke@example.com',
    phone: '+1 555-0100',
    notes: '',
    address: 'Not provided',
    jobTitle: 'Not provided',
    office: 'Not provided',
  },
];

const ExpandedDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.constants.spacing3x} ${({ theme }) => theme.constants.spacing4x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacingHalf};
`;
const DetailLabel = styled.span`
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;
const DetailValue = styled.span`
  color: ${({ theme }) => theme.palette.black};
`;

function renderContactCell(col, value, row) {
  if (col.key === 'actions') {
    return (
      <ActionsCell>
        <Button
          iconOnly="EDIT"
          kind="transparent"
          color="blue"
          size="extraSmall"
          onClick={() => action('edit contact')(row)}
          aria-label="Edit"
        />
        <Button
          iconOnly="DELETE"
          kind="transparent"
          color="red"
          size="extraSmall"
          onClick={() => action('delete contact')(row)}
          aria-label="Delete"
        />
      </ActionsCell>
    );
  }
  return value;
}

function expandedRowRender(row) {
  return (
    <ExpandedDetailGrid>
      <DetailItem>
        <DetailLabel>Email</DetailLabel>
        <DetailValue>{row.email ?? 'Not provided'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Address</DetailLabel>
        <DetailValue>{row.address ?? 'Not provided'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Phone</DetailLabel>
        <DetailValue>{row.phone ?? 'Not provided'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Job Title</DetailLabel>
        <DetailValue>{row.jobTitle ?? 'Not provided'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Notes</DetailLabel>
        <DetailValue>{row.notes || 'Edit to add notes'}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>Office</DetailLabel>
        <DetailValue>{row.office ?? 'Not provided'}</DetailValue>
      </DetailItem>
    </ExpandedDetailGrid>
  );
}

export const Expandable = {
  args: {
    columns: contactColumns,
    data: contactData,
    keyField: 'id',
    renderCell: renderContactCell,
    expandable: true,
    expandedRowRender,
  },
};
