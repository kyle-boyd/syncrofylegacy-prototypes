import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  NewPageHeader,
  Card,
  CardHeader,
  CardBody,
  EnhancedList,
  Button,
  Checkbox,
  Toggle,
  Tabs,
  TextInput,
  Tag,
  FiltersBar,
  DocumentTypeFilterPopover,
  LoadedOnDateFilterPopover,
  AcknowledgmentStatusFilterPopover,
  DreamTable,
  Message,
  Radio,
} from '@design-system';
import * as DesignSystem from '@design-system';
import PrototypeBanner from '../components/PrototypeBanner';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.cloud};
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.constants.spacing3x};
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing3x};
  box-sizing: border-box;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const NavColumn = styled(Column)`
  flex: 0 0 260px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

const MainColumn = styled(Column)`
  flex: 1;
  min-width: 0;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const ControlField = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const ControlLabel = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const ControlHelpText = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.gray};
`;

const TextInputControl = styled.input`
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  border: 1px solid ${({ theme }) => theme.palette.silver};
  padding: ${({ theme }) => `${theme.constants.spacing0_5x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const SelectControl = styled.select`
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  border: 1px solid ${({ theme }) => theme.palette.silver};
  padding: ${({ theme }) => `${theme.constants.spacing0_5x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  background-color: ${({ theme }) => theme.palette.white};
`;

const CheckboxControl = styled.input`
  width: 16px;
  height: 16px;
`;

const BooleanRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const PreviewSurface = styled.div`
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  background-color: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const StoryMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const StoryName = styled.div`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const StoryDescription = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.gray};
`;

// Simple configuration describing which components to show and which props are editable.
// This list is the curated set with rich controls. The rest of the design-system
// components are added automatically below so that everything appears in the gallery.
const STORIES = [
  {
    id: 'button-primary',
    componentName: 'Button',
    group: 'Inputs & Actions',
    label: 'Button',
    description: 'Core button component with size, color, and state controls.',
    Component: Button,
    initialProps: {
      text: 'Primary action',
      color: 'cerulean',
      kind: 'default',
      size: 'small',
      disabled: false,
      isFullWidth: false,
    },
    controls: {
      text: { type: 'text', label: 'Label' },
      color: {
        type: 'select',
        label: 'Color',
        options: ['cerulean', 'blue', 'green', 'red', 'orange'],
      },
      kind: {
        type: 'select',
        label: 'Kind',
        options: ['default', 'inverted', 'transparent'],
      },
      size: {
        type: 'select',
        label: 'Size',
        options: ['extraSmall', 'small', 'medium', 'large'],
      },
      disabled: { type: 'boolean', label: 'Disabled' },
      isFullWidth: { type: 'boolean', label: 'Full width' },
    },
  },
  {
    id: 'toggle',
    componentName: 'Toggle',
    group: 'Inputs & Actions',
    label: 'Toggle',
    description: 'On/off toggle switch.',
    Component: Toggle,
    initialProps: {
      label: 'Enable feature',
      on: true,
    },
    controls: {
      label: { type: 'text', label: 'Label' },
      on: { type: 'boolean', label: 'On' },
    },
  },
  {
    id: 'checkbox',
    componentName: 'Checkbox',
    group: 'Inputs & Actions',
    label: 'Checkbox',
    description: 'Basic checkbox input with label.',
    Component: Checkbox,
    initialProps: {
      name: 'design-system-gallery-checkbox',
      label: 'Receive notifications',
      checked: false,
    },
    controls: {
      label: { type: 'text', label: 'Label' },
      checked: { type: 'boolean', label: 'Checked' },
    },
  },
  {
    id: 'text-input',
    componentName: 'TextInput',
    group: 'Inputs & Actions',
    label: 'TextInput',
    description: 'Standard text input field.',
    Component: TextInput,
    initialProps: {
      name: 'design-system-gallery-text-input',
      label: 'Name',
      placeholder: 'Enter a value',
      value: '',
    },
    controls: {
      label: { type: 'text', label: 'Label' },
      placeholder: { type: 'text', label: 'Placeholder' },
      value: { type: 'text', label: 'Value' },
    },
  },
  {
    id: 'tabs',
    componentName: 'Tabs',
    group: 'Navigation',
    label: 'Tabs',
    description: 'Tabs navigation with active tab.',
    Component: Tabs,
    initialProps: {
      tabs: [
        { id: 'tab-1', label: 'First' },
        { id: 'tab-2', label: 'Second' },
        { id: 'tab-3', label: 'Third' },
      ],
      activeTabId: 'tab-1',
    },
    controls: {
      activeTabId: {
        type: 'select',
        label: 'Active tab',
        options: ['tab-1', 'tab-2', 'tab-3'],
      },
    },
  },
  {
    id: 'tag',
    componentName: 'Tag',
    group: 'Feedback',
    label: 'Tag',
    description: 'Status tag with kind variations.',
    Component: Tag,
    initialProps: {
      text: 'Active',
      kind: 'default',
    },
    controls: {
      text: { type: 'text', label: 'Text' },
      kind: {
        type: 'select',
        label: 'Kind',
        options: ['default', 'success', 'warning', 'danger'],
      },
    },
  },
  {
    id: 'dream-table',
    componentName: 'DreamTable',
    group: 'Layout & Data',
    label: 'Dream Table',
    description:
      'Data table with optional expandable rows, zebra stripes, vertical dividers, and column sorting.',
    Component: DreamTable,
    initialProps: {
      columns: [
        { key: 'name', title: 'Name', sortable: true },
        { key: 'status', title: 'Status', sortable: true },
        { key: 'date', title: 'Date', sortable: true },
      ],
      data: [
        { id: '1', name: 'Item A', status: 'Active', date: '2024-01-01' },
        { id: '2', name: 'Item B', status: 'Pending', date: '2024-01-02' },
        { id: '3', name: 'Item C', status: 'Active', date: '2024-01-03' },
      ],
      keyField: 'id',
      zebraStripes: false,
      verticalDividers: false,
    },
    controls: {
      zebraStripes: { type: 'boolean', label: 'Zebra stripes' },
      verticalDividers: { type: 'boolean', label: 'Vertical dividers' },
    },
  },
  {
    id: 'filters-bar',
    componentName: 'FiltersBar',
    group: 'Layout & Data',
    label: 'FiltersBar',
    description:
      'Filter bar for list views with primary filters (Document Type, Loaded On Date), Add Filter dropdown, optional active filter chips, and right-side actions (Group By, Columns). Use with DocumentTypeFilterPopover, LoadedOnDateFilterPopover, and AcknowledgmentStatusFilterPopover.',
    Component: FiltersBar,
    initialProps: {
      primaryFilters: [
        {
          id: 'documentType',
          label: 'Document Type',
          valueLabel: 'All Business Documents',
          hasSelection: false,
          renderPopover: ({ close }) => (
            <DocumentTypeFilterPopover
              options={[
                { id: 'inv', label: 'Invoice' },
                { id: 'po', label: 'Purchase Order' },
                { id: 'poa', label: 'Purchase Order Acknowledgment' },
                { id: 'asn', label: 'Advance Ship Notice' },
                { id: 'fa', label: 'Functional Acknowledgment' },
              ]}
              value={null}
              onSelect={() => close()}
            />
          ),
        },
        {
          id: 'loadedOnDate',
          label: 'Loaded On Date',
          valueLabel: 'Last 30 days',
          hasSelection: true,
          renderPopover: ({ close }) => (
            <LoadedOnDateFilterPopover
              value={{ mode: 'LAST_X_DAYS', days: 30 }}
              onApply={() => close()}
              onCancel={close}
            />
          ),
        },
      ],
      addFilter: {
        options: [
          { id: 'ackStatus', label: 'Acknowledgment Status' },
          { id: 'businessPartner', label: 'Business Partner' },
          { id: 'documentDate', label: 'Document Date' },
        ],
        onAdd: () => {},
      },
      activeFilters: [],
      rightActions: (
        <>
          <Button kind="inverted" size="small" text="Group By" />
          <Button kind="inverted" size="small" text="Columns" />
        </>
      ),
    },
    controls: {},
  },
];

// Automatically add all other design-system components so everything appears in the gallery.
const CURATED_COMPONENT_NAMES = new Set(
  STORIES.map((story) => story.componentName).filter(Boolean),
);

const EXCLUDED_COMPONENT_NAMES = new Set([]);

/**
 * Default initialProps for auto-listed design-system components so they render
 * visibly in the gallery. Curated STORIES define their own initialProps.
 */
function getDefaultPropsForGallery(componentName) {
  const defaults = {
    Accordion: { title: 'Section', children: 'Sample content' },
    AlertModal: {
      name: 'gallery-alert',
      title: 'Alert',
      isShowing: false,
      onCancel: () => {},
      children: 'Message',
    },
    AutoSuggest: {
      name: 'gallery-suggest',
      label: 'Search',
      options: ['Option A', 'Option B'],
      value: '',
    },
    Avatar: { firstName: 'Jane', lastName: 'Doe' },
    BarWidget: { title: 'Chart', data: [10, 20, 30] },
    BaseTextInput: {
      name: 'gallery-text',
      label: 'Label',
      placeholder: 'Placeholder',
      value: '',
    },
    Breadcrumb: {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Current' },
      ],
    },
    BulletGraph: { label: 'Progress', value: 60, length: 200 },
    BulletPoint: { text: 'List item' },
    Card: { children: 'Card content' },
    CardBody: { children: 'Card body content' },
    CardFooter: { children: 'Footer content' },
    CardHeader: { children: 'Card header', title: 'Header' },
    ContactInfo: {
      title: 'Contact',
      fields: [
        { label: 'Email', value: 'jane@example.com' },
        { label: 'Phone', value: '555-1234' },
      ],
    },
    CountBadge: { count: 5 },
    DateInput: {
      name: 'gallery-date',
      label: 'Date',
      value: '',
    },
    DimensionInput: {
      name: 'gallery-dimension',
      label: 'Dimension',
      value: '100',
      unit: 'px',
    },
    DocNode: { title: 'Document', subtitle: 'Subtitle', children: 'Body content' },
    DocumentTypeFilterPopover: {
      options: [
        { id: 'inv', label: 'Invoice' },
        { id: 'po', label: 'Purchase Order' },
      ],
      value: null,
      onSelect: () => {},
    },
    LoadedOnDateFilterPopover: {
      value: { mode: 'LAST_X_DAYS', days: 30 },
      onApply: () => {},
      onCancel: () => {},
    },
    AcknowledgmentStatusFilterPopover: {
      availableStatuses: [
        { code: 'AC', label: 'Accepted' },
        { code: 'REJ', label: 'Rejected' },
      ],
      value: { mode: 'INCLUDING', codes: [] },
      onApply: () => {},
      onCancel: () => {},
    },
    DrilldownInput: {
      name: 'gallery-drilldown',
      label: 'Select',
      options: [{ value: 'a', label: 'Option A' }],
      placeholder: 'Select...',
    },
    EmailInput: {
      name: 'gallery-email',
      label: 'Email',
      placeholder: 'email@example.com',
      value: '',
    },
    EnhancedList: {
      items: [
        { text1: 'Item 1' },
        { text1: 'Item 2' },
      ],
    },
    ExceptionDetail: {
      title: 'Exception',
      message: 'Something went wrong.',
      status: 'pending',
      fields: [],
    },
    ExpandableList: { children: 'Expandable content' },
    FileExceptions: {
      exceptions: [{ id: '1', message: 'Sample exception' }],
    },
    FileInput: {
      name: 'gallery-file',
      label: 'File',
    },
    Filter: { label: 'Status' },
    FilterButton: { label: 'Filter', value: 'All' },
    Footer: { children: 'Footer' },
    HeaderFields: {
      title: 'Details',
      fields: [
        { label: 'Name', value: 'Value 1' },
        { label: 'Type', value: 'Value 2' },
      ],
    },
    HelpMenu: {
      items: [
        { key: 'docs', label: 'Documentation', href: '#' },
        { key: 'support', label: 'Support', href: '#' },
      ],
      triggerLabel: 'Help',
    },
    HorizontalBarWidget: { title: 'Chart', data: [20, 40, 60] },
    Icon: { iconName: 'DOCUMENT', size: 14 },
    ImportTemplateModal: {
      open: false,
      onClose: () => {},
      onConfirm: () => {},
      title: 'Import template',
      children: 'Select a template to import.',
    },
    InputLabel: { name: 'gallery-field', label: 'Field label' },
    Invitation: {
      title: "You're invited",
      children: 'Invitation content',
    },
    KeyValuePair: {
      items: [
        { key: 'Name', value: 'Example' },
        { key: 'Type', value: 'Sample' },
      ],
    },
    LifecycleConfigurations: {
      title: 'Lifecycle configurations',
    },
    LifecycleContainer: { children: React.createElement('span', null, 'Timeline content') },
    LifecycleTimelineNode: {
      title: 'Step',
      status: 'pending',
      size: 32,
    },
    LifecycleTimelineSeparator: { status: 'none', size: 32 },
    LineWidget: { title: 'Trend', data: [10, 20, 30, 40] },
    ListInput: {
      name: 'gallery-list',
      label: 'Items',
      value: [],
      placeholder: 'Add item...',
    },
    ListItem: { text1: 'List item' },
    Message: { messages: {}, when: 'error', children: 'Error message' },
    Messages: {
      for: { error: true },
      children: React.createElement(Message, {
        when: 'error',
        children: 'Sample message',
      }),
    },
    ModalContent: {
      name: 'gallery-modal-content',
      title: 'Modal',
      isShowing: false,
      onCancel: () => {},
      children: 'Content',
    },
    ModalNew: {
      name: 'gallery-modal',
      title: 'Modal',
      isShowing: false,
      onCancel: () => {},
      children: 'Modal content',
    },
    MultiSelectBar: {
      selected: [],
      label: 'Selected',
      emptyMessage: 'None selected',
    },
    NewPageHeader: {
      title: 'Page Title',
      breadcrumbs: [{ name: 'Home', url: '/' }],
    },
    NumberedPager: { page: 1, totalPages: 5 },
    NumberInput: {
      name: 'gallery-number',
      label: 'Number',
      value: '',
    },
    OrderHistoryTimeline: {
      title: 'Order history',
      items: [{ title: 'Event 1' }, { title: 'Event 2', size: 'large', description: 'Detail' }],
    },
    Pager: { page: 1, totalPages: 5 },
    Partners: { title: 'Partners' },
    PartnersPage: { partners: [] },
    PasswordInput: {
      name: 'gallery-password',
      label: 'Password',
      value: '',
    },
    Popover: {
      content: 'Popover content',
      children: React.createElement('span', { role: 'button', tabIndex: 0 }, 'Trigger'),
    },
    Portal: { children: React.createElement('span', null, 'Portal content') },
    ConfirmPrompt: {
      isShowing: false,
      onConfirm: () => {},
      onCancel: () => {},
      title: 'Confirm',
      children: 'Are you sure?',
    },
    Prompt: {
      isShowing: false,
      onConfirm: () => {},
      onCancel: () => {},
      title: 'Confirm',
      children: 'Are you sure?',
    },
    PseudoTextBox: { children: 'Read-only text' },
    Radio: { name: 'gallery-radio', value: 'a', label: 'Option A' },
    RadioGroup: {
      name: 'gallery-radio-group',
      value: 'a',
      label: 'Choose one',
      children: [
        React.createElement(Radio, { key: 'a', value: 'a', label: 'Option A' }),
        React.createElement(Radio, { key: 'b', value: 'b', label: 'Option B' }),
      ],
    },
    RadioInput: { name: 'gallery-radio', value: 'a', label: 'Option A' },
    ReportList: {
      items: [
        { id: '1', title: 'Report A' },
        { id: '2', title: 'Report B' },
      ],
    },
    RequiredLabel: { id: 'gallery-required', children: 'Required' },
    SearchBar: { placeholder: 'Search...' },
    SelectableList: {
      items: [
        { id: '1', primaryText: 'Option A' },
        { id: '2', primaryText: 'Option B' },
      ],
    },
    SelectableListItem: { primaryText: 'Option', secondaryText: 'Description' },
    SideNav: { onNavigate: () => {} },
    SideNavItem: { iconName: 'DOCUMENT', label: 'Nav item' },
    TextArea: {
      name: 'gallery-textarea',
      label: 'Description',
      placeholder: 'Enter text...',
      value: '',
    },
    ToastContainer: {
      toasts: [{ id: '1', message: 'Sample toast' }],
    },
    TopNav: {
      logoLabel: 'Syncrofy',
      showEnvironmentSelector: false,
      searchPlaceholder: 'Search...',
      notificationCount: 0,
      notifications: [],
    },
    UserCard: { name: 'Jane Doe', email: 'jane@example.com' },
    UserList: {
      users: [
        { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
      ],
    },
    VerticalTimeline: {
      list: [
        { title: 'Event 1' },
        { title: 'Event 2', size: 'large', description: 'Detail' },
      ],
    },
    Wizard: {
      header: 'Wizard',
      steps: [
        { title: 'Step 1', label: 'First', page: React.createElement('span', null, 'Step 1 content') },
        { title: 'Step 2', label: 'Second', page: React.createElement('span', null, 'Step 2 content') },
      ],
      onCancel: () => {},
    },
    LifecycleDetail: {
      title: 'Lifecycle',
      headerFields: [{ label: 'Field', value: 'Value' }],
      timelineSteps: [
        { title: 'Step 1', status: 'pending' },
        { title: 'Step 2', status: 'complete' },
      ],
    },
  };
  return defaults[componentName] ?? null;
}

const AUTO_COMPONENT_STORIES = Object.keys(DesignSystem)
  // Only consider PascalCase exports
  .filter((exportName) => /^[A-Z]/.test(exportName))
  // Skip the ones we already have curated stories for
  .filter((exportName) => !CURATED_COMPONENT_NAMES.has(exportName))
  // Skip known-problematic components that rely on Emotion component selectors
  .filter((exportName) => !EXCLUDED_COMPONENT_NAMES.has(exportName))
  // Only include actual React component functions, not constants/objects
  .filter((exportName) => typeof DesignSystem[exportName] === 'function')
  .map((exportName) => ({
    id: exportName,
    componentName: exportName,
    group: 'All components',
    label: exportName,
    description: `${exportName} component`,
    Component: DesignSystem[exportName],
    initialProps: getDefaultPropsForGallery(exportName) ?? {},
    controls: {},
  }));

const ALL_STORIES = [...STORIES, ...AUTO_COMPONENT_STORIES];

function buildNavItems(stories) {
  const groups = {};
  stories.forEach((story) => {
    if (!groups[story.group]) {
      groups[story.group] = [];
    }
    groups[story.group].push(story);
  });

  const items = [];
  Object.keys(groups)
    .sort()
    .forEach((groupName) => {
      items.push({
        text1: groupName,
        isGroupLabel: true,
        id: `group-${groupName}`,
      });
      groups[groupName].forEach((story) => {
        items.push({
          text1: story.label,
          storyId: story.id,
          id: story.id,
          url1: `#${story.id}`,
        });
      });
    });

  return items;
}

