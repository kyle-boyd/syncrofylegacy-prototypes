import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NewPageHeader } from '@design-system';
import PrototypeBanner from '../components/PrototypeBanner';

// ---------------------------------------------------------------------------
// Scenario data
// ---------------------------------------------------------------------------

const SCENARIOS = [
  {
    id: 'document-summary',
    label: 'Document Summary',
    reportName: 'Monthly Document Summary',
    senderName: 'Jane Smith',
    generatedDate: 'Apr 13, 2026 at 6:00 AM',
    fileName: 'document-summary-apr-2026.csv',
    downloadUrl: 'https://app.syncrofy.com/reports/download/document-summary-apr-2026',
  },
  {
    id: 'partner-activity',
    label: 'Partner Activity',
    reportName: 'Weekly Partner Activity Report',
    senderName: 'John Doe',
    generatedDate: 'Apr 13, 2026 at 7:00 AM',
    fileName: 'partner-activity-week-15-2026.csv',
    downloadUrl: 'https://app.syncrofy.com/reports/download/partner-activity-week-15-2026',
  },
  {
    id: 'exception-summary',
    label: 'Exception Summary',
    reportName: 'Daily Exception Summary',
    senderName: 'Alice Johnson',
    generatedDate: 'Apr 13, 2026 at 8:00 AM',
    fileName: 'exception-summary-2026-04-13.csv',
    downloadUrl: 'https://app.syncrofy.com/reports/download/exception-summary-2026-04-13',
  },
];

// ---------------------------------------------------------------------------
// Page wrapper
// ---------------------------------------------------------------------------

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.cloud};
`;

// ---------------------------------------------------------------------------
// Controls row (scenario switcher)
// ---------------------------------------------------------------------------

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
  flex-wrap: wrap;
`;

const ControlsLabel = styled.span`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  color: ${({ theme }) => theme.palette.greyedOutText};
  white-space: nowrap;
`;

const ScenarioButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  cursor: pointer;
  border: 1px solid ${({ theme, active }) => active ? theme.palette.cerulean : theme.palette.stroke};
  background-color: ${({ theme, active }) => active ? theme.palette.cerulean : theme.palette.white};
  color: ${({ theme, active }) => active ? theme.palette.white : theme.palette.d1};
  transition: background-color 0.15s, color 0.15s, border-color 0.15s;
  &:hover {
    border-color: ${({ theme }) => theme.palette.cerulean};
    color: ${({ active, theme }) => active ? theme.palette.white : theme.palette.cerulean};
  }
`;

// ---------------------------------------------------------------------------
// Email preview shell
// ---------------------------------------------------------------------------

const PreviewArea = styled.div`
  padding: ${({ theme }) => theme.constants.spacing4x};
  display: flex;
  justify-content: center;
`;

const EmailShell = styled.div`
  width: 100%;
  max-width: 620px;
  background-color: #f4f4f4;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #282828;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`;

// Simulated email client chrome
const ClientChrome = styled.div`
  background-color: #e8e8e8;
  padding: 10px 16px;
  border-bottom: 1px solid #d0d0d0;
`;

const ChromeField = styled.div`
  font-size: 12px;
  color: #555;
  line-height: 20px;
`;

const ChromeLabel = styled.span`
  font-weight: 600;
  color: #333;
  display: inline-block;
  width: 50px;
`;

// ---------------------------------------------------------------------------
// Email body sections
// ---------------------------------------------------------------------------

const EmailBody = styled.div`
  background-color: #ffffff;
`;

// Header band
const EmailHeader = styled.div`
  background-color: #0b3447;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoText = styled.span`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const HeaderSubtitle = styled.span`
  color: rgba(255,255,255,0.65);
  font-size: 12px;
  margin-left: auto;
`;

// Main content area
const EmailContent = styled.div`
  padding: 28px 32px 32px;
`;

const Greeting = styled.p`
  margin: 0 0 16px;
  font-size: 15px;
  color: #282828;
`;

const BodyText = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: #515151;
  line-height: 1.6;
`;

// Attachment card
const AttachmentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f8f9fc;
  border: 1px solid #e0e4ec;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 24px;
`;

const AttachmentIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e6f3fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
`;

const AttachmentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AttachmentName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #282828;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AttachmentMeta = styled.div`
  font-size: 11px;
  color: #8A94A0;
  margin-top: 2px;
`;

// Divider
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e4ec;
  margin: 20px 0;
`;

// CTA
const CtaRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 28px;
`;

const CtaButton = styled.a`
  display: inline-block;
  padding: 10px 24px;
  background-color: #0082bf;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const CtaButtonSecondary = styled.a`
  display: inline-block;
  padding: 10px 24px;
  background-color: #ffffff;
  color: #0082bf;
  text-decoration: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid #0082bf;
`;

const SignOff = styled.p`
  margin: 0;
  font-size: 14px;
  color: #515151;
  line-height: 1.7;
`;

// Footer
const EmailFooter = styled.div`
  background-color: #f4f6fb;
  border-top: 1px solid #e0e4ec;
  padding: 16px 32px;
  font-size: 11px;
  color: #8A94A0;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: #0082bf;
  text-decoration: none;
`;

// ---------------------------------------------------------------------------
// Email preview component
// ---------------------------------------------------------------------------

function EmailPreview({ scenario }) {
  const { reportName, senderName, generatedDate, fileName, downloadUrl } = scenario;

  return (
    <EmailShell>
      {/* Simulated email client header */}
      <ClientChrome>
        <ChromeField>
          <ChromeLabel>From:</ChromeLabel> Syncrofy Reports &lt;reports@syncrofy.com&gt;
        </ChromeField>
        <ChromeField>
          <ChromeLabel>Subject:</ChromeLabel> Your Syncrofy report is ready: {reportName}
        </ChromeField>
      </ClientChrome>

      <EmailBody>
        {/* Brand header */}
        <EmailHeader>
          <LogoText>Syncrofy</LogoText>
          <HeaderSubtitle>Scheduled Report</HeaderSubtitle>
        </EmailHeader>

        <EmailContent>
          <Greeting>Hello,</Greeting>

          <BodyText>
            You've received a <strong>{reportName}</strong> report sent by <strong>{senderName}</strong>.
            Please find the report attached or click below to download the data.
          </BodyText>

          {/* Attachment preview */}
          <AttachmentCard>
            <AttachmentIcon>📄</AttachmentIcon>
            <AttachmentInfo>
              <AttachmentName>{fileName}</AttachmentName>
              <AttachmentMeta>Generated {generatedDate}</AttachmentMeta>
            </AttachmentInfo>
          </AttachmentCard>

          {/* Download CTA */}
          <CtaRow>
            <CtaButton href={downloadUrl} target="_blank" rel="noreferrer">
              Download Report
            </CtaButton>
            <CtaButtonSecondary href="https://app.syncrofy.com" target="_blank" rel="noreferrer">
              Open in Syncrofy
            </CtaButtonSecondary>
          </CtaRow>

          <Divider />

          <SignOff>
            Thank you!<br />
            Team Syncrofy
          </SignOff>
        </EmailContent>

        <EmailFooter>
          You are receiving this because you are subscribed to a scheduled report in Syncrofy.{' '}
          <FooterLink href="https://app.syncrofy.com/settings/notifications">
            Manage notification settings
          </FooterLink>
          {' '}·{' '}
          <FooterLink href="https://app.syncrofy.com">
            Open Syncrofy
          </FooterLink>
          <br />
          © 2026 COEnterprise · 1 N Dearborn St, Suite 1500, Chicago, IL 60602
        </EmailFooter>
      </EmailBody>
    </EmailShell>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ScheduledReportEmailTemplate() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  return (
    <PageWrap>
      <PrototypeBanner prototypeName="Scheduled Report Email Template" />
      <NewPageHeader title="Scheduled Report Email Template" />

      <ControlsBar>
        <ControlsLabel>Scenario:</ControlsLabel>
        {SCENARIOS.map((s) => (
          <ScenarioButton
            key={s.id}
            active={activeScenario.id === s.id ? 1 : 0}
            onClick={() => setActiveScenario(s)}
          >
            {s.label}
          </ScenarioButton>
        ))}
      </ControlsBar>

      <PreviewArea>
        <EmailPreview scenario={activeScenario} />
      </PreviewArea>
    </PageWrap>
  );
}
