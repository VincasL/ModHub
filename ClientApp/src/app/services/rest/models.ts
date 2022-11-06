export interface Game {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export enum Role {
  Guest,
  User,
  Moderator,
  Admin
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface Mod {
  id: number;
  name: string;
  totalDownloads: number;
  fileKey: string;
  downloadLink: string;
  imageUrl: string;
  modStatus: ModStatus;
  description: string;
  user: User;
  rating: number;
  gameId: number;
}

export enum ModStatus {
  WaitingForApproval,
  Approved,
  Declined,
  Deleted,
}
