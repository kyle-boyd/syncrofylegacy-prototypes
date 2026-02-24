import React, { useRef, useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import styled from '@emotion/styled';

const ContentWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  line-height: normal;
  text-align: start;
  border-radius: ${({ theme }) => theme.constants.radiusSmall};
  box-shadow: ${({ theme }) => theme.constants.z2};
  background: ${({ theme }) => theme.palette.white};
  padding: 0;
  border: 1px solid ${({ theme }) => theme.palette?.grey?.[200] || 'rgba(0,0,0,0.08)'};
`;

const ChildrenWrapper = styled.span`
  display: ${({ $display }) => (typeof $display === 'string' ? $display : 'inline-block')};
  overflow: ${({ $overflow }) => (typeof $overflow === 'string' ? $overflow : 'visible')};
`;

// Map Tippy-style placement to MUI Popper placement
const toMuiPlacement = (placement) => {
  if (placement === 'auto' || !placement) return 'bottom';
  return placement;
};

export default function Popover({
  children,
  content,
  placement = 'auto',
  arrow = true,
  showOnCreate = false,
  hideOnClick = true,
  interactive = true,
  enabled = true,
  trigger = 'click',
  distance = 10,
  duration = [275, 200],
  onClickOutside = () => {},
  visible: controlledVisible,
  onShown = () => {},
  childrenDisplay,
  childrenWrapperOverflow,
  stopPropagation = false,
  contentMaxHeight,
}) {
  const targetRef = useRef(null);
  const [open, setOpen] = useState(showOnCreate);
  const [maxHeight, setMaxHeight] = useState('unset');

  const isControlled = controlledVisible !== undefined;
  const isOpen = isControlled ? controlledVisible : open;

  const setMaxHeightFromPlacement = (place) => {
    if (!targetRef.current) return;
    const placementVal = place || 'bottom';
    const rect = targetRef.current.getBoundingClientRect();
    let height;
    if (placementVal.startsWith('top')) {
      height = window.innerHeight - (window.innerHeight - rect.top) - 15 - 40;
    } else if (placementVal.startsWith('bottom')) {
      height = window.innerHeight - rect.top - rect.height - 15 - 40;
    } else {
      height = window.innerHeight - 70;
    }
    setMaxHeight(height);
  };

  const resolvedMaxHeight = contentMaxHeight
    ? contentMaxHeight
    : maxHeight === 'unset'
      ? 'unset'
      : `${maxHeight}px`;

  useEffect(() => {
    const onResize = () => setMaxHeightFromPlacement();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMaxHeightFromPlacement(toMuiPlacement(placement));
      onShown();
    }
  }, [isOpen]);

  const handleTriggerClick = (e) => {
    if (stopPropagation) e.stopPropagation();
    if (!enabled) return;
    if (trigger !== 'click') return;
    if (!isControlled) setOpen((prev) => !prev);
  };

  const handleClickAway = (e) => {
    if (!hideOnClick || !interactive) return;
    if (targetRef.current?.contains(e.target)) return;
    onClickOutside(e);
    if (!isControlled) setOpen(false);
  };

  const muiPlacement = toMuiPlacement(placement);

  const popperContent = (
    <Popper
      open={isOpen}
      anchorEl={targetRef.current}
      placement={muiPlacement}
      disablePortal={false}
      modifiers={[
        { name: 'offset', options: { offset: [0, distance] } },
      ]}
      sx={{ zIndex: 30001 }}
    >
      <ContentWrapper style={{ maxHeight: resolvedMaxHeight }}>
        {content}
      </ContentWrapper>
    </Popper>
  );

  return (
    <>
      <ChildrenWrapper
        ref={targetRef}
        $display={childrenDisplay}
        $overflow={childrenWrapperOverflow}
        onClick={handleTriggerClick}
      >
        {children}
      </ChildrenWrapper>
      {isOpen && (
        hideOnClick && interactive ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            {popperContent}
          </ClickAwayListener>
        ) : (
          popperContent
        )
      )}
    </>
  );
}
