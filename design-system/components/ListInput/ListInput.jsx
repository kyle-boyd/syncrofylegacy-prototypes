import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputLabel from '../InputLabel';
import Button from '../Button';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.constants.cardGutter} 0`};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  outline: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  border: 1px solid ${({ theme, hasErrors }) => (hasErrors ? theme.palette.red : theme.palette.l4)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.cloud : theme.palette.white)};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => `${theme.constants.spacing1x} 0 0`};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.cardGutter}`};
  margin-bottom: ${({ theme }) => theme.constants.spacingHalf};
  background-color: ${({ theme }) => theme.palette.cloud};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
`;

export default function ListInput({
  name,
  label = '',
  value = [],
  onChange,
  placeholder = 'Add item...',
  disabled = false,
  errors = null,
  required = false,
  showRequiredLabel = true,
  className,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !disabled) {
      onChange?.([...(value || []), trimmed]);
      setInputValue('');
    }
  };

  const handleRemove = (index) => {
    if (disabled) return;
    const next = [...(value || [])];
    next.splice(index, 1);
    onChange?.(next);
  };

  return (
    <Container className={className}>
      <InputLabel
        name={name}
        label={label}
        errors={errors}
        required={required}
        showRequiredLabel={showRequiredLabel}
        disabled={disabled}
      />
      <Row>
        <StyledInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          disabled={disabled}
          hasErrors={!!errors}
        />
        <Button text="Add" size="small" onClick={handleAdd} disabled={disabled || !inputValue.trim()} />
      </Row>
      {Array.isArray(value) && value.length > 0 && (
        <List>
          {value.map((item, i) => (
            <ListItem key={`${item}-${i}`}>
              <span>{item}</span>
              <Button
                text="Remove"
                kind="transparent"
                color="red"
                size="extraSmall"
                onClick={() => handleRemove(i)}
                disabled={disabled}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}
