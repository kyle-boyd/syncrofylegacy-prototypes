import React from 'react';
import styled from '@emotion/styled';
import Initials from './Initials';

const SIZE_MAP = { xs: 16, s: 24, m: 32, l: 48, xl: 96, xxl: 128 };

const Container = styled.div`
  border-radius: 50%;
  width: ${({ diameter }) => `${diameter}px`};
  height: ${({ diameter }) => `${diameter}px`};
  background-color: ${({ theme }) => theme.palette.white};
  overflow: hidden;
`;

const Image = styled.img`
  border-radius: 50%;
  width: ${({ diameter }) => `${diameter}px`};
  height: ${({ diameter }) => `${diameter}px`};
  object-fit: cover;
`;

export default function Avatar({
  firstName,
  lastName = '',
  size = 'l',
  avatarId = null,
  src = null,
}) {
  const diameter = SIZE_MAP[size] ?? 48;
  const htmlID = `avatar-${firstName}${lastName ? `-${lastName}` : ''}`.toLowerCase().replace(/\s+/g, '-');
  const imageSrc = src || (avatarId ? `/api/images/${avatarId}?version=Original` : null);

  return (
    <Container id={htmlID} diameter={diameter}>
      {imageSrc ? (
        <Image
          diameter={diameter}
          src={imageSrc}
          alt={`${firstName} ${lastName}`.trim()}
        />
      ) : (
        <Initials firstName={firstName} lastName={lastName} size={diameter} />
      )}
    </Container>
  );
}
