import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { SearchInput } from './SearchInput';
import UserMenu from './UserMenu';
import NavMenu from './NavMenu';
import { Logo } from './Logo';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* mobile view */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <Toolbar disableGutters>
            <UserMenu />
            <Logo />
            <SearchInput />
            <NavMenu />
          </Toolbar>
        </Box>

        {/* desktop view */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <Toolbar>
            <Logo />
            <SearchInput />
            <NavMenu />
          </Toolbar>
          <UserMenu />
        </Box>
      </Container>
    </AppBar>
  );
}
export default NavBar;
