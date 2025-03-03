import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Box,
  Typography,
  Modal,
  Grid,
  Avatar
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { addNewsEvents } from 'store/newsevents/actions';
import SimpleModal from 'ui-component/modals/SimpleModal';

const AddNewEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { allFiltersData } = useSelector((state) => state?.products);
  //   const { collectiosByCategory } = useSelector((state) => state?.collections);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');

  /////////////
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

  const [otherImages, setOtherImages] = useState([]);
  //   const [otherImagesURL, setOtherImagesURL] = useState([]);

  //   useEffect(() => {
  //     dispatch(getAllFilters());
  //   }, []);

  //   useEffect(() => {
  //     if (!categoryId) {
  //       return;
  //     }
  //     dispatch(getCollectionsByCategory(categoryId));
  //   }, [categoryId]);

  const handleClickAdd = async (e) => {
    e.preventDefault();
    const data = {
      title,
      mainImage,
      shortDesc,
      content
    };
    console.log('content', data);
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('mainImage', mainImage);
      formData.append('eventDate', eventDate);
      formData.append('shortDesc', shortDesc);
      formData.append('content', content);
      try {
        console.log('api call');
        await dispatch(addNewsEvents(formData));
        navigate('/newsevents');
        // setOpen(true);
      } catch (error) {
        console.log('err', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigateProducts = () => {
    setOpen(false);
    navigate('/products');
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.title.trim()) {
      errors.title = 'Name is required';
    }

    if (!data.mainImage) {
      errors.images = 'Image is required';
    }

    return errors;
  };

  const handleChangeFile = (e) => {
    if (e.target.files[0].size > 512500) {
      setOpen(true);
      return;
    }
    setMainImage(e.target.files[0]);

    setMainImageURL(URL.createObjectURL(e.target.files[0]));
  };
  const handleChangeMoreFiles = (e) => {
    const files = Array.from(e.target.files);
    setOtherImages(files);
  };
  //   useEffect(() => {
  //     if (otherImages.length) {
  //       console.log('otherImages', otherImages);
  //       const fileImages = otherImages.map((file) => URL.createObjectURL(file));
  //       setOtherImagesURL(fileImages);
  //     } else {
  //       setOtherImagesURL([]);
  //     }
  //   }, [otherImages]);

  const handleClickFileRemove = (index) => {
    setOtherImages((prevFileImages) => prevFileImages.filter((_, i) => i !== index));
  };
  console.log('eventDate', eventDate);
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <BreadCrumbs title={'Add New News/Event'} sx={{ mb: 2 }} />
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={12} md={3.5}></Grid>{' '}
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      onChange={(e) => {
                        setErrors({ ...errors, ['title']: '' });
                        setTitle(e.target.value);
                      }}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Short Description"
                      variant="outlined"
                      onChange={(e) => {
                        setErrors({ ...errors, ['shortDesc']: '' });
                        setShortDesc(e.target.value);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Category"
                      variant="outlined"
                      onChange={(e) => {
                        setErrors({ ...errors, ['category']: '' });
                        setCategory(e.target.value);
                      }}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <Typography>Date</Typography>
                    <DatePicker
                      selected={eventDate}
                      onChange={(date) => {
                        setErrors({ ...errors, ['eventDate']: '' });
                        setEventDate(date);
                      }}
                    />
                    <Typography variant="caption" color="error">
                      {errors.eventDate}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                  {mainImageURL ? (
                    <Box sx={{ height: '75pxpx', width: '75px' }}>
                      <Avatar variant="square" sx={{ width: '100%', height: 75 }}>
                        {/* <UploadFileIcon sx={{ height: 100 }} /> */}
                        <img style={{ height: 75 }} src={mainImageURL} alt="remy sharp" />
                      </Avatar>
                    </Box>
                  ) : (
                    ''
                  )}

                  <Box mb={2}>
                    <Typography>Image</Typography>
                    <Button variant="contained" component="label" startIcon={<Upload />} fullWidth style={{ marginBottom: '10px' }}>
                      Upload Image
                      <input type="file" hidden onChange={(event) => handleChangeFile(event)} />
                    </Button>
                    <Typography variant="caption" color="error">
                      {errors.images}
                    </Typography>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} md={6}>
              <Grid display={'ruby'}>
                {otherImagesURL.length
                  ? otherImagesURL.map((image, i) => (
                      <Avatar key={i} variant="square" sx={{ width: 65, height: 75, margin: '5px' }}>
                        <>
                          <img style={{ height: 75 }} src={image} alt="remy sharp" />
                          <CloseIcon
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              cursor: 'pointer',
                              backgroundColor: 'white',
                              borderRadius: '50%'
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent the parent's click event from firing
                              // Handle the close icon click event here
                              // You can clear the fileImageTwo or perform any other action
                              handleClickFileRemove(i);
                            }}
                          />
                        </>
                      </Avatar>
                    ))
                  : ''}
              </Grid>

              <Box mb={2}>
                <Typography>More Images</Typography>
                <Button variant="contained" component="label" startIcon={<Upload />} fullWidth style={{ marginBottom: '10px' }}>
                  Upload More Images
                  <input type="file" hidden multiple onChange={(event) => handleChangeMoreFiles(event)} />
                </Button>
                <Typography variant="caption" color="error">
                  {errors.faces}
                </Typography>
              </Box>
            </Grid> */}
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <Typography>Description</Typography>

                    <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '200px', backgroundColor: '#fff' }} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <Button variant="contained" color="primary" onClick={handleClickAdd} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3.5}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <SimpleModal isOpen={open} onClose={handleClose} title={'Image size should not be above 500kb'} />
    </Grid>
  );
};

export default AddNewEvents;
