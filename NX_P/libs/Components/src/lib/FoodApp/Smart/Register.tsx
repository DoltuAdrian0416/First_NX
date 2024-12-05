import { AccountCircle, PasswordRounded } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Register() {
  const dynamicText = [
    'This Email is already in use!',
    'Passwords must match!',
  ];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  async function registerUser(email: string, password: string) {
    const userObj = {
      email: email,
      password: password,
    };
    const data = await fetch('http://localhost:5158/register', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: { 'content-type': 'application/json' },
    });

    if (data.ok) {
      const result = await data.json();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setErrorText('');
    }, 3500);
  }, [errorText]);
  const navigate = useNavigate();
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
          severity={'error'}
          variant="filled"
          sx={{ marginBottom: '25px' }}
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
          fontWeight: 'bold;',
          marginBottom: '30px',
        }}
      >
        Register
      </Typography>
      <FormControl>
        <TextField
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="Your email address"
          required
          autoFocus
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
          sx={{ marginBottom: '25px' }}
        ></TextField>
        <TextField
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Your password"
          required
          autoFocus
          onChange={(e) => {
            setConfirmPassword(e.target.value);
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
      </FormControl>
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
          onClick={() => {
            if (!email) {
              setErrorText(dynamicText[0]);
              return;
            }
            if (password != confirmPassword) {
              setErrorText(dynamicText[1]);
              return;
            }
            registerUser(email, password);
          }}
        >
          Register
        </Button>

        <Button
          onClick={() => {
            navigate('/login');
          }}
          sx={{
            fontSize: '10px',
          }}
        >
          Already have an account ? Login
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
