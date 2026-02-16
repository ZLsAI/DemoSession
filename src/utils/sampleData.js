/**
 * Sample patient data for development and testing
 * Generates realistic patient records with visit histories
 */

/**
 * Generate a unique ID
 * @returns {string} - Unique identifier
 */
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sample patient data with 15 patients
 * Each patient has 2-5 visit records with realistic medical data
 */
export const samplePatients = [
  {
    id: '1',
    name: 'John Smith',
    dateOfBirth: '1985-03-15',
    phoneNumber: '555-0101',
    email: 'john.smith@email.com',
    medicalRecordNumber: 'MRN-001',
    registrationDate: '2020-01-10',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    dateOfBirth: '1990-07-22',
    phoneNumber: '555-0102',
    email: 'sarah.johnson@email.com',
    medicalRecordNumber: 'MRN-002',
    registrationDate: '2019-05-15',
  },
  {
    id: '3',
    name: 'Michael Brown',
    dateOfBirth: '1978-11-30',
    phoneNumber: '555-0103',
    email: 'michael.brown@email.com',
    medicalRecordNumber: 'MRN-003',
    registrationDate: '2021-03-20',
  },
  {
    id: '4',
    name: 'Emily Davis',
    dateOfBirth: '1995-02-14',
    phoneNumber: '555-0104',
    email: 'emily.davis@email.com',
    medicalRecordNumber: 'MRN-004',
    registrationDate: '2022-08-05',
  },
  {
    id: '5',
    name: 'James Wilson',
    dateOfBirth: '1982-09-18',
    phoneNumber: '555-0105',
    email: 'james.wilson@email.com',
    medicalRecordNumber: 'MRN-005',
    registrationDate: '2018-12-11',
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    dateOfBirth: '1988-05-25',
    phoneNumber: '555-0106',
    email: 'jennifer.martinez@email.com',
    medicalRecordNumber: 'MRN-006',
    registrationDate: '2020-06-30',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    dateOfBirth: '1975-12-08',
    phoneNumber: '555-0107',
    email: 'robert.taylor@email.com',
    medicalRecordNumber: 'MRN-007',
    registrationDate: '2017-09-22',
  },
  {
    id: '8',
    name: 'Linda Anderson',
    dateOfBirth: '1992-04-17',
    phoneNumber: '555-0108',
    email: 'linda.anderson@email.com',
    medicalRecordNumber: 'MRN-008',
    registrationDate: '2021-11-14',
  },
  {
    id: '9',
    name: 'David Thomas',
    dateOfBirth: '1980-08-29',
    phoneNumber: '555-0109',
    email: 'david.thomas@email.com',
    medicalRecordNumber: 'MRN-009',
    registrationDate: '2019-02-28',
  },
  {
    id: '10',
    name: 'Mary Jackson',
    dateOfBirth: '1987-01-05',
    phoneNumber: '555-0110',
    email: 'mary.jackson@email.com',
    medicalRecordNumber: 'MRN-010',
    registrationDate: '2020-10-19',
  },
  {
    id: '11',
    name: 'Christopher White',
    dateOfBirth: '1993-06-12',
    phoneNumber: '555-0111',
    email: 'christopher.white@email.com',
    medicalRecordNumber: 'MRN-011',
    registrationDate: '2022-04-07',
  },
  {
    id: '12',
    name: 'Patricia Harris',
    dateOfBirth: '1984-10-21',
    phoneNumber: '555-0112',
    email: 'patricia.harris@email.com',
    medicalRecordNumber: 'MRN-012',
    registrationDate: '2018-07-16',
  },
  {
    id: '13',
    name: 'Daniel Clark',
    dateOfBirth: '1991-03-09',
    phoneNumber: '555-0113',
    email: 'daniel.clark@email.com',
    medicalRecordNumber: 'MRN-013',
    registrationDate: '2021-01-25',
  },
  {
    id: '14',
    name: 'Barbara Lewis',
    dateOfBirth: '1979-07-31',
    phoneNumber: '555-0114',
    email: 'barbara.lewis@email.com',
    medicalRecordNumber: 'MRN-014',
    registrationDate: '2019-09-03',
  },
  {
    id: '15',
    name: 'Matthew Robinson',
    dateOfBirth: '1986-11-14',
    phoneNumber: '555-0115',
    email: 'matthew.robinson@email.com',
    medicalRecordNumber: 'MRN-015',
    registrationDate: '2020-12-08',
  },
];

