import React, { useState } from 'react';
import styled from '@emotion/styled';
import SelectSuggest from '../SelectSuggest';
import TextInput from '../TextInput';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.constants.spacing2x}`};
  min-width: 320px;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing1x};
`;

const NumberInput = styled(TextInput)`
  width: 120px;
`;

const MODE_OPTIONS = [
  { name: 'LAST_X_DAYS', valueText: 'Last X Days' },
];

/**
 * Popover body for the "Loaded On Date" filter.
 *
 * Value shape:
 * { mode: 'LAST_X_DAYS', days: number }
 *
 * Props:
 * - value
 * - onApply(nextValue)
 * - onCancel()
 */
export default function LoadedOnDateFilterPopover({
  value = { mode: 'LAST_X_DAYS', days: 30 },
  onApply,
  onCancel,
}) {
  const [mode, setMode] = useState(value.mode || 'LAST_X_DAYS');
  const [days, setDays] = useState(String(value.days ?? 30));

  const handleApply = () => {
    const parsedDays = parseInt(days, 10);
    const safeDays = Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 30;
    onApply?.({ mode, days: safeDays });
  };

  return (
    <Container>
      <Title>Loaded On Date</Title>
      <FieldGroup>
        <Label>Mode</Label>
        <SelectSuggest
          name="loaded-on-mode"
          options={MODE_OPTIONS}
          value={mode}
          onChange={setMode}
          listWidth="100%"
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Number of Days</Label>
        <NumberInput
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </FieldGroup>
      <ActionsRow>
        <Button kind="transparent" size="small" text="Cancel" onClick={onCancel} />
        <Button kind="default" size="small" text="Apply" onClick={handleApply} />
      </ActionsRow>
    </Container>
  );
}

