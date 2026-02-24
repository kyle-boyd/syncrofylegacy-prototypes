import React from 'react';
import styled from '@emotion/styled';
import Tag from '../Tag';
import Popover from '../Popover';

const Container = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row-reverse' : 'column')};
  align-items: ${({ horizontal }) => (horizontal ? 'flex-start' : 'center')};
`;

const Track = styled.div`
  width: ${({ length }) => length}px;
  height: ${({ theme }) => theme.constants.spacing1x};
  background-color: ${({ theme }) => theme.palette.l2};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div`
  width: ${({ value }) => Math.min(100, Math.max(0, value))}%;
  height: 100%;
  background-color: ${({ theme, value }) => (value >= 100 ? theme.palette.green : theme.palette.yellow)};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  transition: width 0.2s ease;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  padding-top: ${({ theme, horizontal }) => (horizontal ? theme.constants.spacingHalf : 0)};
  padding-left: ${({ theme, horizontal }) => (horizontal ? 0 : theme.constants.spacingHalf)};
  text-align: ${({ horizontal }) => (horizontal ? 'end' : 'center')};
`;

const MixedUnitWarning = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  width: calc(6.25 * ${({ theme }) => theme.spacing.spacing4x});
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.smallLineHeight};
`;

export default function BulletGraph({
  label = '',
  value,
  orientation = 'horizontal',
  length = 200,
  showValueLabel = false,
}) {
  const horizontal = orientation === 'horizontal';

  const renderLabel = () => {
    if (!label) return null;
    if (value > 100) {
      return (
        <Popover
          content={
            <MixedUnitWarning>
              The {label.toLowerCase()} fill rate exceeds 100%
            </MixedUnitWarning>
          }
          placement="right"
        >
          <Label horizontal={horizontal}>
            <Tag name="warning" valueText={label} size="small" kind="warning" />
          </Label>
        </Popover>
      );
    }
    return (
      <Label horizontal={horizontal}>
        {showValueLabel && value != null ? `${value}% ${label}` : label}
      </Label>
    );
  };

  return (
    <Container horizontal={horizontal}>
      <Track length={length}>
        <Bar value={value > 100 ? 100 : value} />
      </Track>
      {renderLabel()}
    </Container>
  );
}
