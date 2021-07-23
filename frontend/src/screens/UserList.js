import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listUsers());
    } else {
      history.push('/user/login');
    }
  }, [userInfo, dispatch, history, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm('Are  you sure you want to  delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const createUserHandler = () => {
    history.push('/user/register');
  };

  return (
    <>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h1>User Records</h1>
        </Col>
        <Col className='text-right ' sm={6} md={6} lg={6}>
          <Button
            className='my-3'
            variant='warning'
            onClick={createUserHandler}
          >
            <i className='fas fa-plus  px-1'></i>Create New User
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive size='sm'>
          <thead className='bg-dark text-warning'>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>
                  {user.role === 'admin' ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm  mx-1'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='outline-danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
