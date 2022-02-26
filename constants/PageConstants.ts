import { IRoute } from '../types';

const PageConstants: IRoute[] = [
  {
    route: '/',
    isPrivate: true,
  },
  {
    route: '/401',
    isPrivate: false,
  },
  {
    route: '/sign-in',
    isPrivate: false,
  },
  {
    route: '/all-users',
    isPrivate: true,
  },
];
export default PageConstants;
