import { Box, Typography, Button, Container, useTheme, useMediaQuery, IconButton, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { resumeData } from '../data/resumeData';
import CodeIcon from '@mui/icons-material/Code';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { motion } from 'framer-motion';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { name, title, about, location, email } = resumeData.personal;
  
  const socialLinks = [
    { icon: <LinkedInIcon fontSize="large" />, url: "https://linkedin.com" },
    { icon: <GitHubIcon fontSize="large" />, url: "https://github.com" },
    { icon: <TwitterIcon fontSize="large" />, url: "https://twitter.com" },
  ];

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '80vh',
          height: '80vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
          zIndex: 0,
          animation: 'float 12s infinite ease-in-out',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-40%',
          left: '-10%',
          width: '60vh',
          height: '60vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.light}15, transparent 70%)`,
          zIndex: 0,
          animation: 'float 15s infinite ease-in-out',
        },
      }}
    >
      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}30, transparent)`,
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                maxWidth: { xs: '100%', md: '90%' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    gap: 1,
                  }}
                >
                  <CodeIcon sx={{ fontSize: '1.5rem' }} />
                  {title}
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% auto',
                    animation: 'gradient 5s ease infinite',
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  {name}
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 },
                    fontWeight: 400,
                  }}
                >
                  {about}
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 3,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: 4,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: theme.shadows[4],
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get In Touch
                  </Button>

                  <Button
                    component="a"
                    href={`mailto:${email}`}
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {email}
                  </Button>
                </Box>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: 4,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.success.main,
                          mr: 1.5,
                        }}
                      />
                    </motion.div>
                    <Typography variant="body2" color="text.secondary">
                      Available for new opportunities
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {location}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {socialLinks.map((link, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        color: theme.palette.text.secondary,
                        backgroundColor: theme.palette.action.hover,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper
                elevation={10}
                sx={{
                  borderRadius: '50%',
                  width: { xs: 280, md: 380 },
                  height: { xs: 280, md: 380 },
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 20px 50px ${theme.palette.primary.light}30`,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src="/profile.jpg"
                    alt={name}
                    sx={{
                      width: '92%',
                      height: '92%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `4px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[5],
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                </Box>
                
                {/* Floating elements around profile */}
                {[0, 90, 180, 270].map((rotation, index) => (
                  <motion.div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 100,
                      height: 100,
                      marginLeft: -50,
                      marginTop: -50,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: `translateX(-50%) rotate(${rotation}deg)`,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: theme.palette.secondary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: theme.palette.background.paper,
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Explore my work
        </Typography>
        <ArrowDownwardIcon sx={{ color: 'text.secondary' }} />
      </motion.div>
    </Box>
  );
};

export default Home;