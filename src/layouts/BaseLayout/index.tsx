import { FC, ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import AuthHook from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const token = AuthHook().getTokenAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboards/invoice', { replace: true });
    }
  }, [token]);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
