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

interface IUserDisplay {
  user: User;
}
export function UserDisplay(props: IUserDisplay) {
  const [img, setImg] = useState<File | null>(null);
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

  async function handleSubmit(email: string, img: File) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profilePicture', img);

    const data = await fetch(`http://localhost:5158/updatePFP?email=${email}`, {
      method: 'POST',
      body: formData,
    });

    if (data.ok) {
      const result = await data.json();
      console.log(result);
    }
    return;
  }
  return (
    <>
      <Typography variant="h3" fontWeight={600}>
        Welcome
      </Typography>
      <Typography variant="h4" fontWeight={400}>
        {props.user?.email}
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
        onClick={() => handleSubmit(props.user.email, img!)}
        startIcon={<ControlPoint />}
        sx={{ marginTop: '10px' }}
      >
        Update info
      </Button>
    </>
  );
}

export default UserDisplay;
