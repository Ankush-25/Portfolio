import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { resumeData } from '../data/resumeData';

const navItems = [
  { text: 'About', path: '/about' },
  { text: 'Skills', path: '/skills' },
  { text: 'Projects', path: '/projects' },
  { text: 'Experience', path: '/experience' },
  { text: 'Education', path: '/education' },
  { text: 'Contact', path: '/contact' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center',
        height: '100%',
        background: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        {resumeData.personal.name}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ 
                textAlign: 'center',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ 
        py: 2,
        mt: 'auto',
        color: theme.palette.text.secondary,
        fontSize: '0.8rem'
      }}>
        © {new Date().getFullYear()} {resumeData.personal.name}
      </Box>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.drawer + 1,
          color: theme.palette.text.primary
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box 
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 3
              }}
            >
              <CodeIcon sx={{ 
                mr: 1, 
                color: 'primary.main',
                fontSize: '1.8rem'
              }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                {resumeData.personal.name.split(' ')[0]}
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  ml: 'auto',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ 
                display: 'flex',
                ml: 'auto',
                gap: 1
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    variant={location.pathname === item.path ? 'contained' : 'text'}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&.MuiButton-contained': {
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: theme.shadows[2],
                        }
                      },
                      '&.MuiButton-text': {
                        color: 'text.primary',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        }
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: 280,
              borderLeft: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;