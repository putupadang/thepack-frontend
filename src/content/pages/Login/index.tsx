import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import AuthHook from 'src/hooks/useAuth';
import { fetcher } from 'src/utils/helper';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setTokenAuth, setUser } = AuthHook();

  const handleLogin = async () => {
    const params = {
      email,
      password
    };

    const res = await fetcher('POST', '/user/login', JSON.stringify(params));
    if (res?.token) {
      setTokenAuth(res.token);
      setUser(res.user);
      toast.success('Login successful');
      return;
    }
    toast.error(res.message);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/register">Don't have an account? Register</Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
