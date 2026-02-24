import React from 'react';
import styled from '@emotion/styled';
import Tag from '../Tag';

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing1x} ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.cloud};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  min-height: ${({ theme }) => theme.constants.spacing4x};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  margin-right: ${({ theme }) => theme.constants.spacing1x};
`;

const EmptyMessage = styled.span`
  font-style: italic;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

export default function MultiSelectBar({
  selected = [],
  onRemove,
  label = 'Selected',
  emptyMessage = 'None selected',
  renderItem = (item) => item?.label ?? String(item),
  getKey = (item) => item?.id ?? item,
}) {
  return (
    <Bar>
      <Label>{label}</Label>
      {selected.length === 0 ? (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      ) : (
        selected.map((item) => (
          <Tag
            key={getKey(item)}
            valueText={renderItem(item)}
            onRemoveClick={onRemove ? () => onRemove(item) : undefined}
          />
        ))
      )}
    </Bar>
  );
}
