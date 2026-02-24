import React from 'react';
import styled from '@emotion/styled';
import SelectSuggest from '../SelectSuggest';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.constants.cardGutter} 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function DrilldownInput({
  name,
  label = '',
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
}) {
  const selectOptions = options.map((o) =>
    typeof o === 'string' ? { name: o, valueText: o } : { name: o.value ?? o.name, valueText: o.label ?? o.valueText ?? o.value ?? o.name }
  );
  return (
    <Wrapper>
      {label && <Label htmlFor={`drilldown--${name}`}>{label}</Label>}
      <SelectSuggest
        name={name}
        options={selectOptions}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Wrapper>
  );
}
