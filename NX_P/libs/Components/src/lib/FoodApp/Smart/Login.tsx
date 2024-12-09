import { AccountCircle, PasswordRounded } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Collapse,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function loginUser(email: string, password: string) {
    const userObj = {
      email: email,
      password: password,
    };
    const data = await fetch('http://localhost:5158/login', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    });

    const tokenValue = await data.text();

    // eslint-disable-next-line eqeqeq
    if (data.ok && data.status == 200) {
      auth?.setToken(tokenValue);
      return true;
    }
    setErrorText(await data.statusText);
    return false;
  }

  async function getUserByEmail(email: string) {
    const data = await fetch(`http://localhost:5158/api/users/user/${email}`);
    if (data.ok) {
      return data.text();
    } else return '';
  }
  return (
    <Box
      sx={{
        width: '60%',
        height: 'fit-content',
        backgroundColor: 'rgba(250,250,250,0.8)',
        padding: '20px ',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        variant: 'outlined',
        borderRadius: '10px',
      }}
    >
      <Collapse in={errorText}>
        <Alert
          variant={'outlined'}
          severity="error"
          sx={{ marginBottom: '20px' }}
        >
          {errorText}
        </Alert>
      </Collapse>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: 'fit-content',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          marginBottom: '30px',
        }}
      >
        Sign in
      </Typography>

      <TextField
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="Your email address"
        required
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        sx={{ marginBottom: '25px' }}
      ></TextField>
      <TextField
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Your password"
        required
        autoFocus
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PasswordRounded />
              </InputAdornment>
            ),
          },
        }}
      ></TextField>

      <Box
        sx={{
          width: 'auto',
          display: 'flex',
          marginTop: '25px',
          alignContent: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Button
          variant="contained"
          sx={{ margin: '2px' }}
          onClick={async () => {
            if (!email || !password) {
              return;
            }

            if (await loginUser(email, password)) {
              getUserByEmail(email).then((response) => {
                localStorage.setItem('user', response);
              });
              navigate('/user');
            }
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            navigate('/register');
          }}
          sx={{
            fontSize: '10px',
          }}
        >
          Don't have an account ? Register now
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
