export enum ModStatus {
  WaitingForApproval,
  Approved,
  Declined,
  Deleted,
}

export enum ModStatusDescription {
  WaitingForApproval = 'Waiting for approval',
  Approved = 'Approved',
  Declined = 'Declined',
  Deleted = 'Deleted',
}

export function modStatusToDescription(
  modStatus: ModStatus
): ModStatusDescription {
  switch (modStatus) {
    case ModStatus.WaitingForApproval:
      return ModStatusDescription.WaitingForApproval;
    case ModStatus.Approved:
      return ModStatusDescription.Approved;
    case ModStatus.Declined:
      return ModStatusDescription.Declined;
    case ModStatus.Deleted:
      return ModStatusDescription.Deleted;
  }
}
