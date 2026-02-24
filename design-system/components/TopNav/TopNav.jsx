import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import SearchBar from '../SearchBar';
import Avatar from '../Avatar';
import Popover from '../Popover';
import CountBadge from '../CountBadge';
import Icon from '../Icon/Icon';

// -----------------------------------------------------------------------------
// Nav bar layout
// -----------------------------------------------------------------------------

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: ${({ theme }) => theme.constants.spacing6x};
  padding: 0 ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.sea};
  color: ${({ theme }) => theme.palette.white};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-shrink: 0;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex: 1;
  max-width: 560px;
  margin: 0 ${({ theme }) => theme.constants.spacing3x};
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  flex-shrink: 0;
`;

const Logo = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
  svg {
    height: 100%;
    width: auto;
  }
`;

function SyncrofyLogoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 35.71"
      role="img"
      aria-hidden
    >
      <g fill="#ffffff">
        <path d="M25.81,32.11a3.19,3.19,0,0,0,2.94-2.28l.59-1.37L23.39,15a.84.84,0,0,0-.95-.63h-.53V10.63h2.94a2.17,2.17,0,0,1,2.35,1.68l3.5,8.93a17.77,17.77,0,0,1,.63,2.38h.07A21.59,21.59,0,0,1,32,21.25l3-8.93a2.21,2.21,0,0,1,2.38-1.68h3v3.78h-.52a.89.89,0,0,0-1,.63L32.5,31.2a6.76,6.76,0,0,1-6.45,4.66A6.62,6.62,0,0,1,21.53,34l1.72-3.15A3.84,3.84,0,0,0,25.81,32.11Z" transform="translate(0 -0.14)" />
        <path d="M44.14,15.18a.69.69,0,0,0-.77-.77H42V10.63h4.1c1.58,0,2.35.74,2.35,2v.53a4.93,4.93,0,0,1-.07.77h.07a6.86,6.86,0,0,1,6.31-3.71c4,0,6.24,2.07,6.24,6.8v7a.7.7,0,0,0,.77.77h1.4V28.5H58.89c-1.68,0-2.38-.7-2.38-2.38v-8.2c0-2.17-.56-3.64-2.8-3.64a4.9,4.9,0,0,0-4.8,3.64,7.52,7.52,0,0,0-.35,2.38v8.2H44.14Z" transform="translate(0 -0.14)" />
        <path d="M72.91,10.21c2.31,0,6.48.95,6.48,4v2.1H75.47v-1c0-1-1.47-1.4-2.56-1.4a5.25,5.25,0,0,0-5.29,5.57A5.29,5.29,0,0,0,73.19,25a8.08,8.08,0,0,0,5.29-2.42l1.86,3.08a10.22,10.22,0,0,1-7.53,3.22c-5.89,0-9.67-4.17-9.67-9.36S66.78,10.21,72.91,10.21Z" transform="translate(0 -0.14)" />
        <path d="M83.07,15.18a.69.69,0,0,0-.77-.77H80.9V10.63H85c1.58,0,2.38.66,2.38,2.17v1A8.09,8.09,0,0,1,87.27,15h.07A6.15,6.15,0,0,1,93,10.38a5.66,5.66,0,0,1,.8.07v4.38a7.79,7.79,0,0,0-1.08-.07,5,5,0,0,0-4.87,3.75,10.84,10.84,0,0,0-.38,2.91V28.5H83.07Z" transform="translate(0 -0.14)" />
        <path d="M103.43,10.21c5.47,0,9.81,3.89,9.81,9.36s-4.34,9.36-9.81,9.36-9.78-3.86-9.78-9.36S98,10.21,103.43,10.21Zm0,14.93a5.32,5.32,0,0,0,5.33-5.57,5.31,5.31,0,1,0-10.62,0A5.31,5.31,0,0,0,103.43,25.13Z" transform="translate(0 -0.14)" />
        <path d="M115.17,14.17H113V10.63h2.21V10.1c0-5.85,4.8-6.62,7.29-6.62a9.64,9.64,0,0,1,1.51.1V7.37A5.7,5.7,0,0,0,123,7.3c-1.26,0-3.43.32-3.43,2.91v.42h3.82v3.54h-3.82V28.5h-4.45Z" transform="translate(0 -0.14)" />
        <path d="M129.35,32.11a3.19,3.19,0,0,0,2.94-2.28l.6-1.37-6-13.42a.84.84,0,0,0-.95-.63h-.53V10.63h2.94a2.17,2.17,0,0,1,2.35,1.68l3.5,8.93a17.28,17.28,0,0,1,.63,2.38H135a21.66,21.66,0,0,1,.6-2.38l3-8.93A2.21,2.21,0,0,1,141,10.63h3v3.78h-.53a.89.89,0,0,0-1,.63L136,31.2a6.76,6.76,0,0,1-6.45,4.66A6.62,6.62,0,0,1,125.08,34l1.72-3.15A3.85,3.85,0,0,0,129.35,32.11Z" transform="translate(0 -0.14)" />
      </g>
      <g fill="#72ceec">
        <path d="M7.67,15.81C3.8,14.76,0,13.16,0,8.27,0,2.78,5.19.14,10,.14c5.6,0,10.76,2.44,10.76,8.65H15.08c-.19-3.23-2.48-4.06-5.3-4.06-1.88,0-4.06.79-4.06,3,0,2.07,1.28,2.33,8,4.06,2,.49,8,1.73,8,7.82,0,1.76-1.2,6.32-1.46,4.7C19.08,17.35,7.67,15.81,7.67,15.81Z" transform="translate(0 -0.14)" />
      </g>
    </svg>
  );
}

const SearchWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  .search-bar-input {
    max-width: 100%;
  }
`;

const IconButtonWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => theme.constants.spacing1x};
  &:hover {
    color: ${({ theme }) => theme.palette.sky};
  }
`;

const BellWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => theme.constants.spacing1x};
  &:hover {
    color: ${({ theme }) => theme.palette.sky};
  }
`;

const BadgePosition = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  pointer-events: none;
`;

const AvatarWrap = styled.span`
  cursor: pointer;
  display: inline-flex;
  border-radius: 50%;
  border: 2px solid transparent;
  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.palette.sky};
  }
`;

// -----------------------------------------------------------------------------
// Dropdown panel styles
// -----------------------------------------------------------------------------

const DropdownPanel = styled.div`
  min-width: 280px;
  max-width: 360px;
  padding: ${({ theme }) => theme.constants.spacing2x};
`;

const DropdownTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.black};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
  padding-bottom: ${({ theme }) => theme.constants.spacing1x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.constants.spacing1x} ${theme.constants.spacing2x}`};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  &:hover {
    background: ${({ theme }) => theme.palette.cloud};
  }
`;

const DropdownItemMuted = styled(DropdownItem)`
  color: ${({ theme }) => theme.palette.d3};
  cursor: default;
`;

const DropdownItemWithIcon = styled(DropdownItem)`
  gap: ${({ theme }) => theme.constants.spacing1_5x};
  .icon-wrap {
    color: ${({ theme }) => theme.palette.cerulean};
  }
`;

const DropdownItemRight = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.palette.d2};
`;

const DropdownSeparator = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.palette.l2};
  margin: ${({ theme }) => theme.constants.spacing1x} 0;
`;

const DropdownLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.cerulean};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing1x};
  margin-top: ${({ theme }) => theme.constants.spacing1x};
  &:hover {
    text-decoration: underline;
  }
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.constants.spacing2x};
  padding-bottom: ${({ theme }) => theme.constants.spacing2x};
  border-bottom: 1px solid ${({ theme }) => theme.palette.l2};
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
`;

const UserName = styled.div`
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  font-size: ${({ theme }) => theme.constants.normalFontSize};
  color: ${({ theme }) => theme.palette.black};
`;

const UserMeta = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.d2};
`;

const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  font-weight: ${({ theme }) => theme.constants.boldFontWeight};
  color: ${({ theme }) => theme.palette.black};
  margin-bottom: ${({ theme }) => theme.constants.spacing1x};
`;

const PseudoSelect = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.l4};
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  padding: ${({ theme }) => theme.constants.spacing1x} ${({ theme }) => theme.constants.spacing2x};
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.d3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.constants.spacing2x};
  cursor: pointer;
`;

const NotificationRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.constants.spacing1x};
  padding: ${({ theme }) => theme.constants.spacing1x} 0;
  align-items: flex-start;
`;

const NotificationIconWrap = styled.span`
  color: ${({ theme }) => theme.palette.cerulean};
  flex-shrink: 0;
  margin-top: 2px;
