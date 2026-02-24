import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { RadioGroup, Radio } from '../RadioInput';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.constants.spacing2x}`};
  min-width: 360px;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const StatusList = styled.ul`
  list-style: none;
  margin: ${({ theme }) => `0 -${theme.constants.spacing2x}`};
  padding: 0;
  max-height: 260px;
  overflow-y: auto;
  border-top: 1px solid ${({ theme }) => theme.palette.cloud};
  border-bottom: 1px solid ${({ theme }) => theme.palette.cloud};
`;

const StatusRow = styled.li`
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  cursor: pointer;
  background: ${({ theme, selected }) => (selected ? theme.palette.cloud : 'transparent')};
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusLabel = styled.span`
  margin-left: ${({ theme }) => theme.constants.spacing1x};
`;

const StatusCode = styled.span`
  color: ${({ theme }) => theme.palette.d3};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing1x};
`;

const SelectAllRow = styled(StatusRow)`
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

/**
 * Popover body for the "Acknowledgment Status" filter.
 *
 * Value shape:
 * { mode: 'INCLUDING' | 'EXCLUDING', codes: string[] }
 *
 * Props:
 * - availableStatuses: [{ code, label }]
 * - value
 * - onApply(nextValue)
 * - onCancel()
 */
export default function AcknowledgmentStatusFilterPopover({
  availableStatuses = [],
  value = { mode: 'INCLUDING', codes: [] },
  onApply,
  onCancel,
}) {
  const [mode, setMode] = useState(value.mode || 'INCLUDING');
  const [codes, setCodes] = useState(new Set(value.codes || []));

  const allCodes = useMemo(() => availableStatuses.map((s) => s.code), [availableStatuses]);
  const allSelected = codes.size > 0 && allCodes.every((code) => codes.has(code));

  const toggleCode = (code) => {
    setCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const handleSelectAll = () => {
    setCodes((prev) => {
      if (prev.size && allSelected) {
        return new Set();
      }
      return new Set(allCodes);
    });
  };

  const handleApply = () => {
    onApply?.({ mode, codes: Array.from(codes) });
  };

  return (
    <Container>
      <Title>Acknowledgment Status</Title>
      <Section>
        <RadioGroup
          name="ack-status-mode"
          value={mode}
          onChange={setMode}
          horizontal
        >
          <Radio label="Including" value="INCLUDING" />
          <Radio label="Not Including" value="EXCLUDING" />
        </RadioGroup>
      </Section>
      <Section>
        <StatusList>
          <SelectAllRow selected={allSelected} onClick={handleSelectAll}>
            <span>Select All</span>
          </SelectAllRow>
          {availableStatuses.map((s) => {
            const selected = codes.has(s.code);
            return (
              <StatusRow
                key={s.code}
                selected={selected}
                onClick={() => toggleCode(s.code)}
              >
                <div>
                  <StatusCode>{s.code}:</StatusCode>
                  <StatusLabel>{s.label}</StatusLabel>
                </div>
              </StatusRow>
            );
          })}
        </StatusList>
      </Section>
      <ActionsRow>
        <Button kind="transparent" size="small" text="Cancel" onClick={onCancel} />
        <Button kind="default" size="small" text="Apply" onClick={handleApply} />
      </ActionsRow>
    </Container>
  );
}