function Controls({ storyConfig, values, onChange }) {
  if (!storyConfig) return null;

  const { controls = {} } = storyConfig;
  const entries = Object.entries(controls);

  if (!entries.length) return null;

  const handleChange = (name, newValue) => {
    onChange({
      ...values,
      [name]: newValue,
    });
  };

  return (
    <ControlsGrid>
      {entries.map(([name, config]) => {
        const value = values[name];

        if (config.type === 'boolean') {
          return (
            <ControlField key={name}>
              <ControlLabel>{config.label}</ControlLabel>
              <BooleanRow>
                <CheckboxControl
                  type="checkbox"
                  checked={!!value}
                  onChange={(event) => handleChange(name, event.target.checked)}
                />
                <span>{value ? 'On' : 'Off'}</span>
              </BooleanRow>
              {config.helpText && (
                <ControlHelpText>{config.helpText}</ControlHelpText>
              )}
            </ControlField>
          );
        }

        if (config.type === 'select') {
          return (
            <ControlField key={name}>
              <ControlLabel>{config.label}</ControlLabel>
              <SelectControl
                value={value}
                onChange={(event) => handleChange(name, event.target.value)}
              >
                {config.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectControl>
              {config.helpText && (
                <ControlHelpText>{config.helpText}</ControlHelpText>
              )}
            </ControlField>
          );
        }

        return (
          <ControlField key={name}>
            <ControlLabel>{config.label}</ControlLabel>
            <TextInputControl
              type="text"
              value={value ?? ''}
              onChange={(event) => handleChange(name, event.target.value)}
            />
            {config.helpText && (
              <ControlHelpText>{config.helpText}</ControlHelpText>
            )}
          </ControlField>
        );
      })}
    </ControlsGrid>
  );
}

export default function DesignSystemGallery() {
  const [selectedStoryId, setSelectedStoryId] = useState(ALL_STORIES[0]?.id);
  const [propState, setPropState] = useState(() => {
    const initial = {};
    ALL_STORIES.forEach((story) => {
      initial[story.id] = story.initialProps;
    });
    return initial;
  });

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      const exists = ALL_STORIES.some((story) => story.id === hash);
      if (exists) {
        setSelectedStoryId(hash);
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const selectedStory = useMemo(
    () => ALL_STORIES.find((story) => story.id === selectedStoryId),
    [selectedStoryId],
  );

  const navItems = useMemo(() => buildNavItems(ALL_STORIES), []);

  const handlePropsChange = (nextProps) => {
    setPropState((prev) => ({
      ...prev,
      [selectedStory.id]: nextProps,
    }));
  };

  const currentProps = selectedStory ? propState[selectedStory.id] ?? {} : {};

  return (
    <Page>
      <PrototypeBanner prototypeName="Design System Components" />
      <NewPageHeader
        title="Design System Components"
        breadcrumbs={[{ name: 'Prototypes', url: '/' }]}
      />
      <Content>
        <NavColumn>
          <SectionTitle>Components</SectionTitle>
          <Card height="auto">
            <CardBody>
              <EnhancedList
                items={navItems}
              />
            </CardBody>
          </Card>
        </NavColumn>

        <MainColumn>
          <Card height="auto">
            <CardHeader title="Preview" hasDivider />
            <CardBody>
              {selectedStory && (
                <>
                  <StoryMeta>
                    <StoryName>{selectedStory.label}</StoryName>
                    <StoryDescription>
                      {selectedStory.description}
                    </StoryDescription>
                  </StoryMeta>
                  <PreviewSurface>
                    {selectedStory.id === 'toggle' ? (
                      <Toggle
                        {...currentProps}
                        on={currentProps.on}
                        onChange={(nextOn) =>
                          handlePropsChange({
                            ...currentProps,
                            on: nextOn,
                          })
                        }
                      />
                    ) : selectedStory.id === 'checkbox' ? (
                      <Checkbox
                        {...currentProps}
                        checked={!!currentProps.checked}
                        onChange={(nextChecked) =>
                          handlePropsChange({
                            ...currentProps,
                            checked: nextChecked,
                          })
                        }
                      />
                    ) : selectedStory.id === 'text-input' ? (
                      <TextInput
                        {...currentProps}
                        value={currentProps.value ?? ''}
                        onChange={(nextValue) =>
                          handlePropsChange({
                            ...currentProps,
                            value: nextValue,
                          })
                        }
                      />
                    ) : (
                      <selectedStory.Component {...currentProps} />
                    )}
                  </PreviewSurface>
                </>
              )}
            </CardBody>
          </Card>

          <Card height="auto">
            <CardHeader title="Controls" hasDivider />
            <CardBody>
              {selectedStory ? (
                <Controls
                  storyConfig={selectedStory}
                  values={currentProps}
                  onChange={handlePropsChange}
                />
              ) : (
                <StoryDescription>
                  Select a component from the list to edit its props.
                </StoryDescription>
              )}
            </CardBody>
          </Card>
        </MainColumn>
      </Content>
    </Page>
  );
}

