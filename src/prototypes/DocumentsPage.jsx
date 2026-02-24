import React, { useState, useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  DreamTable,
  NewPageHeader,
  NumberedPager,
  FiltersBar,
  DocumentTypeFilterPopover,
  LoadedOnDateFilterPopover,
  AcknowledgmentStatusFilterPopover,
  Popover,
  Icon,
  TextInput,
} from '@design-system';
import { useNavigate } from 'react-router-dom';
import { usePartner997, ackStatusFrom997Mode } from '../contexts/Partner997Context';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const HeaderDivider = styled.div`
  height: ${({ theme }) => theme.constants.spacing3x};
  width: 1px;
  background-color: ${({ theme }) => theme.palette.l4};
  margin-left: ${({ theme }) => theme.constants.spacing2x};
  margin-right: ${({ theme }) => theme.constants.spacing2x};
`;

const FilterBarWrap = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding-left: 0;
  padding-right: 0;
`;

const ContentCard = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  background-color: ${({ theme }) => theme.palette.white};
  overflow: hidden;
`;

const TableWrap = styled.div`
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.constants.spacing2x};
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const TableHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const ColumnPanel = styled.div`
  min-width: 320px;
  padding: ${({ theme }) => theme.constants.spacing2x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const ColumnPanelTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const ColumnList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
`;

const ColumnRow = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing0_5x} 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const DragHandle = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  cursor: grab;
  color: ${({ theme }) => theme.palette.d3};
  padding: ${({ theme }) => theme.constants.spacing0_5x};
  &:active {
    cursor: grabbing;
  }
`;

const DragHandleBar = styled.span`
  width: 14px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
`;

const ColumnLabel = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.d1};
`;

const RemoveColumnButton = styled.button`
  border: none;
  background: none;
  padding: ${({ theme }) => theme.constants.spacing0_5x};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.coral};
  &:hover {
    color: ${({ theme }) => theme.palette.coral};
    opacity: 0.9;
  }
`;

const AddColumnTrigger = styled.button`
  border: none;
  background: none;
  padding: ${({ theme }) => theme.constants.spacing1x} 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  &:hover {
    text-decoration: underline;
  }
`;

const AddColumnDropdown = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.cerulean};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing0_5x};
  background: ${({ theme }) => theme.palette.white};
  min-width: 280px;
  max-height: 320px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const AddColumnSearchWrap = styled.div`
  flex-shrink: 0;
`;

const AddColumnList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: 240px;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const AddColumnOption = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.d1};
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
`;

const DOCUMENT_COLUMNS = [
  { key: 'documentName', title: 'Document Name' },
  { key: 'businessPartner', title: 'Business Partner' },
  { key: 'loadedOnDate', title: 'Loaded On Date' },
  { key: 'documentDate', title: 'Document Date' },
  { key: 'ackStatus', title: 'Acknowledgment Status' },
];

const ALL_AVAILABLE_COLUMNS = [
  { key: 'acknowledgementDate', title: 'Acknowledgement Date' },
  { key: 'ackStatus', title: 'Acknowledgment Status' },
  { key: 'commenters', title: 'Commenters' },
  { key: 'dataFormat', title: 'Data Format' },
  { key: 'dataFormatVersion', title: 'Data Format Version' },
  { key: 'documentName', title: 'Document Name' },
  { key: 'businessPartner', title: 'Business Partner' },
  { key: 'loadedOnDate', title: 'Loaded On Date' },
  { key: 'documentDate', title: 'Document Date' },
  { key: 'errorSummary', title: 'Error Summary' },
  { key: 'errorsReported', title: 'Errors Reported' },
  { key: 'fileName', title: 'File Name' },
  { key: 'flowDirection', title: 'Flow Direction' },
  { key: 'functionallyAcknowledged', title: 'Functionally Acknowledged' },
  { key: 'groupControlNumber', title: 'Group Control Number' },
  { key: 'interchangeControlNumber', title: 'Interchange Control Number' },
  { key: 'lastCommentedOn', title: 'Last Commented On' },
  { key: 'locationCode', title: 'Location Code' },
  { key: 'manuallyAccepted', title: 'Manually Accepted' },
  { key: 'numberOfErrors', title: 'Number of Errors' },
  { key: 'numberOfLineItems', title: 'Number of Line Items' },
  { key: 'organization', title: 'Organization' },
  { key: 'receiverIdQualifier', title: 'Receiver ID Qualifier' },
  { key: 'receiverIdSubValue', title: 'Receiver ID Sub Value' },
  { key: 'receiverIdValue', title: 'Receiver ID Value' },
  { key: 'replayedOn', title: 'Replayed On' },
  { key: 'reprocessedOn', title: 'Reprocessed On' },
];

