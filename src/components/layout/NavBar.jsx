import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { SearchInput } from './navBar/SearchInput';
import UserMenu from './navBar/UserMenu';
import NavMenu from './navBar/NavMenu';
import { Logo } from './navBar/Logo';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="2xl">
        {/* mobile view */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'space-between',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <Toolbar sx={{ display: 'flex', flexGrow: 1 }} disableGutters>
            <UserMenu />
            <Logo linkTo="/" />
            <SearchInput />
            <NavMenu />
          </Toolbar>
        </Box>

        {/* desktop view */}
        <Box
          sx={{
            display: { xs: 'none', md: 'inline' },
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Toolbar>
            <Logo linkTo="/" />
            <SearchInput />
            <NavMenu />
            <UserMenu />
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
  );
}
export default NavBar;
