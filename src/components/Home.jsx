import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to My Portfolio
        </Typography>
        
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          Full Stack Developer & UI/UX Enthusiast
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
          I build exceptional digital experiences. Specializing in modern web technologies and
          creating beautiful, responsive, and user-friendly applications.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            View My Work
          </Button>
          
          <Button
            component={RouterLink}
            to="/contact"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Contact Me
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
