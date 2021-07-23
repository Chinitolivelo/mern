import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
const UserRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/user/profile';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [dispatch, history, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(email, name, username, password));
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      {message ? (
        <Message variant='outline-warning text-danger'>{message}</Message>
      ) : (
        loading && <Loader />
      )}
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

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit' block>
        Register
      </Button>
    </Form>
  );
};

export default UserRegister;
