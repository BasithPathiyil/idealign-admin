import React, { useEffect, useState } from 'react';
import { TextField, Button, TextareaAutosize, Box, Typography, Modal, Grid, Avatar } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';

import Constants from 'utils/constants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { editNewsEvents } from 'store/newsevents/actions';

const EditNewsEvents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

  const { newsEventsList } = useSelector((state) => state?.newsevents);

  const blog = newsEventsList?.find((item) => item._id === id);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setShortDesc(blog.shortDesc);
      setContent(blog.content);
      setEventDate(blog.eventDate);
      setMainImage(blog.mainImage);
    }
  }, [blog]);
  useEffect(() => {
    if (!mainImage) {
      setMainImageURL(null);
    } else {
      if (mainImage === blog.mainImage) {
        setMainImageURL(`${Constants.imageBaseUrl}${blog.mainImage}`);
      } else {
        setMainImageURL(URL.createObjectURL(mainImage));
      }
    }
  }, [mainImage, blog]);
  const handleClickUpdate = async (e) => {
    e.preventDefault();
    const data = {
      title,
      mainImage,
      shortDesc,
      content,
    };
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      let count = 0;
      const formData = new FormData();
      if (title !== blog.title) {
        formData.append('title', title);
        count++;
      }
      if (mainImage !== blog.mainImage) {
        formData.append('mainImage', mainImage);
        formData.append('removedMainImage', blog.mainImage);
        count++;
      }
      if (shortDesc !== blog.shortDesc) {
        formData.append('shortDesc', shortDesc);
        count++;
      }
      if (content !== blog.content) {
        formData.append('content', content);
        count++;
      }
      if (eventDate !== blog.eventDate) {
        formData.append('eventDate', eventDate);
        count++;
      }
      if (count < 1) {
        console.log('count zero working');
        return;
      }
      try {
        console.log('api calling');
        await dispatch(editNewsEvents(id, formData));
        navigate('/newsevents');
      } catch (error) {
        console.log('Error updating blog', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!data.shortDesc.trim()) {
      errors.shortDesc = 'Short description is required';
    }
    if (!data.content.trim()) {
      errors.content = 'Content is required';
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
        <BreadCrumbs title={'Edit News & Events'} sx={{ mb: 2 }} />
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid item xs={12} md={3.5}></Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => {
                        setErrors({ ...errors, title: '' });
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
                      value={shortDesc}
                      onChange={(e) => {
                        setErrors({ ...errors, shortDesc: '' });
                        setShortDesc(e.target.value);
                      }}
                      error={Boolean(errors.shortDesc)}
                      helperText={errors.shortDesc}
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
                      <input type="file" hidden onChange={handleChangeFile} />
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
                  <Button variant="contained" color="primary" onClick={handleClickUpdate} fullWidth>
                    Update Blog
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

export default EditNewsEvents;
