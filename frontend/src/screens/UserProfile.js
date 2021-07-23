import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
const UserProfile = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setEmail(user.email);
        setName(user.name);
        setUsername(user.username);
      }
    }
  }, [dispatch, history, userInfo, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({ id: user._id, email, name, username, password })
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };
  return (
    <Container>
      {loading && <Loader />}
      <Card className='w-50 border-0 border-0 shadow p-2 mb-5 my-5  rounded'>
        <Card.Title className='text-center mt-3 h1'>
          {message && <Message variant='danger'>{message}</Message>}
          {error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            success && <Message variant='success'>Profile Updated</Message>
          )}
          {loading && <Loader />}
        </Card.Title>
        <Card.Body>
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
            <Button variant='primary' block type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
