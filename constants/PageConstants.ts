import { IRoute } from '../types'

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
  {
    route: '/user',
    isPrivate: true,
  },
  {
    route: '/forgot-password',
    isPrivate: false,
  },
  {
    route: '/reset-password',
    isPrivate: false,
  },
  {
    route: '/create-admin',
    isPrivate: true,
  },
  {
    route: '/print-jobs',
    isPrivate: true,
  },
  {
    route: '/print-job',
    isPrivate: true,
  },
  {
    route: '/notifications',
    isPrivate: true,
  },
  {
    route: '/add-bte-model',
    isPrivate: true,
  },
]
export default PageConstants
