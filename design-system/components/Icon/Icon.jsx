import React from 'react';
import styled from '@emotion/styled';
import Glyphs from './Glyphs';

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  color: currentColor;
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export default function Icon({ iconName, size = 14, className, id }) {
  const glyph = Glyphs[iconName];
  const IconComponent = glyph?.component || Glyphs.ADD.component;

  return (
    <Wrapper size={size} className={className} id={id}>
      <IconComponent aria-hidden />
    </Wrapper>
  );
}
