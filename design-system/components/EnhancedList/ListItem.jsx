import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.l3};
  }
`;

const Left = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1 1 auto;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme, isBold }) => (isBold ? theme.constants.boldFontWeight : theme.constants.normalFontWeight)};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  line-height: ${({ theme }) => theme.constants.normalLineHeight};
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.constants.spacing1x};
  }
  word-break: break-all;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-left: ${({ theme }) => theme.constants.spacing3x};
  max-height: ${({ theme }) => `calc(${theme.constants.spacing6x} - ${theme.constants.spacingQuarter})`};
`;

const AvatarWrapper = styled.div`
  margin-right: ${({ theme }) => theme.constants.spacing2x};
`;

const IconWrapper = styled.span`
  display: flex;
  align-self: flex-start;
  align-items: center;
  margin-right: ${({ theme }) => theme.constants.spacing1x};
  height: ${({ theme }) => theme.constants.normalLineHeight};
  color: ${({ theme, isLink }) => (isLink ? undefined : theme.palette.d2)};
`;

const Action = styled.div`
  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.constants.spacing1x};
  }
`;

const idBase = 'list-item';

function slug(str) {
  return String(str ?? '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') || 'item';
}

export default function ListItem({
  text1,
  text2 = '',
  text3 = '',
  boldText1 = false,
  boldText2 = false,
  boldText3 = false,
  url1 = '',
  url2 = '',
  url3 = '',
  icon1 = '',
  icon2 = '',
  icon3 = '',
  actions = [],
  avatar = null,
  htmlID,
}) {
  const id = `${idBase}-${htmlID ?? slug(text1)}`;
  if (!text1) return null;

  const renderIcon = (iconName, url, num) => (
    <IconWrapper id={`${id}-icon${num}`} isLink={!!url}>
      <Icon iconName={iconName} />
    </IconWrapper>
  );

  const renderText = (text, isBold, url, icon, num) => {
    const content = (
      <Text id={`${id}-text${num}`} isBold={isBold}>
        {icon ? renderIcon(icon, url, num) : null}
        {text}
      </Text>
    );
    if (url) return <a href={url}>{content}</a>;
    return content;
  };

  return (
    <Container id={id}>
      <Left id={`${id}-left`}>
        {avatar && <AvatarWrapper id={`${id}-avatar`}>{avatar}</AvatarWrapper>}
        <TextWrapper id={`${id}-text`}>
          {renderText(text1, boldText1, url1, icon1, 1)}
          {text2 ? renderText(text2, boldText2, url2, icon2, 2) : null}
          {text3 ? renderText(text3, boldText3, url3, icon3, 3) : null}
        </TextWrapper>
      </Left>
      {actions?.length ? (
        <Right id={`${id}-right`}>
          {actions.map((action, i) => (
            <Action id={`${id}-action${i}`} key={`${id}-action${i}`}>
              {action}
            </Action>
          ))}
        </Right>
      ) : null}
    </Container>
  );
}
