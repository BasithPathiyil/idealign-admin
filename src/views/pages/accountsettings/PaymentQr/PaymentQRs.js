import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { FormikProvider, useFormik, Form } from 'formik';
import * as Yup from 'yup';
import uploadIcon from 'assets/images/uploadIcon.png';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentQR, deleteQR, getPaymentQRs } from 'store/paymentQR/actions';
import { useEffect } from 'react';

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
  boxShadow: 24
};

const PaymentQRs = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getPaymentQRs({ strType: 'payment_methodes', type: 'commonList' }));
  }, []);
  const { paymentQRlists } = useSelector((state) => state?.paymentQR);
  console.log(paymentQRlists);
  const formik = useFormik({
    initialValues: {
      strName: '',
      strQRcode: '',
      strWalletAddress: ''
    },
    validationSchema: Yup.object().shape({
      strName: Yup.string().required('This is required'),
      strWalletAddress: Yup.string().required('This is required'),
      strQRcode: Yup.string().required('This is required').nullable()
    }),
    onSubmit: async (values) => {
      if (values.strQRcode) {
        values.strQRcode = values.strQRcode.split(',')[1];
      }
      await dispatch(addPaymentQR(values));
      handleClose();
    }
  });
  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } = formik;
  const handleClickAdd = () => {
    handleOpen();
  };
  const handleClickRemove = () => {
    setFileImage(null);
    setFileName(null);
    setFieldValue('strQRcode', null);
  };
  const handleChangeFile = (e) => {
    setFileName(e.target.files[0].name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFieldValue('strQRcode', event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleClickDelete = (id) => {
    const data = {
      _id: id,
      strType: 'payment_methodes',
      type: 'commonDelete'
    };
    dispatch(deleteQR(data));
  };
  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item xs={12} md={12}>
        <Button variant="contained" onClick={handleClickAdd}>
          Add New Payment QR
        </Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h3">Uploaded payment QRs</Typography>
      </Grid>
      {paymentQRlists.length > 0 &&
        paymentQRlists.map((paymentQR) => (
          <Grid item xs={12} md={12} key={paymentQR?._id}>
            <Card>
              <CardMedia sx={{ height: 140 }} image={paymentQR?.strQRcode} title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {paymentQR?.strName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => handleClickDelete(paymentQR?._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Grid container sx={{ backgroundColor: '#EBEBEB', p: 2, width: '100%' }}>
                    <Grid item xs={6} md={6}>
                      <Typography variant="h4">{'Add Payment QR'}</Typography>
                    </Grid>
                    <Grid item xs={6} md={6} container justifyContent={'flex-end'}>
                      <DisabledByDefaultIcon sx={{ cursor: 'pointer' }} onClick={() => handleClose()} color="error" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container sx={{ p: '16px' }} spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        name="strName"
                        label="Name"
                        placeholder="Ex:Phone Pay"
                        onChange={handleChange}
                        error={Boolean(touched?.strName && errors?.strName)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        name="strWalletAddress"
                        label="Wallet Address"
                        // placeholder="Ex:Phone Pay"
                        onChange={handleChange}
                        error={Boolean(touched?.strWalletAddress && errors?.strWalletAddress)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ height: '170px', backgroundColor: '#14252F' }}>
                        <Avatar variant="square" sx={{ width: '100%', height: 170, backgroundColor: '#14252F' }}>
                          {/* <UploadFileIcon sx={{ height: 100 }} /> */}
                          <img style={{ height: 170 }} src={fileImage ? fileImage : uploadIcon} alt="remy sharp" />
                        </Avatar>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {fileName ? <Typography>{fileName}</Typography> : <Typography>Choose Profile Picture</Typography>}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {fileName ? (
                        <Button fullWidth variant="contained" onClick={handleClickRemove}>
                          Remove
                        </Button>
                      ) : (
                        <Button fullWidth variant="contained" component="label">
                          Upload
                          <input onChange={handleChangeFile} hidden accept="image/*" type="file" />
                        </Button>
                      )}
                      {errors.strQRcode && (
                        <FormHelperText error id="standard-weight-helper-text-password-register">
                          {errors.strQRcode}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="contained" type="submit" fullWidth>
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Box>
      </Modal>
    </Grid>
  );
};

export default PaymentQRs;
