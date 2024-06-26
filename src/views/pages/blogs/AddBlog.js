import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Typography,
  Modal,
  Grid,
  Avatar
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';

import { addBlog } from 'store/blogs/actions';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');

  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  /////////////
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');


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
      formData.append('mainImage', mainImage);

      formData.append('shortDesc', shortDesc);
      formData.append('content', content);
      formData.append('youtubeLink', youtubeLink);
      try {
        console.log('api call');
        await dispatch(addBlog(formData));
      } catch (error) {
        console.log('err', error);
      }
    } else {
      setErrors(validationErrors);
    }
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
    setMainImage(e.target.files[0]);

    setMainImageURL(URL.createObjectURL(e.target.files[0]));
  };

 
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <BreadCrumbs title={'Add New Blog'} sx={{ mb: 2 }} />
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
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <Typography>Description</Typography>
                    <TextareaAutosize
                      minRows={4}
                      style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                      placeholder="Description"
                      onChange={(e) => {
                        setErrors({ ...errors, ['content']: '' });
                        setContent(e.target.value);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="YouTube Link"
                      variant="outlined"
                      onChange={(e) => {
                        setYoutubeLink(e.target.value);
                      }}
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button variant="contained" color="primary" onClick={handleClickAdd} fullWidth>
                    Add Blog
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3.5}></Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default AddBlog;
