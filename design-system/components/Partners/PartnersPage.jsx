import React, { useState } from 'react';
import styled from '@emotion/styled';
import NewPageHeader from '../NewPageHeader';
import Tabs from '../Tabs';
import SearchBar from '../SearchBar';
import SelectSuggest from '../SelectSuggest';
import SelectableList from '../SelectableList';
import NumberedPager from '../NumberedPager';
import Button from '../Button';
import DreamTable from '../DreamTable';
import ConfirmPrompt from '../Prompt/ConfirmPrompt';
import Icon from '../Icon';
import Toggle from '../Toggle';

// -----------------------------------------------------------------------------
// Split layout: left list panel + right detail panel (no shared layout component)
// -----------------------------------------------------------------------------

const Page = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.offWhite};
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SplitLayout = styled.div`
  display: flex;
  flex: 1 1 0;
  min-height: 0;
  gap: ${({ theme }) => theme.constants.spacing3x};
  margin-top: ${({ theme }) => theme.constants.spacing2x};
`;

const LeftPanel = styled.div`
  width: 320px;
  min-width: 320px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  padding: ${({ theme }) => theme.constants.spacing2x};
  overflow: hidden;
`;

const ListScroll = styled.div`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  overflow: hidden;
`;

const RightContent = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  overflow: auto;
  flex: 1;
`;

const PartnerHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const SectionTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const EmptyDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
`;

const PartnerTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const PartnerTitle = styled.span`
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
`;

const PartnerEditIcon = styled.span`
  color: ${({ theme }) => theme.palette.ceruleanHover};
  cursor: pointer;
  display: inline-flex;
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

// Expandable contact row detail (matches Contacts tab reference)
const ContactExpandedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.constants.spacing3x} ${({ theme }) => theme.constants.spacing4x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;
const ContactDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacingHalf};
`;
const ContactDetailLabel = styled.span`
  color: ${({ theme }) => theme.palette.greyedOutText};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;
const ContactDetailValue = styled.span`
  color: ${({ theme }) => theme.palette.black};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacingHalf};
`;
const ContactDetailEdit = styled.span`
  color: ${({ theme }) => theme.palette.ceruleanHover};
  cursor: pointer;
  display: inline-flex;
`;

const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.constants.spacing2x};
  margin-top: ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

const ResultsPerPageWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const PageSizeOption = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  color: ${({ theme, active }) => (active ? theme.palette.cerulean : theme.palette.greyedOutText)};
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  &:hover {
    color: ${({ theme }) => theme.palette.cerulean};
  }
`;

const SettingsBlock = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacing3x};
  padding-top: ${({ theme }) => theme.constants.spacing2x};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-wrap: wrap;
`;

const SettingsDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
  flex: 1;
  min-width: 200px;
`;

const SettingsLink = styled.a`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SubsectionLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

const SubsectionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
`;

const EmptyStateText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  text-align: center;
  padding: ${({ theme }) => theme.constants.spacing3x};
`;

const Table997Wrapper = styled.div`
  & table th:last-child,
  & table td:last-child {
    width: 1%;
    white-space: nowrap;
  }
