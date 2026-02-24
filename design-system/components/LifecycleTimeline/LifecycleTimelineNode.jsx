import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';
import Button from '../Button';
import { statusColors, statuses } from './constants';

const Wrapper = styled.div`position: relative;`;

const Container = styled.div`
  width: ${({ size }) => size}px;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.constants.normalFontSize};
`;

const Title = styled.div`
  width: ${({ theme, size }) => (size === 24 ? `calc(6.25 * ${theme.constants.spacing4x})` : `calc(7.875 * ${theme.constants.spacing4x})`)};
  height: ${({ theme }) => theme.constants.smallLineHeight};
  color: ${({ theme, isUnvisitedTitle, status }) => {
    if (status === statuses.rejected || status === statuses.late) {
      return statusColors[status];
    }
    return isUnvisitedTitle ? theme.palette.d2 : theme.palette.black;
  }};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  font-weight: ${({ theme, status }) =>
    [statuses.rejected, statuses.late].includes(status) ? theme.constants.boldFontWeight : theme.constants.normalFontWeight};
  text-align: center;
  position: relative;
  left: ${({ theme, size }) => (size === 24 ? `calc(-5.5 * ${theme.constants.spacing2x})` : `calc(-6.875 * ${theme.constants.spacing2x})`)};
  margin: ${({ theme }) => `${theme.constants.spacing1x} 0`};
  padding-top: ${({ theme }) => theme.constants.spacingHalf};
  white-space: nowrap;
`;

const Text = styled.div`
  width: calc(10.625 * ${({ theme }) => theme.constants.spacing2x});
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.normalFontWeight};
  text-align: center;
  position: relative;
  left: calc(-4.25 * ${({ theme }) => theme.constants.spacing2x});
  display: flex;
  flex-direction: column;
`;

const DateText = styled.div`
  color: ${({ theme, status }) =>
    [statuses.rejected, statuses.late].includes(status) ? theme.palette.red : theme.palette.black};
`;

const NumberBadge = styled.span`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: ${({ theme }) => `${theme.constants.spacingQuarter} solid ${theme.palette.l4}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.constants.xsFontSize};
`;

const IconWrapper = styled.div`
  color: ${({ status }) => statusColors[status] || ''};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
`;

const iconByStatus = {
  [statuses.complete]: 'CHECK',
  [statuses.accepted]: 'CHECK',
  [statuses.fully_shipped]: 'CHECK',
  [statuses.late]: 'EXCEPTION',
  [statuses.rejected]: 'X',
  [statuses.none]: 'ASTERISK',
  [statuses.nothing_shipped]: 'ASTERISK',
  [statuses.pending]: 'WARNING',
  [statuses.partially_shipped]: 'WARNING',
  [statuses.fully_shipped_pending]: 'WARNING',
};

function getIconName(status) {
  return iconByStatus[status] || 'ASTERISK';
}

export default function LifecycleTimelineNode({
  title,
  percentComplete,
  status = statuses.none,
  date,
  onClick,
  size = 32,
  number,
  isActiveTitle = true,
  isUnvisitedTitle = false,
  id,
  subTitle,
}) {
  const iconName = getIconName(status);
  const datePrefix = status === statuses.none ? 'EXPECTED: ' : '';
  const displayTitle = percentComplete != null ? `${percentComplete}% ${title}` : title;

  let icon = <Icon iconName={iconName} size={size} />;
  if (number != null) {
    icon = (
      <NumberBadge size={size}>
        {number}
      </NumberBadge>
    );
  }
  if (onClick) {
    icon = (
      <Button
        color={status === statuses.complete || status === statuses.accepted ? 'green' : 'blue'}
        iconOnly={iconName}
        size="large"
        onClick={onClick}
        kind="transparent"
      />
    );
  }

  return (
    <Wrapper>
      <Container size={size} id={id}>
        <IconWrapper status={status} onClick={onClick}>
          {icon}
        </IconWrapper>
        <Title status={status} isActiveTitle={isActiveTitle} isUnvisitedTitle={isUnvisitedTitle} size={size}>
          {displayTitle}
        </Title>
        {date != null && (
          <Text>
            <DateText status={status}>
              {!subTitle && <span>{datePrefix}{typeof date === 'string' ? date : date?.toLocaleDateString?.() ?? ''}</span>}
              {subTitle && <span>{subTitle}</span>}
            </DateText>
          </Text>
        )}
      </Container>
    </Wrapper>
  );
}
