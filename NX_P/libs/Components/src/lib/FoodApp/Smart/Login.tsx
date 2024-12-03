import { AccountCircle, PasswordRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Login() {
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
          marginBottom: '30px',
        }}
      >
        Sign in
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
        <Button variant="contained" sx={{ margin: '2px' }}>
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
