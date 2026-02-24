import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.palette.white};
  flex-direction: column;
  padding-top: ${({ theme }) => theme.constants.spacing2x};
  border-bottom: ${({ theme, hasBottomBorder }) => (hasBottomBorder ? `1px solid ${theme.palette.l2}` : 'none')};
  z-index: 20000;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.constants.spacing3x} ${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
`;

const SubContent = styled.div`
  margin: ${({ theme }) => `0 ${theme.constants.spacing3x} ${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
`;

const BreadCrumbs = styled.div`
  margin: ${({ theme }) => `0 ${theme.constants.spacing3x} ${theme.constants.spacing1x} ${theme.constants.spacing3x}`};
  display: flex;
  color: ${({ theme }) => theme.palette.d1};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const Crumb = styled.div`
  display: flex;
  margin-left: ${({ theme }) => theme.constants.spacing1x};
`;

const CrumbLink = styled.div`
  display: flex;
  align-items: baseline;
  a {
    text-decoration: none;
    margin-right: ${({ theme }) => theme.constants.spacingHalf};
    color: inherit;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  min-width: calc(6.25 * ${({ theme }) => theme.constants.spacing2x});
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const EditableContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const EditableTitle = styled(Title)`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.black};
  }
`;

const EditIcon = styled.span`
  margin-left: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme }) => theme.palette.ceruleanHover};
`;

const TitleInput = styled.input`
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  height: ${({ theme }) => theme.constants.xlLineHeight};
  border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.palette.ceruleanHover : theme.palette.l3)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  outline: 0;
  min-width: calc(6.25 * ${({ theme }) => theme.constants.spacing2x});
`;

const ViewNameWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.l3};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme }) => theme.palette.l1};
  min-width: 200px;
  max-width: 400px;
`;

const ViewNameInput = styled.input`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  height: ${({ theme }) => theme.constants.xlLineHeight};
  padding: 0 ${({ theme, hasDropdown }) => (hasDropdown ? theme.constants.spacing1x : theme.constants.spacing2x)} 0 ${({ theme }) => theme.constants.spacing2x};
  border: none;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  outline: 0;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.palette.d3};
    font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  }
`;

const ViewNameDropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.constants.spacing1x};
  height: 100%;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.palette.l3};
  background: transparent;
  color: ${({ theme }) => theme.palette.d3};
  cursor: pointer;
  border-radius: 0 ${({ theme }) => theme.constants.radiusSmall} ${({ theme }) => theme.constants.radiusSmall} 0;

  &:hover {
    color: ${({ theme }) => theme.palette.d1};
    background: ${({ theme }) => theme.palette.l2};
  }
`;

const Divider = styled.div`
  height: ${({ theme }) => theme.constants.spacing3x};
  width: 1px;
  background-color: ${({ theme }) => theme.palette.l4};
  margin-left: ${({ theme }) => theme.constants.spacing2x};
  margin-right: ${({ theme }) => theme.constants.spacing2x};
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: ${({ theme, leftPadding }) => (leftPadding ? theme.constants.spacing3x : '')};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0;
  margin-left: auto;
`;

const ActionsSubContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BadgeContainer = styled.span`
  line-height: normal;
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  white-space: nowrap;
  margin-right: ${({ theme }) => theme.constants.spacing1x};
`;

