import React from 'react'
import Home from './views/Home'
import FamilyView from './views/family/FamilyView'
import TeacherView from './views/teacher//TeacherView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        {/* render different components here based on different paths */}
        <Switch> 
          <Route path="/" exact component={Home}/>
          <Route path="/family" component={FamilyView}/>
          <Route path="/teacher" component={TeacherView}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