`;

const PRIMARY_TABS = [
  { id: 'all', label: 'All Partners' },
  { id: 'unknown', label: 'Unknown Business Identifiers (120)' },
  { id: 'tags', label: 'Partner Tags' },
];

const SECONDARY_TABS = [
  { id: 'contacts', label: 'Contacts' },
  { id: 'identifiers', label: 'Business Identifiers' },
  { id: 'products', label: 'Products' },
  { id: 'tags', label: 'Tags' },
  { id: 'contracts', label: 'Contract Terms' },
  { id: '997-config', label: '997 Configuration' },
];

// Document types for 997 Specific Exclusion List (from EDI document type list)
const DOCUMENT_TYPES = [
  'Advance Ship Notice',
  'Application Advice',
  'Credit/Debit Adjustment',
  'Delivery/Return Acknowledgment Adjustment',
  'Delivery/Return Base Record',
  'Functional Acknowledgment',
  'Grocery Products Invoice',
  'Grocery Products Purchase Order',
  'Implementation Acknowledgment',
  'Inventory Inquiry/Advice',
  'Invoice',
  'Item Maintenance',
  'Lockbox',
  'Motor Carrier Bill of Lading',
  'Motor Carrier Freight Details and Invoice',
  'Motor Carrier Load Tender',
  'Order Status Report',
  'Organizational Relationships',
  'Planning Schedule',
  'Price Authorization Acknowledgment',
  'Price Information',
  'Price/Sales Catalog',
  'Product Activity',
  'Product Transfer Account Adjustment',
  'Product Transfer and Resale Report',
  'Promotion Announcement',
  'Purchase Order',
  'Purchase Order Acknowledgment',
  'Purchase Order Change',
  'Rail Carrier Invoice',
  'Rail Carrier Shipment',
  'Rail Carrier Waybill',
  'Receiving Advice',
  'Remittance Advice',
  'Report of Test Results',
  'Response to Load Tender',
  'Response to Product Transfer Account Adjustment',
  'Return Merchandise Authorization',
  'Routing Instructions',
  'Shipment and Billing Notice',
  'Shipping Schedule',
  'Status Details',
  'Text Message',
  'Transportation Carrier Shipment Status Message',
  'Unsupported Document Type',
  'Warehouse Inventory Adjustment Advice',
  'Warehouse Shipping Advice',
  'Warehouse Shipping Order',
  'Warehouse Stock Transfer Receipt Advice',
  'Warehouse Stock Transfer Shipment Advice',
].map((label) => ({ name: label, valueText: label }));

const ALL_DOCUMENT_TYPES_997_OPTIONS = [
  { name: 'expect-pending', valueText: 'Expect 997 (Pending)' },
  { name: 'dont-expect-auto', valueText: "Don't Expect 997 (Auto Accept)" },
  { name: 'dont-expect-unexpected', valueText: "Don't Expect 997 (Unexpected)" },
];

const SORT_OPTIONS = [
  { name: 'name', valueText: 'Name' },
];

const CONTACT_COLUMNS = [
  { key: 'name', title: 'Name' },
  { key: 'contactType', title: 'Contact Type' },
  { key: 'partnerAccess', title: 'Partner Access' },
  { key: 'compliance', title: 'Compliance' },
  { key: 'lastModified', title: 'Last Modified' },
  { key: 'actions', title: '' },
];

const BUSINESS_IDENTIFIER_COLUMNS = [
  { key: 'qualifier', title: 'Qualifier' },
  { key: 'value', title: 'Value' },
  { key: 'subValue', title: 'Sub Value' },
  { key: 'description', title: 'Description' },
  { key: 'actions', title: '' },
];

const PRODUCT_COLUMNS = [
  { key: 'organizationPartNumber', title: 'Organization Part Number' },
  { key: 'businessPartnerPartNumber', title: 'Business Partner Part Number' },
  { key: 'itemDescription', title: 'Item Description' },
  { key: 'customerNumber', title: 'Customer Number' },
  { key: 'erp', title: 'ERP' },
  { key: 'actions', title: '' },
];

const TAG_COLUMNS = [{ key: 'tagName', title: 'Tag Name' }, { key: 'actions', title: '' }];

export default function PartnersPage({
  partners = [],
  contacts = [],
  businessIdentifiers = [],
  products = [],
  tags = [],
  poPaymentTerms = [],
  totalCount = 0,
  page = 1,
  pageSize = 30,
  businessIdentifierPage = 1,
  businessIdentifierPageSize = 20,
  productPage = 1,
  productPageSize = 20,
  selectedPartnerId,
  primaryTabId = 'all',
  secondaryTabId = 'contacts',
  sortBy = 'name',
  strictCheckBusinessIds = false,
  totalBusinessIdentifiers = 0,
  totalProducts = 0,
  onPageChange,
  onPartnerSelect,
  onPrimaryTabChange,
  onSecondaryTabChange,
  onSortChange,
  onSearchPartners,
  onSearchContacts,
  onSearchProducts,
  onAddPartner,
  onAddContact,
  onEditContact,
  onDeleteContact,
  onPartnerTitleChange,
  onManagePartnerAccess,
  onDownloadPartnerContacts,
  onBulkImport,
  onDownloadBulkExport,
  onLastUploadResults,
  onStrictCheckBusinessIdsChange,
  onDataManagementLink,
  onAddEdiIdentifier,
  onEditEdiIdentifier,
  onDeleteEdiIdentifier,
  onBusinessIdentifierPageChange,
  onBusinessIdentifierPageSizeChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onBulkImportProducts,
  onDownloadProductCatalog,
  onProductPageChange,
  onProductPageSizeChange,
  onAddTag,
  onEditTag,
  onDeleteTag,
  onAddPoPaymentTerm,
  allDocumentTypes997Mode = 'dont-expect-auto',
  specific997ExclusionList = [],
  onAllDocumentTypes997ModeChange,
  on997ExclusionAdd,
  on997ExclusionChange,
  on997ExclusionRemove,
}) {
  const [partnerSearch, setPartnerSearch] = useState('');
  const [contactsSearch, setContactsSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteEdiConfirm, setDeleteEdiConfirm] = useState(null);
  const [deleteProductConfirm, setDeleteProductConfirm] = useState(null);
  const [deleteTagConfirm, setDeleteTagConfirm] = useState(null);
  const [local997AllDocumentTypesMode, setLocal997AllDocumentTypesMode] = useState(allDocumentTypes997Mode);
  const [local997ExclusionList, setLocal997ExclusionList] = useState(specific997ExclusionList);
  const [add997DocumentType, setAdd997DocumentType] = useState('');

  const effective997AllDocumentTypesMode =
    onAllDocumentTypes997ModeChange ? allDocumentTypes997Mode : local997AllDocumentTypesMode;
  const effective997ExclusionList = on997ExclusionAdd != null ? specific997ExclusionList : local997ExclusionList;

  const handle997AllDocumentTypesModeChange = (value) => {
    if (onAllDocumentTypes997ModeChange) {
      onAllDocumentTypes997ModeChange(value);
    } else {
      setLocal997AllDocumentTypesMode(value);
    }
  };

  const handle997ExclusionAdd = (documentType) => {
    if (!documentType || effective997ExclusionList.some((e) => e.documentType === documentType)) return;
    if (on997ExclusionAdd) {
      on997ExclusionAdd(documentType);
    } else {
      setLocal997ExclusionList((prev) => [
        ...prev,
        { documentType, '997Mode': 'dont-expect-auto' },
      ]);
    }
    setAdd997DocumentType('');
  };

  const handle997ExclusionChange = (documentType, mode) => {
    if (on997ExclusionChange) {
      on997ExclusionChange(documentType, mode);
    } else {
      setLocal997ExclusionList((prev) =>
        prev.map((e) => (e.documentType === documentType ? { ...e, '997Mode': mode } : e))
      );
    }
  };

  const handle997ExclusionRemove = (documentType) => {
    if (on997ExclusionRemove) {
      on997ExclusionRemove(documentType);
    } else {
      setLocal997ExclusionList((prev) => prev.filter((e) => e.documentType !== documentType));
    }
  };

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) || null;
  const listItems = partners.map((p) => ({
    id: p.id,
    primaryText: p.name ?? p.id,
    secondaryText: `${p.identifierCount ?? 0} Identifier(s)`,
  }));

  const handlePartnerSearchSubmit = (value) => {
    setPartnerSearch(value);
    onSearchPartners?.(value);
  };

  const handleContactsSearchSubmit = (value) => {
    setContactsSearch(value);
    onSearchContacts?.(value);
  };

  const handleDeleteContact = (contact) => {
    setDeleteConfirm(contact);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      onDeleteContact?.(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDeleteEdiIdentifier = (row) => setDeleteEdiConfirm(row);
  const handleConfirmDeleteEdi = () => {
    if (deleteEdiConfirm) {
      onDeleteEdiIdentifier?.(deleteEdiConfirm);
      setDeleteEdiConfirm(null);
    }
  };

  const handleDeleteProduct = (row) => setDeleteProductConfirm(row);
  const handleConfirmDeleteProduct = () => {
    if (deleteProductConfirm) {
      onDeleteProduct?.(deleteProductConfirm);
      setDeleteProductConfirm(null);
    }
  };

  const handleDeleteTag = (row) => setDeleteTagConfirm(row);
  const handleConfirmDeleteTag = () => {
    if (deleteTagConfirm) {
      onDeleteTag?.(deleteTagConfirm);
      setDeleteTagConfirm(null);
    }
  };

  const renderContactCell = (col, value, row) => {
    if (col.key === 'actions') {
      return (
        <ActionsCell>
          <Button
            iconOnly="EDIT"
            kind="transparent"
            color="blue"
            size="extraSmall"
            onClick={() => onEditContact?.(row)}
            aria-label="Edit contact"
          />
          <Button
            iconOnly="DELETE"
            kind="transparent"
            color="red"
            size="extraSmall"
            onClick={() => handleDeleteContact(row)}
            aria-label="Delete contact"
          />
        </ActionsCell>
      );
    }
    return value;
  };

  const renderContactDetailField = (label, value, contact) => (
    <ContactDetailItem>
      <ContactDetailLabel>{label}</ContactDetailLabel>
      <ContactDetailValue>
        {value ?? 'Not provided'}
        {onEditContact && (
          <ContactDetailEdit
            onClick={(e) => {
              e.stopPropagation();
              onEditContact(contact);
            }}
            role="button"
            aria-label={`Edit ${label}`}
          >
            <Icon iconName="EDIT" size={14} />
          </ContactDetailEdit>
        )}
      </ContactDetailValue>
    </ContactDetailItem>
  );

  const renderContactExpandedRow = (contact) => (
    <ContactExpandedGrid>
      {renderContactDetailField('Email', contact.email, contact)}
      {renderContactDetailField('Phone', contact.phone, contact)}
      {renderContactDetailField('Address', contact.address, contact)}
      {renderContactDetailField('Job Title', contact.jobTitle, contact)}
      {renderContactDetailField('Office', contact.office, contact)}
      {renderContactDetailField('Notes', contact.notes || 'Edit to add notes', contact)}
    </ContactExpandedGrid>
  );

  const renderBusinessIdentifierCell = (col, value, row) => {
    if (col.key === 'actions') {
      return (
        <ActionsCell>
          <Button
            iconOnly="EDIT"
            kind="transparent"
            color="blue"
            size="extraSmall"
            onClick={() => onEditEdiIdentifier?.(row)}
            aria-label="Edit EDI identifier"
          />
          <Button
            iconOnly="DELETE"
            kind="transparent"
            color="red"
            size="extraSmall"
            onClick={() => handleDeleteEdiIdentifier(row)}
            aria-label="Delete EDI identifier"
          />
        </ActionsCell>
      );
    }
    return value ?? '';
  };

  const renderProductCell = (col, value, row) => {
    if (col.key === 'actions') {
      return (
        <ActionsCell>
          <Button
            iconOnly="EDIT"
            kind="transparent"
            color="blue"
            size="extraSmall"
            onClick={() => onEditProduct?.(row)}
            aria-label="Edit product"
          />
          <Button
            iconOnly="DELETE"
            kind="transparent"
            color="red"
            size="extraSmall"
            onClick={() => handleDeleteProduct(row)}
            aria-label="Delete product"
          />
        </ActionsCell>
      );
    }
    return value ?? '';
  };

  const renderTagCell = (col, value, row) => {
    if (col.key === 'actions') {
      return (
        <ActionsCell>
          <Button
            iconOnly="EDIT"
            kind="transparent"
            color="blue"
            size="extraSmall"
            onClick={() => onEditTag?.(row)}
            aria-label="Edit tag"
          />
          <Button
            iconOnly="DELETE"
            kind="transparent"
            color="red"
            size="extraSmall"
            onClick={() => handleDeleteTag(row)}
            aria-label="Delete tag"
          />
        </ActionsCell>
      );
    }
    return value ?? '';
  };

  const pageActions = [
    onDownloadPartnerContacts && (
      <Button
        key="download-contacts"
        text="Download Partner Contacts"
        kind="transparent"
        color="cerulean"
        size="small"
        iconLeft="DOCUMENT"
        onClick={onDownloadPartnerContacts}
      />
    ),
    onBulkImport && (
      <Button
        key="bulk-import"
        text="Bulk Import"
        kind="transparent"
        color="cerulean"
        size="small"
        iconLeft="FOLDER"
        onClick={onBulkImport}
      />
    ),
    onDownloadBulkExport && (
      <Button
        key="download-export"
        text="Download Partner Bulk Export"
        kind="transparent"
        color="cerulean"
        size="small"
        iconLeft="DOCUMENT"
        onClick={onDownloadBulkExport}
      />
    ),
    onLastUploadResults && (
      <Button
        key="last-upload"
        text="Last Upload Results"
        kind="transparent"
        color="cerulean"
        size="small"
        iconLeft="BELL"
        onClick={onLastUploadResults}
      />
    ),
    onAddPartner && (
      <Button
        key="add-partner"
        text="+ Add Partner"
        kind="default"
        color="cerulean"
        size="small"
        iconLeft="ADD"
        onClick={onAddPartner}
      />
    ),
  ].filter(Boolean);

  const primaryTabsEl = (
    <Tabs
      tabs={PRIMARY_TABS}
      activeTabId={primaryTabId}
      onTabChange={onPrimaryTabChange}
    />
  );

  return (
    <Page data-component="partners-page">
      <NewPageHeader
        title="Partners"
        pageActions={pageActions}
        subHeader={primaryTabsEl}
      />

      <SplitLayout>
        <LeftPanel>
          <SearchBar
            placeholder="Search partners..."
            onChange={(v) => setPartnerSearch(v)}
            onSubmit={handlePartnerSearchSubmit}
          />
          <SelectSuggest
            name="sort-partners"
            label=""
            placeholder="Sorted by Name"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(v) => onSortChange?.(v)}
          />
          <ListScroll>
            <SelectableList
              items={listItems}
              selectedId={selectedPartnerId}
              onSelect={(id) => onPartnerSelect?.(id)}
              aria-label="Partners"
            />
          </ListScroll>
          <NumberedPager
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={onPageChange}
            showInfo
          />
        </LeftPanel>

        <RightPanel>
          {!selectedPartner ? (
            <EmptyDetail>Select a partner to view details.</EmptyDetail>
          ) : (
            <RightContent>
              <PartnerHeaderRow>
                <PartnerTitleWrap>
                  <PartnerTitle>{selectedPartner.name ?? selectedPartner.id}</PartnerTitle>
                  <PartnerEditIcon
                    onClick={() => {}}
                    role="button"
                    aria-label="Edit partner"
                    onKeyDown={(e) => e.key === 'Enter' && (onPartnerTitleChange ? onPartnerTitleChange(selectedPartner.name ?? selectedPartner.id) : null)}
                  >
                    <Icon iconName="EDIT" size={16} />
                  </PartnerEditIcon>
                </PartnerTitleWrap>
                {onManagePartnerAccess && (
                  <Button
                    text="Manage Partner Access"
                    kind="transparent"
                    color="cerulean"
                    size="small"
                    iconRight="CHEVRON_RIGHT"
                    onClick={() => onManagePartnerAccess(selectedPartner)}
                  />
                )}
              </PartnerHeaderRow>

              <Tabs
                tabs={SECONDARY_TABS}
                activeTabId={secondaryTabId}
                onTabChange={onSecondaryTabChange}
              />

              {secondaryTabId === 'contacts' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitleRow>
                    <SectionTitle>Contacts</SectionTitle>
                    {onAddContact && (
                      <Button
                        text="Add Contact"
                        kind="transparent"
                        color="cerulean"
                        size="small"
                        onClick={() => onAddContact(selectedPartner)}
                      />
                    )}
                  </SectionTitleRow>
                  <SearchBar
                    placeholder="Search Contacts..."
                    onChange={(v) => setContactsSearch(v)}
                    onSubmit={handleContactsSearchSubmit}
                  />
                  <DreamTable
                    columns={CONTACT_COLUMNS}
                    data={contacts}
                    keyField="id"
                    renderCell={renderContactCell}
                    expandable
                    expandedRowRender={renderContactExpandedRow}
                  />
                </div>
              )}

              {secondaryTabId === 'identifiers' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitle>Business Identifiers</SectionTitle>
                  <SubsectionRow style={{ marginTop: 16 }}>
                    <SubsectionLabel>EDI</SubsectionLabel>
                    {onAddEdiIdentifier && (
                      <Button
                        text="Add EDI Identifier"
                        kind="transparent"
                        color="cerulean"
                        size="small"
                        iconLeft="ADD"
                        onClick={() => onAddEdiIdentifier(selectedPartner)}
                      />
                    )}
                  </SubsectionRow>
                  <DreamTable
                    columns={BUSINESS_IDENTIFIER_COLUMNS}
                    data={businessIdentifiers}
                    keyField="id"
                    renderCell={renderBusinessIdentifierCell}
                  />
                  <PaginationRow>
                    <ResultsPerPageWrap>
                      <span>Results per page:</span>
                      {[20, 40, 60].map((size) => (
                        <PageSizeOption
                          key={size}
                          type="button"
                          active={businessIdentifierPageSize === size}
                          onClick={() => onBusinessIdentifierPageSizeChange?.(size)}
                        >
                          {size}
                        </PageSizeOption>
                      ))}
                    </ResultsPerPageWrap>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {totalBusinessIdentifiers} Result{totalBusinessIdentifiers !== 1 ? 's' : ''}{' '}
                      <Button
                        text="<"
                        kind="transparent"
                        color="cerulean"
                        size="extraSmall"
                        onClick={() => onBusinessIdentifierPageChange?.(businessIdentifierPage - 1)}
                        disabled={businessIdentifierPage <= 1}
                        aria-label="Previous page"
                      />
                      <span style={{ margin: '0 4px' }}> {businessIdentifierPage} </span>
                      <Button
                        text=">"
                        kind="transparent"
                        color="cerulean"
                        size="extraSmall"
                        onClick={() => onBusinessIdentifierPageChange?.(businessIdentifierPage + 1)}
                        disabled={
                          businessIdentifierPage >=
                          Math.ceil(totalBusinessIdentifiers / businessIdentifierPageSize)
                        }
                        aria-label="Next page"
                      />
                    </span>
                  </PaginationRow>
                  <SettingsBlock>
                    <SettingsRow>
                      <Toggle
                        label="using inherited value"
                        labelSide="left"
                        on={strictCheckBusinessIds}
                        onChange={(v) => onStrictCheckBusinessIdsChange?.(v)}
                      />
                    </SettingsRow>
                    <SettingsDescription>
                      Strictly check business identifiers when correlating documents for{' '}
                      {selectedPartner?.name ?? selectedPartner?.id ?? 'this partner'}.
                    </SettingsDescription>
                    {onDataManagementLink && (
                      <SettingsLink
                        onClick={onDataManagementLink}
                        role="button"
                        onKeyDown={(e) => e.key === 'Enter' && onDataManagementLink()}
                        tabIndex={0}
                      >
                        To edit default settings go to the Data Management page.
                      </SettingsLink>
                    )}
                  </SettingsBlock>
                </div>
              )}

              {secondaryTabId === 'products' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitle>Product Catalog</SectionTitle>
                  <SectionTitle style={{ fontSize: '14px', fontWeight: 400, marginTop: 4 }}>
                    Products
                  </SectionTitle>
                  <SectionTitleRow style={{ marginTop: 16 }}>
                    <span />
                    <ActionsCell>
                      {onBulkImportProducts && (
                        <Button
                          text="↑ Bulk Import"
                          kind="transparent"
                          color="cerulean"
                          size="small"
                          iconLeft="FOLDER"
                          onClick={() => onBulkImportProducts(selectedPartner)}
                        />
                      )}
                      {onDownloadProductCatalog && (
                        <Button
                          text="↓ Download Product Catalog"
                          kind="transparent"
                          color="cerulean"
                          size="small"
                          iconLeft="DOCUMENT"
                          onClick={() => onDownloadProductCatalog(selectedPartner)}
                        />
                      )}
                      {onAddProduct && (
                        <Button
                          text="Add Product"
                          kind="default"
                          color="cerulean"
                          size="small"
                          iconLeft="ADD"
                          onClick={() => onAddProduct(selectedPartner)}
                        />
                      )}
                    </ActionsCell>
                  </SectionTitleRow>
                  <div style={{ marginTop: 16 }}>
                    <SearchBar
                      placeholder="Search Product Catalog..."
                      onChange={(v) => setProductSearch(v)}
                      onSubmit={(v) => onSearchProducts?.(v)}
                    />
                  </div>
                  <DreamTable
                    columns={PRODUCT_COLUMNS}
                    data={products}
                    keyField="id"
                    renderCell={renderProductCell}
                  />
                  <PaginationRow>
                    <ResultsPerPageWrap>
                      <span>Results per page:</span>
                      {[20, 40, 60].map((size) => (
                        <PageSizeOption
                          key={size}
                          type="button"
                          active={productPageSize === size}
                          onClick={() => onProductPageSizeChange?.(size)}
                        >
                          {size}
                        </PageSizeOption>
                      ))}
                    </ResultsPerPageWrap>
                    <span>
                      {totalProducts} Result{totalProducts !== 1 ? 's' : ''}{' '}
                      <Button
                        text="<"
                        kind="transparent"
                        color="cerulean"
                        size="extraSmall"
                        onClick={() => onProductPageChange?.(productPage - 1)}
                        disabled={productPage <= 1}
                        aria-label="Previous page"
                      />
                      <span style={{ margin: '0 4px' }}> {productPage} </span>
                      <Button
                        text=">"
                        kind="transparent"
                        color="cerulean"
                        size="extraSmall"
                        onClick={() => onProductPageChange?.(productPage + 1)}
                        disabled={
                          productPage >= Math.ceil(totalProducts / productPageSize)
                        }
                        aria-label="Next page"
                      />
                    </span>
                  </PaginationRow>
                </div>
              )}

              {secondaryTabId === 'tags' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitleRow>
                    <SectionTitle>Tags</SectionTitle>
                    {onAddTag && (
                      <Button
                        text="Add Tag"
                        kind="transparent"
                        color="cerulean"
                        size="small"
                        iconLeft="ADD"
                        onClick={() => onAddTag(selectedPartner)}
                      />
                    )}
                  </SectionTitleRow>
                  <DreamTable
                    columns={TAG_COLUMNS}
                    data={tags}
                    keyField="id"
                    renderCell={renderTagCell}
                  />
                </div>
              )}

              {secondaryTabId === 'contracts' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitle>Contract Terms</SectionTitle>
                  <SubsectionRow style={{ marginTop: 16, marginBottom: 8 }}>
                    <SubsectionLabel>PO Payment Terms</SubsectionLabel>
                    {onAddPoPaymentTerm && (
                      <Button
                        text="Add PO Payment Term"
                        kind="transparent"
                        color="cerulean"
                        size="small"
                        iconLeft="ADD"
                        onClick={() => onAddPoPaymentTerm(selectedPartner)}
                      />
                    )}
                  </SubsectionRow>
                  {poPaymentTerms.length > 0 ? (
                    <DreamTable
                      columns={[
                        { key: 'term', title: 'Term' },
                        { key: 'actions', title: '' },
                      ]}
                      data={poPaymentTerms}
                      keyField="id"
                      renderCell={(col, value, row) =>
                        col.key === 'actions' ? (
                          <ActionsCell>
                            <Button
                              iconOnly="EDIT"
                              kind="transparent"
                              color="blue"
                              size="extraSmall"
                              aria-label="Edit"
                            />
                            <Button
                              iconOnly="DELETE"
                              kind="transparent"
                              color="red"
                              size="extraSmall"
                              aria-label="Delete"
                            />
                          </ActionsCell>
                        ) : (
                          value
                        )
                      }
                    />
                  ) : null}
                  <SubsectionLabel style={{ display: 'block', marginTop: 24, marginBottom: 8 }}>
                    Net Payment Days
                  </SubsectionLabel>
                  <EmptyStateText>No Net Payment Days</EmptyStateText>
                </div>
              )}

              {secondaryTabId === '997-config' && (
                <div style={{ marginTop: 16 }}>
                  <SectionTitle>997 Configuration</SectionTitle>
                  <SettingsDescription style={{ marginTop: 8, marginBottom: 0 }}>
                    Control what should happen when this partner sends you documents, based on whether the partner is expected to send a 997.
                  </SettingsDescription>
                  <SettingsRow style={{ marginTop: 16, alignItems: 'center', gap: 12 }}>
                    <SubsectionLabel style={{ marginBottom: 0 }}>All Document Types</SubsectionLabel>
                    <div style={{ width: 280, minWidth: 280, marginLeft: 'auto' }}>
                      <SelectSuggest
                        name="all-document-types-997"
                        label=""
                        placeholder="Select..."
                        options={ALL_DOCUMENT_TYPES_997_OPTIONS}
                        value={effective997AllDocumentTypesMode}
                        onChange={handle997AllDocumentTypesModeChange}
                      />
                    </div>
                  </SettingsRow>
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
                      ...effective997ExclusionList,
                      { _isAddRow: true, documentType: '__add__' },
                    ]}
                    keyField="documentType"
                    renderCell={(col, value, row) => {
                      if (row._isAddRow) {
                        if (col.key === 'documentType') {
                          return (
                            <SelectSuggest
                              name="add-997-document-type"
                              label=""
                              placeholder="Add document type..."
                              options={DOCUMENT_TYPES.filter(
                                (opt) =>
                                  !effective997ExclusionList.some((e) => e.documentType === opt.name)
                              )}
                              value={add997DocumentType}
                              onChange={(v) => setAdd997DocumentType(v)}
                              listMaxHeight="400px"
                              listWidth="320px"
                            />
                          );
                        }
                        if (col.key === '997Mode') return null;
                        if (col.key === 'actions') {
                          return (
                            <Button
                              text="Add"
                              kind="transparent"
                              color="cerulean"
                              size="small"
                              iconLeft="ADD"
                              onClick={() => handle997ExclusionAdd(add997DocumentType)}
                              disabled={!add997DocumentType}
                            />
                          );
                        }
                        return null;
                      }
                      if (col.key === '997Mode') {
                        const mode =
                          row['997Mode'] ??
                          (row.accepted === true ? 'dont-expect-auto' : row.accepted === false ? 'expect-pending' : 'dont-expect-auto');
                        return (
                          <SelectSuggest
                            name={`997-mode-${row.documentType}`}
                            label=""
                            placeholder="Select..."
                            options={ALL_DOCUMENT_TYPES_997_OPTIONS}
                            value={mode}
                            onChange={(v) => handle997ExclusionChange(row.documentType, v)}
                            placement="bottom"
                          />
                        );
                      }
                      if (col.key === 'actions') {
                        return (
                          <ActionsCell>
                            <Button
                              iconOnly="DELETE"
                              kind="transparent"
                              color="red"
                              size="extraSmall"
                              onClick={() => handle997ExclusionRemove(row.documentType)}
                              aria-label={`Remove ${row.documentType}`}
                            />
                          </ActionsCell>
                        );
                      }
                      return value ?? '';
                    }}
                  />
                  </Table997Wrapper>
                  {effective997ExclusionList.length === 0 && (
                    <EmptyStateText style={{ marginTop: 8 }}>
                      No document types in the exclusion list. Add one in the row above to control 997 expected per document type.
                    </EmptyStateText>
                  )}
                </div>
              )}
            </RightContent>
          )}
        </RightPanel>
      </SplitLayout>

      <ConfirmPrompt
        isShowing={!!deleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete contact"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      >
        {deleteConfirm && (
          <span>
            Are you sure you want to delete {deleteConfirm.name}?
          </span>
        )}
      </ConfirmPrompt>

      <ConfirmPrompt
        isShowing={!!deleteEdiConfirm}
        onConfirm={handleConfirmDeleteEdi}
        onCancel={() => setDeleteEdiConfirm(null)}
        title="Delete EDI identifier"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      >
        {deleteEdiConfirm && (
          <span>
            Are you sure you want to delete this EDI identifier?
          </span>
        )}
      </ConfirmPrompt>

      <ConfirmPrompt
        isShowing={!!deleteProductConfirm}
        onConfirm={handleConfirmDeleteProduct}
        onCancel={() => setDeleteProductConfirm(null)}
        title="Delete product"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      >
        {deleteProductConfirm && (
          <span>
            Are you sure you want to delete this product?
          </span>
        )}
      </ConfirmPrompt>

      <ConfirmPrompt
        isShowing={!!deleteTagConfirm}
        onConfirm={handleConfirmDeleteTag}
        onCancel={() => setDeleteTagConfirm(null)}
        title="Delete tag"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="red"
      >
        {deleteTagConfirm && (
          <span>
            Are you sure you want to delete {deleteTagConfirm.tagName}?
          </span>
        )}
      </ConfirmPrompt>
    </Page>
  );
}
