import React from 'react'
import LeftSidePanel from '../../layouts/LeftSidePanel'
import TeacherDashboard from './TeacherDashboad'
import StudentView from './StudentView'
import { Switch, Route } from 'react-router-dom'

function TeacherView( {match} ) {
  return (
    <div className="teacher-view">
        <LeftSidePanel panelType="teacherPanel" />
        <div className="main-view-content">
          <Switch>
            <Route path={match.url} exact component={TeacherDashboard}/>
            <Route path={`${match.url}/students`} exact>
              <StudentView teacherId="1864" ></StudentView>
            </Route> 
          </Switch>
        </div>
    </div>
  );
}

export default TeacherView;