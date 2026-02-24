import React from 'react';
import styled from '@emotion/styled';
import HeaderFields from '../HeaderFields';
import { LifecycleContainer, LifecycleTimelineNode, LifecycleTimelineSeparator, statuses } from '../LifecycleTimeline';

const Page = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.offWhite};
  min-height: 100%;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.constants.spacing3x};
`;

const statusMap = { complete: statuses.complete, pending: statuses.pending, none: statuses.none };

export default function LifecycleDetail({
  title,
  headerFields = [],
  timelineSteps = [],
  children,
}) {
  return (
    <Page>
      {title && (
        <Section>
          <HeaderFields title={title} fields={headerFields} />
        </Section>
      )}
      {timelineSteps.length > 0 && (
        <Section>
          <LifecycleContainer>
            {timelineSteps.map((step, i) => (
              <React.Fragment key={step.key ?? i}>
                <LifecycleTimelineNode
                  title={step.title}
                  status={statusMap[step.status] ?? statuses.none}
                  date={step.date}
                  number={i + 1}
                  isUnvisitedTitle={step.status === 'none'}
                />
                {i < timelineSteps.length - 1 && (
                  <LifecycleTimelineSeparator status={step.status === 'complete' ? statuses.complete : statuses.none} />
                )}
              </React.Fragment>
            ))}
          </LifecycleContainer>
        </Section>
      )}
      {children}
    </Page>
  );
}
