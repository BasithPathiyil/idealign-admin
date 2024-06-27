import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SectionHeading from 'ui-component/SectionHeading';
import Spacing from 'ui-component/Spacing';
import BreadCrumbs from 'ui-component/cards/BreadCrumbs';
import Constants from 'utils/constants';

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

const FormattedText = ({ text }) => {
  const containsNewlines = (str) => /\r?\n/.test(str);

  if (!containsNewlines(text)) {
    // If there are no newlines, simply render the text in a single paragraph
    return <p>{text}</p>;
  }
  const paragraphs = text.split('/\r?\n\r?\n|\r?\n/'); // Split text into paragraphs

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <React.Fragment key={index}>
          <p>
            {paragraph.split('\r\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          {index < paragraphs.length - 1 && <Spacing lg="40" md="20" />}
        </React.Fragment>
      ))}
    </div>
  );
};

function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const ProjectDetailed = () => {
  const params = useParams();
  const { id } = params;
  console.log('params.id', params.id);
  const { projectsList } = useSelector((state) => state?.projects);
  const projectData = projectsList.find((projects) => projects._id === id);
  console.log('project', projectData);

  return (
    <Container>
      <Box component="img" src={`${Constants.imageBaseUrl}${projectData?.mainImage}`} alt="Details" borderRadius={15} width="100%" />
      <Spacing lg="90" md="40" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <SectionHeading title={projectData?.projectName} subtitle={capitalizeFirstLetter(projectData?.categoryId)}>
            <FormattedText text={projectData?.description} />
          </SectionHeading>
        </Grid>
        <Grid item xs={12} lg={5} lgOffset={1}>
          <Spacing lg="60" md="40" />
          <Typography variant="h4">Project Info -</Typography>
          <Spacing lg="50" md="30" />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h5" color="primary">
                Category:
              </Typography>
              <Typography>Artwork</Typography>
              <Spacing lg="30" md="30" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="primary">
                Location:
              </Typography>
              <Typography>{projectData?.place}</Typography>
              <Spacing lg="30" md="30" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="primary">
                Software:
              </Typography>
              <Typography>Adobe Illustrator</Typography>
              <Spacing lg="30" md="30" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="primary">
                Dated:
              </Typography>
              <Typography>14-Aug-2022</Typography>
              <Spacing lg="30" md="30" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="primary">
                Client:
              </Typography>
              <Typography>Andreo Bowla</Typography>
              <Spacing lg="30" md="30" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Spacing lg="65" md="10" />
      {/* Uncomment if needed
      <Box display="flex" justifyContent="center">
        <Button
          href="/portfolio/portfolio-details"
          variant="contained"
          color="primary"
        >
          Prev Project
        </Button>
        <Button
          href="/portfolio/portfolio-details"
          variant="contained"
          color="primary"
        >
          Next Project
        </Button>
      </Box>
      */}
    </Container>
  );
};

export default ProjectDetailed;
