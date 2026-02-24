import React from 'react';
import styled from '@emotion/styled';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  background-color: ${({ theme }) => theme.palette.white};
  overflow: hidden;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.offWhite};
  }
`;

const ItemTitle = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const EmptyText = styled.span`
  color: ${({ theme }) => theme.palette.greyedOutText};
`;

export default function ReportList({
  items = [],
  getKey = (item) => item?.id ?? item,
  getTitle = (item) => item?.title ?? item?.name ?? String(item),
  renderActions,
  emptyMessage = 'No reports',
}) {
  if (items.length === 0) {
    return (
      <List>
        <Item>
          <EmptyText>{emptyMessage}</EmptyText>
        </Item>
      </List>
    );
  }
  return (
    <List>
      {items.map((item) => (
        <Item key={getKey(item)}>
          <ItemTitle>{getTitle(item)}</ItemTitle>
          {renderActions?.(item)}
        </Item>
      ))}
    </List>
  );
}
