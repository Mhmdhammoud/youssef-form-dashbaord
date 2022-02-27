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
  {
    route: '/all-companies',
    isPrivate: true,
  },
  {
    route: '/create-company',
    isPrivate: true,
  },
  {
    route: '/company',
    isPrivate: true,
  },
  {
    route: '/order',
    isPrivate: true,
  },
  {
    route: '/edit-order',
    isPrivate: true,
  },
  {
    route: '/all-orders',
    isPrivate: true,
  },
  {
    route: '/all-admins',
    isPrivate: true,
  },
];
export default PageConstants;