const DOCUMENT_ROWS = [
  {
    id: '1',
    documentName: 'Motor Carrier Bill Of Lading 0400683843',
    businessPartner: 'GTMS',
    loadedOnDate: '2/24/2026, 4:57 AM',
    documentDate: '3/23/2024, 6:00 PM',
    ackStatus: 'Accepted',
  },
  {
    id: '2',
    documentName: 'Functional Acknowledgment 0001',
    businessPartner: 'GTMS',
    loadedOnDate: '2/24/2026, 4:57 AM',
    documentDate: '3/28/2024, 10:39 AM',
    ackStatus: 'Accepted with Errors',
  },
  {
    id: '3',
    documentName: 'Functional Acknowledgment 0001',
    businessPartner: 'GTMS',
    loadedOnDate: '2/24/2026, 4:57 AM',
    documentDate: '3/31/2024, 10:02 AM',
    ackStatus: 'Rejected',
  },
  {
    id: '4',
    documentName: 'Functional Acknowledgment 0001',
    businessPartner: 'Global Road K&N',
    loadedOnDate: '12/09/2024, 1:27 PM',
    documentDate: '11/18/2024, 10:29 AM',
    ackStatus: 'Pending',
  },
  {
    id: '5',
    documentName: 'Motor Carrier Load Tender 204',
    businessPartner: 'GTMS',
    loadedOnDate: '2/24/2026, 4:57 AM',
    documentDate: '3/20/2024, 9:00 AM',
    ackStatus: 'Not expected (Auto-accept)',
  },
  {
    id: '6',
    documentName: 'Motor Carrier Bill Of Lading 210',
    businessPartner: 'Ward',
    loadedOnDate: '2/23/2026, 2:00 PM',
    documentDate: '3/22/2024, 2:00 PM',
    ackStatus: 'Not Expected (Unexpected)',
  },
  // Rows whose ack status is driven by partner 997 config (Partners > 997 Configuration)
  {
    id: '997-doc-1',
    documentName: 'Invoice 997-DEMO-001',
    businessPartner: '997 Demo Partner A',
    partnerId: '997-demo-a',
    loadedOnDate: '2/24/2026, 9:00 AM',
    documentDate: '2/20/2026, 2:00 PM',
    ackStatus: null, // derived from partner 997 mode
  },
  {
    id: '997-doc-2',
    documentName: 'Purchase Order 997-DEMO-002',
    businessPartner: '997 Demo Partner B',
    partnerId: '997-demo-b',
    loadedOnDate: '2/24/2026, 9:15 AM',
    documentDate: '2/21/2026, 11:00 AM',
    ackStatus: null, // derived from partner 997 mode
  },
];

const DOCUMENT_TYPE_OPTIONS = [
  { id: 'all', label: 'All Business Documents' },
  { id: '997', label: 'Functional Acknowledgment 0001' },
  { id: '204', label: 'Motor Carrier Load Tender 204' },
  { id: '210', label: 'Motor Carrier Bill Of Lading 210' },
];

const ACK_STATUS_OPTIONS = [
  { code: 'A', label: 'Accepted' },
  { code: 'E', label: 'Accepted with Errors' },
  { code: 'R', label: 'Rejected' },
  { code: 'P', label: 'Pending' },
  { code: 'NEA', label: 'Not expected (Auto-accept)' },
  { code: 'NEU', label: 'Not Expected (Unexpected)' },
];

const DEFAULT_VISIBLE_COLUMN_KEYS = ['documentName', 'businessPartner', 'loadedOnDate', 'documentDate', 'ackStatus'];

// Status tag for Acknowledgment Status column: green (accepted/NEA), gray (pending/NEU), red (rejected)
const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background-color: ${({ theme, variant }) =>
    variant === 'green' ? theme.palette.green : variant === 'gray' ? theme.palette.d2 : theme.palette.red};
  color: ${({ theme }) => theme.palette.white};
