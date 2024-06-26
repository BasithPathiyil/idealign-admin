import React, { useEffect, useState } from 'react';
import { TextField, Button, TextareaAutosize, Box, Typography, Modal, Grid, Avatar } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';

import { editBlog } from 'store/blogs/actions';
import Constants from 'utils/constants';

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

  const { blogsList } = useSelector((state) => state?.blogs);

  const blog = blogsList?.find((item) => item._id === id);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setShortDesc(blog.shortDesc);
      setContent(blog.content);
      setYoutubeLink(blog.youtubeLink);
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
      youtubeLink
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
      if (youtubeLink !== blog.youtubeLink) {
        formData.append('youtubeLink', youtubeLink);
        count++;
      }
      if (count < 1) {
        console.log('count zero working');
        return;
      }
      try {
        console.log("api calling")
        await dispatch(editBlog(id, formData));
        navigate('/blogs');
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
        <BreadCrumbs title={'Edit Blog'} sx={{ mb: 2 }} />
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
                    <TextareaAutosize
                      minRows={4}
                      style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                      placeholder="Description"
                      value={content}
                      onChange={(e) => {
                        setErrors({ ...errors, content: '' });
                        setContent(e.target.value);
                      }}
                      error={Boolean(errors.content)}
                      helperText={errors.content}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="YouTube Link"
                      variant="outlined"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />
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

export default EditBlog;
