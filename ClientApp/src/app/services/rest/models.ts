import {ModStatus} from "../../shared/enums/mod-status";

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
  gameName: string;
  description: string;
  user: User;
  rating: number;
  gameId: number;
}

export interface LoginDto {
  name: string;
  email: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDto {}
