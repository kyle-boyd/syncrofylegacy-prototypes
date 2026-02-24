export const statuses = {
  none: 'none',
  nothing_shipped: 'nothing_shipped',
  pending: 'pending',
  partially_shipped: 'partially_shipped',
  fully_shipped: 'fully_shipped',
  accepted: 'accepted',
  rejected: 'rejected',
  late: 'late',
  complete: 'complete',
  fully_shipped_pending: 'fully_shipped_pending',
  late_acknowledgment: 'late_acknowledgment',
};

export const statusColors = {
  [statuses.rejected]: '#CC1827',
  [statuses.late]: '#CC1827',
  [statuses.none]: '#c1c1c1',
  [statuses.nothing_shipped]: '#c1c1c1',
  [statuses.pending]: '#FFCC00',
  [statuses.partially_shipped]: '#FFCC00',
  [statuses.fully_shipped_pending]: '#FFCC00',
  [statuses.accepted]: '#1c9900',
  [statuses.complete]: '#1c9900',
  [statuses.fully_shipped]: '#1c9900',
  [statuses.late_acknowledgment]: '#CC1827',
};
