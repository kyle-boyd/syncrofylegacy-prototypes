import React from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';
import Messages, { Message } from '../Messages';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
`;

const StyledInput = styled.input`
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &::file-selector-button {
    margin-right: ${({ theme }) => theme.constants.spacing2x};
    padding: ${({ theme }) => `${theme.constants.spacingHalf} ${theme.constants.spacing1x}`};
    border: 1px solid ${({ theme }) => theme.palette.stroke};
    border-radius: ${({ theme }) => theme.constants.radiusSmall};
    background-color: ${({ theme }) => theme.palette.l1};
    color: ${({ theme }) => theme.palette.black};
    font-size: ${({ theme }) => theme.constants.xsFontSize};
    cursor: pointer;
  }
`;

export default function FileInput({
  name,
  label = '',
  value,
  onChange,
  accept,
  multiple = false,
  errors = null,
  disabled = false,
  showRequiredLabel = true,
  required = false,
  ariaLabel,
  className,
}) {
  return (
    <Container className={className}>
      <InputLabel
        name={name}
        htmlFor={`form-file--${name}`}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        disabled={disabled}
      />
      <StyledInput
        id={`form-file--${name}`}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange?.(e.target.files)}
        disabled={disabled}
        hasErrors={!!errors}
        aria-label={ariaLabel}
      />
      <Messages for={errors} />
    </Container>
  );
}
