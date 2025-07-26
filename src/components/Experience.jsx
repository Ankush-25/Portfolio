import { Box, Container, Typography, useTheme, useMediaQuery, Paper, Divider, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { experience } = resumeData;

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const yearText = years > 0 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '';
    const monthText = months > 0 ? `${months} ${months === 1 ? 'mo' : 'mos'}` : '';
    
    return [yearText, monthText].filter(Boolean).join(' ');
  };

  return (
    <Box
      id="experience"
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
            Work Experience
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            My professional journey and work history
          </Typography>
        </Box>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: isMobile ? 16 : '50%',
                bottom: 0,
                width: '2px',
                backgroundColor: theme.palette.divider,
                transform: 'translateX(-50%)',
                zIndex: 1,
              },
            }}
          >
            {experience.map((exp, index) => (
              <motion.div key={exp.id} variants={item}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : index % 2 === 0 ? 'row' : 'row-reverse',
                    alignItems: 'flex-start',
                    mb: 6,
                    position: 'relative',
                    '&:last-child': {
                      mb: 0,
                    },
                  }}
                >
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: isMobile ? 8 : '50%',
                      top: 0,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      border: `4px solid ${theme.palette.background.default}`,
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    <WorkIcon sx={{ fontSize: '0.8rem' }} />
                  </Box>

                  {/* Date */}
                  <Box
                    sx={{
                      width: isMobile ? '100%' : '45%',
                      textAlign: isMobile ? 'left' : index % 2 === 0 ? 'right' : 'left',
                      pr: isMobile ? 0 : index % 2 === 0 ? 4 : 0,
                      pl: isMobile ? 0 : index % 2 === 0 ? 0 : 4,
                      mb: isMobile ? 1 : 0,
                      position: 'relative',
                      left: isMobile ? 0 : index % 2 === 0 ? 0 : 'auto',
                      right: isMobile ? 0 : index % 2 === 0 ? 'auto' : 0,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getDuration(exp.startDate, exp.current ? new Date() : exp.endDate)}
                    </Typography>
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      width: isMobile ? '100%' : '55%',
                      pl: isMobile ? 4 : index % 2 === 0 ? 4 : 0,
                      pr: isMobile ? 0 : index % 2 === 0 ? 0 : 4,
                      mt: isMobile ? 1 : 0,
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        '&:hover': {
                          transform: 'translateX(5px)',
                          boxShadow: theme.shadows[4],
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        {exp.position}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <WorkIcon sx={{ fontSize: '1.1rem', mr: 1 }} />
                        {exp.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                        {exp.location}
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <Typography
                            key={idx}
                            component="li"
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {responsibility}
                          </Typography>
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {exp.technologies.map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.65rem',
                              height: '20px',
                              '& .MuiChip-label': {
                                px: 1,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Experience;
