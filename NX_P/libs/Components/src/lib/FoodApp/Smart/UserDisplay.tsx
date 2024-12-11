import { User } from '@./Models';
import { ControlPoint, FileUpload } from '@mui/icons-material';
import {
  Button,
  FormControl,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { UpdateUserProfilePicture } from '../ApiRequest/UpdateUserProfilePicture';
import { UpdateUsername } from '../ApiRequest/UpdateUsername';
import { VerifyUserModifications } from '../ApiRequest/VerifyUserModifications';
import { useAuth } from '../AuthProvider';

interface IUserDisplay {
  user: User;
}
export function UserDisplay(props: IUserDisplay) {
  const [img, setImg] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const session = useAuth();
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  async function UpdateUsernamePFP(email: string, img: File, username: string) {
    const UpdateProfilePictureStatus = await UpdateUserProfilePicture(
      email,
      img
    );
    const UpdateUserNameStatus = await UpdateUsername(email, username);
    if (UpdateProfilePictureStatus == 200 || UpdateUserNameStatus == 200) {
      const UpdatedUser: User = await VerifyUserModifications(email);
      session?.setCredentials(session.token!, UpdatedUser);
      console.log(localStorage.getItem('user'));
    }
  }
  return (
    <>
      <Typography variant="h3" fontWeight={600}>
        Welcome
      </Typography>
      <Typography variant="h4" fontWeight={400}>
        {props.user?.username}
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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          color="warning"
        ></TextField>
      </FormControl>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        color="primary"
        startIcon={<FileUpload />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImg(e.target.files[0]);
            } else setImg(null);
          }}
        />
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => UpdateUsernamePFP(props.user.email, img!, username)}
        startIcon={<ControlPoint />}
        sx={{ marginTop: '10px' }}
      >
        Update info
      </Button>
    </>
  );
}

export default UserDisplay;
