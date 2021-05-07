import React, { useEffect, useState } from 'react';
import LeftSidePanel from '../../layouts/LeftSidePanel';
import TeacherDashboard from './TeacherDashboad';
import StudentView from './StudentView';
import { Switch, Route } from 'react-router-dom';
import ContentHeader from '../../layouts/ContentHeader';
import TeacherProfileSample from "../../assets/images/teacher-profile-sample.svg";

function TeacherView({ match }) {
  const [selectedView, setSelectedView] = useState("");
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (selectedView === "main") {
      setHeader("Dashboard");
    } else {
      setHeader(selectedView.substring(0, selectedView.length - 1) + " View")
    }
  }, [selectedView])

  return (
    <div className="teacher-view">
      <LeftSidePanel panelType="teacherPanel" setSelectedView={setSelectedView} selectedView={selectedView} />
      <div className="profile-box"> <img alt="teacher-profile" src={TeacherProfileSample}></img> </div>
      <ContentHeader headerName={header} />
      <div>
        <Switch>
          <Route path={match.url} exact>
            <TeacherDashboard teacherId="1864"></TeacherDashboard>
          </Route>
          <Route path={`${match.url}/students`} exact>
            <StudentView teacherId="1864"></StudentView>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default TeacherView;