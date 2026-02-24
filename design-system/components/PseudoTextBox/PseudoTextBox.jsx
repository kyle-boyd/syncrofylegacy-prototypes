import React from 'react';
import styled from '@emotion/styled';

const PseudoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-grow: 1;
  align-self: center;
  margin-bottom: 0;
  margin-top: 0;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  transition: 0.2s border-color;
  border: 1px solid
    ${({ theme, isExpanded, isFocused, disabled, errors }) => {
      if (!disabled && errors) return theme.palette.red;
      return isExpanded || isFocused ? theme.palette.sky : theme.palette.l4;
    }};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.l1 : theme.palette.white)};
  outline: 0;
  border-radius: ${({ theme, isExpanded }) => (isExpanded ? `${theme.constants.radiusSmall} ${theme.constants.radiusSmall} 0 0` : theme.constants.radiusSmall)};
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || '100%'};
  min-height: 2em;
`;

export default function PseudoTextBox({
  children,
  disabled = false,
  isExpanded = false,
  isFocused = false,
  canTab = false,
  errors = null,
  height = '',
  textBoxRef,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}) {
  return (
    <PseudoBox
      tabIndex={canTab ? 0 : undefined}
      disabled={disabled}
      isExpanded={isExpanded}
      isFocused={isFocused}
      errors={!!errors}
      height={height}
      ref={textBoxRef}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
}
