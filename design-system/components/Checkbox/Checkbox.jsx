import React from 'react';
import styled from '@emotion/styled';
import RequiredLabel from '../RequiredLabel';

const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  outline: none;
  input[type='checkbox']:focus {
    box-shadow: 0 0 ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.palette.l3}8a;
    &:checked {
      box-shadow: 0 0 ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.constants.spacingHalf} ${({ theme }) => theme.palette.l3}8a;
    }
  }
`;

const CheckboxButton = styled.input`
  appearance: none;
  width: ${({ theme }) => theme.constants.spacing1_5x};
  min-width: ${({ theme }) => theme.constants.spacing1_5x};
  max-width: ${({ theme }) => theme.constants.spacing1_5x};
  height: ${({ theme }) => theme.constants.spacing1_5x};
  min-height: ${({ theme }) => theme.constants.spacing1_5x};
  max-height: ${({ theme }) => theme.constants.spacing1_5x};
  border: 1px solid ${({ theme }) => theme.palette.d3};
  outline: none;
  cursor: pointer;
  &:checked {
    border-color: ${({ theme }) => theme.palette.cerulean};
    &::after {
      content: '';
      display: block;
      position: relative;
      left: ${({ theme }) => theme.constants.spacingHalf};
      top: 0;
      width: ${({ theme }) => theme.constants.spacingQuarter};
      height: ${({ theme }) => theme.constants.spacing1x};
      border: solid ${({ theme }) => theme.palette.cerulean};
      border-width: ${({ theme }) => `0 ${theme.constants.spacingQuarter} ${theme.constants.spacingQuarter} 0`};
      transform: rotate(45deg);
    }
  }
  &:indeterminate {
    border-color: ${({ theme }) => theme.palette.cerulean};
    &::after {
      content: '';
      display: block;
      position: relative;
      left: ${({ theme }) => theme.constants.spacingQuarter};
      top: ${({ theme }) => theme.constants.spacingHalf};
      width: ${({ theme }) => theme.constants.spacing1x};
      border: solid ${({ theme }) => theme.palette.cerulean};
      border-width: ${({ theme }) => `0 ${theme.constants.spacingQuarter} ${theme.constants.spacingQuarter} 0`};
    }
  }
  &:disabled {
    border-color: ${({ theme }) => theme.palette.l3};
    &::after {
      border-color: ${({ theme }) => theme.palette.l3};
    }
  }
  ${CheckboxContainer}:hover & {
    &:not(:disabled) {
      border-color: ${({ theme }) => theme.palette.ceruleanHover};
      ::after {
        border-color: ${({ theme }) => theme.palette.ceruleanHover};
      }
    }
  }
`;

const CheckboxButtonLabel = styled.label`
  margin-left: ${({ theme }) => theme.constants.spacing1x};
  margin-right: ${({ theme, required }) => (required ? theme.constants.spacing1x : undefined)};
  cursor: pointer;
  color: ${({ theme, disabled, checked }) => {
    if (disabled) return theme.palette.l4;
    if (checked) return theme.palette.cerulean;
    return theme.palette.black;
  }};
  font-weight: ${({ theme, checked }) => (checked ? theme.constants.boldFontWeight : 'inherit')};
  ${CheckboxContainer}:hover & {
    color: ${({ theme, disabled }) => (!disabled ? theme.palette.ceruleanHover : undefined)};
  }
`;

export default function Checkbox({
  id: propId,
  name,
  checked = false,
  value = '',
  disabled = false,
  label,
  children,
  required = false,
  errors,
  onChange = () => {},
}) {
  const id = propId || `checkbox_${name || 'unnamed'}`;
  return (
    <CheckboxContainer>
      <CheckboxButton
        type="checkbox"
        id={id}
        checked={checked}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <CheckboxButtonLabel htmlFor={id} required={required} checked={checked} disabled={disabled}>
        <span>{children ?? label}</span>
      </CheckboxButtonLabel>
      {required && (
        <RequiredLabel error={errors?.required} disabled={disabled} />
      )}
    </CheckboxContainer>
  );
}
