import React from 'react';
import styled from '@emotion/styled';
import ExceptionDetail from '../ExceptionDetail';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.constants.spacing1x};
`;

const Item = styled.li`
  list-style: none;
`;

export default function FileExceptions({ exceptions = [], getKey = (e) => e?.id ?? e }) {
  return (
    <List>
      {exceptions.map((ex) => (
        <Item key={getKey(ex)}>
          <ExceptionDetail
            title={ex.title}
            message={ex.message}
            status={ex.status ?? 'pending'}
            fields={ex.fields ?? []}
          />
        </Item>
      ))}
    </List>
  );
}
