import { ModStatus, ModStatusDescription } from './mod-status';

export enum RoleDescription {
  Guest = 'Guest',
  User = 'User',
  Moderator = 'Moderator',
  Admin = 'Admin',
}

export enum Role {
  Guest,
  User,
  Moderator,
  Admin,
}

export function roleToDescription(role: Role): RoleDescription {
  switch (role) {
    case Role.Guest:
      return RoleDescription.Guest;
    case Role.User:
      return RoleDescription.User;
    case Role.Moderator:
      return RoleDescription.Moderator;
    case Role.Admin:
      return RoleDescription.Admin;
  }
}

export function descriptionToRole(role: RoleDescription): Role {
  switch (role) {
    case RoleDescription.Guest:
      return Role.Guest;
    case RoleDescription.User:
      return Role.User;
    case RoleDescription.Moderator:
      return Role.Moderator;
    case RoleDescription.Admin:
      return Role.Admin;
  }
}
