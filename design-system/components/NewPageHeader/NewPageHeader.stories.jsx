import React from 'react';
import NewPageHeader from './NewPageHeader';
import Button from '../Button';

const Divider = () => (
  <span style={{ margin: '0 8px', color: '#ccc', userSelect: 'none' }}>|</span>
);

export default {
  title: 'Components/NewPageHeader',
  component: NewPageHeader,
};

export const Simple = () => (
  <NewPageHeader
    title="Page Title"
    pageActions={[<Button key="a" text="Action" kind="transparent" size="small" />]}
  />
);

export const WithRightContent = () => (
  <NewPageHeader
    title="Files"
    rightContent={
      <>
        <Button key="edit" text="Edit Report" kind="transparent" size="small" iconLeft="EDIT" />
        <Divider />
        <Button key="download" text="Download CSV" kind="transparent" size="small" iconLeft="CHEVRON_DOWN" />
        <Divider />
        <Button key="views" text="My Views" kind="transparent" size="small" iconLeft="DASHBOARD" />
      </>
    }
  />
);

export const WithBreadcrumbs = () => (
  <NewPageHeader
    title="Detail Page"
    breadcrumbs={[
      { name: 'Home', url: '#' },
      { name: 'Section' },
    ]}
  />
);

export const WithSubHeader = () => (
  <NewPageHeader
    title="Settings"
    subHeader={<span style={{ fontSize: 14, color: '#666' }}>Configure your preferences</span>}
  />
);

export const EditableViewName = () => {
  const [viewName, setViewName] = React.useState('');
  return (
    <NewPageHeader
      title={viewName}
      onTitleChange={setViewName}
      editableViewName
      viewNamePlaceholder="(Untitled View)"
      showViewNameDropdown
      onViewNameDropdownClick={() => alert('View options')}
      rightContent={
        <>
          <Button key="doc" text="Document Updates" kind="transparent" size="small" iconLeft="DOCUMENT" />
          <Divider />
          <Button key="run" text="Run Report" kind="transparent" size="small" iconLeft="BAR_CHART" />
          <Divider />
          <Button key="csv" text="Download CSV" kind="transparent" size="small" iconLeft="CHEVRON_DOWN" />
          <Button key="save" text="Save" kind="default" size="small" color="blue" iconLeft="CHECK" />
          <Divider />
          <Button key="new" text="+ New View" kind="transparent" size="small" iconLeft="ADD" />
          <Divider />
          <Button key="views" text="My Views" kind="transparent" size="small" iconLeft="DASHBOARD" />
        </>
      }
    />
  );
};
