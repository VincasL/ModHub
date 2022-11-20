import { ModStatus } from '../../shared/enums/mod-status';
import { Role } from '../../shared/enums/role';

export interface Game {
  id: number;
  name: string;
  shortName: string;
  description: string;
  imageUrl: string;
  modsCount: number;
  totalDownloads: number;
  waitingForApprovalModsCount: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
  imageUrl: string;
  uploadedModsCount: number;
  isRoleBeingEdited: boolean;
}

export interface Mod {
  id: number;
  name: string;
  totalDownloads: number;
  fileKey: string;
  downloadLink: string;
  imageUrl: string;
  modStatus: ModStatus;
  gameName: string;
  description: string;
  createdBy: User;
  rating: number;
  gameId: number;
  createdAt: string;
  currentUserRating: number;
  totalRatings: number;
}

export interface Comment {
  id: number;
  text: string;
  userId: number;
  modId: number;
  dateStamp: string;
  createdBy: User;
  canEdit: boolean;
  isTextBeingEdited: boolean;
}

export interface LoginDto {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDto {}
