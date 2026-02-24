import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Portal from '../Portal';
import ModalContent from './ModalContent';
import AlertModal from './AlertModal';

const Backdrop = styled.div`
  position: fixed;
  z-index: 30000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.backdrop};
  align-items: center;
  justify-content: center;
  display: flex;
  opacity: ${({ isShowing }) => (isShowing ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: ${({ isShowing }) => (isShowing ? 'auto' : 'none')};
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${({ isShowing }) => (isShowing ? '0%' : '1.5%')});
  opacity: ${({ isShowing }) => (isShowing ? 1 : 0)};
  transition: transform 0.25s ease, opacity 0.25s ease;
`;

export default function ModalNew({
  name,
  title,
  text,
  isShowing = false,
  type = 'default',
  hasDivider = true,
  hasSingleButton = false,
  hasCancelButton = false,
  confirmDisabled = false,
  cancelDisabled = false,
  backDisabled = false,
  isStorybook = false,
  noPadding = false,
  children,
  buttonText = 'Confirm',
  buttonIcon,
  buttonColor = 'blue',
  onConfirm,
  onCancel = () => {},
  onBack,
  onAnimationComplete,
  maxHeight,
  height,
  width,
  minWidth,
  noScroll = false,
}) {
  useEffect(() => {
    if (!isShowing) return;
    const handleKeyUp = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [isShowing, onCancel]);

  const handleClickOutside = (e) => {
    const id = e.target?.id ?? '';
    if (id === 'modal_backdrop' || id.startsWith('modal_container')) onCancel();
  };

  const content =
    type === 'alert' ? (
      <AlertModal
        name={name}
        title={title}
        text={text}
        buttonText={buttonText}
        buttonIcon={buttonIcon}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmDisabled={confirmDisabled}
        cancelDisabled={cancelDisabled}
      >
        {children}
      </AlertModal>
    ) : (
      <ModalContent
        name={name}
        title={title}
        hasDivider={hasDivider}
        onBack={onBack}
        onConfirm={onConfirm}
        buttonText={buttonText}
        buttonIcon={buttonIcon}
        buttonColor={buttonColor}
        onCancel={onCancel}
        hasSingleButton={hasSingleButton}
        hasCancelButton={hasCancelButton}
        confirmDisabled={confirmDisabled}
        cancelDisabled={cancelDisabled}
        backDisabled={backDisabled}
        maxHeight={maxHeight}
        height={height}
        width={width}
        minWidth={minWidth}
        noPadding={noPadding}
        noScroll={noScroll}
      >
        {children}
      </ModalContent>
    );

  const backdrop = (
    <Backdrop
      id={`modal_backdrop_${name}`}
      isShowing={isShowing}
      onClick={isStorybook ? undefined : handleClickOutside}
    >
      <ModalContainer
        id={`modal_container_${name}`}
        isShowing={isShowing}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </ModalContainer>
    </Backdrop>
  );

  if (isStorybook) return backdrop;
  return <Portal>{backdrop}</Portal>;
}
