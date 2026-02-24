import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon/Icon';

const Container = styled.div`
  overflow: hidden;
  padding: ${({ theme }) => `${theme.constants.spacing1x} 0`};
  border-bottom: ${({ theme, underline }) => (underline ? `1px solid ${theme.palette.stroke}` : 'none')};
`;

const Header = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: ${({ chevronRight }) => (chevronRight ? 'row-reverse' : 'row')};
  justify-content: ${({ chevronRight }) => (chevronRight ? 'space-between' : 'flex-start')};
  width: 100%;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: ${({ theme, chevronRight }) => (chevronRight ? 0 : theme.constants.spacing1x)};
`;

const Title = styled.span`
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'large': return theme.constants.largeFontSize;
      case 'small': return theme.constants.smallFontSize;
      default: return theme.constants.normalFontSize;
    }
  }};
`;

const MenuTitle = styled.span`
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'large': return theme.constants.largeFontSize;
      case 'small': return theme.constants.smallFontSize;
      default: return theme.constants.normalFontSize;
    }
  }};
`;

const ChevronWrapper = styled.span`
  color: ${({ theme }) => theme.palette.cerulean};
  display: flex;
  transition: transform 0.2s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? 90 : 0)}deg);
`;

const Actions = styled.span`
  display: flex;
  flex-direction: row;
  margin-left: ${({ theme }) => theme.constants.spacing2x};
`;

const Body = styled.div`
  display: ${({ isOpenFinal, shouldRenderHidden }) => (!isOpenFinal && shouldRenderHidden ? 'none' : 'block')};
  padding-top: ${({ theme }) => theme.constants.spacing2x};
  width: 100%;
  overflow-x: auto;
`;

const SubTitle = styled.span`
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'large':
      case 'small': return theme.constants.smallFontSize;
      default: return theme.constants.normalFontSize;
    }
  }};
`;

export default function Accordion({
  name = '',
  size = 'medium',
  isOpen: controlledOpen,
  defaultIsOpen = false,
  underline = false,
  chevronRight = false,
  actionComponent = null,
  title,
  children,
  onClick: onToggle,
  subTitle = '',
  shouldRenderHidden = false,
  isMenuTitle = false,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultIsOpen);
  const isControlled = onToggle != null && controlledOpen !== undefined;
  const isOpenFinal = isControlled ? controlledOpen : internalOpen;
  const handleClick = isControlled ? onToggle : () => setInternalOpen((o) => !o);

  const displayTitle = isMenuTitle ? (
    <MenuTitle size={size} id={`accordion-title-${name}`}>
      {title}
      {subTitle && <SubTitle size={size}>{` ${subTitle}`}</SubTitle>}
    </MenuTitle>
  ) : (
    <Title size={size} id={`accordion-title-${name}`}>
      {title}
      {subTitle && <SubTitle size={size}>{` ${subTitle}`}</SubTitle>}
    </Title>
  );

  return (
    <Container underline={underline} id={`accordion-${name}`}>
      <Header id={`accordion-header-${name}`} onClick={handleClick}>
        <HeaderContent id={`accordion-header-content-${name}`} chevronRight={chevronRight}>
          <ChevronWrapper id={`accordion-header-expand-${name}`} isOpen={isOpenFinal}>
            <Icon size={size === 'small' ? 12 : 16} iconName="CHEVRON_RIGHT" />
          </ChevronWrapper>
          <TitleWrapper id={`accordion-title-wrapper-${name}`} chevronRight={chevronRight}>
            {displayTitle}
            {actionComponent && <Actions id={`accordion-actions-${name}`}>{actionComponent}</Actions>}
          </TitleWrapper>
        </HeaderContent>
      </Header>
      {(isOpenFinal || shouldRenderHidden) && (
        <Body
          id={`accordion-body-${name}`}
          isOpenFinal={isOpenFinal}
          shouldRenderHidden={shouldRenderHidden}
        >
          {children}
        </Body>
      )}
    </Container>
  );
}
