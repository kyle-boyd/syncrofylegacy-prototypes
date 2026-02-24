import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  NewPageHeader,
  Tabs,
  Button,
  Icon,
  SearchBar,
  DreamTable,
  NumberedPager,
  SelectSuggest,
} from '@design-system';
import { usePartner997 } from '../contexts/Partner997Context';

// -----------------------------------------------------------------------------
// Mock data
// -----------------------------------------------------------------------------

/** Partner IDs that have configurable 997; their 997 mode drives document ack status on Documents page. */
export const PARTNER_997_DEMO_IDS = ['997-demo-a', '997-demo-b'];

const MOCK_PARTNERS = [
  { id: '997-demo-a', name: '997 Demo Partner A', identifierCount: 1 },
  { id: '997-demo-b', name: '997 Demo Partner B', identifierCount: 1 },
  { id: '3M-WM-INV', name: '3M-WM-INV', identifierCount: 3 },
  { id: '4M-Parts', name: '4M Parts', identifierCount: 0 },
  { id: '925485US00', name: '925485US00', identifierCount: 1 },
  { id: 'partner-4', name: 'Acme Corp', identifierCount: 2 },
  { id: 'partner-5', name: 'Beta LLC', identifierCount: 5 },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `p-${i + 6}`,
    name: `Partner ${i + 6}`,
    identifierCount: i % 4,
  })),
];

const MOCK_CONTACTS = [
  { id: '1', name: 'Sherry Smith', contactType: 'Business', partnerAccess: true, compliance: true, lastModified: '2/26/2021' },
  { id: '2', name: 'Tauni MacLean', contactType: 'Business', partnerAccess: true, compliance: false, lastModified: '8/06/2025' },
  { id: '3', name: 'Vince Tkac', contactType: 'Business', partnerAccess: false, compliance: true, lastModified: '12/10/2024' },
];

const SORT_OPTIONS = [
  { name: 'name', valueText: 'Name' },
  { name: 'identifierCount', valueText: 'Identifier count' },
];

// -----------------------------------------------------------------------------
// Styled layout
// -----------------------------------------------------------------------------

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const TwoColumn = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 0;
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  background-color: ${({ theme }) => theme.palette.white};
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.palette.stroke};
  overflow: hidden;
`;

const LeftPanelToolbar = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const PartnerList = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const PartnerListItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  text-align: left;
  font-family: inherit;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
  background-color: ${({ theme, isActive }) => (isActive ? theme.palette.whiteSelected : 'transparent')};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, isActive }) => (isActive ? theme.palette.whiteSelected : theme.palette.cloud)};
  }
`;

const PartnerListName = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const PartnerListMeta = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  margin-top: ${({ theme }) => theme.constants.spacingQuarter};
`;

const LeftPanelFooter = styled.div`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.constants.spacing2x};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing2x} ${({ theme }) => theme.constants.spacing3x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const DetailTitle = styled.span`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const DetailTabsWrap = styled.div`
  padding: 0 ${({ theme }) => theme.constants.spacing3x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const DetailContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.constants.spacing3x};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing2x};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const ContactsToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-wrap: wrap;
`;

const ActionIconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.constants.spacing1x};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.d2};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};

  &:hover {
    color: ${({ theme }) => theme.palette.cerulean};
    background-color: ${({ theme }) => theme.palette.cloud};
  }
`;

const SettingsDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const SubsectionLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Table997Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacing1x};
`;

const MenuOptionRow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const MenuBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.constants.spacing1x};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: 1;
  background-color: ${({ theme, variant }) => {
    if (variant === 'autoAccept') return theme.palette.green;
    if (variant === 'unexpected') return theme.palette.red;
    return theme.palette.d2; // pending/default
  }};
  color: ${({ theme }) => theme.palette.white};
`;

const HighlightSection = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacing2x};
  padding: ${({ theme }) => theme.constants.spacing3x};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  background-color: ${({ theme }) => theme.palette.cloud};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const SectionInlineControlRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-wrap: wrap;
