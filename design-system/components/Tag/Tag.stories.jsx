import React from 'react';
import styled from '@emotion/styled';
import Tag from './Tag';

const Background = styled.div`
  background-color: #eaeaea;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.constants.largeFontSize};
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const colors = ['cerulean', 'sky', 'teal', 'orange', 'red', 'green', 'sea', 'grey', 'lightGrey', 'darkGrey'];

export default {
  title: 'Components/Tag',
  component: Tag,
};

export const Default = () => (
  <Background>
    <SectionLabel>Small tags</SectionLabel>
    <Wrapper>
      {colors.map((c) => (
        <Tag key={c} name={c} valueText={c} size="small" color={c} />
      ))}
    </Wrapper>
    <SectionLabel>With left icon</SectionLabel>
    <Wrapper>
      <Tag name="a" valueText="With check" size="small" color="cerulean" leftIcon="CHECK" />
      <Tag name="b" valueText="With icon" size="medium" color="teal" leftIcon="INFO" />
    </Wrapper>
    <SectionLabel>Selected, clickable, removable</SectionLabel>
    <Wrapper>
      <Tag name="s1" valueText="Selected" color="cerulean" isSelected />
      <Tag name="c1" valueText="Clickable" color="sky" onClick={() => {}} />
      <Tag name="r1" valueText="Removable" color="teal" onRemoveClick={() => {}} />
      <Tag name="cr" valueText="Click + Remove" color="orange" onClick={() => {}} onRemoveClick={() => {}} />
    </Wrapper>
    <SectionLabel>Button kind</SectionLabel>
    <Wrapper>
      <Tag name="btn1" valueText="Button Tag" kind="button" onClick={() => {}} />
      <Tag name="btn2" valueText="Button Selected" kind="button" isSelected onClick={() => {}} />
    </Wrapper>
    <SectionLabel>Disabled & error</SectionLabel>
    <Wrapper>
      <Tag name="d1" valueText="Disabled" color="cerulean" disabled />
      <Tag name="e1" valueText="Error" color="cerulean" errors onClick={() => {}} />
    </Wrapper>
  </Background>
);
