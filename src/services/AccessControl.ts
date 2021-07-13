import {AccessControl} from 'accesscontrol';

export enum UserRoles {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface ParsedTokenData {
  id: string;
  role: UserRoles;
}

const ac = new AccessControl();

ac.grant(UserRoles.User)
  .readAny(['statistic', 'settings', 'jobs', 'query', 'location'])
  //   ADMIN permissions
  .grant(UserRoles.Admin)
  .extend(UserRoles.User)
  .createAny(['query', 'settings', 'location'])
  .updateAny(['query', 'settings', 'location'])
  .deleteAny(['query', 'settings', 'location']);

export {ac};
