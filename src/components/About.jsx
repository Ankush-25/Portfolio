import { Box, Typography, Container, Avatar, Grid, Button, Paper, useTheme } from '@mui/material';
import { resumeData } from '../data/resumeData';
import DownloadIcon from '@mui/icons-material/Download';

const About = () => {
  const theme = useTheme();
  
  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
            color: theme.palette.text.primary,
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: 60,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              margin: '16px auto 0',
              borderRadius: 2,
            },
          }}
        >
          About Me
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={6}
              sx={{
                width: 280,
                height: 280,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[10],
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <Box
                component="img"
                src="/profile.jpg"
                alt={resumeData.personal.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300?text=Profile+Image';
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                lineHeight: 1.2,
              }}
            >
              Hi, I'm {resumeData.personal.name.split(' ')[0]}
            </Typography>

            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: theme.palette.primary.main,
                mb: 3,
                fontWeight: 500,
              }}
            >
              {resumeData.personal.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary,
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}
            >
              {resumeData.personal.about}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mr: 2,
                }}
              />
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                <strong>Location:</strong> {resumeData.personal.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mr: 2,
                }}
              />
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                <strong>Tagline:</strong> {resumeData.personal.tagline}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              href="/resume.pdf"
              download
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Download Resume
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
