import React from 'react';
import EnhancedList from './EnhancedList';
import Avatar from '../Avatar';

export default {
  title: 'Components/EnhancedList',
  component: EnhancedList,
};

const simpleItems = ['Alpha', 'Beta', 'Gamma'];

export const Simple = () => <EnhancedList items={simpleItems} />;

export const RichItems = () => (
  <EnhancedList
    items={[
      { text1: 'First', text2: 'Subtitle', boldText1: true },
      { text1: 'Second', text2: 'With link', url2: '#' },
      {
        text1: 'With avatar',
        text2: 'User row',
        avatar: <Avatar firstName="Jane" lastName="Doe" size="s" />,
      },
    ]}
  />
);
