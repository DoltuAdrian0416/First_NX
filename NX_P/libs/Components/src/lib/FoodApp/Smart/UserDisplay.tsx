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
import { updateUserProfilePicture } from '../ApiRequest/updateUserProfilePicture';
import { updateUsername } from '../ApiRequest/updateUsername';
import { verifyUserModifications } from '../ApiRequest/verifyUserModifications';
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

  async function updateUsernamePFP(Email: string, img: File, username: string) {
    const UpdateProfilePictureStatus = await updateUserProfilePicture(
      Email,
      img
    );
    const updateUserNameStatus = await updateUsername(Email, username);
    if (UpdateProfilePictureStatus == 200 || updateUserNameStatus == 200) {
      const User: User = await verifyUserModifications(Email);
      const { id, email, username } = User;
      const UpdatedUser: User = { id, email, username };
      session?.setCredentials(session.token!, UpdatedUser);
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
        onClick={() => updateUsernamePFP(props.user.email, img!, username)}
        startIcon={<ControlPoint />}
        sx={{ marginTop: '10px' }}
      >
        Update info
      </Button>
    </>
  );
}

export default UserDisplay;
