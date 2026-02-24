import React, { useState } from 'react';
import styled from '@emotion/styled';
import ModalNew from './ModalNew';
import AlertModal from './AlertModal';
import ModalContent from './ModalContent';

const bodyText =
  'This is a modal with some content. Please enjoy. Depending on the size of the container, you may have to scroll to see everything in the modal body.';

const BodyText = styled.span`
  line-height: 24px;
`;

export default {
  title: 'Components/ModalNew',
  component: ModalNew,
};

export const ModalContentVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
    <div style={{ width: 480, height: 280 }}>
      <ModalContent name="m1" noScroll={false}>
        <BodyText>{bodyText}</BodyText>
      </ModalContent>
    </div>
    <div style={{ width: 480, height: 280 }}>
      <ModalContent name="m2" title="Header" noScroll={false}>
        <BodyText>{bodyText}</BodyText>
      </ModalContent>
    </div>
    <div style={{ width: 480, height: 280 }}>
      <ModalContent
        name="m3"
        title="Header"
        hasDivider
        onConfirm={() => {}}
        onCancel={() => {}}
        noScroll={false}
      >
        <BodyText>{bodyText}</BodyText>
      </ModalContent>
    </div>
  </div>
);

export const ModalNewKnobs = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <ModalNew
        name="knobs"
        isShowing={open}
        onCancel={() => setOpen(false)}
        title="Header"
        hasDivider
        onConfirm={() => setOpen(false)}
        hasCancelButton
        buttonText="Apply"
        width={480}
        height={280}
        noPadding={false}
        isStorybook
      >
        <BodyText>{bodyText}</BodyText>
      </ModalNew>
    </div>
  );
};

export const AlertModalSimple = () => (
  <div style={{ padding: 16 }}>
    <AlertModal
      name="alert1"
      title="Are you sure?"
      text="This action is unfathomably dangerous."
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  </div>
);

export const AlertModalInModalNew = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open alert
      </button>
      <ModalNew
        name="alertKnobs"
        type="alert"
        isShowing={open}
        title="Are you sure?"
        text="This action cannot be undone."
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        isStorybook
      />
    </div>
  );
};
