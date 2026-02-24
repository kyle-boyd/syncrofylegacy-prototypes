import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: ${({ theme }) => theme.constants.xlFontSize};
  height: ${({ theme }) => theme.constants.xlFontSize};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `${theme.constants.spacingQuarter} solid ${theme.palette.black}`};
  color: ${({ theme }) => theme.palette.black};
`;

const Number = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacingQuarter};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
`;

const Text = styled.div`
  margin-top: ${({ theme }) => theme.constants.spacingHalf};
  margin-left: ${({ theme }) => theme.constants.spacingHalf};
`;

export default function BulletPoint({ count = null, text }) {
  return (
    <Container>
      <Icon>
        <Number>{count != null && count < 100 ? count : 'ʕ•ᴥ•ʔ'}</Number>
      </Icon>
      {text != null && <Text>{text}</Text>}
    </Container>
  );
}
