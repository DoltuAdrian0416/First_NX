import { PasswordRounded } from '@mui/icons-material';
import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
interface IUserDisplay {
  email: string | null;
}
export function UserDisplay(props: IUserDisplay) {
  return (
    <>
      <Typography variant="h3" fontWeight={600}>
        Welcome
      </Typography>
      <Typography variant="h4" fontWeight={400}>
        {props.email}
      </Typography>
      <Typography variant="h5">
        Thanks for registering , please complete the following fields
      </Typography>

      <FormControl sx={{ p: '15px' }}>
        <TextField
          type="username"
          name="username"
          label="Username"
          placeholder="Your username"
          required
          color="warning"
        ></TextField>
      </FormControl>
    </>
  );
}

export default UserDisplay;
