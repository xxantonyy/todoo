import { ReactNode } from 'react';

import { Error } from '@/pages/Error';
import { Main } from '@/pages/Main';
import { ToDos } from '@/pages/ToDo';

export interface IRoute {
  path: string;
  component: ReactNode;
  index?: boolean;
}

export enum RouteNames {
  HOME = '/',
  ERROR = '*',
  CALENDAR = '/todos',
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.HOME, component: <Main /> },
  { path: RouteNames.ERROR, component: <Error /> },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.CALENDAR, component: <ToDos /> },
];
