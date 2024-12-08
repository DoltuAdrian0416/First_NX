import { Box, Typography } from '@mui/material';
interface IUserDisplay {
  email: string | null;
}
export function UserDisplay(props: IUserDisplay) {
  return (
    <Box
      sx={{
        bgcolor: 'rgb(95, 150, 227, 0.7)',
        padding: '30px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" fontWeight={600}>
        Welcome
      </Typography>
      <Typography variant="h4" fontWeight={400}>
        {props.email}
      </Typography>
      <Typography variant="h5">
        Thanks for registering , please complete the following fields
      </Typography>
    </Box>
  );
}

export default UserDisplay;
