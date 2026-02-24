import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  max-height: calc(12.5 * ${({ theme }) => theme.constants.spacing8x});
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.constants.spacing2x} 0`};
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  width: calc(7.5 * ${({ theme }) => theme.constants.spacing3x});
  padding-left: ${({ theme }) => theme.constants.spacing2x};
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.d2};
  white-space: nowrap;
`;

const LineContainer = styled.div`
  position: relative;
  border-left: ${({ theme }) => `${theme.constants.spacingQuarter} solid ${theme.palette.l3}`};
  margin-left: ${({ theme }) => `calc(${theme.constants.spacing2x} + ${theme.constants.spacingHalf})`};
  margin-right: ${({ theme }) => `calc(${theme.constants.spacing2x} + ${theme.constants.spacingHalf})`};
  min-height: ${({ theme }) => `calc(${theme.constants.spacing3x} + ${theme.constants.spacing1x})`};
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: ${({ theme }) => `calc(-1 * ${theme.constants.spacing3x} / 2)`};
`;

const Node = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border: ${({ theme }) => `${theme.constants.spacingQuarter} solid ${theme.palette.l3}`};
`;

const LargeNode = styled(Node)`
  width: ${({ theme }) => theme.constants.spacing3x};
  height: ${({ theme }) => theme.constants.spacing3x};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SmallNode = styled(Node)`
  width: ${({ theme }) => theme.constants.spacing1_5x};
  height: ${({ theme }) => theme.constants.spacing1_5x};
  border-radius: ${({ theme }) => theme.constants.radiusPill};
  margin-left: ${({ theme }) => `calc((${theme.constants.spacing3x} - ${theme.constants.spacing1_5x}) / 2 - 1px)`};
  margin-top: ${({ theme, isFirst }) => (isFirst ? 0 : theme.constants.spacingHalf)};
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  padding-right: ${({ theme }) => theme.constants.spacing2x};
  padding-bottom: ${({ theme }) => theme.constants.spacing3x};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : undefined)};
`;

const DateSection = styled.span`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  line-height: ${({ theme }) => theme.constants.largeLineHeight};
`;

const EventTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme, titleColor }) => (titleColor ? theme.palette[titleColor] : theme.palette.black)};
  height: ${({ theme }) => theme.constants.spacing3x};
  margin-bottom: ${({ theme }) => theme.constants.spacingQuarter};
  white-space: nowrap;
`;

const ContentSection = styled.div`
  padding: ${({ theme }) => theme.constants.spacing2x};
  background-color: ${({ theme, bgColor }) => (bgColor ? theme.palette[bgColor] : theme.palette.l1)};
  border: ${({ theme, borderColor }) => (borderColor ? `1px solid ${theme.palette[borderColor]}` : undefined)};
  border-radius: ${({ theme }) => theme.constants.radiusMedium};
`;

const iconMap = {
  DEFAULT: 'ASTERISK',
  DOC: 'ASTERISK',
  EXCEPTION: 'EXCEPTION',
  INBOUND_ORDERS: 'CHEVRON_RIGHT',
  OUTBOUND_ORDERS: 'CHEVRON_RIGHT',
  RECEIPT: 'CHEVRON_RIGHT',
  SWITCH: 'SETTINGS',
  TRUCK: 'CHEVRON_RIGHT',
};

function renderSmallNode(item, index) {
  return (
    <NodeContainer key={`small-${index}`}>
      <Left />
      <LineContainer>
        <Line>
          <SmallNode isFirst={index === 0} />
        </Line>
      </LineContainer>
      <Right>
        <DateSection>{item.title}</DateSection>
      </Right>
    </NodeContainer>
  );
}

function renderLargeNode(item, index, IconComponent) {
  const iconName = item.icon ? (iconMap[item.icon] || 'ASTERISK') : null;
  return (
    <NodeContainer key={`large-${index}`}>
      <Left>
        <Date>{item.date}</Date>
      </Left>
      <LineContainer>
        <Line>
          {iconName ? (
            <LargeNode>
              <IconComponent iconName={iconName} size={24} />
            </LargeNode>
          ) : (
            <LargeNode />
          )}
        </Line>
      </LineContainer>
      <Right fullWidth={item.fullWidth}>
        <EventTitle titleColor={item.titleColor}>{item.title}</EventTitle>
        <ContentSection bgColor={item.bgColor} borderColor={item.borderColor}>
          {item.content}
        </ContentSection>
      </Right>
    </NodeContainer>
  );
}

export default function VerticalTimeline({ list = [], useVirtualized = false }) {
  if (useVirtualized) {
    return (
      <Container>
        {list.map((item, i) =>
          item.size === 'large' ? renderLargeNode(item, i, Icon) : renderSmallNode(item, i)
        )}
      </Container>
    );
  }
  return (
    <Container>
      {list.map((item, i) =>
        item.size === 'large' ? renderLargeNode(item, i, Icon) : renderSmallNode(item, i)
      )}
    </Container>
  );
}