`;

const NotificationMessage = styled.div`
  font-size: ${({ theme }) => theme.constants.smallFontSize};
  color: ${({ theme }) => theme.palette.black};
`;

const NotificationDate = styled.div`
  font-size: ${({ theme }) => theme.constants.xsFontSize};
  color: ${({ theme }) => theme.palette.d2};
  margin-top: ${({ theme }) => theme.constants.spacingQuarter};
`;

// -----------------------------------------------------------------------------
// Dropdown content components
// -----------------------------------------------------------------------------

function EnvironmentsDropdown({ currentEnvironment, environments, onSelectEnvironment, onSettings }) {
  return (
    <DropdownPanel>
      <DropdownTitle>
        Environments
        <span style={{ cursor: 'pointer' }} onClick={onSettings} aria-label="Environment settings">
          <Icon iconName="SETTINGS" size={16} />
        </span>
      </DropdownTitle>
      {(environments || ['Beta Data', 'Production']).map((env) => (
        <DropdownItem
          key={env}
          as={env === currentEnvironment ? DropdownItemMuted : undefined}
          onClick={env !== currentEnvironment ? () => onSelectEnvironment?.(env) : undefined}
        >
          {env}
        </DropdownItem>
      ))}
    </DropdownPanel>
  );
}

function NotificationsDropdown({ notifications = [], onDismissAll, onSettings }) {
  const defaultNotifications = [
    { id: '1', message: 'Joshua Mchan has signed up for your company.', date: 'Feb 17' },
    { id: '2', message: 'Linda Theodore has signed up for your company.', date: 'Jan 27' },
    { id: '3', message: 'Kanagarla Purna Sai has signed up for your company.', date: 'Jan 27' },
    { id: '4', message: 'Velpuri Dileep Kumar has signed up for your company.', date: 'Jan 27' },
    { id: '5', message: 'Parinitha Anjali Kode has signed up for your company.', date: 'Jan 26' },
    { id: '6', message: 'Vaishnavi CJB has signed up for your company.', date: 'Jan 26' },
  ];
  const list = notifications.length ? notifications : defaultNotifications;
  return (
    <DropdownPanel>
      <DropdownTitle>
        Notifications ({list.length})
        <DropdownLink type="button" onClick={onDismissAll}>
          Dismiss All
        </DropdownLink>
      </DropdownTitle>
      {list.map((n, i) => (
        <React.Fragment key={n.id}>
          <NotificationRow>
            <NotificationIconWrap>
              <Icon iconName="BELL" size={16} />
            </NotificationIconWrap>
            <div>
              <NotificationMessage>{n.message}</NotificationMessage>
              <NotificationDate>{n.date}</NotificationDate>
            </div>
          </NotificationRow>
          {i < list.length - 1 && <DropdownSeparator />}
        </React.Fragment>
      ))}
      <DropdownLink type="button" onClick={onSettings}>
        <Icon iconName="SETTINGS" size={14} />
        Go to notification settings
      </DropdownLink>
    </DropdownPanel>
  );
}

function UserMenuDropdown({
  userName = 'Kyle Boyd',
  userRole = 'CoEnterprise | Product De...',
  onAccount,
  onOrganization,
  onCompanyChange,
  onSignOut,
}) {
  return (
    <DropdownPanel>
      <UserInfoRow>
        <Avatar firstName={userName.split(' ')[0]} lastName={userName.split(' ')[1] || ''} size="m" />
        <div>
          <UserName>{userName}</UserName>
          <UserMeta>{userRole}</UserMeta>
        </div>
      </UserInfoRow>
      <DropdownItemWithIcon as="button" type="button" onClick={onAccount} style={{ width: '100%', textAlign: 'left' }}>
        <span className="icon-wrap">
          <Icon iconName="PERSON" size={16} />
        </span>
        Account
        <DropdownItemRight>
          <Icon iconName="CHEVRON_RIGHT" size={16} />
        </DropdownItemRight>
      </DropdownItemWithIcon>
      <DropdownItemWithIcon as="button" type="button" onClick={onOrganization} style={{ width: '100%', textAlign: 'left' }}>
        <span className="icon-wrap">
          <Icon iconName="BUILDING" size={16} />
        </span>
        Organization
        <DropdownItemRight>
          <Icon iconName="CHEVRON_RIGHT" size={16} />
        </DropdownItemRight>
      </DropdownItemWithIcon>
      <SectionLabel>View Syncrofy as:</SectionLabel>
      <PseudoSelect onClick={onCompanyChange}>
        Choose a company...
        <Icon iconName="CHEVRON_DOWN" size={16} />
      </PseudoSelect>
      <DropdownItemWithIcon as="button" type="button" onClick={onSignOut} style={{ width: '100%', textAlign: 'left' }}>
        <span className="icon-wrap">
          <Icon iconName="LOGOUT" size={16} />
        </span>
        Sign Out
      </DropdownItemWithIcon>
    </DropdownPanel>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export default function TopNav({
  logoLabel = 'Syncrofy',
  showEnvironmentSelector = true,
  environment = 'Production',
  environments,
  onEnvironmentChange,
  onEnvironmentSettings,
  searchPlaceholder = 'Search for documents, comments, users...',
  onSearch,
  onChatAIClick,
  notificationCount = 0,
  notifications,
  onDismissAllNotifications,
  onNotificationSettings,
  userDisplayName,
  userRole,
  onAccount,
  onOrganization,
  onCompanyChange,
  onSignOut,
  onHelp,
}) {
  const [envOpen, setEnvOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <Nav role="navigation" aria-label="Main navigation">
      <Left>
        <Logo aria-label={logoLabel}>
          <SyncrofyLogoSvg />
        </Logo>
        {showEnvironmentSelector && (
          <Popover
            content={
              <EnvironmentsDropdown
                currentEnvironment={environment}
                environments={environments}
                onSelectEnvironment={(env) => {
                  onEnvironmentChange?.(env);
                  setEnvOpen(false);
                }}
                onSettings={onEnvironmentSettings}
              />
            }
            placement="bottom-start"
            trigger="click"
            visible={envOpen}
            onClickOutside={() => setEnvOpen(false)}
            onShown={() => setEnvOpen(true)}
          >
            <span onClick={() => setEnvOpen(!envOpen)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setEnvOpen(!envOpen)}>
              <Button
                text={environment}
                color="blue"
                kind="default"
                size="small"
                iconRight="CHEVRON_DOWN"
                type="button"
              />
            </span>
          </Popover>
        )}
      </Left>

      <Center>
        <SearchWrapper>
          <SearchBar
            placeholder={searchPlaceholder}
            onSubmit={onSearch}
            onChange={() => {}}
          />
        </SearchWrapper>
        {onChatAIClick && (
          <Button
            text="Chat AI Beta"
            color="orange"
            kind="inverted"
            size="small"
            iconLeft="ASTERISK"
            onClick={onChatAIClick}
          />
        )}
      </Center>

      <Right>
        <Popover
          content={
            <NotificationsDropdown
              notifications={notifications}
              onDismissAll={onDismissAllNotifications}
              onSettings={onNotificationSettings}
            />
          }
          placement="bottom-end"
          trigger="click"
          visible={notifOpen}
          onClickOutside={() => setNotifOpen(false)}
          onShown={() => setNotifOpen(true)}
        >
          <BellWrap onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
            <Icon iconName="BELL" size={24} />
            {notificationCount > 0 && (
              <BadgePosition>
                <CountBadge count={notificationCount} variant="error" />
              </BadgePosition>
            )}
          </BellWrap>
        </Popover>

        <Popover
          content={
            <UserMenuDropdown
              userName={userDisplayName}
              userRole={userRole}
              onAccount={onAccount}
              onOrganization={onOrganization}
              onCompanyChange={onCompanyChange}
              onSignOut={onSignOut}
            />
          }
          placement="bottom-end"
          trigger="click"
          visible={userOpen}
          onClickOutside={() => setUserOpen(false)}
          onShown={() => setUserOpen(true)}
        >
          <AvatarWrap onClick={() => setUserOpen(!userOpen)}>
            <Avatar
              firstName={userDisplayName?.split(' ')[0] || 'K'}
              lastName={userDisplayName?.split(' ')[1] || 'B'}
              size="s"
            />
          </AvatarWrap>
        </Popover>

        {onHelp && (
          <IconButtonWrap onClick={onHelp} aria-label="Help">
            <Icon iconName="HELP" size={24} />
          </IconButtonWrap>
        )}
      </Right>
    </Nav>
  );
}
