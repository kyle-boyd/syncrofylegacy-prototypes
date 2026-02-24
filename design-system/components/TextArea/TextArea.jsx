import React from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';
import Messages, { Message } from '../Messages';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
`;

const StyledTextArea = styled.textarea`
  outline: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  margin: ${({ theme }) => `${theme.constants.spacingHalf} 0`};
  border: 1px solid ${({ theme, hasErrors }) => (hasErrors ? theme.palette.red : theme.palette.l4)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.cloud : theme.palette.white)};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  width: 100%;
  min-height: ${({ theme }) => theme.constants.spacing6x};
  resize: vertical;
  font-family: inherit;
  &::placeholder {
    color: ${({ theme }) => theme.palette.d3};
  }
`;

export default function TextArea({
  name,
  label = '',
  value = '',
  onChange,
  onBlur,
  errors = null,
  placeholder = '',
  disabled = false,
  required = false,
  showRequiredLabel = true,
  minLength,
  maxLength,
  rows = 4,
  ariaLabel,
  className,
}) {
  return (
    <Container className={className}>
      <InputLabel
        name={name}
        htmlFor={`form-textarea--${name}`}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        disabled={disabled}
      />
      <StyledTextArea
        id={`form-textarea--${name}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        hasErrors={!!errors}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        aria-label={ariaLabel}
      />
      <Messages for={errors}>
        <Message when="minLength">Length is too short.</Message>
        <Message when="maxLength">Length is too long.</Message>
      </Messages>
    </Container>
  );
}
