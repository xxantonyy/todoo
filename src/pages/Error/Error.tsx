import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  return <div />;
});

export default Error;
