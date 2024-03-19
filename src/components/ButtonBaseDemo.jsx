import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import img from '../img/musique.jpg'
import danse from '../img/danse1.jpg'
import art from '../img/peinture.png'
import artMartial from '../img/artMartial.jpg'
import sport from '../img/sport.jpg'
import artDramatique from '../img/artDramatique.jpg'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const images = [
  {
    url: img,
    title: 'Musiques',
    width: '90%',
    lien: "musiques"
  },
  {
    url: danse,
    title: 'Danses',
    width: '90%',
    lien: "danses"
  },
  {
    url: art,
    title: 'Arts Plastiques',
    width: '90%',
    lien: "arts-plastiques"
  },
  {
    url: artMartial,
    title: 'Arts Martiaux',
    width: '90%',
    lien: "arts-martiaux"
  },
  {
    url: sport,
    title: 'Sports',
    width: '90%',
    lien: "sports"
  },
  {
    url: artDramatique,
    title: 'Arts Dramatiques',
    width: '90%',
    lien: "arts-dramatiques"
  },
];

const style = {
    fontFamily: "Poppins, sans-serif",
  };

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {/* <Row> */}
      {images.map((image) => (
          <Col xs={12} sm={12} md={12} lg={4} className=''> 
              <center>
                  <ImageButton
                      className='mb-4'
                      focusRipple
                      key={image.title}
                      style={{
                          width: image.width,
                          fontFamily: "Poppins, sans-serif",
                      }}
                  >
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                  <Link to={`/${image.lien}`} style={{textDecoration: "none", color: "white"}}>
                          <Typography
                              style={{
                                  fontFamily: "Poppins, sans-serif",
                              }}
                              component="span"
                              variant="subtitle1"
                              color="inherit"
                              sx={{
                                  position: 'relative',
                                  p: 4,
                                  pt: 2,
                                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                              }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                          </Typography>
                  </Link>
                      </Image>
                  </ImageButton>
              </center>
          </Col>
      ))}
      {/* </Row> */}
    </Box>
  );
}