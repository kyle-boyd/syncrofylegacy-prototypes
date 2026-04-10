import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NewPageHeader, Tabs, DreamTable, NumberedPager, Button, Icon, TextInput } from '@design-system';

// ─── Data ─────────────────────────────────────────────────────────────────────

const REPORTS = [
  { id: '1', title: 'Test Report', timestamp: '3/25/2026, 1:21 PM', sharedWith: '', failed: false },
  { id: '2', title: 'AAP - ISN View', timestamp: '5/28/2025, 8:13 AM', sharedWith: '', failed: false },
  { id: '3', title: 'FedMog Invoices', timestamp: '7/08/2024, 2:34 PM', sharedWith: '', failed: false },
  { id: '4', title: 'FA EST or GMT', timestamp: '7/08/2024, 12:52 PM', sharedWith: '', failed: false },
  { id: '5', title: 'Test View', timestamp: '5/28/2024, 12:09 PM', sharedWith: '', failed: false },
  { id: '6', title: 'testOrders', timestamp: '5/21/2024, 9:21 AM', sharedWith: '', failed: false },
  { id: '7', title: 'Temp go Live Test', timestamp: '5/21/2024, 6:37 AM', sharedWith: '', failed: false },
  { id: '8', title: 'TestReport 351', timestamp: '5/20/2024, 1:51 PM', sharedWith: '', failed: false },
  { id: '9', title: 'Test report', timestamp: '5/20/2024, 1:44 PM', sharedWith: '', failed: true },
  { id: '10', title: 'report test', timestamp: '5/20/2024, 1:28 PM', sharedWith: '', failed: true },
];

const TABLE_COLUMNS = [
  { key: 'title', title: 'Title', sortable: true },
  { key: 'timestamp', title: 'Timestamp', sortable: true },
  { key: 'sharedWith', title: 'Shared With' },
  { key: '_actions', title: '' },
];

// ─── Styled components ────────────────────────────────────────────────────────

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const TabsWrap = styled.div`
  padding: 0 ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.constants.spacing2x} ${({ theme }) => theme.constants.spacing2x};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  flex-shrink: 0;
`;

const ResultsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const PageSizeBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  cursor: pointer;
  color: ${({ theme, $active }) => $active ? theme.palette.d1 : theme.palette.cerulean};
  font-weight: ${({ theme, $active }) => $active ? theme.constants.semiBoldFontWeight : 'normal'};

  &:hover {
    text-decoration: underline;
  }
`;

// Title cell
const TitleCell = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const TitleLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.cerulean};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const TitleGray = styled.span`
  color: ${({ theme }) => theme.palette.d3};
`;

const FailedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.coral};
  background-color: transparent;
`;

// Action icons row
const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  display: inline-flex;
  align-items: center;
  opacity: ${({ $disabled }) => $disabled ? 0.3 : 1};
  color: ${({ theme, $color }) => {
    if ($color === 'green') return theme.palette.green;
    if ($color === 'red') return theme.palette.coral;
    if ($color === 'orange') return '#E07800';
    return theme.palette.cerulean;
  }};

  &:hover:not(:disabled) {
    opacity: 0.75;
  }
`;

// Run Report From View header link
const RunReportLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  &:hover { text-decoration: underline; }
`;

// ─── Modal primitives ─────────────────────────────────────────────────────────
// Deviation: using custom modal implementation rather than design system ModalNew,
// because the design calls for a specific form layout not easily achieved with ModalNew's
// generic children API without deeper customization.

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  width: 480px;
  max-width: calc(100vw - 32px);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.d3};
  display: inline-flex;
  align-items: center;
  &:hover { color: ${({ theme }) => theme.palette.d1}; }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d2};
`;

const RequiredLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.d3};
`;

// Deviation: native <input> and <select> used for readonly/disabled states and the
// tag-style "To" field, as the design system TextInput doesn't expose readonly styling
// or multi-entry tag behavior.
const NativeInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ readOnly, theme }) => readOnly ? theme.palette.cloud : theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

const NativeTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

const NativeSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};
  appearance: auto;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

// ─── Email Reports Modal ──────────────────────────────────────────────────────

