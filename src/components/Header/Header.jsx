import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SearchInput } from './SearchInput';
import UserMenu from './UserMenu';
import NavMenu from './NavMenu';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'inline' },
                // fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              trade
            </Typography>
            <Typography
              variant="body4"
              noWrap
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'inline' },
                // fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Trade partner <br />
              that all we trust
            </Typography>
            <SearchInput />
          </Box>
          <NavMenu />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
