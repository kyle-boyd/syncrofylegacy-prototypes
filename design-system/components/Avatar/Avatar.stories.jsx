import React from 'react';
import styled from '@emotion/styled';
import Avatar from './Avatar';

const Background = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 128px;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Label = styled.div`
  width: 32px;
  margin-right: 16px;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
`;

const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
const imgSrc = 'https://image.shutterstock.com/image-vector/pixel-dog-design-260nw-1134488486.jpg';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Simple = () => (
  <Background>
    {sizes.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        <Wrapper>
          <Avatar firstName="John" lastName="Doe" size={size} />
        </Wrapper>
        <Wrapper>
          <Avatar firstName="John" size={size} />
        </Wrapper>
        <Wrapper>
          <Avatar firstName="John" lastName="Doe" size={size} src={imgSrc} />
        </Wrapper>
      </Row>
    ))}
  </Background>
);
