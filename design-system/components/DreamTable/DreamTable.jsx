import React, { useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  background-color: ${({ theme }) => theme.palette.white};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const Th = styled.th`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  text-align: left;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
  background-color: ${({ theme }) => theme.palette.cloud};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  ${({ verticalDividers, isLast, theme }) =>
    verticalDividers && !isLast
      ? `border-right: 1px solid ${theme.palette.stroke};`
      : ''};
`;

const Td = styled.td`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  color: ${({ theme }) => theme.palette.black};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
  ${({ verticalDividers, isLast, theme }) =>
    verticalDividers && !isLast
      ? `border-right: 1px solid ${theme.palette.l2};`
      : ''};
`;

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.offWhite};
  }
  ${({ zebraStripes, isEven, theme }) =>
    zebraStripes && isEven ? `background-color: ${theme.palette.offWhite};` : ''};
  ${({ zebraStripes, isEven, theme }) =>
    zebraStripes && isEven
      ? `&:hover { background-color: ${theme.palette.silver}; }`
      : ''};
`;

const SortableThButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  font: inherit;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.black};
  background: none;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
    border-radius: 2px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.l3};
  }
`;

const SortIconWrapper = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.palette.cerulean};
  transform: rotate(${({ direction }) => (direction === 'desc' ? 180 : 0)}deg);
`;

const ExpandCell = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-right: ${({ theme }) => theme.constants.spacing1x};
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  vertical-align: middle;
  &:focus {
    outline: none;
    border-radius: 2px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.l3};
  }
`;

// Match Accordion caret: same icon, size, and rotation behavior
const ExpandChevronWrapper = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.palette.cerulean};
  transition: transform 0.2s ease;
  transform: rotate(${({ isExpanded }) => (isExpanded ? 90 : 0)}deg);
`;

const ExpandedTd = styled.td`
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  background-color: ${({ theme }) => theme.palette.offWhite};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
  vertical-align: top;
`;

const ExpandedTr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

function compareValues(a, b, direction) {
  const aVal = a == null ? '' : String(a);
  const bVal = b == null ? '' : String(b);
  const numA = Number(a);
  const numB = Number(b);
  const aIsNum = !Number.isNaN(numA) && aVal.trim() !== '';
  const bIsNum = !Number.isNaN(numB) && bVal.trim() !== '';
  if (aIsNum && bIsNum) {
    return direction === 'asc' ? numA - numB : numB - numA;
  }
  const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
  return direction === 'asc' ? cmp : -cmp;
}

export default function DreamTable({
  columns = [],
  data = [],
  keyField = 'id',
  renderCell,
  expandable = false,
  expandedRowRender,
  expandIconColumnKey,
  expandedRowKeys: controlledExpandedKeys,
  defaultExpandedRowKeys = [],
  onExpandedRowsChange,
  zebraStripes = false,
  verticalDividers = false,
  sortColumnKey: controlledSortColumnKey,
  sortDirection: controlledSortDirection,
  defaultSortColumnKey = null,
  defaultSortDirection = 'asc',
  onSortChange,
}) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpandedRowKeys);
  const [internalSortColumnKey, setInternalSortColumnKey] = useState(defaultSortColumnKey);
  const [internalSortDirection, setInternalSortDirection] = useState(defaultSortDirection);

  const isControlled = controlledExpandedKeys != null;
  const expandedSet = isControlled
    ? new Set(controlledExpandedKeys)
    : new Set(internalExpanded);

  const sortControlled = controlledSortColumnKey != null && controlledSortDirection != null;
  const sortColumnKey = sortControlled ? controlledSortColumnKey : internalSortColumnKey;
  const sortDirection = sortControlled ? controlledSortDirection : internalSortDirection;

  const sortedData = useMemo(() => {
    if (sortColumnKey == null) return data;
    return [...data].sort((rowA, rowB) => {
      const key = sortColumnKey;
      return compareValues(rowA[key], rowB[key], sortDirection);
    });
  }, [data, sortColumnKey, sortDirection]);

  const handleSort = useCallback(
    (columnKey) => {
      const nextDirection =
        sortColumnKey === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
      if (!sortControlled) {
        setInternalSortColumnKey(columnKey);
        setInternalSortDirection(nextDirection);
      }
      onSortChange?.({ columnKey, direction: nextDirection });
    },
    [sortColumnKey, sortDirection, sortControlled, onSortChange]
  );

  const toggleExpanded = useCallback(
    (rowKey) => {
      const next = new Set(expandedSet);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      const nextArray = Array.from(next);
      if (!isControlled) setInternalExpanded(nextArray);
      onExpandedRowsChange?.(nextArray);
    },
    [expandedSet, isControlled, onExpandedRowsChange]
  );

  const expandColumnKey =
    expandIconColumnKey ?? columns[0]?.key ?? columns[0]?.dataKey;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col, colIndex) => {
              const colKey = col.key ?? col.dataKey;
              const isLast = colIndex === columns.length - 1;
              const isSortable = col.sortable === true;
              const title = col.title ?? col.header ?? col.key;
              return (
                <Th key={colKey} verticalDividers={verticalDividers} isLast={isLast}>
                  {isSortable ? (
                    <SortableThButton
                      type="button"
                      onClick={() => handleSort(colKey)}
                      aria-sort={
                        sortColumnKey === colKey
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : undefined
                      }
                    >
                      {title}
                      <SortIconWrapper
                        direction={sortColumnKey === colKey ? sortDirection : 'asc'}
                      >
                        <Icon iconName="CHEVRON_DOWN" size={14} />
                      </SortIconWrapper>
                    </SortableThButton>
                  ) : (
                    title
                  )}
                </Th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => {
            const rowKey = row[keyField] ?? i;
            const isExpanded = expandable && expandedSet.has(rowKey);
            return (
              <React.Fragment key={rowKey}>
                <Tr zebraStripes={zebraStripes} isEven={i % 2 === 1}>
                  {columns.map((col, colIndex) => {
                    const key = col.key ?? col.dataKey;
                    const value = row[key];
                    const isExpandColumn = key === expandColumnKey;
                    const cellContent = renderCell ? renderCell(col, value, row) : value;
                    const isLast = colIndex === columns.length - 1;
                    return (
                      <Td
                        key={key}
                        verticalDividers={verticalDividers}
                        isLast={isLast}
                      >
                        {expandable && isExpandColumn ? (
                          <>
                            <ExpandCell
                              type="button"
                              onClick={() => toggleExpanded(rowKey)}
                              aria-expanded={isExpanded}
                              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                            >
                              <ExpandChevronWrapper isExpanded={isExpanded}>
                                <Icon iconName="CHEVRON_RIGHT" size={12} />
                              </ExpandChevronWrapper>
                            </ExpandCell>
                            {cellContent}
                          </>
                        ) : (
                          cellContent
                        )}
                      </Td>
                    );
                  })}
                </Tr>
                {expandable && isExpanded && expandedRowRender && (
                  <ExpandedTr>
                    <ExpandedTd colSpan={columns.length}>
                      {expandedRowRender(row)}
                    </ExpandedTd>
                  </ExpandedTr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
