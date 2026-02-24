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

const PageList = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacingHalf};
`;

const PageBtn = styled.button`
  min-width: ${({ theme }) => theme.constants.spacing3x};
  height: ${({ theme }) => theme.constants.spacing3x};
  padding: 0 ${({ theme }) => theme.constants.spacing1x};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme, active }) => (active ? theme.palette.cerulean : theme.palette.white)};
  color: ${({ theme, active }) => (active ? theme.palette.white : theme.palette.black)};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover:not(:disabled) {
    background-color: ${({ theme, active }) => (active ? theme.palette.ceruleanHover : theme.palette.l1)};
  }
`;

export default function NumberedPager({
  page = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  showInfo = true,
  maxVisible = 5,
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  let low = Math.max(1, page - Math.floor(maxVisible / 2));
  let high = Math.min(totalPages, low + maxVisible - 1);
  if (high - low + 1 < maxVisible) low = Math.max(1, high - maxVisible + 1);
  const pages = [];
  for (let p = low; p <= high; p++) pages.push(p);

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
      <PageList>
        {pages.map((p) => (
          <PageBtn
            key={p}
            type="button"
            active={p === page}
            onClick={() => onPageChange?.(p)}
            disabled={p === page}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </PageBtn>
        ))}
      </PageList>
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
