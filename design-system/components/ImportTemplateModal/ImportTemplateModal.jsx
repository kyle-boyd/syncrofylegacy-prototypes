import React from 'react';
import styled from '@emotion/styled';
import ModalNew from '../ModalNew';
import Button from '../Button';

const Body = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing2x};
`;

export default function ImportTemplateModal({
  open,
  onClose,
  onConfirm,
  title = 'Import template',
  children,
}) {
  return (
    <ModalNew name="import-template" isShowing={open} onCancel={onClose} title={title}>
      <Body>{children}</Body>
      <Actions>
        <Button text="Cancel" kind="transparent" color="grey" size="small" onClick={onClose} />
        <Button text="Import" color="cerulean" size="small" onClick={onConfirm} />
      </Actions>
    </ModalNew>
  );
}
