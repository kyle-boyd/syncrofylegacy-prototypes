import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';
import { LifecycleTimelineNode, LifecycleTimelineSeparator, statuses } from '../LifecycleTimeline';

const WizardWrapper = styled.div`
  height: ${({ wrapperHeight }) => wrapperHeight}px;
  position: relative;
`;

const PageWrapper = styled.div`
  display: ${({ isCurrentStep }) => (isCurrentStep ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : null)};
`;

const StepperWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(2 * ${({ theme }) => theme.constants.xxlLineHeight});
  padding: ${({ theme }) => `${theme.constants.spacing2x} 0`};
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.stroke};
`;

const StepLabel = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.d2};
  margin: 0 0 ${({ theme }) => theme.constants.spacing4x} 0;
`;

const StepLabelText = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
`;

const StepSubLabel = styled(StepLabel)`
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  margin: 0;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.red};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
`;

const stepStatuses = { inProgress: 'inProgress', complete: 'complete', none: 'none' };

function getStepStatus(stepIndex, currentStep, latestStep, complete) {
  if (complete) return stepStatuses.complete;
  if (stepIndex === currentStep) return stepStatuses.inProgress;
  if (stepIndex < latestStep) return stepStatuses.complete;
  return stepStatuses.none;
}

export default function Wizard({
  header,
  steps = [],
  initialStep = 0,
  defaultHeight = 650,
  onConfirm,
  onCancel,
  getCurrentStep,
}) {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0);
  const [latestStep, setLatestStep] = useState(initialStep ?? 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [wrapperHeight, setWrapperHeight] = useState(defaultHeight);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const setMaxHeight = () => {
      if (window.innerHeight < defaultHeight + 60) {
        setWrapperHeight(window.innerHeight - 60);
      } else {
        setWrapperHeight(defaultHeight);
      }
    };
    setMaxHeight();
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, [defaultHeight]);

  const onNext = () => {
    setErrorMessage('');
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      if (next > latestStep) setLatestStep(next);
      setCurrentStep(next);
      getCurrentStep?.(next);
    }
  };

  const onBack = () => {
    setErrorMessage('');
    setCurrentStep((s) => Math.max(0, s - 1));
    getCurrentStep?.(currentStep - 1);
  };

  const onComplete = () => {
    setSubmitting(true);
    setErrorMessage('');
    Promise.resolve(onConfirm?.())
      .then(() => setSubmitting(false))
      .catch(() => setSubmitting(false));
  };

  return (
    <WizardWrapper wrapperHeight={wrapperHeight}>
      <Card>
        {header && <CardHeader title={header} />}
        <StepperWrapper>
          {steps.map((step, i) => {
            const status = getStepStatus(i, currentStep, latestStep, false);
            const clickable = currentStep > i;
            return (
              <React.Fragment key={step.title}>
                <LifecycleTimelineNode
                  title={step.title}
                  status={status === stepStatuses.complete ? statuses.complete : status === stepStatuses.inProgress ? statuses.pending : statuses.none}
                  number={i + 1}
                  size={24}
                  onClick={clickable ? () => { setCurrentStep(i); getCurrentStep?.(i); } : undefined}
                  isActiveTitle={currentStep === i}
                  isUnvisitedTitle={status === stepStatuses.none}
                />
                {i < steps.length - 1 && (
                  <LifecycleTimelineSeparator
                    status={status === stepStatuses.complete ? statuses.complete : statuses.none}
                    size={24}
                  />
                )}
              </React.Fragment>
            );
          })}
        </StepperWrapper>
        <Divider />
        <CardBody>
          {steps.map((step, i) => (
            <PageWrapper key={step.title} isCurrentStep={i === currentStep}>
              <PageContainer isFullWidth={step.isFullWidth}>
                {step.label && (
                  <StepLabel>
                    <div>Step {i + 1}:</div>
                    <StepLabelText>{step.label}</StepLabelText>
                    {step.subLabel && <StepSubLabel>{step.subLabel}</StepSubLabel>}
                  </StepLabel>
                )}
                {errorMessage && (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                )}
                {step.page}
              </PageContainer>
            </PageWrapper>
          ))}
        </CardBody>
        <CardFooter
          buttonText={currentStep !== steps.length - 1 ? 'Next' : 'Confirm Settings'}
          buttonColor={currentStep !== steps.length - 1 ? 'blue' : 'green'}
          onConfirm={currentStep !== steps.length - 1 ? onNext : onComplete}
          onCancel={onCancel}
          onBack={currentStep === 0 ? undefined : onBack}
          confirmDisabled={isSubmitting}
          cancelDisabled={isSubmitting}
          backDisabled={isSubmitting}
        />
      </Card>
    </WizardWrapper>
  );
}
