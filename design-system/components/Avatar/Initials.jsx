import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-image: ${({ theme }) => `linear-gradient(0deg, ${theme.palette.sky} 0%, ${theme.palette.teal} 100%)`};
  color: ${({ theme }) => theme.palette.white};
  font-weight: ${({ theme }) => theme.constants.thinFontWeight};
  width: ${({ diameter }) => `${diameter}px`};
  height: ${({ diameter }) => `${diameter}px`};
  font-size: ${({ diameter }) => `${diameter / 2}px`};
`;

export default function Initials({ firstName = '', lastName = '', size = 48 }) {
  const firstInitial = firstName ? firstName.slice(0, 1).toUpperCase() : '';
  const lastInitial = lastName ? lastName.slice(0, 1).toUpperCase() : (firstName.slice(1, 2) || '').toLowerCase();
  const initials = `${firstInitial}${lastInitial}` || '?';
  const id = `initials-${firstName}${lastName ? `-${lastName}` : ''}`.toLowerCase().replace(/\s+/g, '-');

  return <Container diameter={size} id={id}>{initials}</Container>;
}
