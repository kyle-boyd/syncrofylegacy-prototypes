import React, { useRef } from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon/Icon';

const KINDS = { tag: 'tag', button: 'button', warning: 'warning', exception: 'exception' };
const TEXT_COLORS = { tag: 'white', button: 'cerulean', exception: 'black' };

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  flex-grow: 0;
  overflow: hidden;
  height: ${({ theme }) => theme.constants.spacing3x};
  min-width: ${({ theme }) => theme.constants.spacing3x};
  width: ${({ isSelectSuggest }) => (isSelectSuggest ? '100%' : undefined)};
  padding: 0 ${({ theme }) => theme.constants.spacing1x} !important;
  margin: 0 !important;
  outline: none;
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: ${({ theme: { palette }, kind, bgColor }) =>
    kind === KINDS.exception ? `1px solid ${bgColor === 'red' ? palette.red : palette.sky}` : 'none'};
  background-color: ${({ theme: { palette }, kind = KINDS.tag, disabled, isSelected, errors, bgColor }) => {
    if (disabled) return palette.l1;
    if (kind === KINDS.button) return isSelected ? palette.whiteSelected : palette.white;
    if (kind === KINDS.warning) return palette.lightOrange;
    if (kind === KINDS.exception) {
      if (isSelected) return bgColor === 'red' ? palette.pinkClick : palette.whiteSelected;
      return bgColor === 'red' ? palette.pink : palette.whiteHover;
    }
    if (isSelected) return errors ? palette.redHover : palette[`${bgColor}Hover`];
    return errors ? palette.red : palette[bgColor];
  }};
  cursor: ${({ hasOnClick, disabled }) => (hasOnClick && !disabled ? 'pointer' : 'default')};
  .remove-button { display: block; }
`;

const RemoveButton = styled.span`
  display: ${({ kind = KINDS.tag, isSelected }) => (kind === KINDS.button && !isSelected ? 'none' : 'block')};
  color: ${({ theme: { palette }, kind = KINDS.tag, highlight }) =>
    kind === KINDS.button ? palette.cerulean : highlight ? palette.whiteSelected : palette.white};
  padding-left: ${({ theme }) => theme.constants.spacing1x};
  &:hover { cursor: pointer; }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
  overflow: hidden;
  color: ${({ theme: { palette }, disabled, kind = KINDS.tag, isTableCell }) => {
    if (isTableCell) return palette.black;
    if (disabled) return palette.d3;
    if (kind === KINDS.warning) return palette.d2;
    return palette[TEXT_COLORS[kind]];
  }};
`;

const TagText = styled.span`
  font-size: ${({ theme: { constants }, size = 'small', isTableCell }) =>
    isTableCell ? constants.normalFontSize : size === 'small' ? constants.xsFontSize : constants.normalFontSize};
  font-weight: ${({ theme: { constants }, kind = KINDS.tag, isTableCell }) =>
    isTableCell ? constants.normalFontWeight : (kind === KINDS.button || kind === KINDS.exception ? constants.normalFontWeight : constants.boldFontWeight)};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const KeyText = styled(TagText)`
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
`;

const LeftIcon = styled.span`
  padding-right: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme, disabled, iconColor }) => (!iconColor || disabled ? undefined : theme.palette[iconColor])};
  display: flex;
  align-items: center;
`;

const RightIcon = styled(LeftIcon)`
  padding-left: ${({ theme }) => theme.constants.spacing1x};
  padding-right: 0;
`;

function safeId(name) {
  return (name || '').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
}

export default function Tag({
  name,
  valueText,
  size = 'small',
  color = 'cerulean',
  kind = KINDS.tag,
  keyText = '',
  disabled = false,
  isSelected = false,
  onClick,
  onRemoveClick,
  errors,
  leftIcon,
  leftIconColor,
  rightIcon,
  rightIconColor,
  isTableCell = false,
  isSelectSuggest = false,
}) {
  const removeRef = useRef(null);
  const idName = safeId(name);

  const handleClick = (e) => {
    if (onClick && (!removeRef.current || !removeRef.current.contains(e.target))) onClick(e);
  };

  if (!valueText) return null;

  return (
    <StyledTag
      id={`tag_container_${idName}`}
      disabled={disabled}
      errors={!!errors}
      bgColor={color}
      isSelected={isSelected}
      kind={kind}
      onClick={handleClick}
      hasOnClick={!!onClick}
      isSelectSuggest={isSelectSuggest}
      data-component="tag"
    >
      <TextContainer kind={kind} disabled={disabled} hasOnClick={!!onClick} isTableCell={isTableCell}>
        {leftIcon && (
          <LeftIcon id={`tag_icon_${idName}`} disabled={disabled} iconColor={leftIconColor}>
            <Icon iconName={leftIcon} size={size === 'small' ? 12 : 14} />
          </LeftIcon>
        )}
        {keyText && (
          <KeyText id={`tag_key_text_${idName}`} kind={kind} size={size} disabled={disabled}>
            {`${keyText}: `}
          </KeyText>
        )}
        <TagText id={`tag_value_text_${idName}`} kind={kind} size={size} disabled={disabled} isTableCell={isTableCell}>
          {valueText}
        </TagText>
        {rightIcon && (
          <RightIcon id={`tag_icon_right_${idName}`} disabled={disabled} iconColor={rightIconColor}>
            <Icon iconName={rightIcon} size={size === 'small' ? 12 : 14} />
          </RightIcon>
        )}
      </TextContainer>
      {!disabled && onRemoveClick && (
        <RemoveButton
          id={`tag_remove_button_${idName}`}
          className="remove-button"
          kind={kind}
          isSelected={isSelected}
          onClick={onRemoveClick}
          ref={removeRef}
        >
          <Icon iconName="X" size={10} />
        </RemoveButton>
      )}
    </StyledTag>
  );
}

export { KINDS };
