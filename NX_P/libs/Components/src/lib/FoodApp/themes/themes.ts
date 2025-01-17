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
  bgColor: 'rgb(255, 255, 255, 0.125)',

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

export const category = {
  width:'90%',
  display:'flex',
  justifyContent:'flex-start',
  alignItems:'center',
  p:"7px",
  m:2,
  borderRadius:"10px",
  border:'none',
  transition:'.3s ease-in-out',
  '&:hover':{background:'white', color:'#2a2a2a'},

}
export const FlexColumn ={
  display : 'flex',
  flexDirection : 'column',
}
export const FlexRow ={
  display : 'flex',
  flexDirection : 'row',
}

export const CartStyle = {
      px: 0,
      minWidth:400,
}