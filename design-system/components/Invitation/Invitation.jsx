import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const Card = styled.div`
  padding: ${({ theme }) => theme.constants.cardPadding};
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z1};
  max-width: ${({ theme }) => theme.constants.spacing8x};
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Message = styled.p`
  margin: 0 0 ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.d2};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

export default function Invitation({
  title = 'You\'re invited',
  message = 'Accept the invitation to continue.',
  onAccept,
  onDecline,
  acceptLabel = 'Accept',
  declineLabel = 'Decline',
}) {
  return (
    <Card>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Actions>
        <Button text={acceptLabel} color="cerulean" size="medium" onClick={onAccept} />
        {onDecline && <Button text={declineLabel} kind="transparent" color="grey" size="medium" onClick={onDecline} />}
      </Actions>
    </Card>
  );
}