function EmailReportsModal({ report, onClose }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState(report.title);
  const [body, setBody] = useState(
    `Hi,\nPlease find Report URL:\nhttps://app.prod.syncrofy.com/reports/v2/${report.id}abc123def456`
  );

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Email Reports</ModalTitle>
          <ModalCloseBtn type="button" onClick={onClose} aria-label="Close">
            <Icon iconName="CLOSE" size={16} />
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <FormLabel>From</FormLabel>
            <NativeInput
              type="text"
              readOnly
              value="syncrofy.admin@advance-auto.com"
            />
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="email-to">To</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeInput
              id="email-to"
              type="text"
              placeholder='Press "Enter" to separate entries...'
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor="email-subject">Subject</FormLabel>
            <NativeInput
              id="email-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor="email-body">Report Link</FormLabel>
            <NativeTextarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button text="Cancel" color="blue" kind="inverted" size="small" onClick={onClose} />
          <Button text="Send" color="cerulean" kind="default" size="small" onClick={onClose} />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ─── Run Report From View Modal ───────────────────────────────────────────────

function RunReportFromViewModal({ onClose }) {
  const [type, setType] = useState('Documents');
  const [view, setView] = useState('0bytes');
  const [reportName, setReportName] = useState('');

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Run Report From View</ModalTitle>
          <ModalCloseBtn type="button" onClick={onClose} aria-label="Close">
            <Icon iconName="CLOSE" size={16} />
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-type">Type</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeSelect
              id="run-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Documents">Documents</option>
              <option value="Orders">Orders</option>
              <option value="Shipments">Shipments</option>
              <option value="LineItems">Line Items</option>
            </NativeSelect>
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-view">View</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeSelect
              id="run-view"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="0bytes">0bytes</option>
              <option value="All Documents">All Documents</option>
              <option value="FA EST or GMT">FA EST or GMT</option>
              <option value="Test View">Test View</option>
            </NativeSelect>
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-name">Report Name</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeInput
              id="run-name"
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button text="Cancel" color="blue" kind="inverted" size="small" onClick={onClose} />
          <Button
            text="Run"
            color="cerulean"
            kind="default"
            size="small"
            disabled={!reportName.trim()}
            onClick={onClose}
          />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'my-reports', label: 'My Reports' },
  { id: 'shared-with-me', label: 'Shared with Me' },
];

const PAGE_SIZES = [20, 40, 60];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('my-reports');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [emailReport, setEmailReport] = useState(null);
  const [runReportOpen, setRunReportOpen] = useState(false);

  const totalCount = 94;

  const renderCell = (col, value, row) => {
    if (col.key === 'title') {
      return (
        <TitleCell>
          {row.failed ? (
            <TitleGray>{row.title}</TitleGray>
          ) : (
            <TitleLink type="button" onClick={() => {}}>
              {row.title}
            </TitleLink>
          )}
          {row.failed && <FailedBadge>Failed</FailedBadge>}
        </TitleCell>
      );
    }

    if (col.key === '_actions') {
      return (
        <ActionsCell>
          <ActionIcon
            type="button"
            $color="default"
            aria-label="Email report"
            onClick={() => setEmailReport(row)}
            title="Email"
          >
            <Icon iconName="EMAIL" size={16} />
          </ActionIcon>
          <ActionIcon
            type="button"
            $color="green"
            aria-label="Share report"
            onClick={() => {}}
            title="Share"
          >
            <Icon iconName="SHARE" size={16} />
          </ActionIcon>
          <ActionIcon
            type="button"
            $color="red"
            aria-label="Delete report"
            onClick={() => {}}
            title="Delete"
          >
            <Icon iconName="DELETE" size={16} />
          </ActionIcon>
          <ActionIcon
            type="button"
            $color="orange"
            aria-label="Schedule report"
            onClick={() => {}}
            title="Schedule"
          >
            <Icon iconName="REFRESH" size={16} />
          </ActionIcon>
          <ActionIcon
            type="button"
            $color="default"
            $disabled={row.failed}
            disabled={row.failed}
            aria-label="Download report"
            onClick={() => {}}
            title="Download"
          >
            <Icon iconName="DOWNLOAD" size={16} />
          </ActionIcon>
        </ActionsCell>
      );
    }

    return value;
  };

  const headerRightContent = (
    <RunReportLink type="button" onClick={() => setRunReportOpen(true)}>
      <Icon iconName="LIST" size={14} />
      Run Report From View
    </RunReportLink>
  );

  return (
    <PageWrap>
      <NewPageHeader
        title="Reports"
        rightContent={headerRightContent}
      />

      <TabsWrap>
        <Tabs
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={(id) => setActiveTab(id)}
        />
      </TabsWrap>

      <ContentArea>
        <ContentCard>
          <TableWrap>
            <DreamTable
              columns={TABLE_COLUMNS}
              data={REPORTS}
              keyField="id"
              renderCell={renderCell}
              zebraStripes={false}
              verticalDividers
            />
          </TableWrap>
          <FooterRow>
            <ResultsPerPage>
              <span>Results per page:</span>
              {PAGE_SIZES.map((size, i) => (
                <React.Fragment key={size}>
                  <PageSizeBtn
                    type="button"
                    $active={size === pageSize}
                    onClick={() => { setPageSize(size); setPage(1); }}
                  >
                    {size}
                  </PageSizeBtn>
                  {i < PAGE_SIZES.length - 1 && <span style={{ color: 'inherit' }}>  </span>}
                </React.Fragment>
              ))}
            </ResultsPerPage>
            <NumberedPager
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
              showInfo
            />
          </FooterRow>
        </ContentCard>
      </ContentArea>

      {emailReport && (
        <EmailReportsModal
          report={emailReport}
          onClose={() => setEmailReport(null)}
        />
      )}

      {runReportOpen && (
        <RunReportFromViewModal onClose={() => setRunReportOpen(false)} />
      )}
    </PageWrap>
  );
}
