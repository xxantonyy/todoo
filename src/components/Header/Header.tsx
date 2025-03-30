import block from 'bem-cn';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Buttons';
import { useTheme } from '@/shared/ThemeProvider/ThemeProvider';

import './Header.module.scss';
import DayPNG from './img/day.png';
import NightPNG from './img/night.png';
import LoginModal from './modules/loginModal/LoginModal';
import { getActiveRoutes } from './utils';

const b = block('Header');

const Header = () => {
  const navigate = useNavigate();
  const routes = getActiveRoutes(window.location.pathname);
  const { theme, toggleTheme } = useTheme();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const isMobile = window.innerWidth < 820;

  const allRoutes = useMemo(
    () => routes.map((route) => (
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [routes],
  );

  useEffect(() => {}, [isMobile]);

  return (
    <>
      {!isMobile && (
        <div className={b()}>
          <div className={b('left-block')}>To do app</div>
          <div className={b('center-block')} />
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
            onClick={() => setBurgerOpen(!burgerOpen)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={b('container', {
                open: burgerOpen,
                close: !burgerOpen,
              })}
            >
              <div className={b('close')} onClick={() => setBurgerOpen(false)}>
                ✖
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
