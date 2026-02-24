import React from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';
import Messages, { Message } from '../Messages';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
`;

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  margin: ${({ theme }) => `${theme.constants.spacingHalf} 0`};
  border: 1px solid ${({ theme, hasErrors }) => (hasErrors ? theme.palette.red : theme.palette.l4)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.cloud : theme.palette.white)};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export default function DateInput({
  name,
  label = '',
  value = '',
  onChange,
  onBlur,
  min,
  max,
  errors = null,
  disabled = false,
  required = false,
  showRequiredLabel = true,
  ariaLabel,
  className,
}) {
  return (
    <Container className={className}>
      <InputLabel
        name={name}
        htmlFor={`form-date--${name}`}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        disabled={disabled}
      />
      <StyledInput
        id={`form-date--${name}`}
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        min={min}
        max={max}
        disabled={disabled}
        hasErrors={!!errors}
        aria-label={ariaLabel}
      />
      <Messages for={errors} />
    </Container>
  );
}