`;

function getAckStatusTagVariant(ackStatusLabel) {
  if (!ackStatusLabel) return 'gray';
  const v = ackStatusLabel.toLowerCase();
  if (v === 'accepted' || v === 'not expected (auto-accept)' || v === 'auto accepted') return 'green';
  if (v === 'rejected') return 'red';
  return 'gray'; // Pending, Pending Acceptance, Accepted with Errors, Not Expected (Unexpected), Unexpected
}

function getAckStatusDisplayLabel(ackStatusLabel) {
  if (!ackStatusLabel) return 'PENDING ACCEPTANCE';
  const map = {
    accepted: 'ACCEPTED',
    'accepted with errors': 'ACCEPTED WITH ERRORS',
    rejected: 'REJECTED',
    pending: 'PENDING',
    'pending acceptance': 'PENDING ACCEPTANCE',
    'not expected (auto-accept)': 'Not Expected (Accepted)',
    'not expected (unexpected)': 'Not Expected (Unexpected)',
    'auto accepted': 'AUTO ACCEPTED',
    unexpected: 'UNEXPECTED',
  };
  return map[ackStatusLabel.toLowerCase()] || ackStatusLabel.toUpperCase().replace(/\s+/g, ' ');
}

export default function DocumentsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const totalCount = 124;
  const navigate = useNavigate();
  const { partner997 } = usePartner997();

  const [documentTypeId, setDocumentTypeId] = useState('997');
  const [loadedOnDate, setLoadedOnDate] = useState({ mode: 'LAST_X_DAYS', days: 30 });
  const [ackStatus, setAckStatus] = useState({ mode: 'INCLUDING', codes: [] });
  const [visibleColumnKeys, setVisibleColumnKeys] = useState(DEFAULT_VISIBLE_COLUMN_KEYS);
  const [columnsPopoverOpen, setColumnsPopoverOpen] = useState(false);
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [addColumnSearch, setAddColumnSearch] = useState('');

  const documentTypeLabel = useMemo(
    () => DOCUMENT_TYPE_OPTIONS.find((o) => o.id === documentTypeId)?.label ?? 'All Business Documents',
    [documentTypeId]
  );
  const loadedOnLabel = `${loadedOnDate.days} days`;

  // Rows with partnerId get ackStatus from partner 997 config so toggling 997 on Partners page updates here
  const documentRows = useMemo(
    () =>
      DOCUMENT_ROWS.map((row) => {
        if (row.partnerId && partner997 != null) {
          const mode = partner997[row.partnerId];
          const derivedStatus = ackStatusFrom997Mode(mode);
          return { ...row, ackStatus: derivedStatus };
        }
        return row;
      }),
    [partner997]
  );
  const ackStatusLabel =
    ackStatus.codes.length === 0
      ? 'Any'
      : ackStatus.mode === 'INCLUDING'
        ? `${ackStatus.codes.length} selected`
        : `Excluding ${ackStatus.codes.length}`;

  const primaryFilters = useMemo(
    () => [
      {
        id: 'documentType',
        label: 'Document Type',
        valueLabel: documentTypeLabel,
        hasSelection: documentTypeId !== 'all',
        renderPopover: ({ close }) => (
          <DocumentTypeFilterPopover
            options={DOCUMENT_TYPE_OPTIONS}
            value={documentTypeId}
            onSelect={(id) => {
              setDocumentTypeId(id);
              close();
            }}
          />
        ),
      },
      {
        id: 'loadedOnDate',
        label: 'Loaded On Date',
        valueLabel: `Last ${loadedOnLabel}`,
        hasSelection: true,
        renderPopover: ({ close }) => (
          <LoadedOnDateFilterPopover
            value={loadedOnDate}
            onApply={(next) => {
              setLoadedOnDate(next);
              close();
            }}
            onCancel={close}
          />
        ),
      },
      {
        id: 'ackStatus',
        label: 'Acknowledgment Status',
        valueLabel: ackStatusLabel,
        hasSelection: ackStatus.codes.length > 0 || ackStatus.mode === 'EXCLUDING',
        renderPopover: ({ close }) => (
          <AcknowledgmentStatusFilterPopover
            availableStatuses={ACK_STATUS_OPTIONS}
            value={ackStatus}
            onApply={(next) => {
              setAckStatus(next);
              close();
            }}
            onCancel={close}
          />
        ),
      },
    ],
    [
      documentTypeId,
      documentTypeLabel,
      loadedOnDate,
      loadedOnLabel,
      ackStatus,
      ackStatusLabel,
    ]
  );

  const activeFilters = useMemo(() => {
    const list = [];
    if (documentTypeId !== 'all') {
      list.push({
        id: 'documentType',
        label: 'Document Type',
        valueLabel: documentTypeLabel,
        onRemove: () => setDocumentTypeId('all'),
      });
    }
    list.push({
      id: 'loadedOnDate',
      label: 'Loaded On Date',
      valueLabel: `Last ${loadedOnLabel}`,
      onRemove: () => setLoadedOnDate({ mode: 'LAST_X_DAYS', days: 30 }),
    });
    if (ackStatus.codes.length > 0 || ackStatus.mode === 'EXCLUDING') {
      list.push({
        id: 'ackStatus',
        label: 'Acknowledgment Status',
        valueLabel: ackStatusLabel,
        onRemove: () => setAckStatus({ mode: 'INCLUDING', codes: [] }),
      });
    }
    return list;
  }, [documentTypeId, documentTypeLabel, loadedOnDate, loadedOnLabel, ackStatus, ackStatusLabel]);

  const columnDefs = useMemo(
    () =>
      [
        ...DOCUMENT_COLUMNS,
        ...ALL_AVAILABLE_COLUMNS.filter((c) => !DOCUMENT_COLUMNS.some((d) => d.key === c.key)),
      ].filter((c, i, a) => a.findIndex((x) => x.key === c.key) === i),
    []
  );
  const visibleColumns = useMemo(
    () =>
      visibleColumnKeys
        .map((key) => columnDefs.find((c) => c.key === key))
        .filter(Boolean),
    [visibleColumnKeys, columnDefs]
  );
  const availableColumnsToAdd = useMemo(() => {
    const notVisible = ALL_AVAILABLE_COLUMNS.filter((c) => !visibleColumnKeys.includes(c.key));
    if (!addColumnSearch.trim()) return notVisible;
    const q = addColumnSearch.trim().toLowerCase();
    return notVisible.filter(
      (c) => c.title.toLowerCase().includes(q) || c.key.toLowerCase().includes(q)
    );
  }, [visibleColumnKeys, addColumnSearch]);

  const handleRemoveColumn = useCallback((key) => {
    setVisibleColumnKeys((prev) => prev.filter((k) => k !== key));
  }, []);
  const handleAddColumn = useCallback((key) => {
    setVisibleColumnKeys((prev) => [...prev, key]);
    setAddColumnOpen(false);
    setAddColumnSearch('');
  }, []);

  const columnsPopoverContent = (
    <ColumnPanel>
      <ColumnPanelTabs>
        <Button
          text="Group By"
          color="blue"
          kind="inverted"
          size="small"
          onClick={() => {}}
        />
        <Button
          text="Columns"
          color="blue"
          kind="default"
          size="small"
          onClick={() => {}}
        />
      </ColumnPanelTabs>
      <ColumnList>
        {visibleColumns.map((col) => (
          <ColumnRow key={col.key}>
            <DragHandle aria-hidden>
              <DragHandleBar />
              <DragHandleBar />
              <DragHandleBar />
            </DragHandle>
            <ColumnLabel>{col.title}</ColumnLabel>
            <RemoveColumnButton
              type="button"
              aria-label={`Remove ${col.title}`}
              onClick={() => handleRemoveColumn(col.key)}
            >
              <Icon iconName="DELETE" size={14} />
            </RemoveColumnButton>
          </ColumnRow>
        ))}
      </ColumnList>
      <div>
        <AddColumnTrigger
          type="button"
          onClick={() => setAddColumnOpen((o) => !o)}
        >
          + Add Column
        </AddColumnTrigger>
        {addColumnOpen && (
          <AddColumnDropdown>
            <AddColumnSearchWrap>
              <TextInput
                placeholder="Select an option"
                value={addColumnSearch}
                onChange={(e) => setAddColumnSearch(e.target.value)}
                size="small"
              />
            </AddColumnSearchWrap>
            <AddColumnList>
              {availableColumnsToAdd.length === 0 ? (
                <AddColumnOption as="div" style={{ color: 'var(--palette-d3)' }}>
                  {addColumnSearch.trim() ? 'No matching options' : 'All columns are visible'}
                </AddColumnOption>
              ) : (
                availableColumnsToAdd.map((c) => (
                  <AddColumnOption
                    key={c.key}
                    onClick={() => handleAddColumn(c.key)}
                  >
                    {c.title}
                  </AddColumnOption>
                ))
              )}
            </AddColumnList>
          </AddColumnDropdown>
        )}
      </div>
    </ColumnPanel>
  );

  const filtersBarRightActions = (
    <>
      <Button
        text="Group By"
        color="blue"
        kind="inverted"
        size="small"
        onClick={() => {}}
      />
      <Popover
        content={columnsPopoverContent}
        visible={columnsPopoverOpen}
        onClickOutside={() => {
          setColumnsPopoverOpen(false);
          setAddColumnOpen(false);
          setAddColumnSearch('');
        }}
        trigger="manual"
        placement="bottom-end"
      >
        <span>
          <Button
            text="Columns"
            color="blue"
            kind={columnsPopoverOpen ? 'default' : 'inverted'}
            size="small"
            onClick={() => setColumnsPopoverOpen((o) => !o)}
          />
        </span>
      </Popover>
    </>
  );

  const renderCell = (col, value, row) => {
    if (col.key === 'documentName') {
      const docPath =
        row.id === '1'
          ? '/documents/0400683843'
          : row.id === '997-doc-1' || row.id === '997-doc-2'
            ? `/documents/${row.id}`
            : null;
      const handleClick = () => {
        if (docPath) navigate(docPath);
      };

      return (
        <button
          type="button"
          onClick={handleClick}
          style={{
            padding: 0,
            border: 'none',
            background: 'none',
            color: docPath ? '#0072CE' : 'inherit',
            cursor: docPath ? 'pointer' : 'default',
            textDecoration: docPath ? 'underline' : 'none',
            font: 'inherit',
          }}
        >
          {value}
        </button>
      );
    }

    if (col.key === 'ackStatus' && value != null) {
      const variant = getAckStatusTagVariant(value);
      const displayLabel = getAckStatusDisplayLabel(value);
      return (
        <StatusTag variant={variant} data-status={value}>
          {displayLabel}
        </StatusTag>
      );
    }

    return value;
  };

  const headerRightContent = (
    <>
      <Button
        key="document-updates"
        text="Document Updates"
        color="blue"
        kind="transparent"
        size="small"
        iconLeft="DOCUMENT"
        onClick={() => {}}
      />
      <Button
        key="run-report"
        text="Run Report"
        color="blue"
        kind="transparent"
        size="small"
        iconLeft="SETTINGS"
        onClick={() => {}}
      />
      <Button
        key="download-csv"
        text="Download CSV"
        color="blue"
        kind="transparent"
        size="small"
        iconLeft="CHEVRON_DOWN"
        onClick={() => {}}
      />
      <HeaderDivider />
      <Button
        key="save"
        text="Save"
        color="blue"
        kind="default"
        size="small"
        iconLeft="CHECK"
        onClick={() => {}}
      />
      <HeaderDivider />
      <Button
        key="new-view"
        text="New View"
        color="blue"
        kind="transparent"
        size="small"
        iconLeft="ADD"
        onClick={() => {}}
      />
      <Button
        key="my-views"
        text="My Views"
        color="blue"
        kind="transparent"
        size="small"
        iconLeft="DASHBOARD"
        onClick={() => {}}
      />
    </>
  );

  return (
    <PageWrap>
      <NewPageHeader
        editableViewName
        viewNamePlaceholder="(Untitled View)"
        showViewNameDropdown
        onViewNameDropdownClick={() => {}}
        onTitleChange={() => {}}
        rightContent={headerRightContent}
      />

      <FilterBarWrap>
        <FiltersBar
          primaryFilters={primaryFilters}
          activeFilters={activeFilters}
          rightActions={filtersBarRightActions}
        />
      </FilterBarWrap>

      <ContentCard>
        <TableWrap>
          <TableHeaderRow>
            <span>All Documents</span>
            <span>{`${documentRows.length} of ${totalCount} Results`}</span>
          </TableHeaderRow>
          <DreamTable
            columns={visibleColumns}
            data={documentRows}
            keyField="id"
            renderCell={renderCell}
            zebraStripes
            verticalDividers
          />
          <FooterRow>
            <span>Results per page: {pageSize}</span>
            <NumberedPager
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
              showInfo
            />
          </FooterRow>
        </TableWrap>
      </ContentCard>
    </PageWrap>
  );
}