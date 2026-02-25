import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { NewPageHeader, DreamTable, NumberedPager } from '@design-system';
import { usePartner997, ackStatusFrom997Mode } from '../contexts/Partner997Context';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-wrap: wrap;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.constants.spacing1x};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background-color: ${({ theme }) => theme.palette.warningBackground};
  color: ${({ theme }) => theme.palette.warningText};
  border: 1px solid ${({ theme }) => theme.palette.warningBorder};
`;

// Acknowledgment Status tag: green (A, NEA), gray (E, NEU, Pending), red (R)
const AckStatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background-color: ${({ theme, variant }) =>
    variant === 'green' ? theme.palette.green : variant === 'red' ? theme.palette.red : theme.palette.d2};
  color: ${({ theme }) => theme.palette.white};
`;

const ACK_CODE_CONFIG = {
  A: { label: 'Accepted', variant: 'green', tagLabel: 'Accepted' },
  E: { label: 'Accepted with Errors', variant: 'gray', tagLabel: 'Accepted with Errors' },
  R: { label: 'Rejected', variant: 'red', tagLabel: 'Rejected' },
  NEA: { label: 'Not expected (Auto-accept)', variant: 'green', tagLabel: 'Not Expected (Accepted)' },
  NEU: { label: 'Not Expected (Unexpected)', variant: 'gray', tagLabel: 'Not Expected (Unexpected)' },
};

/** 997-configurable demo documents: id -> { documentName, partnerId, partnerName } */
const DOC_997_DEMO = {
  '997-doc-1': {
    documentName: 'Invoice 997-DEMO-001',
    partnerId: '997-demo-a',
    partnerName: '997 Demo Partner A',
  },
  '997-doc-2': {
    documentName: 'Purchase Order 997-DEMO-002',
    partnerId: '997-demo-b',
    partnerName: '997 Demo Partner B',
  },
};

function get997AckVariant(statusLabel) {
  const v = (statusLabel || '').toLowerCase();
  if (v === 'auto accepted' || v === 'not expected') return 'green';
  if (v === 'rejected') return 'red';
  return 'gray';
}

function AcknowledgmentCodeDisplay({ code, statusLabel }) {
  if (statusLabel != null) {
    const variant = get997AckVariant(statusLabel);
    return (
      <AckStatusTag variant={variant} data-ack-status={statusLabel}>
        {statusLabel.toUpperCase()}
      </AckStatusTag>
    );
  }
  const config = ACK_CODE_CONFIG[code];
  if (!config) return <SummaryValue>{code}</SummaryValue>;
  return (
    <AckStatusTag variant={config.variant} data-ack-code={code}>
      {config.tagLabel || code}
    </AckStatusTag>
  );
}

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.constants.spacing3x};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const SummaryCard = styled.section`
  padding: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const SummaryTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const SummaryItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const SummaryLabel = styled.span`
  min-width: 120px;
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const SummaryValue = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  overflow: hidden;
`;

const SectionHeader = styled.button`
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.l1};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  cursor: pointer;
  text-align: left;
  font-family: inherit;
`;

const SectionTitle = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const SectionBody = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
`;

const LineItemsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const CommentsBox = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  padding: ${({ theme }) => theme.constants.spacing2x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 72px;
  resize: vertical;
  padding: ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  font-family: inherit;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  border: none;
  background-color: ${({ theme }) => theme.palette.cerulean};
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.palette.l2};
    cursor: default;
  }
