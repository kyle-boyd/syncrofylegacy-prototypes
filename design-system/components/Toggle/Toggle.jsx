import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-self: baseline;
  justify-content: ${({ labelSide }) => (labelSide === 'left' ? 'space-between' : 'flex-start')};
  width: 100%;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  margin: ${({ theme, labelSide }) => (labelSide === 'left' ? `0 ${theme.constants.spacing1_5x} 0 0` : `0 0 0 ${theme.constants.spacing1_5x}`)};
`;

const SlideToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: ${({ theme }) => theme.constants.spacing4x};
  max-width: ${({ theme }) => theme.constants.spacing4x};
  height: ${({ theme }) => theme.constants.spacing2x};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  padding: 0 ${({ theme }) => theme.constants.spacingQuarter};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  box-shadow: ${({ theme }) => theme.constants.zInner};
  flex-direction: ${({ on }) => (on ? 'row-reverse' : 'row')};
  background-color: ${({ theme, disabled, on, onColor }) =>
    disabled ? theme.palette.l3 : on ? theme.palette[onColor] : theme.palette.l1};
  ${({ theme, disabled, on, onColor }) =>
    !disabled &&
    (on
      ? `&:hover { background-color: ${theme.palette[`${onColor}Hover`]}; }
         &:focus { outline: none; box-shadow: 0 0 ${theme.constants.spacingHalf} ${theme.constants.spacingHalf} ${theme.palette[`${onColor}Click`]}29, ${theme.constants.zInner}; }`
      : `&:hover { background-color: ${theme.palette[`${onColor}Hover`]}29; }
         &:focus { outline: none; box-shadow: 0 0 ${theme.constants.spacingHalf} ${theme.constants.spacingHalf} ${theme.palette.l3}89, ${theme.constants.zInner}; }`)};
`;

const StateIndicator = styled.div`
  width: ${({ theme }) => theme.constants.spacing1_5x};
  height: ${({ theme }) => theme.constants.spacing1_5x};
  box-shadow: ${({ theme }) => theme.constants.z1};
  border-radius: 50%;
  background-color: ${({ theme, disabled }) => (disabled ? theme.palette.l2 : theme.palette.white)};
`;

export default function Toggle({
  on,
  onChange,
  label = '',
  disabled = false,
  onColor = 'green',
  labelSide = 'right',
}) {
  const handleClick = (e) => {
    if (!disabled && onChange) {
      e.stopPropagation();
      onChange(!on);
    }
  };

  return (
    <Container labelSide={labelSide}>
      {label && labelSide === 'left' && (
        <Label id="label" labelSide={labelSide}>{label}</Label>
      )}
      <SlideToggle
        id="slide-toggle"
        on={on}
        onColor={onColor}
        disabled={disabled}
        onClick={handleClick}
        data-value={on ? 'on' : 'off'}
      >
        <StateIndicator id="slide-toggle-state-indicator" disabled={disabled} />
      </SlideToggle>
      {label && labelSide === 'right' && (
        <Label id="label" labelSide={labelSide}>{label}</Label>
      )}
    </Container>
  );
}
