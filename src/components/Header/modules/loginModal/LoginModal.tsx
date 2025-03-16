import Button from '@/components/Button/Buttons';
import { Modal } from '@/components/Modal/Modal';
import block from 'bem-cn';

import cls from './LoginModal.module.scss';
import { Input } from '@/components/Input/Input';
import useAuth from './model/modelAuth';
import useUsername from './model/modelUsername';
import { Loading } from '@/widgets/Loading/Loading';

import VectorSVG from './img/vector.svg';

const b = block(cls.LoginModal);

const LoginModal = () => {
  const model = useAuth();
  const modelUsername = useUsername();

  const content = (
    <form className={b('form')} onSubmit={(e) => model.onSubmit(e)}>
      <div className={b('title')}>Login form</div>
      <div className={b('input')}>
        <Input
          title="Login"
          type="text"
          placeholder="Login"
          value={model.values.login}
          onChange={(e) => model.onChangeValue(e.target.value, 'login')}
        />
      </div>
      <div className={b('input')}>
        <Input
          title="Password"
          type="password"
          placeholder="Password"
          value={model.values.password}
          onChange={(e) => model.onChangeValue(e.target.value, 'password')}
        />
      </div>
      <div className={b('submit')}>
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );

  return (
    <>
      {modelUsername.username ? (
        <div className={b('username')} onClick={modelUsername.openUsernameMenu}>
          <div>{modelUsername.username}</div>
          <div className={b('username__menu-button', { open: modelUsername.open })}>
            <VectorSVG />
          </div>

          <div className={b('username__list', { open: modelUsername.open })}>
            {modelUsername.listUsernameItems.map((item) => (
              <div className={b('username__item')} key={item.key} onClick={() => item.onClick}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Button onClick={() => model.setOpen(true)} type="button">
          login
        </Button>
      )}

      <Modal isOpen={model.open} onClose={() => model.setOpen(!model.open)}>
        {modelUsername.actionProcessing && <Loading />}
        <div className={b()}>{content}</div>
      </Modal>
    </>
  );
};

export default LoginModal;
