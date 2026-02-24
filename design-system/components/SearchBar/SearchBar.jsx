import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Icon from '../Icon/Icon';

const Wrapper = styled.div`
  border: 1px solid ${({ theme, disabled, active }) => {
    if (disabled) return theme.palette.l3;
    if (active) return theme.palette.sky;
    return theme.palette.l4;
  }};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.l1 : theme.palette.white)};
  height: ${({ theme }) => theme.constants.spacing4x};
  line-height: ${({ theme }) => theme.constants.spacing4x};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.palette.black};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  width: 100%;
  max-width: calc(6.25 * ${({ theme }) => theme.constants.spacing8x});
`;

const IconWrapper = styled.div`
  padding-left: ${({ theme }) => theme.constants.spacing1x};
  padding-right: ${({ theme }) => theme.constants.spacing1x};
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  line-height: 0;
  color: ${({ theme, active }) => (active ? theme.palette.cerulean : theme.palette.d3)};
  & > * {
    display: block;
  }
`;

const Input = styled.input`
  border: 0 !important;
  background-color: ${({ theme }) => theme.palette.white} !important;
  margin: 0 !important;
  outline: none !important;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  padding: 0 !important;
  :disabled {
    background-color: ${({ theme }) => theme.palette.l1};
  }
  :focus {
    border: none;
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.palette.d3} !important;
    font-size: ${({ theme }) => theme.constants.smallFontSize};
  }
`;

const ClearButtonWrapper = styled.div`
  display: flex;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  align-items: center;
  padding: ${({ theme }) => theme.constants.spacing1x};
`;

const LoadingDots = styled.span`
  padding: ${({ theme }) => theme.constants.spacingQuarter};
`;

export default function SearchBar({
  placeholder = '',
  disabled = false,
  defaultValue = '',
  onChange = () => {},
  onSubmit = () => {},
  onFocus = () => {},
  onKeyDown = () => {},
  isLoading = false,
  propRef,
}) {
  const [active, setActive] = useState(false);
  const [textValue, setTextValue] = useState(defaultValue);
  const inputRef = useRef(null);

  const ref = propRef || inputRef;

  const onInputChange = (value) => {
    onChange(value);
    setTextValue(value);
  };

  const onInputClear = () => {
    onInputChange('');
    setTextValue('');
  };

  const onInputFocus = () => {
    onFocus();
    setActive(true);
  };

  const onInputBlur = () => setActive(false);

  const handleKeyDown = (e) => {
    onKeyDown(e);
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(textValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(textValue);
  };

  return (
    <Wrapper disabled={disabled} active={active} data-component="search-bar">
      <IconWrapper active={active}>
        <Icon size={16} iconName="SEARCH" />
      </IconWrapper>
      <Input
        type="text"
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        value={textValue}
        ref={ref}
      />
      {isLoading && textValue && <LoadingDots>...</LoadingDots>}
      <ClearButtonWrapper $visible={!!textValue}>
        <Button
          kind="transparent"
          iconOnly="X"
          size="small"
          onClick={onInputClear}
          disabled={disabled}
        />
      </ClearButtonWrapper>
    </Wrapper>
  );
}
