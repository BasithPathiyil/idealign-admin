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
import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, getAllFilters } from '../../store/products/actions';
// import { getCollectionsByCategory } from '../../store/collections/actions';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
// import SuccessModal from "../SuccessModal";
// import { MdCheckCircleOutline } from "react-icons/md";
// import CustomIconModal from "../CustomIconModal";
import CloseIcon from '@mui/icons-material/Close';
import { addProject } from 'store/project/actions';

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { allFiltersData } = useSelector((state) => state?.products);
  //   const { collectiosByCategory } = useSelector((state) => state?.collections);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [projectName, setProjectName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [finishId, setFinishId] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [colorId, setColorId] = useState('');
  const [images, setImages] = useState([]);
  const [faces, setFaces] = useState([]);
  const [weight, setWeight] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [totalSqftInBox, setTotalSqftInBox] = useState('');
  const [place, setPlace] = useState('');
  const [perBocPcs, setPerBocPcs] = useState('');
  const [description, setDescription] = useState('');

  /////////////
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

  const [otherImages, setOtherImages] = useState([]);
  const [otherImagesURL, setOtherImagesURL] = useState([]);

  const onChangeCategory = (event) => {
    setErrors({ ...errors, ['categoryId']: '' });
    setCategoryId(event.target.value);
  };

  const onChangeCollection = (event) => {
    setErrors({ ...errors, ['collectionId']: '' });
    setCollectionId(event.target.value);
  };

  const onChangeFinish = (event) => {
    setErrors({ ...errors, ['finishId']: '' });
    setFinishId(event.target.value);
  };

  const onChangeSize = (event) => {
    setErrors({ ...errors, ['sizeId']: '' });
    setSizeId(event.target.value);
  };

  const onChangeColor = (event) => {
    setErrors({ ...errors, ['colorId']: '' });
    setColorId(event.target.value);
  };

  //   useEffect(() => {
  //     dispatch(getAllFilters());
  //   }, []);

  //   useEffect(() => {
  //     if (!categoryId) {
  //       return;
  //     }
  //     dispatch(getCollectionsByCategory(categoryId));
  //   }, [categoryId]);

  const handleFileChange = (event, setFileState, setListState) => {
    const files = Array.from(event.target.files);
    setFileState(files);
    setListState(files.map((file) => URL.createObjectURL(file)));
  };

  const handleClickAdd = async (e) => {
    e.preventDefault();
    const data = {
      projectName,
      categoryId,
      mainImage
    };
    console.log('description', data);
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('categoryId', categoryId);
      formData.append('mainImage', mainImage);
      otherImages.forEach((image) => {
        formData.append('otherImages', image);
      });
      formData.append('shortDesc', shortDesc);
      formData.append('place', place);
      formData.append('description', description);
      try {
        await dispatch(addProject(formData));
        navigate('/projects');
        // setOpen(true);
      } catch (error) {
        console.log('err', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.projectName.trim()) {
      errors.projectName = 'Name is required';
    }
    if (!data.categoryId.trim()) {
      errors.categoryId = 'Category is required';
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
  const handleChangeMoreFiles = (e) => {
    const files = Array.from(e.target.files);
    setOtherImages(files);
  };
  useEffect(() => {
    if (otherImages.length) {
      console.log('otherImages', otherImages);
      const fileImages = otherImages.map((file) => URL.createObjectURL(file));
      setOtherImagesURL(fileImages);
    } else {
      setOtherImagesURL([]);
    }
  }, [otherImages]);

  const handleClickFileRemove = (index) => {
    setOtherImages((prevFileImages) => prevFileImages.filter((_, i) => i !== index));
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <BreadCrumbs title={'Add New Project'} sx={{ mb: 2 }} />
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Project Name"
                  variant="outlined"
                  onChange={(e) => {
                    setErrors({ ...errors, ['projectName']: '' });
                    setProjectName(e.target.value);
                  }}
                  error={Boolean(errors.projectName)}
                  helperText={errors.projectName}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <FormControl fullWidth variant="outlined" error={Boolean(errors.categoryId)}>
                  <InputLabel>Category</InputLabel>
                  <Select value={categoryId} onChange={onChangeCategory} label="Category">
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                    <MenuItem value="Hospitality">Hospitality</MenuItem>
                    <MenuItem value="Residential">Residential</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.categoryId}
                  </Typography>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Place"
                  variant="outlined"
                  onChange={(e) => {
                    setErrors({ ...errors, ['place']: '' });
                    setPlace(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                <Typography>Main Image</Typography>
                <Button variant="contained" component="label" startIcon={<Upload />} fullWidth style={{ marginBottom: '10px' }}>
                  Upload Main Image
                  <input type="file" hidden onChange={(event) => handleChangeFile(event)} />
                </Button>
                <Typography variant="caption" color="error">
                  {errors.images}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mb={2}>
                <Typography>Description</Typography>
                <TextareaAutosize
                  minRows={4}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  placeholder="Description"
                  onChange={(e) => {
                    setErrors({ ...errors, ['description']: '' });
                    setDescription(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="contained" color="primary" onClick={handleClickAdd} fullWidth>
                Add Project
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddProject;
