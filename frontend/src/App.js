import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router , Redirect, Route, Switch} from 'react-router-dom'
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact'
import Register from './component/Register';
import Logout from './component/Logout';
import Login from './component/Login';
import Navbar from './component/Navbar';
import PageNot from './component/PageNot';
import ForgetPass from './component/ForgetPass';
import ResetPass from './component/ResetPass';
import Protected from './component/Protected';
import Profile from './component/Profile';
import Myblog from './component/Myblog';
import Read from './common/Read';
import Address from './component/Address';
import News from './component/News';
import Edit from './component/Edit';
function App() {
  return (
    <div className="App">
      <Router>
     <Navbar />
     <Switch>
      <Route path="/read" component={Read} />
     <Route path="/" exact component={Home} />
     <Protected path="/about" component={About} />
     <Route path="/contact" component={Contact}/>
     <Route path="/news" component={News}/>
     <Protected path="/profile" component={Profile}/>
     <Protected path="/edit/user/:_id" component={Edit}/>
     <Protected path ="/address" component={Address}/>
     <Protected path="/myblog" component={Myblog} />
     <Route path="/register" component={Register}/>
     <Route path ="/login" component={Login} />
     <Protected path ="/logout" component={Logout}/>
     <Protected path ="/forgetPass" component={ForgetPass}/>
     <Protected path ="/resetpassword/:token" exact component={ResetPass}/>
     <Route path ='/404' component={PageNot} />
     <Redirect to="/404"/>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
