import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  flex-grow: 1;
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
`;

const FooterLeft = styled.div``;
const FooterRight = styled.div`display: flex;`;

export default function CardFooter({
  children,
  buttonText = 'Confirm',
  buttonColor = 'blue',
  buttonIconLeft,
  buttonIconRight,
  onConfirm,
  onCancel,
  onBack,
  confirmDisabled = false,
  cancelDisabled = false,
  backDisabled = false,
}) {
  if (children) {
    return (
      <Container id="card_footer" data-component="card-footer">
        {children}
      </Container>
    );
  }

  return (
    <Container id="card_footer" data-component="card-footer">
      <FooterLeft id="card_footer_left">
        {onBack && (
          <Button
            id="card_footer_back_button"
            text="Back"
            kind="inverted"
            iconLeft="ARROW_LEFT"
            onClick={onBack}
            disabled={backDisabled}
          />
        )}
      </FooterLeft>
      <FooterRight id="card_footer_right">
        {onCancel && (
          <Button
            id="card_footer_cancel_button"
            text="Cancel"
            color="grey"
            kind="transparent"
            onClick={onCancel}
            disabled={cancelDisabled}
          />
        )}
        <Button
          id="card_footer_confirm_button"
          text={buttonText}
          iconLeft={buttonIconLeft}
          iconRight={buttonIconRight}
          color={buttonColor}
          onClick={onConfirm}
          disabled={confirmDisabled}
        />
      </FooterRight>
    </Container>
  );
}
