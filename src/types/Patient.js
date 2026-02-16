import PropTypes from 'prop-types';

/**
 * Patient PropTypes definition
 * Defines the shape of a patient object in the hospital management system
 */
export const PatientPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  medicalRecordNumber: PropTypes.string.isRequired,
  registrationDate: PropTypes.string.isRequired,
});

/**
 * Default patient object for initialization
 */
export const defaultPatient = {
  id: '',
  name: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  medicalRecordNumber: '',
  registrationDate: '',
};
