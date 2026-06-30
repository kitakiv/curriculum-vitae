'use client';
import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
    open: boolean;
    children: React.ReactNode;
    success: boolean;
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
}

export default function CustomizedSnackbars({open, children, success, vertical='top', horizontal='right'}: Props) {
    console.log('open', open);
    const [close, setClose] = React.useState(open);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setClose(false);
  };

  return (
    <div>
      <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
        open={close} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? 'success' : 'error' }
          variant="filled"
          sx={{ width: '100%' , maxWidth: 250, textWrap: 'break-word' }}
        >
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
}
