import { getNotify } from "@/components/Notify/Notify";
import { useTypedDispatch } from "@/hooks/useTypedDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { authActions } from "@/store/reducers/auth/authSlice";
import { useEffect, useState } from "react";

const useUsername = () => {
  const dispatch = useTypedDispatch();
  const { actionProcessing, username } = useTypedSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);

  const openUsernameMenu = () => setOpen(!open);

  const logout = () => dispatch(authActions.logout());

  const listUsernameItems = [
    {
      label: 'Фишка',
      key: 'trick',
      onClick: () => getNotify('ФИШКА ЕПТА', 'success', 3000, true),
    },
    {
      label: 'Выйти',
      key: 'logout',
      onClick: logout,
    },
  ]

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!e.target) return;
      const target = e.target as HTMLElement;
      if (!target.closest(".LoginModal__username")) setOpen(false);
    };
    if (open) {
      document.addEventListener("click", closeMenu);
    }
    return () => document.removeEventListener("click", closeMenu);
  }, [open]);

  return {
    actionProcessing,
    username,
    open,
    listUsernameItems,
    openUsernameMenu,
    logout,
  }
}
export default useUsername;

