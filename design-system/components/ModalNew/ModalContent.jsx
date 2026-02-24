import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Icon from '../Icon';

const ModalOuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.constants.z2};
  width: ${({ width }) => (width ? `${width}px` : undefined)};
  max-width: 95vw;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : undefined)};
  min-height: 0;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : undefined)};
  height: ${({ height }) => (height ? `${height}px` : undefined)};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  border-bottom: ${({ theme, hasDivider }) => (hasDivider ? `1px solid ${theme.palette.l2}` : '0')};
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.constants.spacing1_5x};
  overflow: hidden;
`;

const HeaderRight = styled.div`
  padding: ${({ title, theme }) => (title ? `${theme.constants.spacing1_5x} ${theme.constants.spacing1_5x} ${theme.constants.spacing1_5x} 0` : `${theme.constants.spacing1_5x} ${theme.constants.spacing1_5x} ${theme.constants.spacing1_5x} 0`)};
`;

const Title = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.d1};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  line-height: ${({ theme }) => theme.constants.smallLineHeight};
`;

const CloseButton = styled.span`
  color: ${({ theme }) => theme.palette.l4};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.d3};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ noPadding, theme }) => (noPadding ? 0 : theme.constants.spacing2x)};
  overflow-y: ${({ noScroll }) => (noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
`;

const Footer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.palette.stroke};
  justify-content: space-between;
  padding: ${({ theme }) => theme.constants.spacing1x};
`;

const FooterLeft = styled.div``;
const FooterRight = styled.div`
  display: flex;
`;

export default function ModalContent({
  name,
  title,
  hasDivider = false,
  onBack,
  onConfirm,
  buttonText = 'Confirm',
  buttonIcon,
  buttonColor = 'blue',
  onCancel,
  hasSingleButton = false,
  hasCancelButton = false,
  confirmDisabled = false,
  cancelDisabled = false,
  backDisabled = false,
  maxHeight,
  height,
  width,
  minWidth,
  noPadding = false,
  noScroll = true,
  children,
}) {
  const titleRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const updateOverflow = () => {
    if (!titleRef.current) return;
    const { offsetWidth, scrollWidth } = titleRef.current;
    setShowTooltip(scrollWidth > offsetWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateOverflow);
    return () => window.removeEventListener('resize', updateOverflow);
  }, []);
  useEffect(() => updateOverflow(), [title]);

  return (
    <ModalOuterWrapper id={`modal_outer_wrapper_${name}`}>
      <StyledModal id={`modal_wrapper_${name}`} maxHeight={maxHeight} height={height} width={width} minWidth={minWidth}>
        <Header id={`modal_header_${name}`} hasDivider={hasDivider}>
          <HeaderLeft id={`modal_header_left_${name}`}>
            {title && (
              <Title id={`modal_header_title_${name}`} ref={titleRef}>
                {title}
              </Title>
            )}
          </HeaderLeft>
          <HeaderRight id={`modal_header_right_${name}`} title={title}>
            {!cancelDisabled && onCancel && (
              <CloseButton id={`modal_header_close_button_${name}`} onClick={onCancel}>
                <Icon iconName="X" size={12} />
              </CloseButton>
            )}
          </HeaderRight>
        </Header>
        <Body id={`modal_body_${name}`} noPadding={noPadding} noScroll={noScroll}>
          {children}
        </Body>
        {onConfirm && (
          <Footer id={`modal_footer_${name}`}>
            {hasSingleButton ? (
              <Button
                id={`modal_footer_confirm_button_${name}`}
                text={buttonText}
                color={buttonColor}
                onClick={onConfirm}
                isFullWidth
                iconLeft={buttonIcon}
                disabled={confirmDisabled}
              />
            ) : (
              <>
                <FooterLeft id={`modal_footer_left_${name}`}>
                  {onBack && (
                    <Button
                      id={`modal_footer_back_button_${name}`}
                      text="Back"
                      kind="inverted"
                      iconLeft="ARROW_LEFT"
                      onClick={onBack}
                      disabled={backDisabled}
                    />
                  )}
                </FooterLeft>
                <FooterRight id={`modal_footer_right_${name}`}>
                  {hasCancelButton && (
                    <Button
                      id={`modal_footer_cancel_button_${name}`}
                      text="Cancel"
                      color="grey"
                      kind="transparent"
                      onClick={onCancel}
                      disabled={cancelDisabled}
                    />
                  )}
                  <Button
                    id={`modal_footer_confirm_button_${name}`}
                    text={buttonText}
                    color={buttonColor}
                    onClick={onConfirm}
                    iconLeft={buttonIcon}
                    disabled={confirmDisabled}
                  />
                </FooterRight>
              </>
            )}
          </Footer>
        )}
      </StyledModal>
    </ModalOuterWrapper>
  );
}
