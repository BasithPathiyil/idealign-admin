import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';

const TextWithNewLines = ({ text }) => {
  // Split the text by \r\n, \n, or \r
  const parts = text.split(/(\r\n|\n|\r)/);

  return (
    <div>
      {parts.map((part, index) =>
        // If part matches newline, render a <br />, otherwise render the text
        part.match(/\r\n|\n|\r/) ? <br key={index} /> : <span key={index}>{part}</span>
      )}
    </div>
  );
};

const BlogDetailed = () => {
  const params = useParams();
  const { id } = params;
  console.log('params.id', params.id);
  const { blogsList } = useSelector((state) => state?.blogs);
  const project = blogsList.find((projects) => projects._id === id);
  console.log('project', project);

  return (
    <Grid container spacing={2}>
      <BreadCrumbs title={'Project Detailed'} />
      <Grid item xs={12} md={12}>
        <Grid container sx={{ bgcolor: 'white', p: 2 }}>
          <Grid item xs={12} md={12}>
            {' '}
            <h3>{project?.title}</h3>
            {/* <TextWithNewLines text={project?.description} /> */}
            {/* <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/g--dmRDzFIg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailed;
