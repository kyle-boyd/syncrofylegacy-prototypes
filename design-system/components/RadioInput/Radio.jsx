import React from 'react';
import styled from '@emotion/styled';

const RadioContainer = styled.div`
  display: inline-flex;
  align-items: center;
  outline: none;
  input[type='radio']:focus {
    box-shadow: 0 0 ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.palette.l3}8a;
    &:checked {
      box-shadow: 0 0 ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.palette.ceruleanClick}8a;
    }
  }
`;

const RadioButton = styled.input`
  appearance: none;
  box-sizing: border-box;
  position: relative;
  width: ${({ theme }) => theme.constants.spacing1_5x};
  height: ${({ theme }) => theme.constants.spacing1_5x};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.d3};
  outline: none;
  cursor: inherit;
  &:checked {
    border-color: ${({ theme }) => theme.palette.cerulean};
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${({ theme }) => theme.constants.spacing1x};
      height: ${({ theme }) => theme.constants.spacing1x};
      border-radius: 50%;
      background: ${({ theme, disabled }) => (disabled ? theme.palette.l3 : theme.palette.cerulean)};
    }
  }
  &:disabled {
    border-color: ${({ theme }) => theme.palette.l3};
  }
  ${RadioContainer}:hover & {
    &:not(:disabled) {
      border-color: ${({ theme }) => theme.palette.ceruleanHover};
      ::after {
        background-color: ${({ theme }) => theme.palette.ceruleanHover};
      }
    }
  }
`;

const RadioButtonLabel = styled.label`
  margin-left: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme, disabled, checked }) => {
    if (disabled) return theme.palette.l4;
    if (checked) return theme.palette.cerulean;
    return theme.palette.black;
  }};
  font-weight: ${({ theme, checked }) => (checked ? theme.constants.boldFontWeight : 'inherit')};
  cursor: pointer;
  ${RadioContainer}:hover & {
    color: ${({ theme, disabled }) => (!disabled ? theme.palette.ceruleanHover : undefined)};
  }
`;

export default function Radio({
  name,
  value = '',
  checked = false,
  disabled = false,
  label,
  children,
  onChange,
}) {
  const inputId = `form-radio-${name}-${value}`;
  return (
    <RadioContainer>
      <RadioButton
        type="radio"
        id={inputId}
        checked={checked}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <RadioButtonLabel htmlFor={inputId} checked={checked} disabled={disabled}>
        {children ?? label}
      </RadioButtonLabel>
    </RadioContainer>
  );
}
