import PropTypes from 'prop-types';

/**
 * Visit PropTypes definition
 * Defines the shape of a patient visit object in the hospital management system
 */
export const VisitPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  diagnosis: PropTypes.string,
  treatment: PropTypes.string,
  notes: PropTypes.string,
});

/**
 * Default visit object for initialization
 */
export const defaultVisit = {
  id: '',
  patientId: '',
  date: '',
  reason: '',
  diagnosis: '',
  treatment: '',
  notes: '',
};
