import React, { useState } from 'react';
import styled from '@emotion/styled';
import RequiredLabel from '../RequiredLabel';
import PseudoTextBox from '../PseudoTextBox';
import Popover from '../Popover';
import Icon from '../Icon';

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ listWidth }) => listWidth || '100%'};
  min-width: ${({ listWidth }) => listWidth || '0'};
`;

const TriggerRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const ValueText = styled.span`
  flex: 1;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  font-size: inherit;
  color: ${({ theme, placeholder }) => (placeholder ? theme.palette.d3 : 'inherit')};
`;

const Chevron = styled.span`
  padding-right: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme }) => theme.palette.d2};
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'none')};
`;

const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} 0`};
  max-height: ${({ theme, listMaxHeight }) =>
    listMaxHeight || `calc(6 * ${theme.constants.xxlLineHeight})`};
  width: ${({ listWidth }) => listWidth || 'auto'};
  min-width: ${({ listWidth }) => listWidth || '0'};
  box-sizing: border-box;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  cursor: pointer;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  background: ${({ theme, selected }) => (selected ? theme.palette.cloud : 'transparent')};
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.constants.spacingHalf};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
`;

export default function SelectSuggest({
  name,
  label = '',
  required = false,
  disabled = false,
  placeholder = 'Select...',
  options = [],
  value,
  onChange,
  useStringValue = true,
  errors,
  listMaxHeight,
  listWidth,
  placement,
}) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (opt) => (useStringValue ? opt.name === value : opt.name === value) || opt.valueText === value
  );
  const displayValue = selectedOption ? selectedOption.valueText : '';

  const handleSelect = (opt) => {
    onChange?.(useStringValue ? opt.name : opt);
    setOpen(false);
  };

  const content = (
    <OptionsList listMaxHeight={listMaxHeight} listWidth={listWidth}>
      {options.map((opt) => (
        <Option
          key={opt.name}
          selected={value === opt.name || value === opt.valueText}
          onClick={() => handleSelect(opt)}
        >
          {opt.valueText ?? opt.name}
        </Option>
      ))}
    </OptionsList>
  );

  return (
    <TopContainer listWidth={listWidth}>
      {(label || required) && (
        <LabelRow>
          {label && (
            <Label htmlFor={`select-suggest-${name}`}>
              {label}
            </Label>
          )}
          {required && <RequiredLabel error={errors?.required} disabled={disabled} />}
        </LabelRow>
      )}
      <Popover
        content={content}
        visible={open}
        onClickOutside={() => setOpen(false)}
        interactive
        trigger="manual"
        placement={placement}
        contentMaxHeight={listMaxHeight}
      >
        <PseudoTextBox
          canTab
          isExpanded={open}
          isFocused={open}
          errors={errors}
          disabled={disabled}
          onFocus={() => !disabled && setOpen(true)}
          onClick={() => !disabled && setOpen(!open)}
        >
          <TriggerRow disabled={disabled} onClick={() => !disabled && setOpen(!open)}>
            <ValueText placeholder={!displayValue}>{displayValue || placeholder}</ValueText>
            <Chevron open={open}>
              <Icon iconName="CHEVRON_RIGHT" size={12} />
            </Chevron>
          </TriggerRow>
        </PseudoTextBox>
      </Popover>
    </TopContainer>
  );
}