/**
 * Sample visit data for each patient
 * Contains realistic medical visit records
 */
export const sampleVisits = [
  // John Smith's visits
  {
    id: 'v1',
    patientId: '1',
    date: '2023-01-15',
    reason: 'Annual checkup',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'All vitals normal. Continue regular exercise.',
  },
  {
    id: 'v2',
    patientId: '1',
    date: '2023-06-20',
    reason: 'Flu symptoms',
    diagnosis: 'Influenza A',
    treatment: 'Rest and fluids, antiviral medication',
    notes: 'Prescribed oseltamivir. Follow up in 7 days.',
  },
  {
    id: 'v3',
    patientId: '1',
    date: '2024-02-10',
    reason: 'Follow-up checkup',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'Recovered from flu. All tests normal.',
  },

  // Sarah Johnson's visits
  {
    id: 'v4',
    patientId: '2',
    date: '2023-03-12',
    reason: 'Back pain',
    diagnosis: 'Muscle strain',
    treatment: 'Physical therapy recommended',
    notes: 'Advised stretching exercises and pain management.',
  },
  {
    id: 'v5',
    patientId: '2',
    date: '2023-08-05',
    reason: 'Allergic reaction',
    diagnosis: 'Seasonal allergies',
    treatment: 'Antihistamine prescribed',
    notes: 'Patient responding well to treatment.',
  },
  {
    id: 'v6',
    patientId: '2',
    date: '2024-01-20',
    reason: 'Routine checkup',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'No complaints. All tests normal.',
  },
  {
    id: 'v7',
    patientId: '2',
    date: '2024-05-15',
    reason: 'Vaccination',
    diagnosis: 'N/A',
    treatment: 'Flu vaccine administered',
    notes: 'No adverse reactions observed.',
  },

  // Michael Brown's visits
  {
    id: 'v8',
    patientId: '3',
    date: '2023-02-18',
    reason: 'High blood pressure',
    diagnosis: 'Hypertension',
    treatment: 'Medication prescribed',
    notes: 'Started on ACE inhibitor. Monitor BP weekly.',
  },
  {
    id: 'v9',
    patientId: '3',
    date: '2023-09-10',
    reason: 'Follow-up for hypertension',
    diagnosis: 'Hypertension - controlled',
    treatment: 'Continue current medication',
    notes: 'BP readings improved. Continue monitoring.',
  },
  {
    id: 'v10',
    patientId: '3',
    date: '2024-03-05',
    reason: 'Annual physical',
    diagnosis: 'Hypertension - stable',
    treatment: 'Continue medication',
    notes: 'BP well controlled. Annual labs ordered.',
  },

  // Emily Davis's visits
  {
    id: 'v11',
    patientId: '4',
    date: '2023-04-22',
    reason: 'Migraine headaches',
    diagnosis: 'Chronic migraine',
    treatment: 'Preventive medication',
    notes: 'Started on preventive therapy. Follow up in 3 months.',
  },
  {
    id: 'v12',
    patientId: '4',
    date: '2023-11-08',
    reason: 'Migraine follow-up',
    diagnosis: 'Migraine - improving',
    treatment: 'Continue current treatment',
    notes: 'Frequency reduced. Patient satisfied with progress.',
  },

  // James Wilson's visits
  {
    id: 'v13',
    patientId: '5',
    date: '2022-12-15',
    reason: 'Diabetes management',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Metformin prescribed',
    notes: 'HbA1c elevated. Dietary counseling provided.',
  },
  {
    id: 'v14',
    patientId: '5',
    date: '2023-06-10',
    reason: 'Diabetes follow-up',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Adjust medication',
    notes: 'HbA1c improved. Continue current regimen.',
  },
  {
    id: 'v15',
    patientId: '5',
    date: '2023-12-20',
    reason: 'Annual diabetic checkup',
    diagnosis: 'Type 2 Diabetes - controlled',
    treatment: 'Continue medication',
    notes: 'Good glycemic control. Annual eye exam scheduled.',
  },
  {
    id: 'v16',
    patientId: '5',
    date: '2024-06-15',
    reason: 'Diabetes management',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Continue treatment',
    notes: 'Patient maintaining good control with diet and exercise.',
  },

  // Jennifer Martinez's visits
  {
    id: 'v17',
    patientId: '6',
    date: '2023-05-08',
    reason: 'Prenatal visit',
    diagnosis: 'Healthy pregnancy',
    treatment: 'Prenatal vitamins',
    notes: 'First trimester. All tests normal.',
  },
  {
    id: 'v18',
    patientId: '6',
    date: '2023-09-22',
    reason: 'Prenatal checkup',
    diagnosis: 'Healthy pregnancy',
    treatment: 'Continue prenatal care',
    notes: 'Second trimester progressing well.',
  },
  {
    id: 'v19',
    patientId: '6',
    date: '2024-01-12',
    reason: 'Postpartum checkup',
    diagnosis: 'Healthy postpartum',
    treatment: 'None required',
    notes: 'Recovery progressing well. Baby healthy.',
  },

  // Robert Taylor's visits
  {
    id: 'v20',
    patientId: '7',
    date: '2023-03-30',
    reason: 'Knee pain',
    diagnosis: 'Osteoarthritis',
    treatment: 'Physical therapy and pain management',
    notes: 'X-ray shows moderate arthritis. Consider injections if PT fails.',
  },
  {
    id: 'v21',
    patientId: '7',
    date: '2023-10-15',
    reason: 'Knee follow-up',
    diagnosis: 'Osteoarthritis',
    treatment: 'Continue PT',
    notes: 'Some improvement with therapy. Continue current plan.',
  },
  {
    id: 'v22',
    patientId: '7',
    date: '2024-04-20',
    reason: 'Annual checkup',
    diagnosis: 'Osteoarthritis - stable',
    treatment: 'Continue management',
    notes: 'Pain manageable with current treatment.',
  },

  // Linda Anderson's visits
  {
    id: 'v23',
    patientId: '8',
    date: '2023-07-11',
    reason: 'Anxiety symptoms',
    diagnosis: 'Generalized anxiety disorder',
    treatment: 'Counseling and medication',
    notes: 'Referred to mental health specialist.',
  },
  {
    id: 'v24',
    patientId: '8',
    date: '2024-01-25',
    reason: 'Anxiety follow-up',
    diagnosis: 'Anxiety - improving',
    treatment: 'Continue therapy',
    notes: 'Patient reports improvement with treatment.',
  },

  // David Thomas's visits
  {
    id: 'v25',
    patientId: '9',
    date: '2023-02-28',
    reason: 'Chest pain',
    diagnosis: 'Acid reflux',
    treatment: 'Proton pump inhibitor',
    notes: 'EKG normal. GERD suspected. Lifestyle modifications advised.',
  },
  {
    id: 'v26',
    patientId: '9',
    date: '2023-08-14',
    reason: 'Reflux follow-up',
    diagnosis: 'GERD - controlled',
    treatment: 'Continue medication',
    notes: 'Symptoms resolved with treatment.',
  },
  {
    id: 'v27',
    patientId: '9',
    date: '2024-02-19',
    reason: 'Annual physical',
    diagnosis: 'Healthy',
    treatment: 'Continue GERD medication',
    notes: 'Overall health good. No new concerns.',
  },

  // Mary Jackson's visits
  {
    id: 'v28',
    patientId: '10',
    date: '2023-04-05',
    reason: 'Asthma symptoms',
    diagnosis: 'Asthma',
    treatment: 'Inhaler prescribed',
    notes: 'Started on rescue and maintenance inhalers.',
  },
  {
    id: 'v29',
    patientId: '10',
    date: '2023-10-20',
    reason: 'Asthma checkup',
    diagnosis: 'Asthma - well controlled',
    treatment: 'Continue inhalers',
    notes: 'Peak flow improved. Good compliance.',
  },
  {
    id: 'v30',
    patientId: '10',
    date: '2024-04-12',
    reason: 'Asthma follow-up',
    diagnosis: 'Asthma - stable',
    treatment: 'Continue treatment',
    notes: 'No exacerbations. Excellent control.',
  },

  // Christopher White's visits
  {
    id: 'v31',
    patientId: '11',
    date: '2023-06-18',
    reason: 'Sports injury',
    diagnosis: 'Sprained ankle',
    treatment: 'RICE protocol, pain medication',
    notes: 'Grade 2 sprain. Follow up in 2 weeks.',
  },
  {
    id: 'v32',
    patientId: '11',
    date: '2024-01-09',
    reason: 'Annual sports physical',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'Cleared for athletic activities.',
  },

  // Patricia Harris's visits
  {
    id: 'v33',
    patientId: '12',
    date: '2023-05-22',
    reason: 'Thyroid issues',
    diagnosis: 'Hypothyroidism',
    treatment: 'Levothyroxine prescribed',
    notes: 'TSH elevated. Started on replacement therapy.',
  },
  {
    id: 'v34',
    patientId: '12',
    date: '2023-11-30',
    reason: 'Thyroid follow-up',
    diagnosis: 'Hypothyroidism - controlled',
    treatment: 'Continue medication',
    notes: 'TSH normalized. Dose appropriate.',
  },
  {
    id: 'v35',
    patientId: '12',
    date: '2024-05-28',
    reason: 'Thyroid checkup',
    diagnosis: 'Hypothyroidism - stable',
    treatment: 'Continue treatment',
    notes: 'Annual thyroid panel normal.',
  },

  // Daniel Clark's visits
  {
    id: 'v36',
    patientId: '13',
    date: '2023-03-16',
    reason: 'Skin rash',
    diagnosis: 'Eczema',
    treatment: 'Topical steroid cream',
    notes: 'Prescribed hydrocortisone. Avoid irritants.',
  },
  {
    id: 'v37',
    patientId: '13',
    date: '2023-09-07',
    reason: 'Eczema flare-up',
    diagnosis: 'Eczema',
    treatment: 'Stronger topical medication',
    notes: 'Increased steroid potency. Moisturize regularly.',
  },
  {
    id: 'v38',
    patientId: '13',
    date: '2024-03-14',
    reason: 'Dermatology follow-up',
    diagnosis: 'Eczema - improving',
    treatment: 'Continue treatment',
    notes: 'Rash clearing. Good response to therapy.',
  },

  // Barbara Lewis's visits
  {
    id: 'v39',
    patientId: '14',
    date: '2023-01-28',
    reason: 'Vision problems',
    diagnosis: 'Presbyopia',
    treatment: 'Reading glasses recommended',
    notes: 'Age-related vision change. Referred to optometry.',
  },
  {
    id: 'v40',
    patientId: '14',
    date: '2023-07-19',
    reason: 'Headaches',
    diagnosis: 'Tension headaches',
    treatment: 'Stress management',
    notes: 'Related to work stress. Relaxation techniques advised.',
  },
  {
    id: 'v41',
    patientId: '14',
    date: '2024-02-05',
    reason: 'Annual checkup',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'Overall health excellent. Continue current lifestyle.',
  },

  // Matthew Robinson's visits
  {
    id: 'v42',
    patientId: '15',
    date: '2023-04-14',
    reason: 'Sleep problems',
    diagnosis: 'Insomnia',
    treatment: 'Sleep hygiene counseling',
    notes: 'Recommended sleep schedule and lifestyle changes.',
  },
  {
    id: 'v43',
    patientId: '15',
    date: '2023-10-28',
    reason: 'Sleep follow-up',
    diagnosis: 'Insomnia - improving',
    treatment: 'Continue behavioral therapy',
    notes: 'Sleep quality better. Avoid medications if possible.',
  },
  {
    id: 'v44',
    patientId: '15',
    date: '2024-05-10',
    reason: 'Wellness visit',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'Sleep normalized. Overall health good.',
  },
  {
    id: 'v45',
    patientId: '15',
    date: '2025-01-15',
    reason: 'Routine checkup',
    diagnosis: 'Healthy',
    treatment: 'None required',
    notes: 'All vitals within normal range.',
  },
];

/**
 * Get all sample data combined
 * @returns {Object} - Object containing patients array with embedded visits
 */
export const getSampleData = () => {
  // Add visits to each patient
  const patientsWithVisits = samplePatients.map(patient => ({
    ...patient,
    visits: sampleVisits.filter(visit => visit.patientId === patient.id),
  }));

  return patientsWithVisits;
};
