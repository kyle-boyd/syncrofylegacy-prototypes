import React from 'react';
import styled from '@emotion/styled';
import RequiredLabel from '../RequiredLabel';
import Radio from './Radio';

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Radios = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  flex-wrap: wrap;
  & > div {
    margin-bottom: ${({ theme }) => theme.constants.spacing1x};
    &:not(:last-child) {
      margin-right: ${({ theme, horizontal }) => (horizontal ? theme.constants.spacing3x : undefined)};
    }
  }
`;

const GroupLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.constants.spacingHalf};
`;

const LabelText = styled.span`
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.smallLineHeight};
`;

export default function RadioGroup({
  name,
  groupName,
  value,
  label = '',
  required = false,
  errors,
  disabled = false,
  horizontal = false,
  useStringValues = true,
  onChange,
  children,
}) {
  const resolvedName = groupName || name;
  const renderChildren = React.Children.map(children, (child) => {
    if (!child || child.type !== Radio) return child;
    const childValue = child.props.value;
    const checked = useStringValues
      ? String(childValue) === String(value)
      : childValue === value;
    return React.cloneElement(child, {
      name: resolvedName,
      checked,
      disabled,
      onChange: (val) => onChange?.(useStringValues ? val : val === 'true'),
    });
  });

  return (
    <RadioGroupContainer>
      {(label || required) && (
        <GroupLabel htmlFor={`form-input--${name}`}>
          <LabelText>{label}</LabelText>
          {required && (
            <RequiredLabel error={errors?.required} disabled={disabled} />
          )}
        </GroupLabel>
      )}
      <Radios horizontal={horizontal}>{renderChildren}</Radios>
    </RadioGroupContainer>
  );
}
