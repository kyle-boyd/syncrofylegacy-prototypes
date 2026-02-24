import React from 'react';
import TopNav from './TopNav';

export default {
  title: 'Components/TopNav',
  component: TopNav,
};

export const Default = () => (
  <TopNav
    environment="Production"
    notificationCount={6}
    userDisplayName="Kyle Boyd"
    userRole="CoEnterprise | Product De..."
    onSearch={(q) => console.log('Search:', q)}
    onChatAIClick={() => console.log('Chat AI')}
    onEnvironmentChange={(env) => console.log('Environment:', env)}
    onEnvironmentSettings={() => console.log('Environment settings')}
    onDismissAllNotifications={() => console.log('Dismiss all')}
    onNotificationSettings={() => console.log('Notification settings')}
    onAccount={() => console.log('Account')}
    onOrganization={() => console.log('Organization')}
    onCompanyChange={() => console.log('Company change')}
    onSignOut={() => console.log('Sign out')}
    onHelp={() => console.log('Help')}
  />
);

export const NoNotifications = () => (
  <TopNav
    environment="Beta Data"
    notificationCount={0}
    userDisplayName="Jane Doe"
    userRole="Acme Inc | Admin"
  />
);

export const WithoutEnvironmentSelector = () => (
  <TopNav
    showEnvironmentSelector={false}
    environment="Production"
    notificationCount={0}
    userDisplayName="Jane Doe"
    userRole="Acme Inc | Admin"
    onChatAIClick={() => console.log('Chat AI')}
  />
);
