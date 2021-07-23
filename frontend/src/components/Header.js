import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        variant='dark'
        bg='dark'
        className='mb-5 p-2'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>To Do</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/user/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/'>
                    <Nav.Link>
                      <i className='px-1 fas fa-home'></i> Home
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <i className='px-1 far fa-edit'></i>
                      Registration
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='px-1 fas fa-fingerprint'></i>
                      Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title={userInfo.role + 'Panel'} id='adminmenu'>
                  <LinkContainer to='/admin/user/list'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.role === 'client' && (
                <NavDropdown title={userInfo.role + 'Panel'} id='clientmenu'>
                  <LinkContainer to='/todo'>
                    <NavDropdown.Item>My To Do's</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
