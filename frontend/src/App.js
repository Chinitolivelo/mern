import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// Components
import Header from './components/Header';
// Screens
import Home from './screens/Home';
import UserRegister from './screens/UserRegister';
import UserProfile from './screens/UserProfile';
import UserList from './screens/UserList';
import UserLogin from './screens/UserLogin';
import UserEdit from './screens/UserEdit';
import TodoList from './screens/TodoList';

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Route path='/' component={Home} exact />
        <Container>
          <Route path='/register' component={UserRegister} />
          <Route path='/login' component={UserLogin} />
          <Route path='/user/profile' component={UserProfile} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/admin/user/list' component={UserList} />
          <Route path='/todo' component={TodoList} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
