import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NewPageHeader } from '@design-system';
import PrototypeBanner from '../components/PrototypeBanner';

// ---------------------------------------------------------------------------
// Scenario data — covers the three exception types and varied invoice naming
// ---------------------------------------------------------------------------

const SCENARIOS = [
  {
    id: 'sla',
    label: 'SLA Exception',
    exceptionType: 'SLA',
    exceptionTypeColor: '#cc1827',      // red
    exceptionTypeBackground: '#fff0f0',
    documentName: 'Invoice',
    documentNumber: 'INV-2024-00412',
    partner: 'Acme Grocery Co.',
    documentTimestamp: 'Mar 18, 2026 at 9:04 AM',
    alertTimestamp: 'Mar 21, 2026 at 11:32 AM',
    ruleName: 'Inbound Invoice SLA — 3 Business Days',
    ruleDescription: 'No acknowledgment received within the required SLA window (3 business days).',
    ruleUrl: 'https://app.syncrofy.com/rules/inbound-invoice-sla-3bd',
    viewUrl: 'https://app.syncrofy.com/documents/INV-2024-00412',
  },
  {
    id: 'acknowledgment',
    label: 'Acknowledgment Exception',
    exceptionType: 'Acknowledgment',
    exceptionTypeColor: '#F2981B',      // orange
    exceptionTypeBackground: '#fffbf0',
    documentName: 'Grocery Product Invoice',
    documentNumber: 'INV-2024-00389',
    partner: 'Fresh Market Partners',
    documentTimestamp: 'Mar 19, 2026 at 2:15 PM',
    alertTimestamp: 'Mar 20, 2026 at 8:01 AM',
    ruleName: 'Application Rejection — 997 FA Required',
    ruleDescription: 'A 997 Functional Acknowledgment was received indicating the document was rejected by the trading partner\'s application (Application Advice: Rejected).',
    ruleUrl: 'https://app.syncrofy.com/rules/997-fa-rejection',
    viewUrl: 'https://app.syncrofy.com/documents/INV-2024-00389',
  },
  {
    id: 'acceptance',
    label: 'Acceptance Exception',
    exceptionType: 'Acceptance',
    exceptionTypeColor: '#0082bf',      // cerulean
    exceptionTypeBackground: '#f0f8ff',
    documentName: 'Grocery Product Invoice',
    documentNumber: 'PO-2024-00201',
    partner: 'Sunrise Foods LLC',
    documentTimestamp: 'Mar 20, 2026 at 10:45 AM',
    alertTimestamp: 'Mar 20, 2026 at 10:47 AM',
    ruleName: 'Inbound PO — Missing Mandatory Field',
    ruleDescription: 'The document could not be accepted due to a missing mandatory field: "Ship-To Location Code". Manual review is required before processing.',
    ruleUrl: 'https://app.syncrofy.com/rules/missing-mandatory-field',
    viewUrl: 'https://app.syncrofy.com/documents/PO-2024-00201',
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

// Exception type badge
const BadgeRow = styled.div`
  padding: 16px 32px 0;
`;

const ExceptionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
`;

const BadgeDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: inline-block;
  flex-shrink: 0;
`;

// Main content area
const EmailContent = styled.div`
  padding: 20px 32px 28px;
`;

const Heading = styled.h1`
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  line-height: 1.3;
`;

const Subheading = styled.p`
  margin: 0 0 20px;
  font-size: 13px;
  color: #757575;
  line-height: 1.5;
`;

// Rule callout card
const RuleCard = styled.div`
  background-color: #f8f9fc;
  border: 1px solid #e0e4ec;
  border-left: 4px solid ${({ color }) => color};
  border-radius: 4px;
  padding: 14px 16px;
  margin-bottom: 20px;
`;

const RuleCardLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8A94A0;
  margin-bottom: 4px;
`;

const RuleCardName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 4px;
`;

const RuleCardDesc = styled.div`
  font-size: 12px;
  color: #757575;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const RuleLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #0082bf;
  text-decoration: none;
`;

// Metadata table
const MetaSection = styled.div`
  margin-bottom: 24px;
`;

const MetaSectionTitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8A94A0;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e0e4ec;
`;

const MetaTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
`;

const MetaItem = styled.div``;

const MetaLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #8A94A0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
`;

const MetaValue = styled.div`
  font-size: 13px;
  color: #282828;
  font-weight: ${({ strong }) => strong ? '600' : '400'};
`;

const MetaValueMono = styled.div`
  font-size: 12px;
  color: #515151;
  font-family: 'Courier New', Courier, monospace;
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
  margin-top: 4px;
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
  const {
    exceptionType,
    exceptionTypeColor,
    exceptionTypeBackground,
    documentName,
    documentNumber,
    partner,
    documentTimestamp,
    alertTimestamp,
    ruleName,
    ruleDescription,
    ruleUrl,
    viewUrl,
  } = scenario;

  return (
    <EmailShell>
      {/* Simulated email client header */}
      <ClientChrome>
        <ChromeField>
          <ChromeLabel>From:</ChromeLabel> Syncrofy Alerts &lt;alerts@syncrofy.com&gt;
        </ChromeField>
        <ChromeField>
          <ChromeLabel>Subject:</ChromeLabel>
          {' '}[{exceptionType} Exception] {documentName} · {partner}
        </ChromeField>
      </ClientChrome>

      <EmailBody>
        {/* Brand header */}
        <EmailHeader>
          <LogoText>Syncrofy</LogoText>
          <HeaderSubtitle>Exception Notification</HeaderSubtitle>
        </EmailHeader>

        {/* Exception type badge */}
        <BadgeRow>
          <ExceptionBadge color={exceptionTypeColor} bg={exceptionTypeBackground}>
            <BadgeDot color={exceptionTypeColor} />
            {exceptionType} Exception
          </ExceptionBadge>
        </BadgeRow>

        <EmailContent>
          <Heading>An exception requires your attention</Heading>
          <Subheading>
            A <strong>{exceptionType.toLowerCase()} exception</strong> was detected for a document
            from <strong>{partner}</strong>. Please review and take action if needed.
          </Subheading>

          {/* Rule callout */}
          <RuleCard color={exceptionTypeColor}>
            <RuleCardLabel>Rule triggered</RuleCardLabel>
            <RuleCardName>{ruleName}</RuleCardName>
            <RuleCardDesc>{ruleDescription}</RuleCardDesc>
            <RuleLink href={ruleUrl} target="_blank" rel="noreferrer">
              View rule in Syncrofy ↗
            </RuleLink>
          </RuleCard>

          {/* Document metadata */}
          <MetaSection>
            <MetaSectionTitle>Document details</MetaSectionTitle>
            <MetaTable>
              <MetaItem>
                <MetaLabel>Document name</MetaLabel>
                <MetaValue strong>{documentName}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Document number</MetaLabel>
                <MetaValueMono>{documentNumber}</MetaValueMono>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Partner</MetaLabel>
                <MetaValue>{partner}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Document date</MetaLabel>
                <MetaValue>{documentTimestamp}</MetaValue>
              </MetaItem>
            </MetaTable>
          </MetaSection>

          <Divider />

          {/* Timestamps */}
          <MetaSection>
            <MetaSectionTitle>Timestamps</MetaSectionTitle>
            <MetaTable>
              <MetaItem>
                <MetaLabel>Original document received</MetaLabel>
                <MetaValue>{documentTimestamp}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Exception detected</MetaLabel>
                <MetaValue strong>{alertTimestamp}</MetaValue>
              </MetaItem>
            </MetaTable>
          </MetaSection>

          <Divider />

          {/* CTA */}
          <CtaRow>
            <CtaButton href={viewUrl} target="_blank" rel="noreferrer">
              View document in Syncrofy
            </CtaButton>
          </CtaRow>
        </EmailContent>

        <EmailFooter>
          You are receiving this because an exception notification rule matched a document in your
          account.{' '}
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

export default function ExceptionEmailTemplate() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  return (
    <PageWrap>
      <PrototypeBanner prototypeName="Exception Email Template" />
      <NewPageHeader title="Exception Email Template" />

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
