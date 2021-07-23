import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
const UserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(' ');
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/login');
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/user/list');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setEmail(user.email);
        setName(user.name);
        setUsername(user.username);
        setRole(user.role);
      }
    }
  }, [userInfo, dispatch, history, userId, user, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, role }));
  };
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter a valid Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='role'>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as='select'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>admin</option>
            <option>client</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit' block>
          Update
        </Button>
      </Form>
    </>
  );
};

export default UserEdit;
