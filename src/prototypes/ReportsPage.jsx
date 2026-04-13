import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NewPageHeader, Tabs, DreamTable, NumberedPager, Button, Icon, TextInput } from '@design-system';

// ─── Data ─────────────────────────────────────────────────────────────────────

const REPORTS = [
  { id: '1', title: 'Test Report', timestamp: '3/25/2026, 1:21 PM', sharedWith: '', failed: false },
  { id: '2', title: 'AAP - ISN View', timestamp: '5/28/2025, 8:13 AM', sharedWith: '', failed: false },
  { id: '3', title: 'FedMog Invoices', timestamp: '7/08/2024, 2:34 PM', sharedWith: '', failed: false },
  { id: '4', title: 'FA EST or GMT', timestamp: '7/08/2024, 12:52 PM', sharedWith: '', failed: false },
  { id: '5', title: 'Test View', timestamp: '5/28/2024, 12:09 PM', sharedWith: '', failed: false },
  { id: '6', title: 'testOrders', timestamp: '5/21/2024, 9:21 AM', sharedWith: '', failed: false },
  { id: '7', title: 'Temp go Live Test', timestamp: '5/21/2024, 6:37 AM', sharedWith: '', failed: false },
  { id: '8', title: 'TestReport 351', timestamp: '5/20/2024, 1:51 PM', sharedWith: '', failed: false },
  { id: '9', title: 'Test report', timestamp: '5/20/2024, 1:44 PM', sharedWith: '', failed: true },
  { id: '10', title: 'report test', timestamp: '5/20/2024, 1:28 PM', sharedWith: '', failed: true },
];

// Pre-populated to demonstrate scheduled report indicators
const INITIAL_SCHEDULES = {
  '1': { toEmails: ['team@company.com'], frequency: 'weekly', time: '8:00 AM', dayOfWeek: 'Monday', dayOfMonth: '1st' },
  '3': { toEmails: ['reports@company.com'], frequency: 'monthly', time: '9:00 AM', dayOfWeek: 'Monday', dayOfMonth: '1st' },
};

const TIME_OPTIONS = Array.from({ length: 24 }, (_, h) => {
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:00 ${ampm}`;
});

const DAY_OF_WEEK_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_OF_MONTH_OPTIONS = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1;
  const suffix = d === 1 || d === 21 || d === 31 ? 'st' : d === 2 || d === 22 ? 'nd' : d === 3 || d === 23 ? 'rd' : 'th';
  return `${d}${suffix}`;
});

const TABLE_COLUMNS = [
  { key: 'title', title: 'Title', sortable: true },
  { key: 'timestamp', title: 'Timestamp', sortable: true },
  { key: 'sharedWith', title: 'Shared With' },
  { key: '_actions', title: '' },
];

// ─── Styled components ────────────────────────────────────────────────────────

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background-color: ${({ theme }) => theme.palette.offWhite};
`;

const TabsWrap = styled.div`
  padding: 0 ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  min-height: 0;
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  flex-direction: column;
`;

const ContentCard = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  background-color: ${({ theme }) => theme.palette.white};
  overflow: hidden;
`;

const TableWrap = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.constants.spacing2x} ${({ theme }) => theme.constants.spacing2x};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  flex-shrink: 0;
`;

const ResultsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const PageSizeBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  cursor: pointer;
  color: ${({ theme, $active }) => $active ? theme.palette.d1 : theme.palette.cerulean};
  font-weight: ${({ theme, $active }) => $active ? theme.constants.semiBoldFontWeight : 'normal'};

  &:hover {
    text-decoration: underline;
  }
`;

// Title cell
const TitleCell = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const TitleLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.cerulean};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const TitleGray = styled.span`
  color: ${({ theme }) => theme.palette.d3};
`;

const FailedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.coral};
  background-color: transparent;
`;

// Tooltip
const TooltipBubble = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.palette.d1};
  color: white;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.palette.d1};
  }
