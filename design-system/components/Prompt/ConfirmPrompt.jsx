import React from 'react';
import ModalNew from '../ModalNew';

/**
 * ConfirmPrompt: confirm/cancel dialog using ModalNew.
 * Controlled by isShowing; onConfirm/onCancel required.
 */
export default function ConfirmPrompt({
  isShowing,
  onConfirm,
  onCancel,
  title = 'Confirm',
  children,
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmColor = 'blue',
  cancelColor = 'grey',
  confirmIconLeft,
  cancelIconLeft,
  disabled = false,
  hasCancelButton = true,
  onAnimationComplete,
  id = 'confirm_prompt',
  name = 'confirm_prompt',
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onCancel?.();
  };

  return (
    <ModalNew
      name={name}
      isShowing={isShowing}
      onCancel={onCancel}
      onAnimationComplete={onAnimationComplete}
      isStorybook={false}
      title={title}
      hasDivider
      hasSingleButton={!hasCancelButton}
      hasCancelButton={hasCancelButton}
      buttonText={confirmText}
      buttonColor={confirmColor}
      buttonIcon={confirmIconLeft}
      onConfirm={handleConfirm}
      confirmDisabled={disabled}
      cancelDisabled={false}
    >
      {children}
    </ModalNew>
  );
}
