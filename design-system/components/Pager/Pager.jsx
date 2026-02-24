import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  flex-wrap: wrap;
`;

const Info = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  margin-right: ${({ theme }) => theme.constants.spacing2x};
`;

export default function Pager({
  page = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  showInfo = true,
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <Wrapper aria-label="Pagination">
      {showInfo && totalCount > 0 && (
        <Info>
          {start}-{end} of {totalCount}
        </Info>
      )}
      <Button
        text="Previous"
        kind="transparent"
        color="cerulean"
        size="small"
        onClick={() => onPageChange?.(page - 1)}
        disabled={page <= 1}
      />
      <Button
        text="Next"
        kind="transparent"
        color="cerulean"
        size="small"
        onClick={() => onPageChange?.(page + 1)}
        disabled={page >= totalPages}
      />
    </Wrapper>
  );
}
