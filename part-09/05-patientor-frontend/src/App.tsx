import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Button, Container, Divider, Header } from 'semantic-ui-react';
import IndividualPatient from './components/IndividualPatient';
import { apiBaseUrl } from './constants';
import PatientListPage from './PatientListPage';
import { useStateValue } from './state';
import { Patient } from './types';

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`,
        );
        dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/patients/:id' component={IndividualPatient} />
            <Route path='/' component={PatientListPage} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
