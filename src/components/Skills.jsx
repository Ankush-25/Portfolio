import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Button, Chip, Paper, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Skills = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { skills } = resumeData;

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

  // Skill categories with icons and colors
  const skillCategories = [
    {
      name: 'Languages',
      icon: '💻',
      color: 'primary',
      items: resumeData.skills.languages
    },
    {
      name: 'Frameworks',
      icon: '🛠️',
      color: 'secondary',
      items: resumeData.skills.frameworks
    },
    {
      name: 'Databases',
      icon: '🗄️',
      color: 'success',
      items: resumeData.skills.databases
    },
    {
      name: 'Tools',
      icon: '🔧',
      color: 'warning',
      items: resumeData.skills.tools
    },
    {
      name: 'Concepts',
      icon: '🧠',
      color: 'info',
      items: resumeData.skills.concepts
    }
  ];

  // Handle download resume
  const handleDownloadResume = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Make sure to place your resume.pdf in the public folder
    link.download = `${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      id="skills"
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
            My Skills
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            Here are the technologies and tools I work with
          </Typography>
        </Box>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Skills Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {skillCategories.map((category) => (
              <Grid item xs={12} md={6} lg={4} key={category.name}>
                <motion.div variants={item}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      borderLeft: `4px solid ${theme.palette[category.color].main}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>
                        {category.icon}
                      </Box>
                      {category.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {category.items.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderRadius: 1,
                            borderColor: theme.palette[category.color].main,
                            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette[category.color].dark,
                            backgroundColor: `${theme.palette[category.color].light}20`,
                            '&:hover': {
                              backgroundColor: `${theme.palette[category.color].light}30`,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {/* Download Resume Section */}
          <motion.div variants={item}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: '#fff',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                Interested in working together?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, maxWidth: '700px', mx: 'auto' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleDownloadResume}
                  startIcon={<DownloadIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  href={`mailto:${resumeData.personal.email}`}
                  startIcon={<EmailIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Me
                </Button>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <IconButton
                  href={resumeData.personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  sx={{
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href={resumeData.personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;
