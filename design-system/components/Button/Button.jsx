import React from 'react';
import styled from '@emotion/styled';
import { getButtonColors, getPadding, getHeight } from './buttonStyles';
import Icon from '../Icon/Icon';

const StyledButton = styled.button`
  display: flex;
  flex-direction: ${({ iconRight }) => (iconRight ? 'row-reverse' : 'row')};
  align-items: center;
  outline: none;
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  text-align: center;
  box-shadow: ${({ disabled }) => disabled && 'none'};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
  justify-content: ${({ isFullWidth }) => (isFullWidth ? 'center' : 'flex-start')};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'none')};
  border: 1px solid transparent;

  /* Color by kind */
  ${({ theme, color, kind, disabled }) => {
    const { palette } = theme;
    const { defaultColor, hoverColor, clickColor } = getButtonColors(palette, color);
    if (kind === 'default') {
      return `
        color: ${palette.white};
        background-color: ${defaultColor};
        border-color: ${defaultColor};
        ${!disabled ? `&:hover, &:active { border-color: ${hoverColor}; background-color: ${hoverColor}; }` : ''}
        &:focus { background-color: ${clickColor}; border-color: ${clickColor}; }
      `;
    }
    if (kind === 'inverted') {
      return `
        color: ${defaultColor};
        background-color: transparent;
        border-color: ${defaultColor};
        ${!disabled ? `&:hover, &:active { color: ${palette.white}; border-color: ${hoverColor}; background-color: ${hoverColor}; }` : ''}
        &:focus { color: ${palette.white}; background-color: ${clickColor}; border-color: ${clickColor}; }
      `;
    }
    if (kind === 'transparent') {
      return `
        color: ${defaultColor};
        background-color: transparent;
        border: none;
        font-weight: ${theme.constants.normalFontWeight};
        ${!disabled ? `&:hover, &:active { color: ${hoverColor}; }` : ''}
        &:focus { color: ${clickColor}; }
      `;
    }
    return '';
  }}

  /* Size */
  ${({ theme, size, iconRight, iconLeft, iconOnly, noHeight, noPadding }) => {
    const c = theme.constants;
    const padding = getPadding(iconOnly, noPadding, size === 'medium' ? `0 ${c.spacing3x}` : size === 'large' ? `0 ${c.spacing4x}` : `0 ${c.spacing2x}`, c);
    const height = getHeight(iconOnly, noHeight, size === 'small' || size === 'extraSmall' ? c.spacing4x : c.spacing6x);
    const fontSize = size === 'large' ? c.largeFontSize : size === 'medium' ? c.normalFontSize : c.smallFontSize;
    const lineHeight = size === 'large' ? c.largeLineHeight : size === 'medium' ? c.normalLineHeight : c.smallLineHeight;
    const gap = size === 'large' ? c.spacing2x : size === 'medium' ? c.spacing1_5x : c.spacing1x;
    return `
      display: ${iconOnly ? 'inline-flex' : 'flex'};
      padding: ${padding};
      height: ${height};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      .btn-text { margin-right: ${iconRight ? gap : 0}; margin-left: ${iconLeft ? gap : 0}; }
    `;
  }}
`;

const ButtonText = styled.span`
  display: inline-block;
`;

export default function Button({
  text,
  color = 'blue',
  kind = 'default',
  size = 'small',
  disabled = false,
  iconLeft,
  iconRight,
  iconOnly,
  iconSize,
  type = 'button',
  isFullWidth = false,
  noPadding = false,
  noHeight = false,
  maxWidth,
  onClick,
  id,
  ...rest
}) {
  const iconSizes = { extraSmall: 12, small: 14, medium: 16, large: 24 };
  const iconName = iconLeft || iconRight || iconOnly;
  const resolvedIconSize = iconSize ?? (iconName ? iconSizes[size] : undefined);

  return (
    <StyledButton
      id={id}
      type={type}
      disabled={disabled}
      color={color}
      size={size}
      kind={kind}
      iconLeft={!!iconLeft}
      iconRight={!!iconRight}
      iconOnly={!!iconOnly}
      isFullWidth={isFullWidth}
      noPadding={noPadding}
      noHeight={noHeight}
      maxWidth={maxWidth}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {iconName && (
        <Icon iconName={iconName} size={resolvedIconSize} />
      )}
      {!iconOnly && text != null && (
        <ButtonText className="btn-text">{text}</ButtonText>
      )}
    </StyledButton>
  );
}
