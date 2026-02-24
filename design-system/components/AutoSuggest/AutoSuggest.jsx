import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';

const Wrapper = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
  position: relative;
`;

const Input = styled.input`
  outline: 0;
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  margin: ${({ theme }) => `${theme.constants.spacingHalf} 0`};
  border: 1px solid ${({ theme, hasErrors, isOpen }) =>
    hasErrors ? theme.palette.red : isOpen ? theme.palette.sky : theme.palette.l4};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.cloud : theme.palette.white)};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  &::placeholder {
    color: ${({ theme }) => theme.palette.d3};
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: ${({ theme }) => theme.constants.spacingHalf};
  list-style: none;
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  box-shadow: ${({ theme }) => theme.constants.z2};
  max-height: ${({ theme }) => theme.constants.spacing8x};
  overflow-y: auto;
  z-index: 100;
`;

const Option = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  &:hover {
    background-color: ${({ theme }) => theme.palette.whiteHover};
  }
  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.palette.whiteSelected};
  }
`;

export default function AutoSuggest({
  name,
  label = '',
  value = '',
  options = [],
  onChange,
  onSelect,
  placeholder = '',
  disabled = false,
  errors = null,
  required = false,
  showRequiredLabel = true,
  getOptionLabel = (opt) => (typeof opt === 'string' ? opt : opt?.label ?? String(opt)),
  getOptionValue = (opt) => (typeof opt === 'string' ? opt : opt?.value ?? opt),
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const filtered =
    value.trim() === ''
      ? options
      : options.filter((opt) =>
          getOptionLabel(opt).toLowerCase().includes(value.toLowerCase())
        );

  useEffect(() => {
    setHighlightIndex(-1);
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    const val = getOptionValue(opt);
    onChange?.(getOptionLabel(opt));
    onSelect?.(opt, val);
    setIsOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <InputLabel
        name={name}
        htmlFor={`autosuggest--${name}`}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        disabled={disabled}
      />
      <Input
        id={`autosuggest--${name}`}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder={placeholder}
        disabled={disabled}
        hasErrors={!!errors}
        isOpen={isOpen && filtered.length > 0}
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <Dropdown role="listbox">
          {filtered.map((opt, i) => (
            <Option
              key={getOptionValue(opt)}
              role="option"
              aria-selected={i === highlightIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt);
              }}
              onMouseEnter={() => setHighlightIndex(i)}
            >
              {getOptionLabel(opt)}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
