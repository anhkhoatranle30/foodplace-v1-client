import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function MyDialog({
  triggerCancel,
  triggerOk,
  title = 'title',
  description = 'description',
  okText = 'OK',
  cancelText = 'Cancel',
  isOpen,
  onClose,
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    return () => {
      setIsButtonDisabled(true);
    };
  }, []);

  const handleCancel = async () => {
    if (typeof triggerCancel === 'function') {
      setIsButtonDisabled(true);
      await triggerCancel();
      setIsButtonDisabled(false);
    }
  };

  const handleOk = async () => {
    if (typeof triggerOk === 'function') {
      setIsButtonDisabled(true);
      await triggerOk();
      setIsButtonDisabled(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`alert-dialog-${title}`}
      aria-describedby={`alert-dialog-${description}`}
    >
      <DialogTitle id={`alert-dialog-${title}`}>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOk}
          color="primary"
          variant="contained"
          disabled={isButtonDisabled}
        >
          {okText}
        </Button>
        <Button
          onClick={handleCancel}
          color="primary"
          variant="outlined"
          autoFocus
          disabled={isButtonDisabled}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
