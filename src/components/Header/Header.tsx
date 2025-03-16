import { useTheme } from '@/shared/ThemeProvider/ThemeProvider';
import Button from '@/components/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getActiveRoutes } from './utils';
import LoginModal from './modules/loginModal/LoginModal';

import cls from './Header.module.scss';
import block from 'bem-cn';

import DayPNG from './img/day.png';
import NightPNG from './img/night.png';

const b = block(cls.Header);

const Header = () => {
  const navigate = useNavigate();
  const routes = getActiveRoutes(window.location.pathname);
  const { theme, toggleTheme } = useTheme();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const isMobile = window.innerWidth < 820;

  const allRoutes = useMemo(
    () =>
      routes.map((route) => (
        <Button
          className={route.active ? 'active' : ''}
          key={route.path}
          onClick={() => {
            navigate(route.path);
            setBurgerOpen(!burgerOpen);
          }}
          type="button"
        >
          {route.name}
        </Button>
      )),
    [routes]
  );

  return (
    <>
      {!isMobile && (
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
      )}

      {/* mobile */}
      {isMobile && (
        <div>
          <div className={b('Header-mobile')}>
            <div className={b('Header-mobile__content')}>
              <div className={b('left-block')}>To do app</div>
              <LoginModal />
              <div onClick={() => setBurgerOpen(!burgerOpen)}>
                <div>Меню</div>
              </div>
            </div>
          </div>

          <div
            className={b('burger', { open: burgerOpen, close: !burgerOpen })}
          >
            <div
              className={b('container', {
                open: burgerOpen,
                close: !burgerOpen,
              })}
            >
              <div className={b('close')} onClick={() => setBurgerOpen(false)}>
                X
              </div>
              <div className={b('top')}>
                <div>To do app</div>
                <div className={b('routes')}>{allRoutes}</div>
              </div>
              <div className={b('bottom')} onClick={toggleTheme}>
                Сменить тему
                <div className={b('theme')}>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
