import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { projects } = resumeData;
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.flatMap(project => project.categories))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <Box
      id="projects"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.paper,
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
            My Projects
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            Here are some of my recent works
          </Typography>
        </Box>

        {/* Category Filters */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mb: 6,
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? 'filled' : 'outlined'}
              color={activeFilter === category ? 'primary' : 'default'}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            />
          ))}
        </Box>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div variants={item}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[2],
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[8],
                        '& .project-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={project.image || '/project-placeholder.jpg'}
                        alt={project.title}
                        className="project-image"
                        sx={{
                          transition: 'transform 0.5s ease',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x200?text=Project+Image';
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          p: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                fontSize: '0.6rem',
                                height: '20px',
                              }}
                            />
                          ))}
                          {project.technologies.length > 3 && (
                            <Chip
                              label={`+${project.technologies.length - 3}`}
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.grey[600],
                                color: theme.palette.common.white,
                                fontSize: '0.6rem',
                                height: '20px',
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {project.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {project.github && (
                            <Button
                              component="a"
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              <GitHubIcon fontSize="small" />
                            </Button>
                          )}
                          {project.demo && (
                            <Button
                              component="a"
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              <LaunchIcon fontSize="small" />
                            </Button>
                          )}
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                        {project.categories.map((category, index) => (
                          <Chip
                            key={index}
                            label={category}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.6rem',
                              height: '20px',
                              '& .MuiChip-label': {
                                px: 1,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects;
