import React from 'react';
import styled from '@emotion/styled';
import ListItem from './ListItem';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  height: ${({ isFullHeight }) => (isFullHeight ? '100%' : undefined)};
  overflow-y: ${({ isFullHeight }) => (isFullHeight ? 'auto' : undefined)};
`;

function slug(str) {
  return String(str ?? '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') || 'item';
}

export default function EnhancedList({ items = [], isFullHeight = false }) {
  return (
    <Container id="enhanced-list" isFullHeight={isFullHeight}>
      {items.map((item) => {
        if (typeof item === 'string') {
          return <ListItem key={item} htmlID={slug(item)} text1={item} />;
        }
        const {
          actions = [],
          avatar,
          text1,
          text2,
          text3,
          boldText1,
          boldText2,
          boldText3,
          url1,
          url2,
          url3,
          icon1,
          icon2,
          icon3,
        } = item;
        return (
          <ListItem
            key={text1}
            htmlID={slug(text1)}
            actions={actions}
            avatar={avatar}
            text1={text1}
            text2={text2}
            text3={text3}
            boldText1={boldText1}
            boldText2={boldText2}
            boldText3={boldText3}
            url1={url1}
            url2={url2}
            url3={url3}
            icon1={icon1}
            icon2={icon2}
            icon3={icon3}
          />
        );
      })}
    </Container>
  );
}
