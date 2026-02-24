import React from 'react';
import styled from '@emotion/styled';
import RequiredLabel from '../RequiredLabel';

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme, hasBottomMargin = true }) => (hasBottomMargin ? theme.constants.spacingHalf : 0)};
`;

const LabelText = styled.span`
  color: ${({ theme, disabled }) => (disabled ? theme.palette.d3 : theme.palette.black)};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.smallLineHeight};
`;

export default function InputLabel({
  name,
  htmlFor = '',
  label = '',
  errors,
  required = false,
  showRequiredLabel = true,
  hasBottomMargin = true,
  isPercent = false,
  disabled = false,
}) {
  if (!label && (!required || !showRequiredLabel)) return null;
  const labelText = isPercent ? (
    <div>
      {label}
      <div>Percentage (%)</div>
    </div>
  ) : (
    label
  );
  return (
    <Label htmlFor={htmlFor} hasBottomMargin={hasBottomMargin}>
      <LabelText id={htmlFor ? `${htmlFor}-label` : undefined} disabled={disabled}>
        {labelText}
      </LabelText>
      {required && showRequiredLabel && (
        <RequiredLabel
          id={name ? `form-input--${name}-required-label` : undefined}
          error={errors?.required}
          disabled={disabled}
        >
          Required
        </RequiredLabel>
      )}
    </Label>
  );
}
