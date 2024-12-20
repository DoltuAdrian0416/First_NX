import curvedbg from '../assets/curvedbg.jpg';
import simplebg from '../assets/simpleBg.jpg';


export const UserProfileContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center ',
  flexGrow: '0',
  boxShadow: '3',
  borderRadius: '15px',
  position: 'relative',
  bgcolor: 'rgb(95, 150, 227, 0.7)',
  padding: '30px',
  flexDirection: 'column',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${simplebg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 1,
    zIndex: -1,
  },
};

export const mainContainer = {

  display: 'flex',
  justifyContent:'center',
  flexGrow: 1,
  height: '100%',
  padding: '30px',
  position: 'relative',
  bgcolor: 'rgb(255, 255, 255, 0.125)',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${curvedbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5,
    zIndex: -1,
  },
};