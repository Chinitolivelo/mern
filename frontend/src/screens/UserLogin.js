import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';

const UserLogin = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (error) {
      setUsername('');
      setPassword('');
    }
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, error, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <Container>
      <Form onSubmit={submitHandler} className='my-1 '>
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

        <Button variant='primary' type='submit' block>
          {loading ? <Loader /> : <span>Login</span>}
        </Button>
      </Form>
    </Container>
  );
};

export default UserLogin;
