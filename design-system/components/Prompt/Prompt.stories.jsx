import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ConfirmPrompt } from './index';

const Container = styled.div`
  background-color: #eaeaea;
  min-height: 400px;
  padding: 16px;
`;

export default {
  title: 'Components/Prompt',
  component: ConfirmPrompt,
};

export const ConfirmPromptStory = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <button type="button" onClick={() => setOpen(true)}>
        Open prompt
      </button>
      <ConfirmPrompt
        title="Storybook Prompt"
        isShowing={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        hasCancelButton
      >
        Are you sure you want to cancel?
      </ConfirmPrompt>
    </Container>
  );
};