`;

const TooltipWrap = styled.div`
  position: relative;
  display: inline-flex;

  &:hover ${TooltipBubble} {
    opacity: 1;
  }
`;

// Action icons row
const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  display: inline-flex;
  align-items: center;
  opacity: ${({ $disabled, $dimmed }) => $disabled ? 0.3 : $dimmed ? 0.35 : 1};
  color: ${({ theme, $color }) => {
    if ($color === 'green') return theme.palette.green;
    if ($color === 'red') return '#C62828';
    if ($color === 'orange') return '#E07800';
    if ($color === 'teal') return theme.palette.teal;
    if ($color === 'gray') return theme.palette.d3;
    return theme.palette.cerulean;
  }};

  &:hover:not(:disabled) {
    opacity: 0.75;
  }
`;

// Run Report From View header link
const RunReportLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing0_5x};
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  &:hover { text-decoration: underline; }
`;

// Scheduled indicator badge in title cell
const ScheduledIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.green};
  margin-left: 2px;
  flex-shrink: 0;
`;

// Schedule modal — frequency section
const FrequencyGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const FrequencyOptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const FrequencyRadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
  cursor: pointer;
`;

const FrequencyDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing2x};
  padding-left: 24px;
`;

const InlineField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

// Tag/chip input for email fields
const TagInputWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  min-height: 36px;
  padding: 4px ${({ theme }) => theme.constants.spacing1x};
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  background-color: ${({ theme }) => theme.palette.white};
  cursor: text;

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 4px 2px 8px;
  background-color: ${({ theme }) => theme.palette.cerulean};
  color: white;
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  white-space: nowrap;
`;

const TagChipRemove = styled.button`
  background: none;
  border: none;
  padding: 1px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1;
  &:hover { color: white; }
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  padding: 2px 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  color: ${({ theme }) => theme.palette.d1};
  background: transparent;
  flex: 1;
  min-width: 140px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.d3};
  }
`;

// ─── Modal primitives ─────────────────────────────────────────────────────────
// Deviation: using custom modal implementation rather than design system ModalNew,
// because the design calls for a specific form layout not easily achieved with ModalNew's
// generic children API without deeper customization.

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  width: 480px;
  max-width: calc(100vw - 32px);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d1};
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.d3};
  display: inline-flex;
  align-items: center;
  &:hover { color: ${({ theme }) => theme.palette.d1}; }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing2x};
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.d2};
`;

const RequiredLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.d3};
`;

// Deviation: native <input> and <select> used for readonly/disabled states and the
// tag-style "To" field, as the design system TextInput doesn't expose readonly styling
// or multi-entry tag behavior.
const NativeInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ readOnly, theme }) => readOnly ? theme.palette.cloud : theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

const NativeTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

const NativeSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.palette.silver};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing1x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-family: inherit;
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.d1};
  appearance: auto;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.cerulean};
    outline-offset: -1px;
  }
`;

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ label, children }) {
  return (
    <TooltipWrap>
      {children}
      <TooltipBubble role="tooltip">{label}</TooltipBubble>
    </TooltipWrap>
  );
}

// ─── Tag Input ────────────────────────────────────────────────────────────────

function TagInput({ id, tags, onTagsChange, placeholder }) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (value) => {
    const trimmed = value.trim().replace(/,+$/, '').trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(',')) {
      addTag(val);
    } else {
      setInputValue(val);
    }
  };

  return (
    <TagInputWrap onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
      {tags.map((tag, i) => (
        <TagChip key={i}>
          {tag}
          <TagChipRemove
            type="button"
            onClick={() => onTagsChange(tags.filter((_, idx) => idx !== i))}
            aria-label={`Remove ${tag}`}
          >
            <Icon iconName="CLOSE" size={10} />
          </TagChipRemove>
        </TagChip>
      ))}
      <TagInputField
        id={id}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (inputValue.trim()) addTag(inputValue); }}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </TagInputWrap>
  );
}

