import { Alert, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProjects, getAllProjects } from 'store/project/actions';
import SimpleModal from 'ui-component/modals/SimpleModal';
import YesOrNoModal from 'ui-component/modals/YesOrNoModal';

const ProjectsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id, setId] = useState(null);
  const closeModal = () => {
    setOpen(false);
  };
  const closeModal1 = () => {
    setOpen1(false);
  };
  const { projectsList } = useSelector((state) => state?.projects);
  console.log('projectsList', projectsList);
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const handleClickView = async (id) => {
    navigate(`/projects/detailed/${id}`);
  };
  const handleClickEdit = async (id) => {
    navigate(`/projects/edit/${id}`);
  };
  const handleClickDelete = (id) => {
    setId(id);
    setOpen(true);
  };
  const deleteOne = () => {
    dispatch(deleteProjects(id));
    setOpen1(true);
    setId(null);
  };
  return (
    <Grid container sx={{ bgcolor: 'white' }}>
      <Grid item xs={12} md={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsList?.map((project) => (
              <TableRow key={project?._id}>
                <TableCell>{project?.projectName}</TableCell>
                <TableCell>{project?.place}</TableCell>
                <TableCell sx={{ display: 'flex', gap: '16px' }}>
                  <Button onClick={() => handleClickView(project?._id)} variant="contained">
                    View
                  </Button>
                  <Button onClick={() => handleClickEdit(project?._id)} variant="contained">
                    Edit
                  </Button>
                  <Button onClick={() => handleClickDelete(project?._id)} variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!projectsList ? <Alert severity="info">No datas found</Alert> : ''}
      </Grid>
      <YesOrNoModal isOpen={open} onClose={closeModal} title={'Are ou sure'} func={deleteOne} />
      <SimpleModal isOpen={open1} onClose={closeModal1} title={'Successfully Deleted'} />
    </Grid>
  );
};

export default ProjectsList;
