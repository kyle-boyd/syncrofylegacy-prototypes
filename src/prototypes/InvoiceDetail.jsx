import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NewPageHeader, DreamTable, Icon, TextInput } from '@design-system';

// ─── Status pill ─────────────────────────────────────────────────────────────

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background-color: ${({ theme }) => theme.palette.warningBackground};
  color: ${({ theme }) => theme.palette.warningText};
  border: 1px solid ${({ theme }) => theme.palette.warningBorder};
  white-space: nowrap;
  margin-left: ${({ theme }) => theme.constants.spacing1x};
`;

// ─── Page shell ──────────────────────────────────────────────────────────────

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

// ─── Header action button (Email, Timeline, etc.) ────────────────────────────

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px ${({ theme }) => theme.constants.spacing1x};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  font-family: inherit;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};

  &:hover {
    background-color: ${({ theme }) => theme.palette.l1};
  }
`;

const ActionDivider = styled.span`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.palette.l3};
  display: inline-block;
  align-self: center;
  margin: 0 2px;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

// ─── Overview strip (org / partner / amount) ─────────────────────────────────

const OverviewCard = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  padding: ${({ theme }) => theme.constants.spacing2x} ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing5x};
  align-items: flex-start;
`;

const OverviewBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OverviewLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const OverviewOrgName = styled.span`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  line-height: 1.2;
`;

const OverviewPartnerLink = styled.a`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.cerulean};
  text-decoration: none;
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }
`;

const OverviewAmount = styled.span`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  line-height: 1.2;
`;

// ─── Summary columns ─────────────────────────────────────────────────────────

const SummaryRow = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SummaryCol = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  border-right: 1px solid ${({ theme }) => theme.palette.stroke};

  &:last-child {
    border-right: none;
  }
`;

const SummaryColTitle = styled.div`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.palette.greyedOutText};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
  padding-bottom: ${({ theme }) => theme.constants.spacing1x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const FieldValue = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
`;

const FieldValueUnavailable = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-style: italic;
`;

const AckUnacknowledged = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.d1};
`;

const InlinePill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background-color: ${({ theme }) => theme.palette.warningBackground};
  color: ${({ theme }) => theme.palette.warningText};
  border: 1px solid ${({ theme }) => theme.palette.warningBorder};
`;

const ReprocessedCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.palette.cerulean};
  color: ${({ theme }) => theme.palette.white};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  margin-left: 4px;
  cursor: default;
`;

// ─── Collapsible section ──────────────────────────────────────────────────────

const Section = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  overflow: hidden;
`;

const SectionToggle = styled.button`
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.palette.l1};
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
`;

const SectionToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
`;

const SectionBody = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

// ─── Line Items section ───────────────────────────────────────────────────────

const LineItemsSection = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  overflow: hidden;
`;

const LineItemsToggle = styled.button`
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.palette.l1};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  cursor: pointer;
  text-align: left;
  font-family: inherit;
`;

const LineItemsBody = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const LineItemsToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

// ─── Product tag cell ─────────────────────────────────────────────────────────

const ProductTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme }) => theme.palette.l2};
  color: ${({ theme }) => theme.palette.d1};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  white-space: nowrap;
