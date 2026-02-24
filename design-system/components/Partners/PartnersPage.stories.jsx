import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import PartnersPage from './PartnersPage';

const MOCK_PARTNERS = [
  { id: '925485US00', name: '925485US00', identifierCount: 1 },
  { id: 'amazing-grace', name: 'Amazing Grace', identifierCount: 1 },
  { id: '3m-wm-inv', name: '3M-WM-INV', identifierCount: 3 },
  { id: '4m-parts', name: '4M Parts', identifierCount: 0 },
  { id: '4m-parts-wh', name: '4M PARTS WAREHOUSE', identifierCount: 1 },
  { id: '99cents', name: '99CENTS', identifierCount: 4 },
  { id: '99cents-sps', name: '99CENTS SPS', identifierCount: 1 },
  { id: 'a-g-auto', name: 'A & G AUTO PARTS', identifierCount: 2 },
  { id: 'a-and-jay', name: 'A AND JAY AUTOMOTIVE', identifierCount: 1 },
  { id: 'am-motor', name: 'AM MOTOR SUPPLY', identifierCount: 1 },
  { id: 'a-p-canada', name: 'A&P CANADA', identifierCount: 1 },
  { id: 'a-p-usa', name: 'A&P USA', identifierCount: 1 },
  { id: 'aafes', name: 'AAFES', identifierCount: 2 },
];

const MOCK_CONTACTS_925485 = [
  {
    id: 'c1',
    name: 'Sherry Smith',
    contactType: 'Business',
    partnerAccess: 'Yes',
    compliance: 'Yes',
    lastModified: '2/26/2021',
    email: 'sherry.smith@example.com',
    phone: '+1 555-0100',
    address: '123 Main St',
    jobTitle: 'Account Manager',
    office: 'HQ',
    notes: 'Primary contact for orders.',
  },
  {
    id: 'c2',
    name: 'Tauni MacLean',
    contactType: 'Business',
    partnerAccess: 'No',
    compliance: 'No',
    lastModified: '8/06/2025',
  },
  {
    id: 'c3',
    name: 'Vince Tkac',
    contactType: 'Business',
    partnerAccess: 'No',
    compliance: 'No',
    lastModified: '12/10/2024',
  },
];

const MOCK_BUSINESS_IDENTIFIERS_3M = [
  { id: 'edi1', qualifier: '01', value: '006173082', subValue: '006173082B', description: '' },
  { id: 'edi2', qualifier: 'AA', value: '0123456789', subValue: '0123456789', description: '' },
  { id: 'edi3', qualifier: 'ZZ', value: '0123456789', subValue: '0123456789', description: '' },
];

const MOCK_PRODUCTS = [
  {
    id: 'p1',
    organizationPartNumber: '345',
    businessPartnerPartNumber: 'ABC',
    itemDescription: 'Widget 1',
    customerNumber: '',
    erp: 'BOND',
  },
  {
    id: 'p2',
    organizationPartNumber: '456',
    businessPartnerPartNumber: 'CDE',
    itemDescription: 'Widget 2',
    customerNumber: '',
    erp: 'BOND',
  },
];

const MOCK_TAGS = [{ id: 't1', tagName: 'Apparel' }];

export default {
  title: 'Prototypes/PartnersPage',
  component: PartnersPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Partners list/detail page: left panel (search, sort, partner list, pagination) and right panel (selected partner header, secondary tabs). Tabs: Contacts, Business Identifiers (EDI table + settings), Products (product catalog), Tags, Contract Terms (PO Payment Terms, Net Payment Days). Uses only existing design system components.',
      },
    },
  },
};

