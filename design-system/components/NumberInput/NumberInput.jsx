import React from 'react';
import BaseTextInput from '../BaseTextInput';
import { Message } from '../Messages';

export default function NumberInput({
  min,
  max,
  isPercent,
  integersOnly = false,
  onKeyDown,
  ...rest
}) {
  const additionalMessages = [
    <Message key="number" when="number">You must enter a number!</Message>,
    min != null && <Message key="min" when="min">Value must be at least {min}</Message>,
    max != null && <Message key="max" when="max">Value must be less than {max + 1}</Message>,
  ].filter(Boolean);

  const handleKeyDown = (e) => {
    const keycode = e.which;
    let invalid =
      keycode === 32 ||
      (keycode > 64 && keycode < 91) ||
      (keycode > 185 && keycode < 190) ||
      (keycode > 190 && keycode < 193) ||
      (keycode > 218 && keycode < 223);
    if (keycode === 190 && integersOnly) invalid = true;
    if (invalid) e.preventDefault();
    onKeyDown?.(e);
  };

  return (
    <BaseTextInput
      type="number"
      min={min}
      max={max}
      isPercent={isPercent}
      additionalMessages={additionalMessages}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}
