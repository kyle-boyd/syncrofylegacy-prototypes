import React, { useState } from 'react';
import styled from '@emotion/styled';
import Popover from './Popover';
import Button from '../Button';

const Content = styled.div`
  padding: 16px;
  min-width: 200px;
`;

export default {
  title: 'Components/Popover',
  component: Popover,
};

export const Default = () => (
  <Popover
    content={
      <Content>
        <p>Popover content here.</p>
      </Content>
    }
    trigger="click"
  >
    <button type="button">Open popover</button>
  </Popover>
);

export const WithButton = () => (
  <Popover
    content={
      <Content>
        <div>Confirm action?</div>
        <Button text="OK" size="small" />
      </Content>
    }
  >
    <Button text="Trigger" kind="transparent" />
  </Popover>
);

export const Controlled = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      content={<Content>Controlled visibility</Content>}
      visible={visible}
      onClickOutside={() => setVisible(false)}
    >
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Close' : 'Open'}
      </button>
    </Popover>
  );
};
