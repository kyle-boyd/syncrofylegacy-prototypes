import React from 'react';
import styled from '@emotion/styled';
import UserCard from '../UserCard';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const ListItem = styled.li`
  list-style: none;
`;

export default function UserList({ users = [], renderCard, getKey = (u) => u?.id ?? u }) {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={getKey(user)}>
          {renderCard ? renderCard(user) : <UserCard name={user.name} email={user.email} avatarUrl={user.avatarUrl} />}
        </ListItem>
      ))}
    </List>
  );
}
