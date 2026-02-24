import React from 'react';
import styled from '@emotion/styled';
import Card from '../Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';

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

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.constants.spacing2x};
  grid-template-columns: repeat(auto-fill, minmax(${({ theme }) => theme.constants.spacing8x}, 1fr));
`;

export default function LifecycleConfigurations({
  title = 'Lifecycle configurations',
  configurations = [],
  getKey = (c) => c?.id ?? c?.name ?? c,
  renderCard,
}) {
  return (
    <Page>
      <Title>{title}</Title>
      <Grid>
        {configurations.map((config) =>
          renderCard ? (
            renderCard(config)
          ) : (
            <Card key={getKey(config)}>
              <CardHeader title={config.name ?? config.title ?? 'Configuration'} />
              <CardBody>{config.description ?? ''}</CardBody>
            </Card>
          )
        )}
      </Grid>
    </Page>
  );
}
