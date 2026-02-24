import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Icon from '../Icon';

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.constants.z2};
  max-width: calc(10 * ${({ theme }) => theme.spacing.spacing8x});
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderRight = styled.div`
  padding: ${({ theme }) => `${theme.constants.spacing1_5x} ${theme.constants.spacing1_5x} 0 0`};
`;

const CloseButton = styled.span`
  color: ${({ theme }) => theme.palette.l4};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.d3};
  }
`;

const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TitleIcon = styled.span`
  color: ${({ theme }) => theme.palette.red};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: ${({ theme }) => theme.constants.spacing2x};
`;

const Title = styled.span`
  color: ${({ theme }) => theme.palette.d1};
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
`;

const Text = styled.div`
  padding-top: ${({ theme }) => theme.constants.spacing1x};
  color: ${({ theme }) => theme.palette.d1};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.constants.spacing2x};
`;

const ChildrenWrapper = styled.div`
  padding-left: ${({ theme }) => theme.constants.spacing6x};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing3x} ${theme.constants.spacing2x} ${theme.constants.spacing3x}`};
`;

const FooterRight = styled.div`
  display: flex;
`;

export default function AlertModal({
  name,
  title,
  text = '',
  children,
  onConfirm,
  onCancel,
  buttonText = 'Confirm',
  buttonIcon,
  confirmDisabled = false,
  cancelDisabled = false,
}) {
  return (
    <StyledModal id={`alert_modal_wrapper_${name}`}>
      <Header id={`alert_modal_header_${name}`}>
        <HeaderRight id={`alert_modal_header_right_${name}`}>
          <CloseButton id={`alert_modal_close_button_${name}`} onClick={onCancel}>
            <Icon iconName="X" size={12} />
          </CloseButton>
        </HeaderRight>
      </Header>
      <Body id={`alert_modal_body_${name}`}>
        <TitleWrapper id={`alert_modal_title_wrapper_${name}`}>
          <TitleIcon id={`alert_modal_title_icon_${name}`}>
            <Icon iconName="WARNING" size={32} />
          </TitleIcon>
          <Title id={`alert_modal_title_${name}`}>{title}</Title>
        </TitleWrapper>
        <ChildrenWrapper>
          {text && <Text id={`alert_modal_text_${name}`}>{text}</Text>}
          {children}
        </ChildrenWrapper>
      </Body>
      <Footer id={`alert_modal_footer_${name}`}>
        <FooterRight id={`alert_modal_footer_right_${name}`}>
          <Button
            id={`alert_modal_cancel_button_${name}`}
            text="Cancel"
            color="grey"
            kind="transparent"
            onClick={onCancel}
            disabled={cancelDisabled}
          />
          <Button
            id={`alert_modal_confirm_button_${name}`}
            text={buttonText}
            color="red"
            onClick={onConfirm}
            iconLeft={buttonIcon}
            iconSize={14}
            disabled={confirmDisabled}
          />
        </FooterRight>
      </Footer>
    </StyledModal>
  );
}
