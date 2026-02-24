import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FilterWrapper = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, selected }) => (selected ? theme.palette.cerulean : theme.palette.d1)};
  font-size: ${({ theme, size }) => {
    if (size === 'large') return theme.constants.largeFontSize;
    if (size === 'small') return theme.constants.xsFontSize;
    return 'inherit';
  }};
  &:hover {
    color: ${({ theme, disabled, selected }) =>
      disabled ? theme.palette.l4 : selected ? theme.palette.ceruleanHover : theme.palette.d1};
  }
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.palette.cerulean};
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.constants.spacing1x};
`;

const LeftIconWrapper = styled(IconWrapper)`
  margin-right: ${({ theme }) => theme.constants.spacing1x};
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
`;

const LabelText = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const ValueText = styled.span`
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  color: ${({ theme }) => theme.palette.d2};
  margin-top: 2px;
`;

export default function FilterButton({
  label,
  value,
  selected = false,
  hasSelection = false,
  disabled = false,
  size,
  leftIconName = 'FILTER',
  rightIconName = 'CHEVRON_RIGHT',
  onClick = () => {},
}) {
  return (
    <FilterContainer>
      <FilterWrapper
        selected={selected}
        hasSelection={hasSelection}
        disabled={disabled}
        size={size}
        onClick={disabled ? undefined : onClick}
      >
        {leftIconName && (
          <LeftIconWrapper>
            <Icon iconName={leftIconName} size={14} />
          </LeftIconWrapper>
        )}
        {(label != null || (value != null && value !== '')) && (
          <TextBlock>
            {label != null && <LabelText>{label}</LabelText>}
            {value != null && value !== '' && <ValueText>{value}</ValueText>}
          </TextBlock>
        )}
        {rightIconName && (
          <IconWrapper>
            <Icon iconName={rightIconName} size={10} />
          </IconWrapper>
        )}
      </FilterWrapper>
    </FilterContainer>
  );
}
