import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Typography,
  Modal,
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addBlog } from 'store/blogs/actions';
import SimpleModal from 'ui-component/modals/SimpleModal';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');

  const [shortDesc, setShortDesc] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  /////////////
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

  const handleClose = () => {
    setOpen(false);
  };
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
      formData.append('category', category);
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
    if (e.target.files[0].size > 512500) {
      setOpen(true);
      return;
    }
    setMainImage(e.target.files[0]);

    setMainImageURL(URL.createObjectURL(e.target.files[0]));
  };
  const onChangeCategory = (event) => {
    setErrors({ ...errors, ['categoryId']: '' });
    setCategory(event.target.value);
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
                  <Box mb={2}>
                    <FormControl fullWidth variant="outlined" error={Boolean(errors.categoryId)}>
                      <InputLabel>Category</InputLabel>
                      <Select value={category} onChange={onChangeCategory} label="Category">
                        <MenuItem value="PMC">PMC</MenuItem>
                        <MenuItem value="Construction">Construction</MenuItem>
                        <MenuItem value="Architecture">Architecture</MenuItem>
                        <MenuItem value="MEP">MEP</MenuItem>
                        <MenuItem value="Civil">Civil</MenuItem>
                      </Select>
                      <Typography variant="caption" color="error">
                        {errors.category}
                      </Typography>
                    </FormControl>
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

                    <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '200px', backgroundColor: '#fff' }} />
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
      <SimpleModal isOpen={open} onClose={handleClose} title={'Image size should not be above 500kb'} />
    </Grid>
  );
};

export default AddBlog;