`;

const LINE_ITEM_COLUMNS = [
  { key: 'ladingQuantity', title: 'Lading Quantity' },
  { key: 'packagingFormCode', title: 'Packaging Form Code' },
  { key: 'weightQualifier', title: 'Weight Qualifier' },
  { key: 'weightCode', title: 'Weight Code' },
  { key: 'weight', title: 'Weight' },
  { key: 'commodityCode', title: 'Commodity Code' },
  { key: 'freightClassCode', title: 'Freight Class Code' },
];

const LINE_ITEM_DATA = [
  {
    id: '1',
    ladingQuantity: '1',
    packagingFormCode: 'PLT',
    weightQualifier: 'N',
    weightCode: 'L',
    weight: '196 Pounds',
    commodityCode: '',
    freightClassCode: '250',
  },
];

export default function DocumentDetails() {
  const { id: documentId } = useParams();
  const { partner997 } = usePartner997();
  const [addressesOpen, setAddressesOpen] = useState(true);
  const [otherInfoOpen, setOtherInfoOpen] = useState(true);
  const [comment, setComment] = useState('');

  const is997Demo = documentId && DOC_997_DEMO[documentId];
  const demoDoc = is997Demo ? DOC_997_DEMO[documentId] : null;
  const demo997Mode = demoDoc ? partner997[demoDoc.partnerId] : null;
  const demoAckStatusLabel = demo997Mode != null ? ackStatusFrom997Mode(demo997Mode) : 'Pending';

  const title = demoDoc ? demoDoc.documentName : 'Motor Carrier Bill Of Lading 0400683843';
  const statusPillLabel = demoDoc ? demoAckStatusLabel.toUpperCase().replace(/\s+/g, ' ') : 'PENDING ACCEPTANCE';
  const partnerName = demoDoc ? demoDoc.partnerName : 'Ward';
  const acceptanceStatusLabel = demoDoc ? demoAckStatusLabel : 'Pending Acceptance';

  return (
    <PageWrap>
      <NewPageHeader
        title={title}
        breadcrumbs={[
          { name: 'Documents', url: '/documents' },
          { name: title },
        ]}
        status={<StatusPill>{statusPillLabel}</StatusPill>}
      />
      <Content>
        <HeaderRow>
          <TitleRow>
            <MetaRow>
              <span>
                <strong>Organization</strong> {demoDoc ? '997 Demo' : 'AAA Cooper'}
              </span>
              <span>
                <strong>Partner</strong> {partnerName}
              </span>
            </MetaRow>
          </TitleRow>
        </HeaderRow>

        <SummaryGrid>
          <SummaryCard>
            <SummaryTitle>General</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Purchase Order Number</SummaryLabel>
              <SummaryValue>106512</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Acceptance Status</SummaryLabel>
              <SummaryValue>{acceptanceStatusLabel}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Test Indicator</SummaryLabel>
              <SummaryValue>Production Data</SummaryValue>
            </SummaryItem>
          </SummaryCard>

          <SummaryCard>
            <SummaryTitle>Document Dates</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Document Date</SummaryLabel>
              <SummaryValue>2/24/26</SummaryValue>
            </SummaryItem>
          </SummaryCard>

          <SummaryCard>
            <SummaryTitle>System</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Interchange Control Number</SummaryLabel>
              <SummaryValue>0001234564</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Group Control Number</SummaryLabel>
              <SummaryValue>4967</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Flow Direction</SummaryLabel>
              <SummaryValue>Inbound</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Number of Line Items</SummaryLabel>
              <SummaryValue>12</SummaryValue>
            </SummaryItem>
          </SummaryCard>

          <SummaryCard>
            <SummaryTitle>Acknowledgement Status</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Acknowledgment Code</SummaryLabel>
              {demoDoc ? (
                <AcknowledgmentCodeDisplay statusLabel={demoAckStatusLabel} />
              ) : (
                <AcknowledgmentCodeDisplay code="NEA" />
              )}
            </SummaryItem>
          </SummaryCard>
        </SummaryGrid>

        <Section>
          <SectionHeader type="button" onClick={() => setAddressesOpen((open) => !open)}>
            <SectionTitle>Addresses</SectionTitle>
            <span>{addressesOpen ? '−' : '+'}</span>
          </SectionHeader>
          {addressesOpen && <SectionBody>Address details would appear here.</SectionBody>}
        </Section>

        <Section>
          <SectionHeader type="button" onClick={() => setOtherInfoOpen((open) => !open)}>
            <SectionTitle>Other Information</SectionTitle>
            <span>{otherInfoOpen ? '−' : '+'}</span>
          </SectionHeader>
          {otherInfoOpen && <SectionBody>Other document metadata would appear here.</SectionBody>}
        </Section>

        <Section>
          <SectionBody>
            <LineItemsHeader>
              <span>Line Items</span>
              <span>1 of 12 Results</span>
            </LineItemsHeader>
            <DreamTable columns={LINE_ITEM_COLUMNS} data={LINE_ITEM_DATA} keyField="id" />
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#8A94A0' }}>Results per page: 30</span>
              <NumberedPager page={1} pageSize={30} totalCount={12} onPageChange={() => {}} />
            </div>
          </SectionBody>
        </Section>

        <CommentsBox>
          <CommentsHeader>
            <span>Comments</span>
            <span style={{ color: 'inherit' }}>No people have said anything.</span>
          </CommentsHeader>
          <CommentInput
            placeholder="Say something..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <CommentFooter>
            <CommentButton type="button" disabled={!comment.trim()}>
              Submit
            </CommentButton>
          </CommentFooter>
        </CommentsBox>
      </Content>
    </PageWrap>
  );
}

