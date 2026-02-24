import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.constants.spacing2x};
  right: ${({ theme }) => theme.constants.spacing2x};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
  max-width: ${({ theme }) => theme.constants.spacing8x};
`;

const Toast = styled.div`
  padding: ${({ theme }) => `${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
  box-shadow: ${({ theme }) => theme.constants.z2};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  background-color: ${({ theme }) => theme.palette.white};
  border-left: ${({ theme }) => theme.constants.spacing1_5x} solid ${({ theme }) => theme.palette.cerulean};
  color: ${({ theme }) => theme.palette.black};
  &.toast--success {
    border-left-color: ${({ theme }) => theme.palette.green};
  }
  &.toast--error {
    border-left-color: ${({ theme }) => theme.palette.red};
  }
  &.toast--warning {
    border-left-color: ${({ theme }) => theme.palette.orange};
  }
`;

export default function ToastContainer({ toasts = [], renderToast }) {
  return (
    <Container role="region" aria-label="Notifications">
      {toasts.map((toast, i) =>
        renderToast ? (
          renderToast(toast, i)
        ) : (
          <Toast key={toast.id ?? i} className={toast.variant ? `toast--${toast.variant}` : ''}>
            {toast.message ?? toast}
          </Toast>
        )
      )}
    </Container>
  );
}
