import { Box, Container, Typography, useTheme, useMediaQuery, Paper, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LaunchIcon from '@mui/icons-material/Launch';

const Education = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { education, certifications } = resumeData;

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

  return (
    <Box
      id="education"
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
            Education & Certifications
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            My academic background and professional certifications
          </Typography>
        </Box>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Education Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.primary,
              }}
            >
              <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              Education
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {education.map((edu) => (
                <motion.div key={edu.id} variants={item}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                        {edu.degree}
                      </Typography>
                      <Chip
                        label={edu.gpa}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.contrastText,
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="subtitle1"
                      color="primary"
                      sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                    >
                      {edu.institution}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </Typography>

                    {edu.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {edu.description}
                      </Typography>
                    )}

                    {edu.courses && edu.courses.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          Relevant Coursework:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {edu.courses.map((course, idx) => (
                            <Chip
                              key={idx}
                              label={course}
                              size="small"
                              variant="outlined"
                              sx={{
                                fontSize: '0.65rem',
                                '& .MuiChip-label': {
                                  px: 1,
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <Box>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.text.primary,
                }}
              >
                <EmojiEventsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Certifications
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fill, minmax(300px, 1fr))' },
                  gap: 3,
                }}
              >
                {certifications.map((cert) => (
                  <motion.div key={cert.id} variants={item}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        height: '100%',
                        borderLeft: `3px solid ${theme.palette.secondary.main}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[4],
                        },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 1 }}>
                          {cert.name}
                        </Typography>
                        <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                          {cert.issuer}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Issued: {formatDate(cert.issueDate)}
                          {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                        </Typography>
                        {cert.credentialId && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                            Credential ID: {cert.credentialId}
                          </Typography>
                        )}
                        {cert.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {cert.description}
                          </Typography>
                        )}
                      </Box>
                      
                      {cert.verifyUrl && (
                        <Box sx={{ mt: 'auto', pt: 2, textAlign: 'right' }}>
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: theme.palette.primary.main,
                              fontSize: '0.875rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Verify Credential <LaunchIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
                          </a>
                        </Box>
                      )}
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default Education;
