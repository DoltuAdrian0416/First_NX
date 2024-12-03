import { AccountCircle, PasswordRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerUser(email: string, password: string) {
    const userObj = {
      id: uuidv4(),
      email: email,
      password: password,
    };
    const data = await fetch('http://localhost:5158/api/users', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: new Headers({ 'content-type': 'application/json' }),
    });

    if (data.ok) {
      const result = await data.json();
    }
  }
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
          type="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Your password"
          required
          autoFocus
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
