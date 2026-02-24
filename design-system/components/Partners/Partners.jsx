import React from 'react';
import styled from '@emotion/styled';
import DreamTable from '../DreamTable';

const Page = styled.div`
  padding: ${({ theme }) => theme.constants.spacing3x};
  background-color: ${({ theme }) => theme.palette.offWhite};
  min-height: 100%;
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.constants.spacing3x};
  font-size: ${({ theme }) => theme.constants.xlFontSize};
  font-weight: ${({ theme }) => theme.constants.semiBoldFontWeight};
  line-height: ${({ theme }) => theme.constants.xlLineHeight};
  color: ${({ theme }) => theme.palette.black};
`;

export default function Partners({
  title = 'Partners',
  columns = [],
  data = [],
  keyField = 'id',
  renderCell,
}) {
  return (
    <Page>
      <Title>{title}</Title>
      <DreamTable columns={columns} data={data} keyField={keyField} renderCell={renderCell} />
    </Page>
  );
}
