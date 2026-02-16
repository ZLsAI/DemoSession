import React, { useState } from 'react';
import { usePatients } from '../contexts/PatientContext';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMRN,
  validateDateOfBirth,
  normalizePhone,
  generateMRN,
} from '../utils/validation';
import './PatientRegistrationForm.css';

const PatientRegistrationForm = () => {
  // Form field states
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    medicalRecordNumber: '',
  });

  // Validation error states
  const [errors, setErrors] = useState({});

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  // Get addPatient function from context
  const { addPatient } = usePatients();

  /**
   * Handles input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Clear feedback message when user starts editing
    if (submitFeedback) {
      setSubmitFeedback(null);
    }
  };

  /**
   * Validates a single field on blur
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = null;

    switch (name) {
      case 'fullName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phoneNumber':
        error = validatePhone(value);
        break;
      case 'medicalRecordNumber':
        // Only validate MRN on blur if user has entered a value
        // since leaving it blank is valid (auto-generates on submit)
        if (value && value.trim().length > 0) {
          error = validateMRN(value);
        }
        break;
      case 'dateOfBirth':
        error = validateDateOfBirth(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Validates all form fields
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    newErrors.fullName = validateName(formData.fullName);
    newErrors.email = validateEmail(formData.email);
    newErrors.phoneNumber = validatePhone(formData.phoneNumber);
    newErrors.dateOfBirth = validateDateOfBirth(formData.dateOfBirth);

    // For MRN, auto-generate if empty
    if (!formData.medicalRecordNumber || formData.medicalRecordNumber.trim().length === 0) {
      const generatedMRN = generateMRN();
      setFormData((prev) => ({
        ...prev,
        medicalRecordNumber: generatedMRN,
      }));
      newErrors.medicalRecordNumber = null;
    } else {
      newErrors.medicalRecordNumber = validateMRN(formData.medicalRecordNumber);
    }

    // Filter out null errors
    const actualErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (newErrors[key]) {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {});

    setErrors(actualErrors);
    return Object.keys(actualErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous feedback
    setSubmitFeedback(null);

    // Validate form
    if (!validateForm()) {
      setSubmitFeedback({
        type: 'error',
        message: 'Please fix the errors in the form before submitting.',
      });
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    // Simulate async operation (in real app, this might be an API call)
    setTimeout(() => {
      // Prepare patient data with normalized phone
      const patientData = {
        ...formData,
        phoneNumber: normalizePhone(formData.phoneNumber),
        // Ensure MRN is set (should be from validation)
        medicalRecordNumber: formData.medicalRecordNumber || generateMRN(),
      };

      // Add patient using context
      const result = addPatient(patientData);

      // Handle result
      if (result.success) {
        setSubmitFeedback({
          type: 'success',
          message: `Patient registered successfully! MRN: ${result.patient.medicalRecordNumber}`,
        });
        // Reset form
        setFormData({
          fullName: '',
          dateOfBirth: '',
          phoneNumber: '',
          email: '',
          medicalRecordNumber: '',
        });
        setErrors({});
      } else {
        setSubmitFeedback({
          type: 'error',
          message: result.message,
        });
      }

      setIsSubmitting(false);
    }, 500);
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      medicalRecordNumber: '',
    });
    setErrors({});
    setSubmitFeedback(null);
  };

  /**
   * Handles form reset
   */
  const handleReset = () => {
    resetForm();
  };

  /**
   * Handles "Register Another Patient" action
   */
  const handleRegisterAnother = () => {
    resetForm();
  };

  return (
    <div className="patient-registration-container">
      <div className="patient-registration-form">
        <h1 className="form-title">Patient Registration</h1>
        <p className="form-subtitle">Register a new patient in the system</p>

        {/* Success/Error Feedback */}
        {submitFeedback && (
          <div className={`feedback-message ${submitFeedback.type}`} role="alert">
            <span className="feedback-icon">
              {submitFeedback.type === 'success' ? '✓' : '✕'}
            </span>
            <span>{submitFeedback.message}</span>
          </div>
        )}

        {/* Show register another button if submission was successful */}
        {submitFeedback?.type === 'success' && (
          <button
            type="button"
            className="register-another-button"
            onClick={handleRegisterAnother}
          >
            Register Another Patient
          </button>
        )}

        {/* Form - hide if just submitted successfully */}
        {(!submitFeedback || submitFeedback.type !== 'success') && (
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="John Doe"
                disabled={isSubmitting}
                aria-label="Full Name"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <span className="error-message" id="fullName-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth<span className="required">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                disabled={isSubmitting}
                aria-label="Date of Birth"
                aria-required="true"
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
              />
              {errors.dateOfBirth && (
                <span className="error-message" id="dateOfBirth-error" role="alert">
                  {errors.dateOfBirth}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number<span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                placeholder="(555) 123-4567"
                disabled={isSubmitting}
                aria-label="Phone Number"
                aria-required="true"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              />
              {errors.phoneNumber && (
                <span className="error-message" id="phoneNumber-error" role="alert">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="john.doe@example.com"
                disabled={isSubmitting}
                aria-label="Email Address"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span className="error-message" id="email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Medical Record Number */}
            <div className="form-group">
              <label htmlFor="medicalRecordNumber" className="form-label">
                Medical Record Number (MRN)
              </label>
              <input
                type="text"
                id="medicalRecordNumber"
                name="medicalRecordNumber"
                value={formData.medicalRecordNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.medicalRecordNumber ? 'error' : ''}`}
                placeholder="Leave blank to auto-generate"
                disabled={isSubmitting}
                aria-label="Medical Record Number"
                aria-invalid={!!errors.medicalRecordNumber}
                aria-describedby={errors.medicalRecordNumber ? 'medicalRecordNumber-error' : undefined}
              />
              {errors.medicalRecordNumber && (
                <span className="error-message" id="medicalRecordNumber-error" role="alert">
                  {errors.medicalRecordNumber}
                </span>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                aria-label="Register Patient"
              >
                {isSubmitting && <span className="loading-spinner"></span>}
                {isSubmitting ? 'Registering...' : 'Register Patient'}
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
                disabled={isSubmitting}
                aria-label="Reset Form"
              >
                Reset Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
