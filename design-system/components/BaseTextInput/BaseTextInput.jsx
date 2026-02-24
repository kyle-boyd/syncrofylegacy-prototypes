import React from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';
import Messages, { Message } from '../Messages';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
  input[type='text'],
  input[type='password'],
  input[type='number'],
  input[type='email'],
  input[type='search'] {
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
    border-radius: ${({ theme }) => theme.constants.radiusSmall};
    transition: 0.2s border-color;
    &:focus {
      border-radius: ${({ theme }) => `${theme.constants.radiusSmall} ${theme.constants.radiusSmall} 0 0`};
      border: 1px solid ${({ theme }) => theme.palette.sky};
    }
  }
`;

const StyledInput = styled.input`
  outline: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  margin: ${({ theme }) => `${theme.constants.spacingHalf} 0`};
  border: 1px solid ${({ theme, hasErrors }) => (hasErrors ? theme.palette.red : theme.palette.l4)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  transition: 0.2s border-color;
  line-height: normal;
  color: inherit;
  font: inherit;
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.cloud : theme.palette.white)};
  height: ${({ theme, inline }) => (inline ? `2em` : undefined)};
  ::placeholder {
    color: ${({ theme }) => theme.palette.d3};
    font-size: ${({ theme }) => theme.constants.smallFontSize};
    line-height: ${({ theme }) => theme.constants.smallLineHeight};
  }
`;

function countDecimal(val) {
  if (val == null) return 0;
  if (Math.floor(val) !== val) {
    const s = val.toString().split('.')[1];
    return s ? s.length : 0;
  }
  return 0;
}

export default function BaseTextInput({
  name,
  label = '',
  type = 'text',
  value = '',
  onChange,
  onBlur = () => {},
  validate,
  errors = null,
  parentErrors,
  additionalMessages,
  inputRef,
  showRequiredLabel = true,
  required = false,
  minLength,
  maxLength,
  min,
  placeholder = '',
  disabled = false,
  onKeyDown,
  inline = false,
  isPercent = false,
  ariaLabel,
  decimalDigits,
  className,
}) {
  let displayValue = value;
  if (decimalDigits != null && type === 'number' && typeof value === 'number') {
    const decimals = countDecimal(value);
    if (decimals > decimalDigits) {
      const s = value.toString();
      const dot = s.indexOf('.');
      displayValue = dot === -1 ? value : Number(s.slice(0, dot + decimalDigits + 1));
    }
  }

  const handleChange = (e) => {
    let next = e.target.value;
    if (type === 'number' && next !== '') next = parseFloat(next);
    onChange?.(next);
  };

  const handleBlur = () => {
    onBlur();
    validate?.();
  };

  return (
    <Container className={className}>
      <InputLabel
        name={name}
        htmlFor={`form-input--${name}`}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        isPercent={isPercent}
        disabled={disabled}
      />
      <StyledInput
        step={type === 'number' ? 'any' : undefined}
        id={`form-input--${name}`}
        data-component="text-input"
        aria-label={ariaLabel}
        type={type}
        value={displayValue}
        ref={inputRef}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        onKeyDown={onKeyDown}
        inline={inline}
        hasErrors={!!errors || !!parentErrors}
      />
      <Messages for={errors}>
        <Message when="minLength">Length is too short!</Message>
        <Message when="maxLength">Length is too long!</Message>
        {additionalMessages}
      </Messages>
    </Container>
  );
}
