import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import {
  DiagnosisSelection,
  NumberField,
  SelectField,
  TextField,
  TypeOption,
} from '../AddEntryModal/EntryFormField';
import { useStateValue } from '../state';
import { Entry, Type } from '../types';

// Define special omit for unions
type UnionOmit<
  Entry,
  K extends string | number | symbol,
> = Entry extends unknown ? Omit<Entry, K> : never;

export type EntryFormValues = UnionOmit<Entry, 'id' | 'entries' | 'date'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: 'Hospital' },
  { value: Type.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: Type.HealthCheck, label: 'HealthCheck' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';

        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }

        if (values.type === 'HealthCheck' && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }

        if (values.type === 'OccupationalHealthcare' && !values.employerName) {
          errors.employerName = requiredError;
        }

        return errors;
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className='form ui'>
            <SelectField label='Type' name='type' options={typeOptions} />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            {values.type === 'HealthCheck' && (
              <Field
                label='Health Check Rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label='Employer Name'
                  placeholder='Employer name'
                  name='employerName'
                  component={TextField}
                />
              </>
            )}

            {values.type === 'Hospital' && (
              <>
                <h4>Discharge</h4>
                <Field
                  label='Date'
                  placeholder='AAAA-MM-DD'
                  name='date'
                  component={TextField}
                />
                <Field
                  label='Criteria'
                  placeholder='Criteria'
                  name='criteria'
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
