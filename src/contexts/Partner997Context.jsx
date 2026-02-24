import React, { createContext, useContext, useState, useCallback } from 'react';

/** 997 mode values matching partner settings dropdown */
export const PARTNER_997_MODES = {
  EXPECT_PENDING: 'expect-pending',
  DONT_EXPECT_AUTO: 'dont-expect-auto',
  DONT_EXPECT_UNEXPECTED: 'dont-expect-unexpected',
};

/** Partner IDs used for 997 demo; they default to dont-expect-auto so docs show Auto Accepted until toggled */
export const DEFAULT_997_DEMO_PARTNER_IDS = ['997-demo-a', '997-demo-b'];

const defaultValue = {
  /** Map partnerId -> 'expect-pending' | 'dont-expect-auto' | 'dont-expect-unexpected' */
  partner997: {},
  setPartner997Mode: () => {},
};

const Partner997Context = createContext(defaultValue);

export function Partner997Provider({ children }) {
  const [partner997, setPartner997State] = useState(() =>
    Object.fromEntries(
      DEFAULT_997_DEMO_PARTNER_IDS.map((id) => [id, PARTNER_997_MODES.DONT_EXPECT_AUTO])
    )
  );

  const setPartner997Mode = useCallback((partnerId, mode) => {
    setPartner997State((prev) => ({
      ...prev,
      [partnerId]: mode,
    }));
  }, []);

  const value = {
    partner997,
    setPartner997Mode,
  };

  return (
    <Partner997Context.Provider value={value}>
      {children}
    </Partner997Context.Provider>
  );
}

export function usePartner997() {
  const ctx = useContext(Partner997Context);
  if (!ctx) return defaultValue;
  return ctx;
}

/** Map 997 mode to acknowledgment status label for display on documents */
export function ackStatusFrom997Mode(mode) {
  if (!mode) return 'Pending';
  switch (mode) {
    case PARTNER_997_MODES.DONT_EXPECT_AUTO:
      return 'Auto Accepted';
    case PARTNER_997_MODES.DONT_EXPECT_UNEXPECTED:
      return 'Unexpected';
    case PARTNER_997_MODES.EXPECT_PENDING:
    default:
      return 'Pending';
  }
}