export const Default = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState('3m-wm-inv');
  const [primaryTabId, setPrimaryTabId] = useState('all');
  const [secondaryTabId, setSecondaryTabId] = useState('identifiers');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [businessIdentifierPage, setBusinessIdentifierPage] = useState(1);
  const [businessIdentifierPageSize, setBusinessIdentifierPageSize] = useState(20);
  const [productPage, setProductPage] = useState(1);
  const [productPageSize, setProductPageSize] = useState(20);
  const [strictCheckBusinessIds, setStrictCheckBusinessIds] = useState(false);

  const contacts = selectedPartnerId === '925485US00' ? MOCK_CONTACTS_925485 : [];
  const businessIdentifiers =
    selectedPartnerId === '3m-wm-inv' ? MOCK_BUSINESS_IDENTIFIERS_3M : [];
  const products = selectedPartnerId === '3m-wm-inv' ? MOCK_PRODUCTS : [];
  const tags =
    selectedPartnerId === '3m-wm-inv' || selectedPartnerId === 'amazing-grace' ? MOCK_TAGS : [];
  const poPaymentTerms = [];

  return (
    <PartnersPage
      partners={MOCK_PARTNERS}
      contacts={contacts}
      businessIdentifiers={businessIdentifiers}
      products={products}
      tags={tags}
      poPaymentTerms={poPaymentTerms}
      totalCount={1079}
      page={page}
      pageSize={30}
      businessIdentifierPage={businessIdentifierPage}
      businessIdentifierPageSize={businessIdentifierPageSize}
      productPage={productPage}
      productPageSize={productPageSize}
      totalBusinessIdentifiers={businessIdentifiers.length}
      totalProducts={products.length}
      strictCheckBusinessIds={strictCheckBusinessIds}
      selectedPartnerId={selectedPartnerId}
      primaryTabId={primaryTabId}
      secondaryTabId={secondaryTabId}
      sortBy={sortBy}
      onPageChange={(p) => {
        setPage(p);
        action('pageChange')(p);
      }}
      onPartnerSelect={(id) => {
        setSelectedPartnerId(id);
        action('partnerSelect')(id);
      }}
      onPrimaryTabChange={(id) => {
        setPrimaryTabId(id);
        action('primaryTabChange')(id);
      }}
      onSecondaryTabChange={(id) => {
        setSecondaryTabId(id);
        action('secondaryTabChange')(id);
      }}
      onSortChange={(v) => {
        setSortBy(v);
        action('sortChange')(v);
      }}
      onSearchPartners={action('searchPartners')}
      onSearchContacts={action('searchContacts')}
      onSearchProducts={action('searchProducts')}
      onAddPartner={action('addPartner')}
      onAddContact={action('addContact')}
      onEditContact={action('editContact')}
      onDeleteContact={action('deleteContact')}
      onPartnerTitleChange={action('partnerTitleChange')}
      onManagePartnerAccess={action('managePartnerAccess')}
      onDownloadPartnerContacts={action('downloadPartnerContacts')}
      onBulkImport={action('bulkImport')}
      onDownloadBulkExport={action('downloadBulkExport')}
      onLastUploadResults={action('lastUploadResults')}
      onStrictCheckBusinessIdsChange={(v) => {
        setStrictCheckBusinessIds(v);
        action('strictCheckBusinessIdsChange')(v);
      }}
      onDataManagementLink={action('dataManagementLink')}
      onAddEdiIdentifier={action('addEdiIdentifier')}
      onEditEdiIdentifier={action('editEdiIdentifier')}
      onDeleteEdiIdentifier={action('deleteEdiIdentifier')}
      onBusinessIdentifierPageChange={(p) => {
        setBusinessIdentifierPage(p);
        action('businessIdentifierPageChange')(p);
      }}
      onBusinessIdentifierPageSizeChange={(s) => {
        setBusinessIdentifierPageSize(s);
        action('businessIdentifierPageSizeChange')(s);
      }}
      onAddProduct={action('addProduct')}
      onEditProduct={action('editProduct')}
      onDeleteProduct={action('deleteProduct')}
      onBulkImportProducts={action('bulkImportProducts')}
      onDownloadProductCatalog={action('downloadProductCatalog')}
      onProductPageChange={(p) => {
        setProductPage(p);
        action('productPageChange')(p);
      }}
      onProductPageSizeChange={(s) => {
        setProductPageSize(s);
        action('productPageSizeChange')(s);
      }}
      onAddTag={action('addTag')}
      onEditTag={action('editTag')}
      onDeleteTag={action('deleteTag')}
      onAddPoPaymentTerm={action('addPoPaymentTerm')}
    />
  );
};