// ─── Email Reports Modal ──────────────────────────────────────────────────────

function EmailReportsModal({ report, onClose }) {
  const [to, setTo] = useState([]);
  const [subject, setSubject] = useState(report.title);
  const [body, setBody] = useState(
    `Hi,\nPlease find Report URL:\nhttps://app.prod.syncrofy.com/reports/v2/${report.id}abc123def456`
  );

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Email Reports</ModalTitle>
          <ModalCloseBtn type="button" onClick={onClose} aria-label="Close">
            <Icon iconName="CLOSE" size={16} />
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <FormLabel>From</FormLabel>
            <NativeInput
              type="text"
              readOnly
              value="syncrofy.admin@advance-auto.com"
            />
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="email-to">To</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <TagInput
              id="email-to"
              tags={to}
              onTagsChange={setTo}
              placeholder='Type an address and press Enter or comma...'
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor="email-subject">Subject</FormLabel>
            <NativeInput
              id="email-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor="email-body">Report Link</FormLabel>
            <NativeTextarea
              id="email-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button text="Cancel" color="blue" kind="inverted" size="small" onClick={onClose} />
          <Button text="Send" color="cerulean" kind="default" size="small" onClick={onClose} />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ─── Run Report From View Modal ───────────────────────────────────────────────

function RunReportFromViewModal({ onClose }) {
  const [type, setType] = useState('Documents');
  const [view, setView] = useState('0bytes');
  const [reportName, setReportName] = useState('');

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Run Report From View</ModalTitle>
          <ModalCloseBtn type="button" onClick={onClose} aria-label="Close">
            <Icon iconName="CLOSE" size={16} />
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-type">Type</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeSelect
              id="run-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Documents">Documents</option>
              <option value="Orders">Orders</option>
              <option value="Shipments">Shipments</option>
              <option value="LineItems">Line Items</option>
            </NativeSelect>
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-view">View</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeSelect
              id="run-view"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="0bytes">0bytes</option>
              <option value="All Documents">All Documents</option>
              <option value="FA EST or GMT">FA EST or GMT</option>
              <option value="Test View">Test View</option>
            </NativeSelect>
          </FormField>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="run-name">Report Name</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <NativeInput
              id="run-name"
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button text="Cancel" color="blue" kind="inverted" size="small" onClick={onClose} />
          <Button
            text="Run"
            color="cerulean"
            kind="default"
            size="small"
            disabled={!reportName.trim()}
            onClick={onClose}
          />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ─── Schedule Report Modal ────────────────────────────────────────────────────

function ScheduleReportModal({ report, existingSchedule, onClose, onSave }) {
  const [toEmails, setToEmails] = useState(existingSchedule?.toEmails ?? []);
  const [frequency, setFrequency] = useState(existingSchedule?.frequency ?? 'daily');
  const [time, setTime] = useState(existingSchedule?.time ?? '8:00 AM');
  const [dayOfWeek, setDayOfWeek] = useState(existingSchedule?.dayOfWeek ?? 'Monday');
  const [dayOfMonth, setDayOfMonth] = useState(existingSchedule?.dayOfMonth ?? '1st');

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Schedule Report — {report.title}</ModalTitle>
          <ModalCloseBtn type="button" onClick={onClose} aria-label="Close">
            <Icon iconName="CLOSE" size={16} />
          </ModalCloseBtn>
        </ModalHeader>
        <ModalBody>
          <FormField>
            <FormLabelRow>
              <FormLabel htmlFor="schedule-to">Email To</FormLabel>
              <RequiredLabel>Required</RequiredLabel>
            </FormLabelRow>
            <TagInput
              id="schedule-to"
              tags={toEmails}
              onTagsChange={setToEmails}
              placeholder='Type an address and press Enter or comma...'
            />
          </FormField>

          <FormField>
            <FormLabel>Frequency</FormLabel>
            <FrequencyGroup>

              {/* Daily */}
              <FrequencyOptionWrap>
                <FrequencyRadioRow as="label">
                  <input
                    type="radio"
                    name="schedule-frequency"
                    value="daily"
                    checked={frequency === 'daily'}
                    onChange={() => setFrequency('daily')}
                  />
                  Daily
                </FrequencyRadioRow>
                {frequency === 'daily' && (
                  <FrequencyDetails>
                    <InlineField>
                      <FormLabel htmlFor="schedule-daily-time">Time</FormLabel>
                      <NativeSelect
                        id="schedule-daily-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                      </NativeSelect>
                    </InlineField>
                  </FrequencyDetails>
                )}
              </FrequencyOptionWrap>

              {/* Weekly */}
              <FrequencyOptionWrap>
                <FrequencyRadioRow as="label">
                  <input
                    type="radio"
                    name="schedule-frequency"
                    value="weekly"
                    checked={frequency === 'weekly'}
                    onChange={() => setFrequency('weekly')}
                  />
                  Weekly
                </FrequencyRadioRow>
                {frequency === 'weekly' && (
                  <FrequencyDetails>
                    <InlineField>
                      <FormLabel htmlFor="schedule-day-of-week">Day of Week</FormLabel>
                      <NativeSelect
                        id="schedule-day-of-week"
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                      >
                        {DAY_OF_WEEK_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      </NativeSelect>
                    </InlineField>
                    <InlineField>
                      <FormLabel htmlFor="schedule-weekly-time">Time</FormLabel>
                      <NativeSelect
                        id="schedule-weekly-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                      </NativeSelect>
                    </InlineField>
                  </FrequencyDetails>
                )}
              </FrequencyOptionWrap>

              {/* Monthly */}
              <FrequencyOptionWrap>
                <FrequencyRadioRow as="label">
                  <input
                    type="radio"
                    name="schedule-frequency"
                    value="monthly"
                    checked={frequency === 'monthly'}
                    onChange={() => setFrequency('monthly')}
                  />
                  Monthly
                </FrequencyRadioRow>
                {frequency === 'monthly' && (
                  <FrequencyDetails>
                    <InlineField>
                      <FormLabel htmlFor="schedule-day-of-month">Day of Month</FormLabel>
                      <NativeSelect
                        id="schedule-day-of-month"
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                      >
                        {DAY_OF_MONTH_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      </NativeSelect>
                    </InlineField>
                    <InlineField>
                      <FormLabel htmlFor="schedule-monthly-time">Time</FormLabel>
                      <NativeSelect
                        id="schedule-monthly-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                      </NativeSelect>
                    </InlineField>
                  </FrequencyDetails>
                )}
              </FrequencyOptionWrap>

            </FrequencyGroup>
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button text="Cancel" color="blue" kind="inverted" size="small" onClick={onClose} />
          <Button
            text="Save"
            color="cerulean"
            kind="default"
            size="small"
            disabled={toEmails.length === 0}
            onClick={() => onSave({ toEmails, frequency, time, dayOfWeek, dayOfMonth })}
          />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'my-reports', label: 'My Reports' },
  { id: 'shared-with-me', label: 'Shared with Me' },
];

const PAGE_SIZES = [20, 40, 60];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('my-reports');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [emailReport, setEmailReport] = useState(null);
  const [runReportOpen, setRunReportOpen] = useState(false);
  const [scheduledReports, setScheduledReports] = useState(INITIAL_SCHEDULES);
  const [scheduleReport, setScheduleReport] = useState(null);

  const handleSaveSchedule = (config) => {
    setScheduledReports(prev => ({ ...prev, [scheduleReport.id]: config }));
    setScheduleReport(null);
  };

  const totalCount = 94;

  const renderCell = (col, value, row) => {
    if (col.key === 'title') {
      return (
        <TitleCell>
          {row.failed ? (
            <TitleGray>{row.title}</TitleGray>
          ) : (
            <TitleLink type="button" onClick={() => {}}>
              {row.title}
            </TitleLink>
          )}
          {row.failed && <FailedBadge>Failed</FailedBadge>}
          {scheduledReports[row.id] && (
            <ScheduledIndicator>
              <Icon iconName="SCHEDULE" size={14} />
            </ScheduledIndicator>
          )}
        </TitleCell>
      );
    }

    if (col.key === '_actions') {
      return (
        <ActionsCell>
          <Tooltip label="Email">
            <ActionIcon
              type="button"
              $color="gray"
              aria-label="Email report"
              onClick={() => setEmailReport(row)}
            >
              <Icon iconName="EMAIL" size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Share">
            <ActionIcon
              type="button"
              $color="teal"
              aria-label="Share report"
              onClick={() => {}}
            >
              <Icon iconName="SHARE" size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              type="button"
              $color="red"
              aria-label="Delete report"
              onClick={() => {}}
            >
              <Icon iconName="DELETE" size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Go to Live">
            <ActionIcon
              type="button"
              $color="orange"
              aria-label="Refresh report"
              onClick={() => {}}
            >
              <Icon iconName="REFRESH" size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={scheduledReports[row.id] ? 'Edit Schedule' : 'Schedule'}>
            <ActionIcon
              type="button"
              $color="green"
              aria-label={scheduledReports[row.id] ? 'Edit schedule' : 'Schedule report'}
              onClick={() => setScheduleReport(row)}
            >
              <Icon iconName={scheduledReports[row.id] ? 'SCHEDULE_FILLED' : 'SCHEDULE'} size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download">
            <ActionIcon
              type="button"
              $color="default"
              $disabled={row.failed}
              disabled={row.failed}
              aria-label="Download report"
              onClick={() => {}}
            >
              <Icon iconName="DOWNLOAD" size={16} />
            </ActionIcon>
          </Tooltip>
        </ActionsCell>
      );
    }

    return value;
  };

  const headerRightContent = (
    <RunReportLink type="button" onClick={() => setRunReportOpen(true)}>
      <Icon iconName="LIST" size={14} />
      Run Report From View
    </RunReportLink>
  );

  return (
    <PageWrap>
      <NewPageHeader
        title="Reports"
        rightContent={headerRightContent}
      />

      <TabsWrap>
        <Tabs
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={(id) => setActiveTab(id)}
        />
      </TabsWrap>

      <ContentArea>
        <ContentCard>
          <TableWrap>
            <DreamTable
              columns={TABLE_COLUMNS}
              data={REPORTS}
              keyField="id"
              renderCell={renderCell}
              zebraStripes={false}
              verticalDividers
            />
          </TableWrap>
          <FooterRow>
            <ResultsPerPage>
              <span>Results per page:</span>
              {PAGE_SIZES.map((size, i) => (
                <React.Fragment key={size}>
                  <PageSizeBtn
                    type="button"
                    $active={size === pageSize}
                    onClick={() => { setPageSize(size); setPage(1); }}
                  >
                    {size}
                  </PageSizeBtn>
                  {i < PAGE_SIZES.length - 1 && <span style={{ color: 'inherit' }}>  </span>}
                </React.Fragment>
              ))}
            </ResultsPerPage>
            <NumberedPager
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
              showInfo
            />
          </FooterRow>
        </ContentCard>
      </ContentArea>

      {emailReport && (
        <EmailReportsModal
          report={emailReport}
          onClose={() => setEmailReport(null)}
        />
      )}

      {runReportOpen && (
        <RunReportFromViewModal onClose={() => setRunReportOpen(false)} />
      )}

      {scheduleReport && (
        <ScheduleReportModal
          report={scheduleReport}
          existingSchedule={scheduledReports[scheduleReport.id]}
          onClose={() => setScheduleReport(null)}
          onSave={handleSaveSchedule}
        />
      )}
    </PageWrap>
  );
}
