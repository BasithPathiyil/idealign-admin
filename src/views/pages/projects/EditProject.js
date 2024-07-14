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
  Grid,
  Avatar
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
// import { getProjectById, updateProject } from '../../store/project/actions';
// import { getAllFilters } from '../../store/products/actions';
// import { getCollectionsByCategory } from '../../store/collections/actions';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import CloseIcon from '@mui/icons-material/Close';
import Constants from 'utils/constants';
import { editProject } from 'store/project/actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { project } = useSelector((state) => state?.project);
  const { projectsList } = useSelector((state) => state?.projects);
  const project = projectsList?.find((item) => item._id === id);
  const [errors, setErrors] = useState({});
  const [projectName, setProjectName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [place, setPlace] = useState('');
  const [client, setClient] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');
  const [otherImages, setOtherImages] = useState([]);
  const [otherImagesURL, setOtherImagesURL] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [nonRemovedImages, setNonRemovedImages] = useState([]);
  const [nonRemovedImagesURL, setNonRemovedImagesURL] = useState([]);

  const onChangeCategory = (event) => {
    setErrors({ ...errors, ['categoryId']: '' });
    setCategoryId(event.target.value);
  };

  useEffect(() => {
    // dispatch(getProjectById(id));
    // dispatch(getAllFilters());
  }, [id]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    // dispatch(getCollectionsByCategory(categoryId));
  }, [categoryId]);
  console.log('project', project);
  useEffect(() => {
    if (project) {
      setProjectName(project.projectName);
      setCategoryId(project.categoryId);
      setShortDesc(project.shortDesc);
      setPlace(project.place);
      setDescription(project.description);
      setMainImage(project.mainImage);
      setNonRemovedImages(project.otherImages);
      setClient(project?.client);
      setArea(project?.area);
      //   setMainImageURL(project.mainImage ? `${Constants.imageBaseUrl}${project.mainImage}` : '');
      //   setOtherImagesURL(project.otherImagesURL);
    }
  }, [project]);

  useEffect(() => {
    if (!mainImage) {
      setMainImageURL(null);
    } else {
      if (mainImage === project.mainImage) {
        setMainImageURL(`${Constants.imageBaseUrl}${project.mainImage}`);
      } else {
        setMainImageURL(URL.createObjectURL(mainImage));
      }
    }
  }, [mainImage, project]);
  console.log('non,Remove', nonRemovedImages);
  useEffect(() => {
    if (!nonRemovedImages.length) {
      console.log('1');
      setNonRemovedImagesURL([]);
    } else {
      console.log('2');
      let arr = [];
      nonRemovedImages.forEach((item) => {
        console.log('item', item);
        arr.push(`${Constants.imageBaseUrl}${item}`);
      });
      setNonRemovedImagesURL(arr);
    }
  }, [nonRemovedImages, project]);

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    const data = {
      projectName,
      categoryId,
      mainImage
    };
    console.log('description', data);
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      let count = 0;
      const formData = new FormData();
      if (projectName !== project.projectName) {
        formData.append('projectName', projectName);
        count++;
      }
      if (categoryId !== project.categoryId) {
        formData.append('categoryId', categoryId);
        count++;
      }
      if (mainImage !== project.mainImage) {
        formData.append('mainImage', mainImage);

        count++;
      }
      if (otherImages.length) {
        otherImages.forEach((image) => {
          formData.append('otherImages', image);
        });
        count++;
      }

      if (removedImages.length) {
        formData.append('removedImages', JSON.stringify(removedImages));
        count++;
      }
      if (shortDesc !== project.shortDesc) {
        formData.append('shortDesc', shortDesc);
        count++;
      }
      if (place !== project.place) {
        formData.append('place', place);
        count++;
      }
      if (shortDesc !== project?.client) {
        formData.append('client', client);
        count++;
      }
      if (place !== project?.area) {
        formData.append('area', area);
        count++;
      }
      if (description !== project.description) {
        formData.append('description', description);
        count++;
      }
      if (count < 1) {
        console.log('count zero working');
        return;
      }
      try {
        console.log('api woring');
        await dispatch(editProject(id, formData));
        navigate('/projects');
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
      const fileImages = otherImages.map((file) => URL.createObjectURL(file));
      setOtherImagesURL(fileImages);
    } else {
      setOtherImagesURL([]);
    }
  }, [otherImages]);

  const handleClickFileRemoveExisting = (url) => {
    const imageNameArr = url.split('/');
    const imageName = imageNameArr[imageNameArr.length - 1];
    console.log('image', imageName);
    setNonRemovedImages((nonRemovedImages) => nonRemovedImages.filter((item) => item !== imageName));
    setRemovedImages((removedImages) => [...removedImages, imageName]);
  };
  const handleClickFileRemove = (index) => {
    setOtherImages((prevFileImages) => prevFileImages.filter((_, i) => i !== index));
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <BreadCrumbs title={'Edit Project'} sx={{ mb: 2 }} />
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Project Name"
                  variant="outlined"
                  value={projectName}
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
                  value={shortDesc}
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
                  value={place}
                  onChange={(e) => {
                    setErrors({ ...errors, ['place']: '' });
                    setPlace(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Client"
                  variant="outlined"
                  value={client}
                  onChange={(e) => {
                    setErrors({ ...errors, ['client']: '' });
                    setClient(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Area"
                  variant="outlined"
                  value={area}
                  onChange={(e) => {
                    setErrors({ ...errors, ['area']: '' });
                    setArea(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                {nonRemovedImagesURL.length
                  ? nonRemovedImagesURL.map((image, i) => (
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
                              e.stopPropagation();
                              handleClickFileRemoveExisting(image);
                            }}
                          />
                        </>
                      </Avatar>
                    ))
                  : ''}
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
                  {errors.images}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mb={2}>
                <Typography>Description</Typography>

                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  style={{ height: '200px', backgroundColor: '#fff' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box mb={2}>
                <Button fullWidth variant="contained" onClick={handleClickUpdate}>
                  Update Project
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProject;