export default function NewPageHeader({
  title,
  defaultTitle,
  breadcrumbs = [],
  currentActions = [],
  pageActions = [],
  leftPageActions = [],
  rightContent,
  subHeader,
  status,
  Badge,
  isEditable = false,
  isEditing = false,
  unsaved = false,
  isShowing = false,
  onBlur = () => {},
  onTitleChange = () => {},
  editableViewName = false,
  viewNamePlaceholder = '(Untitled View)',
  showViewNameDropdown = false,
  onViewNameDropdownClick,
}) {
  const [isFocused, setFocused] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef(null);
  const viewNameInputRef = useRef(null);

  const hasTabs = false;
  const hasBottomBorder = !hasTabs;

  useEffect(() => {
    if (isEditing && (isEditable || editableViewName)) {
      const ref = editableViewName ? viewNameInputRef : inputRef;
      if (ref.current) ref.current.select();
    }
  }, [isEditing, isEditable, editableViewName]);

  const displayTitle =
    title ?? (breadcrumbs[0]?.name) ?? defaultTitle ?? '';

  const renderBreadCrumbs = () => {
    if (breadcrumbs.length === 0 || displayTitle === undefined) return null;
    return (
      <BreadCrumbs id="breadcrumb">
        {breadcrumbs.map((crumb) =>
          crumb.url ? (
            <CrumbLink key={crumb.name}>
              <a href={crumb.url}>{crumb.name}</a>
              <Icon iconName="CHEVRON_RIGHT" size={10} />
            </CrumbLink>
          ) : (
            <Crumb key={crumb.name}>{crumb.name}</Crumb>
          )
        )}
      </BreadCrumbs>
    );
  };

  const renderTitle = () => {
    if (editableViewName) {
      return (
        <ViewNameWrapper id="view-name-wrapper">
          <ViewNameInput
            id="view-name-input"
            ref={viewNameInputRef}
            type="text"
            value={title ?? ''}
            placeholder={viewNamePlaceholder}
            onChange={(e) => onTitleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
            onKeyDown={(e) => e.key === 'Enter' && viewNameInputRef.current?.blur()}
            disabled={isShowing}
            hasDropdown={showViewNameDropdown}
            aria-label="View name"
          />
          {showViewNameDropdown && (
            <ViewNameDropdownTrigger
              type="button"
              onClick={onViewNameDropdownClick}
              aria-label="View options"
            >
              <Icon iconName="CHEVRON_UP" size={16} />
            </ViewNameDropdownTrigger>
          )}
        </ViewNameWrapper>
      );
    }
    if (isEditable && (isEditing || isFocused)) {
      return (
        <TitleInput
          id="title-input"
          ref={inputRef}
          value={title ?? ''}
          onChange={(e) => onTitleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          onKeyPress={(e) => e.charCode === 13 && inputRef.current?.blur()}
          disabled={isShowing}
          size={40}
        />
      );
    }
    if (isEditable && (title || defaultTitle)) {
      return (
        <EditableContainer id="title-container">
          <EditableTitle
            id="title"
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
            onClick={() => inputRef.current?.focus()}
          >
            {title || defaultTitle}
          </EditableTitle>
          {showEditIcon && (
            <EditIcon id="edit-icon">
              <Icon iconName="EDIT" size={16} />
            </EditIcon>
          )}
        </EditableContainer>
      );
    }
    return (
      <Title id="title">
        <TitleText>{displayTitle}</TitleText>
        {Badge && status && <BadgeContainer>{Badge}</BadgeContainer>}
      </Title>
    );
  };

  const hasRightContent = rightContent != null;
  const hasActions = pageActions.length > 0 || currentActions.length > 0;
  const hasRightSideContent = hasRightContent || hasActions;

  const renderRightSide = () => {
    if (!hasRightSideContent) return null;
    const hasDivider = pageActions.length > 0 && currentActions.length > 0;
    return (
      <RightContainer id="header-right-container">
        {hasRightContent && rightContent}
        {hasRightContent && hasActions && <Divider />}
        {hasActions && (
          <ActionsContainer id="actions">
            <ActionsSubContainer>{currentActions}</ActionsSubContainer>
            {hasDivider && <Divider />}
            <ActionsSubContainer>{pageActions}</ActionsSubContainer>
          </ActionsContainer>
        )}
      </RightContainer>
    );
  };

  const renderLeftActions = () => {
    if (leftPageActions.length === 0) return null;
    return (
      <ActionsContainer leftPadding id="left-actions">
        <ActionsSubContainer>{leftPageActions}</ActionsSubContainer>
      </ActionsContainer>
    );
  };

  return (
    <Container data-component="page-header" hasBottomBorder={hasBottomBorder}>
      {renderBreadCrumbs()}
      {leftPageActions.length > 0 && renderLeftActions()}
      <MainContent id="main-content">
        {renderTitle()}
        {renderRightSide()}
      </MainContent>
      {subHeader && <SubContent>{subHeader}</SubContent>}
    </Container>
  );
}