export const NineNineSevenConfiguration = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState('3m-wm-inv');
  const [secondaryTabId, setSecondaryTabId] = useState('997-config');
  const [allDocumentTypes997Mode, setAllDocumentTypes997Mode] = useState('dont-expect-auto');
  const [exclusionList, setExclusionList] = useState([
    { documentType: 'Invoice', '997Mode': 'dont-expect-auto' },
    { documentType: 'Purchase Order', '997Mode': 'expect-pending' },
    { documentType: 'Functional Acknowledgment', '997Mode': 'dont-expect-unexpected' },
  ]);

  return (
    <PartnersPage
      partners={MOCK_PARTNERS}
      contacts={[]}
      businessIdentifiers={[]}
      products={[]}
      tags={[]}
      poPaymentTerms={[]}
      totalCount={MOCK_PARTNERS.length}
      page={1}
      pageSize={30}
      businessIdentifierPage={1}
      businessIdentifierPageSize={20}
      productPage={1}
      productPageSize={20}
      totalBusinessIdentifiers={0}
      totalProducts={0}
      selectedPartnerId={selectedPartnerId}
      primaryTabId="all"
      secondaryTabId={secondaryTabId}
      sortBy="name"
      allDocumentTypes997Mode={allDocumentTypes997Mode}
      specific997ExclusionList={exclusionList}
      onPartnerSelect={(id) => setSelectedPartnerId(id)}
      onSecondaryTabChange={(id) => setSecondaryTabId(id)}
      onAllDocumentTypes997ModeChange={(v) => setAllDocumentTypes997Mode(v)}
      on997ExclusionAdd={(docType) =>
        setExclusionList((prev) => [...prev, { documentType: docType, '997Mode': 'dont-expect-auto' }])
      }
      on997ExclusionChange={(docType, mode) =>
        setExclusionList((prev) =>
          prev.map((e) => (e.documentType === docType ? { ...e, '997Mode': mode } : e))
        )
      }
      on997ExclusionRemove={(docType) =>
        setExclusionList((prev) => prev.filter((e) => e.documentType !== docType))
      }
      onPageChange={action('pageChange')}
      onPrimaryTabChange={action('primaryTabChange')}
      onSortChange={action('sortChange')}
      onSearchPartners={action('searchPartners')}
      onSearchContacts={action('searchContacts')}
      onSearchProducts={action('searchProducts')}
      onAddPartner={action('addPartner')}
      onAddContact={action('addContact')}
      onEditContact={action('editContact')}
      onDeleteContact={action('deleteContact')}
      onPartnerTitleChange={action('partnerTitleChange')}
      onManagePartnerAccess={action('managePartnerAccess')}
      onDownloadPartnerContacts={action('downloadPartnerContacts')}
      onBulkImport={action('bulkImport')}
      onDownloadBulkExport={action('downloadBulkExport')}
      onLastUploadResults={action('lastUploadResults')}
    />
  );
};

export const NoPartnerSelected = () => (
  <PartnersPage
    partners={MOCK_PARTNERS}
    contacts={[]}
    businessIdentifiers={[]}
    products={[]}
    tags={[]}
    poPaymentTerms={[]}
    totalCount={1079}
    page={1}
    pageSize={30}
    businessIdentifierPage={1}
    businessIdentifierPageSize={20}
    productPage={1}
    productPageSize={20}
    totalBusinessIdentifiers={0}
    totalProducts={0}
    selectedPartnerId={null}
    primaryTabId="all"
    secondaryTabId="contacts"
    sortBy="name"
    onPageChange={action('pageChange')}
    onPartnerSelect={action('partnerSelect')}
    onPrimaryTabChange={action('primaryTabChange')}
    onSecondaryTabChange={action('secondaryTabChange')}
    onSortChange={action('sortChange')}
    onSearchPartners={action('searchPartners')}
    onSearchContacts={action('searchContacts')}
    onAddPartner={action('addPartner')}
    onAddContact={action('addContact')}
    onEditContact={action('editContact')}
    onDeleteContact={action('deleteContact')}
    onPartnerTitleChange={action('partnerTitleChange')}
    onManagePartnerAccess={action('managePartnerAccess')}
    onDownloadPartnerContacts={action('downloadPartnerContacts')}
    onBulkImport={action('bulkImport')}
    onDownloadBulkExport={action('downloadBulkExport')}
    onLastUploadResults={action('lastUploadResults')}
  />
);
