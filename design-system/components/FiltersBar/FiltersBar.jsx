import React, { useState } from 'react';
import styled from '@emotion/styled';
import FilterNew, { FilterButton } from '../FilterNew';
import Popover from '../Popover';
import Icon from '../Icon';

const BarRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing3x}`};
  gap: ${({ theme }) => theme.constants.spacing2x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.cloud};
  background: ${({ theme }) => theme.palette.l1};
  flex-shrink: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing3x};
  min-width: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const ActiveFiltersList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-left: ${({ theme }) => theme.constants.spacing2x};
  flex-wrap: wrap;
`;

const ActiveFilterChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.constants.spacingHalf} ${theme.constants.spacing1x}`};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  border: 1px solid ${({ theme }) => theme.palette.d3};
  background: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.d1};
`;

const ActiveFilterLabel = styled.span`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const ActiveFilterValue = styled.span`
  margin-left: ${({ theme }) => theme.constants.spacingHalf};
  color: ${({ theme }) => theme.palette.d2};
`;

const RemoveFilterButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin-left: ${({ theme }) => theme.constants.spacingHalf};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.coral};
`;

const AddFilterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.constants.spacing1x} 0`};
  max-height: 320px;
  overflow-y: auto;
  min-width: 260px;
`;

const AddFilterOption = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
`;

/**
 * Generic filters bar for list views.
 *
 * This component is intentionally data-agnostic – callers provide
 * the filter labels / values and optional popover content.
 */
export default function FiltersBar({
  primaryFilters = [],
  addFilter,
  activeFilters = [],
  rightActions,
}) {
  const [openFilterId, setOpenFilterId] = useState(null);
  const [addFilterOpen, setAddFilterOpen] = useState(false);

  const handleToggleFilter = (id) => {
    setOpenFilterId((current) => (current === id ? null : id));
    if (addFilterOpen) setAddFilterOpen(false);
  };

  const handleCloseAll = () => {
    setOpenFilterId(null);
    setAddFilterOpen(false);
  };

  const renderFilterButton = (filter) => {
    const selected = openFilterId === filter.id;
    const button = (
      <FilterButton
        key={filter.id}
        label={filter.label}
        value={filter.valueLabel}
        hasSelection={filter.hasSelection}
        selected={selected}
        onClick={() => handleToggleFilter(filter.id)}
        size="small"
        leftIconName={null}
      />
    );

    if (!filter.renderPopover) {
      return button;
    }

    return (
      <Popover
        key={filter.id}
        content={filter.renderPopover({
          close: handleCloseAll,
        })}
        visible={selected}
        onClickOutside={handleCloseAll}
        trigger="manual"
        placement="bottom-start"
      >
        <span>{button}</span>
      </Popover>
    );
  };

  const renderAddFilter = () => {
    if (!addFilter) return null;

    const label = addFilter.label || 'Add Filter';

    const button = (
      <FilterButton
        label={label}
        leftIconName={null}
        rightIconName="CHEVRON_RIGHT"
        selected={addFilterOpen}
        onClick={() => {
          setAddFilterOpen((open) => !open);
          setOpenFilterId(null);
        }}
        size="small"
      />
    );

    const content = (
      <AddFilterList>
        {addFilter.options?.map((opt) => (
          <AddFilterOption
            key={opt.id}
            onClick={() => {
              addFilter.onAdd?.(opt);
              setAddFilterOpen(false);
            }}
          >
            {opt.label}
          </AddFilterOption>
        ))}
      </AddFilterList>
    );

    return (
      <Popover
        content={content}
        visible={addFilterOpen}
        onClickOutside={handleCloseAll}
        trigger="manual"
        placement="bottom-start"
      >
        <span>{button}</span>
      </Popover>
    );
  };

  return (
    <BarRoot role="region" aria-label="Filters">
      <LeftSection>
        {primaryFilters.map((filter) => renderFilterButton(filter))}
        {renderAddFilter()}
        {activeFilters.length > 0 && (
          <ActiveFiltersList>
            {activeFilters.map((filter) => (
              <ActiveFilterChip key={filter.id}>
                <ActiveFilterLabel>{filter.label}</ActiveFilterLabel>
                {filter.valueLabel && (
                  <ActiveFilterValue>{filter.valueLabel}</ActiveFilterValue>
                )}
                {filter.onRemove && (
                  <RemoveFilterButton
                    type="button"
                    aria-label={`Remove filter ${filter.label}`}
                    onClick={filter.onRemove}
                  >
                    <Icon iconName="TRASH" size={12} />
                  </RemoveFilterButton>
                )}
              </ActiveFilterChip>
            ))}
          </ActiveFiltersList>
        )}
      </LeftSection>
      {rightActions && <RightSection>{rightActions}</RightSection>}
    </BarRoot>
  );
}