`;

const OverlineLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const MAIN_TABS = [
  { id: 'all', label: 'All Partners' },
  {
    id: 'unknown',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Icon
          iconName="WARNING"
          size={14}
          style={{ color: 'var(--palette-error, #c00)', flexShrink: 0 }}
          aria-hidden
        />
        Unknown Business Identifiers (3)
      </span>
    ),
  },
  { id: 'tags', label: 'Partner Tags' },
];

const DETAIL_TABS = [
  { id: 'contacts', label: 'Contacts' },
  { id: 'identifiers', label: 'Business Identifiers' },
  { id: 'products', label: 'Products' },
  { id: 'tags', label: 'Tags' },
  { id: 'terms', label: 'Contract Terms' },
  { id: '997-config', label: '997 Configuration' },
];

// Document types for 997 Specific Exclusion List
const DOCUMENT_TYPES_997 = [
  'Advance Ship Notice',
  'Application Advice',
  'Credit/Debit Adjustment',
  'Functional Acknowledgment',
  'Invoice',
  'Purchase Order',
  'Purchase Order Acknowledgment',
  'Receiving Advice',
  'Remittance Advice',
  'Unsupported Document Type',
].map((label) => ({ name: label, valueText: label }));

const ALL_DOCUMENT_TYPES_997_OPTIONS = [
  {
    name: 'expect-pending',
    valueText: (
      <MenuOptionRow>
        <span>Expect 997</span>
        <MenuBadge variant="pending">Pending</MenuBadge>
      </MenuOptionRow>
    ),
  },
  {
    name: 'dont-expect-auto',
    valueText: (
      <MenuOptionRow>
        <span>Don&apos;t Expect 997</span>
        <MenuBadge variant="autoAccept">Auto Accept</MenuBadge>
      </MenuOptionRow>
    ),
  },
  {
    name: 'dont-expect-unexpected',
    valueText: (
      <MenuOptionRow>
        <span>Don&apos;t Expect 997</span>
        <MenuBadge variant="unexpected">Unexpected</MenuBadge>
      </MenuOptionRow>
    ),
  },
];

const CONTACT_COLUMNS = [
  { key: 'name', title: 'Name' },
  { key: 'contactType', title: 'Contact Type' },
  { key: 'partnerAccess', title: 'Partner Access' },
  { key: 'compliance', title: 'Compliance' },
  { key: 'lastModified', title: 'Last Modified' },
  { key: 'actions', title: '' },
];

const DEFAULT_997_MODE = 'dont-expect-auto';

export default function PartnersPage() {
  const [mainTab, setMainTab] = useState('all');
  const [detailTab, setDetailTab] = useState('contacts');
  const [selectedPartnerId, setSelectedPartnerId] = useState('997-demo-a');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const totalCount = 1079;

  const { partner997, setPartner997Mode } = usePartner997();
  const allDocumentTypes997Mode = partner997[selectedPartnerId] ?? DEFAULT_997_MODE;
  const [specific997ExclusionList, setSpecific997ExclusionList] = useState([]);

  const selectedPartner = MOCK_PARTNERS.find((p) => p.id === selectedPartnerId) || MOCK_PARTNERS[0];

  const handle997AllDocumentTypesModeChange = (value) => {
    setPartner997Mode(selectedPartnerId, value);
  };
  const handle997ExclusionAddRow = () => {
    setSpecific997ExclusionList((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, documentType: '', '997Mode': 'dont-expect-auto' },
    ]);
  };
  const handle997ExclusionSetType = (id, documentType) => {
    if (documentType && specific997ExclusionList.some((e) => e.documentType === documentType && e.id !== id)) return;
    setSpecific997ExclusionList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, documentType: documentType ?? '' } : e))
    );
  };
  const handle997ExclusionChange = (id, mode) => {
    setSpecific997ExclusionList((prev) => prev.map((e) => (e.id === id ? { ...e, '997Mode': mode } : e)));
  };
  const handle997ExclusionRemove = (id) => {
    setSpecific997ExclusionList((prev) => prev.filter((e) => e.id !== id));
  };

  const formatYesNo = (v) => (v ? 'Yes' : 'No');

  const renderContactCell = (col, value, row) => {
    if (col.key === 'name') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon iconName="CHEVRON_RIGHT" size={14} style={{ flexShrink: 0 }} />
          {value}
        </span>
      );
    }
    if (col.key === 'partnerAccess' || col.key === 'compliance') {
      return formatYesNo(value);
    }
    if (col.key === 'lastModified') {
      return value;
    }
    if (col.key === 'actions') {
      return (
        <span style={{ display: 'inline-flex', gap: 4 }}>
          <ActionIconBtn type="button" aria-label="Edit contact" onClick={() => {}}>
            <Icon iconName="EDIT" size={16} />
          </ActionIconBtn>
          <ActionIconBtn type="button" aria-label="Delete contact" onClick={() => {}}>
            <Icon iconName="DELETE" size={16} />
          </ActionIconBtn>
        </span>
      );
    }
    return value;
  };

  const pageActions = [
    <Button
      key="download-contacts"
      text="Download Partner Contacts"
      color="cerulean"
      kind="transparent"
      size="small"
      iconLeft="DOCUMENT"
      onClick={() => {}}
    />,
    <Button
      key="bulk-import"
      text="Bulk Import"
      color="cerulean"
      kind="transparent"
      size="small"
      iconLeft="FOLDER"
      onClick={() => {}}
    />,
    <Button
      key="download-export"
      text="Download Partner Bulk Export"
      color="cerulean"
      kind="transparent"
      size="small"
      iconLeft="DOCUMENT"
      onClick={() => {}}
    />,
    <Button
      key="last-upload"
      text="Last Upload Results"
      color="cerulean"
      kind="transparent"
      size="small"
      iconLeft="DOCUMENT"
      onClick={() => {}}
    />,
    <Button
      key="add-partner"
      text="+ Add Partner"
      color="cerulean"
      kind="primary"
      size="small"
      iconLeft="ADD"
      onClick={() => {}}
    />,
  ];

  return (
    <PageWrap>
      <NewPageHeader
        title="Partners"
        subHeader={
          <Tabs
            tabs={MAIN_TABS}
            activeTabId={mainTab}
            onTabChange={setMainTab}
          />
        }
        pageActions={pageActions}
      />

      <TwoColumn>
        <LeftPanel>
          <LeftPanelToolbar>
            <SearchBar placeholder="Search partners..." onSubmit={() => {}} onChange={() => {}} />
            <SortRow>
              <span>Sorted by</span>
              <div style={{ minWidth: 120, maxWidth: 160 }}>
                <SelectSuggest
                  name="sort"
                  placeholder="Name"
                  options={SORT_OPTIONS}
                  value={sortBy}
                  onChange={(v) => setSortBy(v)}
                  useStringValue
                  label=""
                />
              </div>
            </SortRow>
          </LeftPanelToolbar>
          <PartnerList>
            {MOCK_PARTNERS.map((partner) => (
              <PartnerListItem
                key={partner.id}
                type="button"
                isActive={partner.id === selectedPartnerId}
                onClick={() => setSelectedPartnerId(partner.id)}
              >
                <PartnerListName>{partner.name}</PartnerListName>
                <PartnerListMeta>
                  {partner.identifierCount} identifier(s)
                </PartnerListMeta>
              </PartnerListItem>
            ))}
          </PartnerList>
          <LeftPanelFooter>
            <NumberedPager
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
              showInfo
            />
          </LeftPanelFooter>
        </LeftPanel>

        <RightPanel>
          <DetailHeader>
            <DetailTitle>{selectedPartner.name}</DetailTitle>
            <ActionIconBtn type="button" aria-label="Edit partner">
              <Icon iconName="EDIT" size={16} />
            </ActionIconBtn>
            <Button
              text="Manage Partner Access"
              color="sky"
              kind="inverted"
              size="small"
              iconRight="CHEVRON_RIGHT"
              onClick={() => {}}
            />
          </DetailHeader>
          <DetailTabsWrap>
            <Tabs
              tabs={DETAIL_TABS}
              activeTabId={detailTab}
              onTabChange={setDetailTab}
            />
          </DetailTabsWrap>
          <DetailContent>
            {detailTab === 'contacts' && (
              <>
                <SectionHeader>
                  <SectionTitle>Contacts</SectionTitle>
                  <ContactsToolbar>
                    <div style={{ minWidth: 200 }}>
                      <SearchBar placeholder="Search Contacts..." onSubmit={() => {}} onChange={() => {}} />
                    </div>
                    <Button
                      text="Add Contact"
                      color="sky"
                      kind="inverted"
                      size="small"
                      iconLeft="ADD"
                      onClick={() => {}}
                    />
                  </ContactsToolbar>
                </SectionHeader>
                <DreamTable
                  columns={CONTACT_COLUMNS}
                  data={MOCK_CONTACTS}
                  keyField="id"
                  renderCell={renderContactCell}
                />
              </>
            )}
            {detailTab === '997-config' && (
              <div style={{ marginTop: 16 }}>
                <SectionTitle>997 Configuration</SectionTitle>
                <SettingsDescription style={{ marginTop: 8, marginBottom: 0 }}>
                  Control what should happen when this partner sends you documents, based on whether the partner is expected to send a 997.
                </SettingsDescription>
                <HighlightSection>
                  <OverlineLabel>Global 997 behavior</OverlineLabel>
                  <SectionInlineControlRow>
                    <div>
                      <SubsectionLabel style={{ marginBottom: 4 }}>All Document Types</SubsectionLabel>
                      <SettingsDescription style={{ marginTop: 0, marginBottom: 0 }}>
                        Set the default 997 expectation for all document types from this partner. You can override this
                        for specific document types below.
                      </SettingsDescription>
                    </div>
                    <div style={{ width: 280, minWidth: 280, marginLeft: 'auto' }}>
                      <SelectSuggest
                        name="all-document-types-997"
                        label=""
                        placeholder="Select..."
                        options={ALL_DOCUMENT_TYPES_997_OPTIONS}
                        value={allDocumentTypes997Mode}
                        onChange={handle997AllDocumentTypesModeChange}
                      />
                    </div>
                  </SectionInlineControlRow>
                </HighlightSection>
                <SubsectionLabel style={{ display: 'block', marginTop: 24, marginBottom: 8 }}>
                  Specific 997 Exclusion List
                </SubsectionLabel>
                <Table997Wrapper>
                  <DreamTable
                    columns={[
                      { key: 'documentType', title: 'Document Type' },
                      { key: '997Mode', title: '997 Expected' },
                      { key: 'actions', title: '' },
                    ]}
                    data={[
                      ...specific997ExclusionList,
                      { _isAddRow: true, id: '__add__' },
                    ]}
                    keyField="id"
                    renderCell={(col, value, row) => {
                      if (row._isAddRow) {
                        if (col.key === 'documentType') {
                          return (
                            <Button
                              text="Add"
                              kind="transparent"
                              color="cerulean"
                              size="small"
                              iconLeft="ADD"
                              onClick={handle997ExclusionAddRow}
                            />
                          );
                        }
                        if (col.key === '997Mode') return null;
                        if (col.key === 'actions') return null;
                        return null;
                      }
                      if (col.key === 'documentType') {
                        if (row.documentType === '') {
                          return (
                            <SelectSuggest
                              name={`997-doc-type-${row.id}`}
                              label=""
                              placeholder="Select document type..."
                              options={DOCUMENT_TYPES_997.filter(
                                (opt) => !specific997ExclusionList.some((e) => e.documentType === opt.name)
                              )}
                              value=""
                              onChange={(v) => handle997ExclusionSetType(row.id, v)}
                              listMaxHeight="400px"
                              listWidth="320px"
                            />
                          );
                        }
                        return row.documentType;
                      }
                      if (col.key === '997Mode') {
                        const mode = row['997Mode'] ?? 'dont-expect-auto';
                        return (
                          <SelectSuggest
                            name={`997-mode-${row.id}`}
                            label=""
                            placeholder="Select..."
                            options={ALL_DOCUMENT_TYPES_997_OPTIONS}
                            value={mode}
                            onChange={(v) => handle997ExclusionChange(row.id, v)}
                            placement="bottom"
                          />
                        );
                      }
                      if (col.key === 'actions') {
                        return (
                          <ActionIconBtn
                            type="button"
                            aria-label={row.documentType ? `Remove ${row.documentType}` : 'Remove row'}
                            onClick={() => handle997ExclusionRemove(row.id)}
                          >
                            <Icon iconName="DELETE" size={16} />
                          </ActionIconBtn>
                        );
                      }
                      return value ?? '';
                    }}
                  />
                </Table997Wrapper>
                {specific997ExclusionList.length === 0 && (
                  <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--palette-greyedOutText, #8A94A0)' }}>
                    No document types in the exclusion list. Click Add to add a row, then select the document type.
                  </p>
                )}
              </div>
            )}
            {detailTab !== 'contacts' && detailTab !== '997-config' && (
              <p style={{ color: 'var(--palette-greyedOutText, #8A94A0)', margin: 0 }}>
                {DETAIL_TABS.find((t) => t.id === detailTab)?.label} content would go here.
              </p>
            )}
          </DetailContent>
        </RightPanel>
      </TwoColumn>
    </PageWrap>
  );
}
