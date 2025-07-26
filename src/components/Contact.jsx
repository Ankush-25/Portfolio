import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  useTheme, 
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Link,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { contactInfo, socialLinks } = resumeData;
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would typically send the form data to your backend or email service
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSnackbarMessage('Your message has been sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbarMessage('Failed to send message. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Social media icons with their respective colors
  const socialIcons = {
    linkedin: {
      icon: <LinkedInIcon />,
      color: '#0A66C2',
    },
    github: {
      icon: <GitHubIcon />,
      color: '#181717',
    },
    twitter: {
      icon: <TwitterIcon />,
      color: '#1DA1F2',
    },
    instagram: {
      icon: <InstagramIcon />,
      color: '#E4405F',
    },
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary,
              position: 'relative',
              display: 'inline-block',
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
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            Feel free to reach out for collaborations or just a friendly hello
          </Typography>
        </Box>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div variants={item}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: '100%',
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                    Send me a message
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: theme.palette.divider,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: theme.palette.divider,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: theme.palette.divider,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={5}
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: theme.palette.divider,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={loading}
                          startIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                            },
                          }}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <motion.div variants={item}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: '100%',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mt: 2, '& > *:not(:last-child)': { mb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <EmailIcon 
                        color="primary" 
                        sx={{ 
                          mr: 2, 
                          mt: 0.5,
                          fontSize: '1.5rem',
                          color: theme.palette.primary.main,
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Email Me At</Typography>
                        <Link 
                          href={`mailto:${contactInfo.email}`} 
                          color="inherit"
                          sx={{
                            textDecoration: 'none',
                            '&:hover': {
                              color: theme.palette.primary.main,
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {contactInfo.email}
                        </Link>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <PhoneIcon 
                        color="primary" 
                        sx={{ 
                          mr: 2, 
                          mt: 0.5,
                          fontSize: '1.5rem',
                          color: theme.palette.primary.main,
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Call Me At</Typography>
                        <Link 
                          href={`tel:${contactInfo.phone}`}
                          color="inherit"
                          sx={{
                            textDecoration: 'none',
                            '&:hover': {
                              color: theme.palette.primary.main,
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {contactInfo.phone}
                        </Link>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LocationOnIcon 
                        color="primary" 
                        sx={{ 
                          mr: 2, 
                          mt: 0.5,
                          fontSize: '1.5rem',
                          color: theme.palette.primary.main,
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                        <Typography>{contactInfo.location}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Follow Me
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {Object.entries(socialLinks).map(([platform, url]) => (
                        <IconButton
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={platform}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                            color: socialIcons[platform]?.color || theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {socialIcons[platform]?.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      
      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