`;

const MoreTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme }) => theme.palette.l3};
  color: ${({ theme }) => theme.palette.d2};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  white-space: nowrap;
  cursor: pointer;
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

function Field({ label, value, unavailable = false, children }) {
  return (
    <FieldRow>
      <FieldLabel>{label}</FieldLabel>
      {children ? (
        children
      ) : unavailable || value === undefined ? (
        <FieldValueUnavailable>Unavailable</FieldValueUnavailable>
      ) : (
        <FieldValue>{value}</FieldValue>
      )}
    </FieldRow>
  );
}

const LINE_ITEM_COLUMNS = [
  {
    key: 'product',
    title: 'Product',
    render: (row) => (
      <ProductCell>
        <ProductTag>{row.productCode}</ProductTag>
        <MoreTag>+2 more</MoreTag>
      </ProductCell>
    ),
  },
  { key: 'unitPrice', title: 'Unit Price' },
  { key: 'listPrice', title: 'List Price' },
  { key: 'discountMultiplier', title: 'Discount Multiplier' },
  { key: 'quantity', title: 'Quantity' },
  { key: 'unitCode', title: 'Unit Code' },
  { key: 'calculatedCost', title: 'Calculated Cost' },
];

const LINE_ITEM_DATA = [
  {
    id: '1',
    productCode: "Purchaser's Item Code: 421629",
    unitPrice: '$102.00',
    listPrice: '',
    discountMultiplier: '',
    quantity: '1',
    unitCode: 'CA',
    calculatedCost: '$102.00',
  },
  {
    id: '2',
    productCode: "Purchaser's Item Code: 421694",
    unitPrice: '$102.00',
    listPrice: '',
    discountMultiplier: '',
    quantity: '1',
    unitCode: 'CA',
    calculatedCost: '$102.00',
  },
  {
    id: '3',
    productCode: "Purchaser's Item Code: 421567",
    unitPrice: '$162.00',
    listPrice: '',
    discountMultiplier: '',
    quantity: '1',
    unitCode: 'CA',
    calculatedCost: '$162.00',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function InvoiceDetail() {
  const [addressesOpen, setAddressesOpen] = useState(false);
  const [otherInfoOpen, setOtherInfoOpen] = useState(false);
  const [lineItemsOpen, setLineItemsOpen] = useState(true);
  const [lineItemSearch, setLineItemSearch] = useState('');

  const headerActions = (
    <ActionBar>
      <ActionBtn type="button">
        <Icon iconName="BELL" size={14} />
        Email
      </ActionBtn>
      <ActionDivider />
      <ActionBtn type="button">
        <Icon iconName="COMMENT" size={14} />
        0
      </ActionBtn>
      <ActionDivider />
      <ActionBtn type="button">
        <Icon iconName="BAR_CHART" size={14} />
        Timeline
      </ActionBtn>
      <ActionDivider />
      <ActionBtn type="button">
        <Icon iconName="DOCUMENT" size={14} />
        Export as Excel
      </ActionBtn>
      <ActionDivider />
      <ActionBtn type="button">
        <Icon iconName="CUSTOMIZE" size={14} />
        More
      </ActionBtn>
    </ActionBar>
  );

  return (
    <PageWrap>
      <NewPageHeader
        title="Invoice 558437729"
        breadcrumbs={[{ name: 'Documents', url: '/documents' }]}
        Badge={<StatusPill>Pending Acceptance</StatusPill>}
        status="pending"
        pageActions={[headerActions]}
      />

      <Content>
        {/* Organization / Partner / Amount strip */}
        <OverviewCard>
          <OverviewBlock>
            <OverviewLabel>Organization</OverviewLabel>
            <OverviewOrgName>CoEnterprise{'\u00A0'}LLC</OverviewOrgName>
          </OverviewBlock>
          <OverviewBlock>
            <OverviewLabel>Partner</OverviewLabel>
            <OverviewPartnerLink href="#">Hammer Industries</OverviewPartnerLink>
          </OverviewBlock>
          <OverviewBlock>
            <OverviewLabel>Invoice Amount</OverviewLabel>
            <OverviewAmount>$366.00</OverviewAmount>
          </OverviewBlock>
        </OverviewCard>

        {/* 4-column summary */}
        <SummaryRow>
          {/* General */}
          <SummaryCol>
            <SummaryColTitle>General</SummaryColTitle>
            <Field label="Invoice Number" value="558437729" />
            <Field label="Purchase Order Number" value="0V7UBM" />
            <Field label="Transaction Type Code" unavailable />
            <Field label="Payment Terms" value="Basic" />
            <Field label="Bill of Lading" unavailable />
            <Field label="Tax Type Code" unavailable />
            <Field label="Tax Monetary Amount" unavailable />
            <Field label="Tax Percentage" unavailable />
            <Field label="Internal Vendor Number" unavailable />
            <Field label="Acceptance Status">
              <InlinePill>Pending Acceptance</InlinePill>
            </Field>
            <Field label="Test Indicator" value="Production Data" />
          </SummaryCol>

          {/* Document Dates */}
          <SummaryCol>
            <SummaryColTitle>Document Dates</SummaryColTitle>
            <Field label="Document Date" value="1/10/24" />
            <Field label="Invoice Issued Date" value="1/10/24" />
            <Field label="Invoice Date" unavailable />
            <Field label="Shipped" value="7/17/20" />
            <Field label="Requested Ship" unavailable />
            <Field label="Requested Delivery" unavailable />
            <Field label="Sold On" unavailable />
            <Field label="Delivered On" unavailable />
            <Field label="Estimated Delivery" unavailable />
            <Field label="Scheduled Delivery" unavailable />
          </SummaryCol>

          {/* System */}
          <SummaryCol>
            <SummaryColTitle>System</SummaryColTitle>
            <Field label="Interchange Control Number" value="882825601" />
            <Field label="Group Control Number" value="944617078" />
            <Field label="Flow Direction" value="Inbound" />
            <Field label="Number of Line Items" value="3" />
            <Field label="File Format" value="X12 Version 00401" />
            <Field label="Loaded On" value="3/25/2026, 10:42 AM MDT" />
            <Field label="Reprocessed On">
              <FieldValue style={{ display: 'inline-flex', alignItems: 'center' }}>
                3/27/2026, 8:02 AM MDT
                <ReprocessedCount title="2 additional reprocessing events">+2</ReprocessedCount>
              </FieldValue>
            </Field>
          </SummaryCol>

          {/* Acknowledgment Status */}
          <SummaryCol>
            <SummaryColTitle>Acknowledgment Status</SummaryColTitle>
            <AckUnacknowledged>Unacknowledged</AckUnacknowledged>
          </SummaryCol>
        </SummaryRow>

        {/* Addresses */}
        <Section>
          <SectionToggle type="button" onClick={() => setAddressesOpen((o) => !o)}>
            <Icon iconName={addressesOpen ? 'CHEVRON_DOWN' : 'CHEVRON_RIGHT'} size={14} />
            <SectionToggleLabel>Addresses</SectionToggleLabel>
          </SectionToggle>
          {addressesOpen && <SectionBody>Address details would appear here.</SectionBody>}
        </Section>

        {/* Other Information */}
        <Section>
          <SectionToggle type="button" onClick={() => setOtherInfoOpen((o) => !o)}>
            <Icon iconName={otherInfoOpen ? 'CHEVRON_DOWN' : 'CHEVRON_RIGHT'} size={14} />
            <SectionToggleLabel>Other Information</SectionToggleLabel>
          </SectionToggle>
          {otherInfoOpen && <SectionBody>Other document metadata would appear here.</SectionBody>}
        </Section>

        {/* Line Items */}
        <LineItemsSection>
          <LineItemsToggle type="button" onClick={() => setLineItemsOpen((o) => !o)}>
            <Icon iconName={lineItemsOpen ? 'CHEVRON_DOWN' : 'CHEVRON_RIGHT'} size={14} />
            <SectionToggleLabel>Line Items</SectionToggleLabel>
          </LineItemsToggle>
          {lineItemsOpen && (
            <LineItemsBody>
              <LineItemsToolbar>
                <TextInput
                  value={lineItemSearch}
                  onChange={(v) => setLineItemSearch(v)}
                  placeholder="Search Line Items..."
                  inline
                />
              </LineItemsToolbar>
              <DreamTable columns={LINE_ITEM_COLUMNS} data={LINE_ITEM_DATA} keyField="id" />
            </LineItemsBody>
          )}
        </LineItemsSection>
      </Content>
    </PageWrap>
  );
}
