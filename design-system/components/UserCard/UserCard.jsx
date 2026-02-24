import React from 'react';
import styled from '@emotion/styled';
import Avatar from '../Avatar';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  padding: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.stroke};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z1};
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Meta = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.greyedOutText};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

export default function UserCard({
  name,
  email,
  subtitle,
  avatarUrl,
  firstName,
  lastName,
  actions,
}) {
  const parts = name ? name.trim().split(/\s+/) : [];
  const first = firstName ?? parts[0] ?? '';
  const last = lastName ?? parts.slice(1).join(' ') ?? '';
  return (
    <Card>
      <Avatar src={avatarUrl} firstName={first} lastName={last} size="l" />
      <Info>
        <Name>{name}</Name>
        {(email || subtitle) && <Meta>{email || subtitle}</Meta>}
      </Info>
      {actions}
    </Card>
  );
}
