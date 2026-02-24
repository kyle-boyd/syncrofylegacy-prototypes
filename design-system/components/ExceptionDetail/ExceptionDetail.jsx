import React from 'react';
import styled from '@emotion/styled';
import KeyValuePair from '../KeyValuePair';

const Card = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  border: 1px solid ${({ theme, status }) =>
    status === 'pending' ? theme.palette.pendingExceptionBorderActive : status === 'resolved' ? theme.palette.resolvedExceptionBorderActive : theme.palette.archivedExceptionBorderActive};
  background-color: ${({ theme, status }) =>
    status === 'pending' ? theme.palette.pendingExceptionBackgroundActive : status === 'resolved' ? theme.palette.resolvedExceptionBackgroundActive : theme.palette.archivedExceptionBackgroundActive};
`;

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.constants.spacing1x};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Message = styled.p`
  margin: 0 0 ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.d2};
`;

export default function ExceptionDetail({
  title,
  message,
  status = 'pending',
  fields = [],
}) {
  const items = fields.map((f) => ({ key: f.label ?? f.key, value: f.value ?? '' }));
  return (
    <Card status={status}>
      {title && <Title>{title}</Title>}
      {message && <Message>{message}</Message>}
      {items.length > 0 && <KeyValuePair items={items} />}
    </Card>
  );
}
