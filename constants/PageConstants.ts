import {IRoute} from "../types";

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
]
export default PageConstants
