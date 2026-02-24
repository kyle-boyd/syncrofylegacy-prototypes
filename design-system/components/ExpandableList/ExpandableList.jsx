import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  :not(:last-of-type) {
    margin-bottom: ${({ theme, marginSize }) => (marginSize === 'normal' ? theme.constants.spacing1x : theme.constants.spacingHalf)};
  }
`;

function flattenChildren(children) {
  if (children.length === undefined) return [].concat(children).filter(Boolean);
  return children.reduce((arr, child) => {
    if (child?.type?.toString?.() === 'Symbol(react.fragment)') {
      return child.props?.children ? [...arr, ...child.props.children.filter(Boolean)] : arr;
    }
    return [...arr, child];
  }, []);
}

export default function ExpandableList({
  children,
  initialCount = 5,
  marginSize = 'normal',
}) {
  const flat = flattenChildren(React.Children.toArray(children));
  const tooMany = flat.length > initialCount;
  const [isShowingAll, setShowingAll] = useState(!tooMany);
  const maxIdx = isShowingAll ? flat.length : initialCount;
  const remaining = flat.length - initialCount;

  return (
    <Container>
      <Items id="expandable_list_items">
        {flat.slice(0, maxIdx).map((child, idx) => (
          <Item key={child.key ?? `${idx}-item`} id="expandable_list_item" marginSize={marginSize}>
            {child}
          </Item>
        ))}
      </Items>
      {tooMany && (
        <Button
          id="expandable_list_toggle_display_count_button"
          text={isShowingAll ? 'Show less...' : `Show ${remaining} more...`}
          onClick={() => setShowingAll(!isShowingAll)}
          kind="transparent"
          noPadding
        />
      )}
    </Container>
  );
}
