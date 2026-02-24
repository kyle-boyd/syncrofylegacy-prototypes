import React from 'react';
import styled from '@emotion/styled';
import BaseTextInput from '../BaseTextInput';

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const Unit = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  padding-bottom: ${({ theme }) => theme.constants.spacing1x};
  flex-shrink: 0;
`;

export default function DimensionInput({
  name,
  label = '',
  value = '',
  onChange,
  unit = 'px',
  errors = null,
  disabled = false,
  ...rest
}) {
  return (
    <Row>
      <BaseTextInput
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        type="text"
        errors={errors}
        disabled={disabled}
        {...rest}
      />
      <Unit>{unit}</Unit>
    </Row>
  );
}
