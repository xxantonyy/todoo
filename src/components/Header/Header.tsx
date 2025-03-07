import { useTheme } from '@/shared/ThemeProvider/ThemeProvider';
import Button from '@/components/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { getActiveRoutes } from './utils';
import LoginModal from './modules/loginModal/LoginModal';

import cls from './Header.module.scss';
import block from 'bem-cn';

import DayPNG from './img/day.png';
import NightPNG from './img/night.png';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const b = block(cls.Header);

const Header = () => {
  const navigate = useNavigate();
  const routes = getActiveRoutes(window.location.pathname);
  const { theme, toggleTheme } = useTheme();

  const allRoutes = useMemo(
    () =>
      routes.map((route) => (
        <Button
          className={route.active ? 'active' : ''}
          key={route.path}
          onClick={() => navigate(route.path)}
          type="button"
        >
          {route.name}
        </Button>
      )),
    [routes]
  );

  return (
    <>
      <div className={b()}>
        <div className={b('left-block')}>To do app</div>
        <div className={b('center-block')}></div>
        <div className={b('right-block')}>
          <div className={b('theme')} onClick={toggleTheme}>
            {theme === 'light' ? (
              <div className={b('theme-icon')}>
                <img src={NightPNG} alt="night" />
              </div>
            ) : (
              <div className={b('theme-icon')}>
                <img src={DayPNG} alt="day" />
              </div>
            )}
          </div>
          <div className={b('routes')}>{allRoutes}</div>
          <LoginModal />
        </div>
      </div>
    </>
  );
};

export default Header;
