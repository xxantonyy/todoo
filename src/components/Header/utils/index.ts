import { useTypedSelector } from "@/hooks/useTypedSelector";

export const headerRoutes = [
  {
    path: '/',
    name: 'Main',
    authRequeued: false,
    active: false,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    authRequeued: true,
    active: false,
  },
];

export const getActiveRoutes = (path: string) => {
  const { auth } = useTypedSelector((state) => state.auth);
  return headerRoutes
    .filter((route) => {
      if (route.authRequeued && !auth) return false;
      return true;
    })
    .map((route) => {
      if (route.path === path) {
        route.active = true;
      } else route.active = false;
      return route;
    });
};
