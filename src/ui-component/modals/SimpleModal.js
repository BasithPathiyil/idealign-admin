import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  '@media (max-width: 600px)': {
    width: '90%'
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const SimpleModal = ({ isOpen, onClose, title, content, navigateUrl }) => {
  const navigate = useNavigate();
  const handleClickOk = () => {
    if (navigateUrl) {
      navigate(navigateUrl);
    }
    onClose();
  };
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Button onClick={handleClickOk}>OK</Button>
      </Box>
    </Modal>
  );
};

export default SimpleModal;
