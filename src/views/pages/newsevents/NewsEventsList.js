import { Alert, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteNewsEvents, getAllNewsEvents } from 'store/newsevents/actions';
import SimpleModal from 'ui-component/modals/SimpleModal';
import YesOrNoModal from 'ui-component/modals/YesOrNoModal';

const NewsEventsList = () => {
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
  const { newsEventsList } = useSelector((state) => state?.newsevents);
  useEffect(() => {
    dispatch(getAllNewsEvents());
  }, []);

  const handleClickView = async (id) => {
    navigate(`/blogs/detailed/${id}`);
  };
  const handleClickDelete = (id) => {
    setId(id);
    setOpen(true);
  };
  const deleteOne = () => {
    dispatch(deleteNewsEvents(id));
    setOpen1(true);
    setId(null);
  };
  const handleClickEdit = async (id) => {
    navigate(`/newsevents/edit/${id}`);
  };
  return (
    <Grid container sx={{ bgcolor: 'white' }}>
      <Grid item xs={12} md={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsEventsList?.map((project) => (
              <TableRow key={project?._id}>
                <TableCell>{project?.title}</TableCell>
                <TableCell>{project?.shortDesc}</TableCell>
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
        {!newsEventsList ? <Alert severity="info">No datas found</Alert> : ''}
      </Grid>
      <YesOrNoModal isOpen={open} onClose={closeModal} title={'Are ou sure'} func={deleteOne} />
      <SimpleModal isOpen={open1} onClose={closeModal1} title={'Successfully Deleted'} />
    </Grid>
  );
};

export default NewsEventsList;
