import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewComplaint from "./components/complaints/NewComplaint";
import ListComplaints from "./components/complaints/ListComplaints";
import ShowComplaint from "./components/complaints/ShowComplaint";
import ListServiceTypes from "./components/service-types/ListServiceTypes";
import NewServiceType from "./components/service-types/NewServiceType";
import EditServiceType from "./components/service-types/EditServiceType";
import Login from "./components/auth/Login";
import ListUser from "./components/users/ListUser";
import NewUser from "./components/users/NewUser";
import GuardRoute from "./components/GuardRoute";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from "react";

function App() {
  const[isAutheticated, setIsAutheticated] = useState(false);
  const token = localStorage.getItem('accessToken');

  if (token && !isAutheticated) {
    setIsAutheticated(true);
  }

  if (!token && isAutheticated) {
    setIsAutheticated(false);
  }
  
  const authenticate = (isAutheticated) => {
    setIsAutheticated(isAutheticated);
  }

  return (
    <Router>
      <div className="App">
          <Navbar authenticate={authenticate} isAuthenticate={isAutheticated} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login authenticate={authenticate} />
            </Route>

            <Route exact path="/users">
              <ListUser />
            </Route>
            <GuardRoute exact path="/users/new" auth={isAutheticated}>
              <NewUser />
            </GuardRoute>

            <Route exact path="/complaint">
              <ListComplaints />
            </Route>
            <Route exact path="/complaint/new">
              <NewComplaint />
            </Route>
            <Route exact path="/complaint/:id">
              <ShowComplaint />
            </Route>

            <GuardRoute exact path="/service-types" auth={isAutheticated}>
              <ListServiceTypes />
            </GuardRoute>
            <Route exact path="/service-types/new">
              <NewServiceType />
            </Route>
            <Route exact path="/service-types/:id">
              <EditServiceType />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
