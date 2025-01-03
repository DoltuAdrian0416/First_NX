import { MenuItems } from '@./Models';
import {
  Description,
  FileCopy,
  Label,
  MonetizationOn,
  Send,
} from '@mui/icons-material';
import {
  Button,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { updateMenuItem } from '../ApiRequest/updateMenuItem';

interface IEditProductPopup {
  value: MenuItems;
  restaurantName: string;
  setMenuToDisplay: (MenuToDisplay: string) => void;
}

function base64ToFile(base64String: string, filename: string): File {
  const arr = base64String.split(',');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function EditProductPopup(props: IEditProductPopup) {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productName, setProductName] = useState(props.value.itemName);
  const [productDescription, setProductDescription] = useState(
    props.value.description
  );
  const [productPrice, setProductPrice] = useState(props.value.price);

  useEffect(() => {
    if (props.value.productImage) {
      const file = base64ToFile(
        `data:image/jpeg;base64,${props.value.productImage}`,
        'productImage.jpg'
      );
      setProductImage(file);
    }
  }, [props.value.productImage]);

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

  const handleSubmit = async () => {
    if (productImage) {
      const response = await updateMenuItem(
        props.restaurantName,
        props.value.id,
        productName,
        productDescription,
        productPrice,
        productImage
      );

      props.setMenuToDisplay(props.restaurantName);
    }
  };

  return (
    <Popup
      trigger={
        <Button variant="contained" sx={{ mt: 3 }}>
          Edit Product
        </Button>
      }
      contentStyle={{
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        color: 'white',
        borderRadius: '7px',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(15px)',
      }}
      position={'top right'}
    >
      <>
        <Typography variant="h4" fontWeight={'bold'} color="primary">
          Edit details
        </Typography>
        <TextField
          variant="filled"
          type="item"
          label="Item Name"
          placeholder="Item Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          color="primary"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Label />
                </InputAdornment>
              ),
            },
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="filled"
          type="item"
          label="Item Price"
          placeholder="Item Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          color="primary"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOn />
                </InputAdornment>
              ),
            },
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="filled"
          type="item"
          label="Item Description"
          placeholder="Item Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          color="primary"
          multiline
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            },
          }}
          fullWidth
          margin="normal"
        />
        {productImage ? (
          <img
            src={URL.createObjectURL(productImage)}
            width="300px"
            alt="Product Preview"
          />
        ) : (
          <Typography> This product has no preview</Typography>
        )}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<FileCopy />}
        >
          Change preview image
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setProductImage(e.target.files[0]);
              }
            }}
          />
        </Button>
        <Button
          variant="contained"
          startIcon={<Send />}
          sx={{ my: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </>
    </Popup>
  );
}

export default EditProductPopup;
