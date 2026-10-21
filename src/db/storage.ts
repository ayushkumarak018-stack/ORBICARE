import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { 
  User, 
  UserProfile, 
  Medication, 
  MedicationLog, 
  Meal, 
  VitalReading, 
  AlertRule, 
  Alert, 
  MedicalReport, 
  Appointment, 
  DietPlan, 
  FamilyUpdate, 
  InAppNotification, 
  EmergencyContact, 
  EmergencyEvent 
} from '@/types';

interface DatabaseSchema {
  users: User[];
  profiles: UserProfile[];
  medications: Medication[];
  medicationLogs: MedicationLog[];
  meals: Meal[];
  vitalReadings: VitalReading[];
  alertRules: AlertRule[];
  alerts: Alert[];
  medicalReports: MedicalReport[];
  appointments: Appointment[];
  dietPlans: DietPlan[];
  familyUpdates: FamilyUpdate[];
  notifications: InAppNotification[];
  emergencyContacts: EmergencyContact[];
  emergencyEvents: EmergencyEvent[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'orbicare-db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getInitialDemoData(): DatabaseSchema {
  // Pre-hashed password for "orbicare123"
  const defaultPasswordHash = bcrypt.hashSync('orbicare123', 10);

  const ramakantId = 'user-ramakant-01';
  const ananyaId = 'user-ananya-02';
  const sunitaId = 'user-sunita-03';
  const doctorId = 'user-dr-rajesh-04';

  const users: User[] = [
    {
      id: ramakantId,
      name: 'Ramakant Sharma',
      email: 'ramakant@orbicare.demo',
      role: 'elderly',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      phone: '+91 94120 12345',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      patientId: ramakantId,
      relationshipToPatient: 'Self (Care Recipient)',
      createdAt: '2026-09-01T08:00:00Z',
    },
    {
      id: ananyaId,
      name: 'Ananya Sharma',
      email: 'ananya@orbicare.demo',
      role: 'family',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98765 43210',
      city: 'Bengaluru',
      state: 'Karnataka',
      patientId: ramakantId,
      relationshipToPatient: 'Daughter (Primary Guardian)',
      createdAt: '2026-09-01T08:15:00Z',
    },
    {
      id: sunitaId,
      name: 'Sunita Devi',
      email: 'sunita@orbicare.demo',
      role: 'caregiver',
      avatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
      phone: '+91 94567 89012',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      patientId: ramakantId,
      relationshipToPatient: 'Visiting Geriatric Nurse',
      createdAt: '2026-09-05T10:00:00Z',
    },
    {
      id: doctorId,
      name: 'Dr. Rajesh Gupta',
      email: 'dr.gupta@orbicare.demo',
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98111 22334',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      patientId: ramakantId,
      relationshipToPatient: 'Senior Cardiologist & Physician',
      createdAt: '2026-09-10T11:00:00Z',
    },
  ];

  const profiles: UserProfile[] = [
    {
      id: 'profile-ramakant',
      userId: ramakantId,
      age: 72,
      gender: 'Male',
      bloodGroup: 'B+',
      allergies: ['Penicillin', 'Peanuts (Mild)'],
      chronicConditions: ['Primary Hypertension', 'Type-2 Diabetes Mellitus'],
      emergencyAddress: 'House 42, Krishna Nagar, Near Radha Kund Road, Mathura, UP - 281001',
      emergencyGateCode: 'Gate 2 Bell #3',
      preferredLanguage: 'English / Hindi',
      textSizePreference: 'large',
      highContrast: false,
    },
  ];

  const medications: Medication[] = [
    {
      id: 'med-01',
      userId: ramakantId,
      name: 'Telmisartan 40mg',
      dosage: '1 Tablet (40mg)',
      frequency: 'Once Daily',
      timesOfDay: ['08:00'],
      instructions: 'Take in the morning after breakfast with warm water',
      prescribingDoctor: 'Dr. Rajesh Gupta',
      startDate: '2026-01-15',
      status: 'active',
      reminderEnabled: true,
    },
    {
      id: 'med-02',
      userId: ramakantId,
      name: 'Metformin 500mg SR',
      dosage: '1 Tablet (500mg Sustained Release)',
      frequency: 'Twice Daily',
      timesOfDay: ['08:30', '20:30'],
      instructions: 'Take immediately after morning and night meals to avoid gastric discomfort',
      prescribingDoctor: 'Dr. Rajesh Gupta',
      startDate: '2026-02-10',
      status: 'active',
      reminderEnabled: true,
    },
    {
      id: 'med-03',
      userId: ramakantId,
      name: 'Atorvastatin 10mg',
      dosage: '1 Tablet (10mg)',
      frequency: 'Once Daily at Bedtime',
      timesOfDay: ['21:30'],
      instructions: 'Take before sleep for lipid management',
      prescribingDoctor: 'Dr. Rajesh Gupta',
      startDate: '2026-03-01',
      status: 'active',
      reminderEnabled: true,
    },
    {
      id: 'med-04',
      userId: ramakantId,
      name: 'Vitamin D3 60,000 IU',
      dosage: '1 Capsule Weekly',
      frequency: 'Once Weekly (Sundays)',
      timesOfDay: ['10:00'],
      instructions: 'Take after milk or breakfast on Sundays',
      prescribingDoctor: 'Dr. Rajesh Gupta',
      startDate: '2026-05-01',
      status: 'active',
      reminderEnabled: true,
    },
  ];

  const todayStr = '2026-10-21';

  const medicationLogs: MedicationLog[] = [
    {
      id: 'log-01',
      medicationId: 'med-01',
      medicationName: 'Telmisartan 40mg',
      userId: ramakantId,
      scheduledTime: `${todayStr}T08:00:00`,
      recordedAt: `${todayStr}T08:12:00Z`,
      status: 'taken',
      notes: 'Taken on time after oats breakfast',
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'log-02',
      medicationId: 'med-02',
      medicationName: 'Metformin 500mg SR',
      userId: ramakantId,
      scheduledTime: `${todayStr}T08:30:00`,
      recordedAt: `${todayStr}T08:35:00Z`,
      status: 'taken',
      notes: 'Taken after breakfast',
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'log-03',
      medicationId: 'med-02',
      medicationName: 'Metformin 500mg SR',
      userId: ramakantId,
      scheduledTime: `${todayStr}T20:30:00`,
      status: 'pending',
      notes: 'Scheduled for tonight after dinner',
    },
    {
      id: 'log-04',
      medicationId: 'med-03',
      medicationName: 'Atorvastatin 10mg',
      userId: ramakantId,
      scheduledTime: `${todayStr}T21:30:00`,
      status: 'pending',
      notes: 'Scheduled for bedtime',
    },
  ];

  const meals: Meal[] = [
    {
      id: 'meal-01',
      userId: ramakantId,
      name: 'Steel-Cut Oats with Almonds & Papaya',
      mealType: 'breakfast',
      loggedAt: `${todayStr}T07:45:00Z`,
      portion: '1 medium bowl (250g)',
      ingredients: ['Steel-cut oats', 'Skim milk', 'Almonds (5)', 'Fresh papaya slices', 'Chia seeds'],
      calories: 340,
      protein: 12,
      carbs: 48,
      fat: 9,
      fiber: 8,
      notes: 'Low glycemic index, low sodium, prepared with mild cinnamon',
      isAiScanned: true,
      aiConfidence: 94,
      imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'meal-02',
      userId: ramakantId,
      name: '2 Multigrain Rotis, Yellow Moong Dal, Lauki Curry & Salad',
      mealType: 'lunch',
      loggedAt: '2026-10-20T13:00:00Z',
      portion: '1 regular thali',
      ingredients: ['Multigrain flour', 'Yellow moong dal', 'Bottle gourd (lauki)', 'Cucumber & tomato salad', 'Curd'],
      calories: 460,
      protein: 18,
      carbs: 65,
      fat: 11,
      fiber: 10,
      notes: 'Low oil, rock salt used in minimal quantity',
      isAiScanned: false,
    },
    {
      id: 'meal-03',
      userId: ramakantId,
      name: 'Vegetable Khichdi with Steamed Beans & Curd',
      mealType: 'dinner',
      loggedAt: '2026-10-20T20:00:00Z',
      portion: '1 plate (300g)',
      ingredients: ['Brown rice', 'Moong dal', 'Carrots', 'Green peas', 'Homemade curd'],
      calories: 380,
      protein: 14,
      carbs: 58,
      fat: 8,
      fiber: 7,
      notes: 'Light dinner for easy digestion',
      isAiScanned: true,
      aiConfidence: 91,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const vitalReadings: VitalReading[] = [
    {
      id: 'vital-01',
      userId: ramakantId,
      type: 'blood_pressure',
      value: '126/82',
      numericValue: 126,
      secondaryNumericValue: 82,
      unit: 'mmHg',
      recordedAt: `${todayStr}T08:15:00Z`,
      context: 'Resting (Morning)',
      notes: 'Checked after morning walk and 15 mins rest. Within target range.',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'vital-02',
      userId: ramakantId,
      type: 'blood_glucose',
      value: '114',
      numericValue: 114,
      unit: 'mg/dL',
      recordedAt: `${todayStr}T07:30:00Z`,
      context: 'Fasting',
      notes: 'Fasting glucose within doctor recommended 90-120 range',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'vital-03',
      userId: ramakantId,
      type: 'oxygen_saturation',
      value: '98',
      numericValue: 98,
      unit: '% SpO2',
      recordedAt: `${todayStr}T08:18:00Z`,
      context: 'Resting',
      notes: 'Pulse oximeter reading, normal',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'vital-04',
      userId: ramakantId,
      type: 'heart_rate',
      value: '72',
      numericValue: 72,
      unit: 'bpm',
      recordedAt: `${todayStr}T08:18:00Z`,
      context: 'Resting',
      notes: 'Regular rhythm',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'vital-05',
      userId: ramakantId,
      type: 'blood_pressure',
      value: '138/88',
      numericValue: 138,
      secondaryNumericValue: 88,
      unit: 'mmHg',
      recordedAt: '2026-10-20T19:30:00Z',
      context: 'Evening',
      notes: 'Mildly elevated after stairs, normalized after resting',
      isAbnormal: true,
      recordedByName: 'Sunita Devi (Nurse)',
    },
    {
      id: 'vital-06',
      userId: ramakantId,
      type: 'blood_pressure',
      value: '124/80',
      numericValue: 124,
      secondaryNumericValue: 80,
      unit: 'mmHg',
      recordedAt: '2026-10-19T08:30:00Z',
      context: 'Resting (Morning)',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
    {
      id: 'vital-07',
      userId: ramakantId,
      type: 'blood_glucose',
      value: '148',
      numericValue: 148,
      unit: 'mg/dL',
      recordedAt: '2026-10-19T15:00:00Z',
      context: '2 Hours Post-Lunch',
      isAbnormal: false,
      recordedByName: 'Sunita Devi (Nurse)',
    },
    {
      id: 'vital-08',
      userId: ramakantId,
      type: 'weight',
      value: '68.4',
      numericValue: 68.4,
      unit: 'kg',
      recordedAt: '2026-10-18T08:00:00Z',
      context: 'Morning fasting',
      notes: 'Weight stable over past 3 months',
      isAbnormal: false,
      recordedByName: 'Ramakant Sharma',
    },
  ];

  const alertRules: AlertRule[] = [
    {
      id: 'rule-01',
      userId: ramakantId,
      vitalType: 'blood_pressure',
      condition: 'gt',
      thresholdMin: 140,
      severity: 'warning',
      message: 'Systolic blood pressure exceeded 140 mmHg. Follow resting protocol and notify family.',
      enabled: true,
    },
    {
      id: 'rule-02',
      userId: ramakantId,
      vitalType: 'blood_glucose',
      condition: 'gt',
      thresholdMin: 180,
      severity: 'warning',
      message: 'Blood glucose exceeded 180 mg/dL. Review recent meal carbohydrate intake.',
      enabled: true,
    },
    {
      id: 'rule-03',
      userId: ramakantId,
      vitalType: 'oxygen_saturation',
      condition: 'lt',
      thresholdMin: 94,
      severity: 'critical',
      message: 'SpO2 dropped below 94%. Check breathing comfort and reach out for medical support.',
      enabled: true,
    },
  ];

  const alerts: Alert[] = [
    {
      id: 'alert-01',
      userId: ramakantId,
      title: 'Blood Pressure Elevated on Oct 20 Evening',
      message: 'Systolic reading was 138/88 mmHg. Nurse Sunita checked after 20 mins of rest and reading settled to 128/82.',
      severity: 'warning',
      vitalType: 'blood_pressure',
      readingValue: '138/88 mmHg',
      triggeredAt: '2026-10-20T19:32:00Z',
      status: 'reviewed',
    },
  ];

  const medicalReports: MedicalReport[] = [
    {
      id: 'rep-01',
      userId: ramakantId,
      title: 'Comprehensive Metabolic Panel & HbA1c',
      documentType: 'Blood Test',
      documentDate: '2026-09-18',
      fileUrl: '/mock-reports/hba1c-report-sept2026.pdf',
      fileSize: '1.4 MB',
      extractedText: 'Patient: Ramakant Sharma, Age: 72, Gender: M. HbA1c: 6.8% (Target: < 7.0% for geriatric diabetic control). Fasting Blood Sugar: 112 mg/dL. Serum Creatinine: 1.05 mg/dL (Normal: 0.7 - 1.3). eGFR: 74 mL/min/1.73m2. Blood Urea Nitrogen: 18 mg/dL. Impression: Good glycemic control maintained.',
      aiSummary: 'HbA1c level is well-controlled at 6.8%, meeting the geriatric clinical target. Kidney function parameters (Creatinine 1.05, eGFR 74) are stable. Continue current Metformin dosage and active walking routine.',
      uploadedAt: '2026-09-19T14:20:00Z',
      sharedWithUserIds: [ananyaId, sunitaId, doctorId],
    },
    {
      id: 'rep-02',
      userId: ramakantId,
      title: 'Lipid Profile & 12-Lead ECG Review',
      documentType: 'Lipid Profile',
      documentDate: '2026-08-12',
      fileUrl: '/mock-reports/lipid-ecg-aug2026.pdf',
      fileSize: '2.1 MB',
      extractedText: 'Total Cholesterol: 178 mg/dL. Triglycerides: 145 mg/dL. HDL (Good): 44 mg/dL. LDL (Calculated): 105 mg/dL. 12-Lead ECG: Normal sinus rhythm with heart rate 72 bpm. No ST-T segment elevation or ischemic changes observed. Impression: Stable cardiovascular profile under statin therapy.',
      aiSummary: 'Cholesterol and triglyceride readings are well within therapeutic targets under Atorvastatin 10mg. ECG confirms normal sinus rhythm without acute cardiac irregularities.',
      uploadedAt: '2026-08-14T10:00:00Z',
      sharedWithUserIds: [ananyaId, doctorId],
    },
  ];

  const appointments: Appointment[] = [
    {
      id: 'appt-01',
      userId: ramakantId,
      doctorName: 'Dr. Rajesh Gupta',
      specialty: 'Cardiology & General Medicine',
      clinicOrHospital: 'Mathura Heart & Diabetes Clinic, Krishna Nagar',
      appointmentDate: '2026-10-28',
      appointmentTime: '11:30 AM',
      locationType: 'in_person',
      addressOrLink: 'Suite 204, Krishna Nagar Commercial Complex, Mathura',
      notes: 'Quarterly review of blood pressure control and refill for Telmisartan and Metformin.',
      status: 'upcoming',
      sharedWithFamily: true,
    },
    {
      id: 'appt-02',
      userId: ramakantId,
      doctorName: 'Dr. Sneha Verma',
      specialty: 'Ophthalmology (Retinal Screening)',
      clinicOrHospital: 'City Eye Center, Civil Lines',
      appointmentDate: '2026-11-12',
      appointmentTime: '04:00 PM',
      locationType: 'in_person',
      addressOrLink: 'Plot 12, Civil Lines Road, Mathura',
      notes: 'Annual diabetic retinopathy screening checkup.',
      status: 'upcoming',
      sharedWithFamily: true,
    },
  ];

  const dietPlans: DietPlan[] = [
    {
      id: 'plan-01',
      userId: ramakantId,
      dayOfWeek: 'Wednesday',
      date: todayStr,
      targetCalories: 1550,
      dietaryRestrictions: ['Diabetic friendly', 'Low sodium (< 2g/day)', 'Mild spices', 'Vegetarian'],
      meals: [
        {
          id: 'dp-meal-1',
          type: 'breakfast',
          title: 'Oatmeal Porridge with Almonds & Flaxseeds',
          description: 'Cooked with skim milk, topped with 5 crushed almonds and 1 tsp roasted flaxseeds.',
          calories: 340,
          completed: true,
        },
        {
          id: 'dp-meal-2',
          type: 'snack',
          title: 'Mid-Morning Tender Coconut Water & Walnuts',
          description: 'Natural hydration with essential electrolytes, 2 walnut halves.',
          calories: 120,
          completed: true,
        },
        {
          id: 'dp-meal-3',
          type: 'lunch',
          title: '2 Phulkas + Sprouted Moong Dal + Bhindi Bhaji',
          description: 'High-fiber lunch with cucumber and mint raita (low-fat curd).',
          calories: 480,
          completed: false,
        },
        {
          id: 'dp-meal-4',
          type: 'dinner',
          title: 'Steamed Vegetable Dalia Khichdi & Curd',
          description: 'Broken wheat with diced carrots, beans, and yellow lentils. Light on the stomach.',
          calories: 360,
          completed: false,
        },
      ],
    },
  ];

  const familyUpdates: FamilyUpdate[] = [
    {
      id: 'fup-01',
      authorId: ramakantId,
      authorName: 'Ramakant Sharma',
      authorRole: 'elderly',
      content: 'Finished my morning 30-minute garden walk and took morning BP (126/82). Feeling energetic today!',
      category: 'vital',
      createdAt: `${todayStr}T08:25:00Z`,
      likes: 3,
    },
    {
      id: 'fup-02',
      authorId: ananyaId,
      authorName: 'Ananya Sharma',
      authorRole: 'family',
      content: 'Great numbers Papa! So glad to see your BP steady. Don’t forget to hydrate after your walk. Love you from Bengaluru!',
      category: 'note',
      createdAt: `${todayStr}T08:35:00Z`,
      likes: 2,
    },
    {
      id: 'fup-03',
      authorId: sunitaId,
      authorName: 'Sunita Devi (Nurse)',
      authorRole: 'caregiver',
      content: 'I visited Uncle Ji at 8:30 AM. Medication Telmisartan and Metformin confirmed taken. Morning vitals recorded.',
      category: 'medication',
      createdAt: `${todayStr}T08:40:00Z`,
      likes: 2,
    },
    {
      id: 'fup-04',
      authorId: doctorId,
      authorName: 'Dr. Rajesh Gupta',
      authorRole: 'doctor',
      content: 'Reviewing recent BP logs: overall 7-day average of 127/83 is excellent. Let’s review everything in person next Wednesday Oct 28.',
      category: 'appointment',
      createdAt: '2026-10-20T17:10:00Z',
      likes: 4,
    },
  ];

  const notifications: InAppNotification[] = [
    {
      id: 'notif-01',
      userId: ramakantId,
      title: 'Morning Medicine Reminder',
      message: 'Time for your Telmisartan 40mg and Metformin 500mg SR with breakfast.',
      category: 'medication',
      linkUrl: '/dashboard/medications',
      isRead: true,
      createdAt: `${todayStr}T08:00:00Z`,
    },
    {
      id: 'notif-02',
      userId: ananyaId,
      title: 'Medication Check-in Confirmed',
      message: 'Ramakant Sharma confirmed taking morning Telmisartan and Metformin.',
      category: 'medication',
      linkUrl: '/dashboard/medications',
      isRead: false,
      createdAt: `${todayStr}T08:36:00Z`,
    },
    {
      id: 'notif-03',
      userId: ananyaId,
      title: 'New Vital Reading Recorded',
      message: 'BP reading of 126/82 mmHg recorded by Ramakant (Normal range).',
      category: 'vital',
      linkUrl: '/dashboard/vitals',
      isRead: false,
      createdAt: `${todayStr}T08:16:00Z`,
    },
    {
      id: 'notif-04',
      userId: ramakantId,
      title: 'Upcoming Cardiology Follow-up',
      message: 'Appointment with Dr. Rajesh Gupta on Oct 28, 11:30 AM at Mathura Clinic.',
      category: 'appointment',
      linkUrl: '/dashboard/appointments',
      isRead: false,
      createdAt: '2026-10-20T10:00:00Z',
    },
  ];

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 'emg-01',
      name: 'Ananya Sharma (Daughter)',
      relationship: 'Daughter / Bengaluru',
      phone: '+91 98765 43210',
      isPrimary: true,
      priorityOrder: 1,
    },
    {
      id: 'emg-02',
      name: 'Sunita Devi (Home Care Nurse)',
      relationship: 'Local Geriatric Caregiver',
      phone: '+91 94567 89012',
      isPrimary: false,
      priorityOrder: 2,
    },
    {
      id: 'emg-03',
      name: 'Dr. Rajesh Gupta (Physician)',
      relationship: 'Consulting Cardiologist',
      phone: '+91 98111 22334',
      isPrimary: false,
      priorityOrder: 3,
    },
    {
      id: 'emg-04',
      name: 'Mathura Emergency Ambulance Service',
      relationship: 'Emergency Medical Services (108 / 112)',
      phone: '108',
      isPrimary: false,
      priorityOrder: 4,
    },
  ];

  const emergencyEvents: EmergencyEvent[] = [];

  return {
    users,
    profiles,
    medications,
    medicationLogs,
    meals,
    vitalReadings,
    alertRules,
    alerts,
    medicalReports,
    appointments,
    dietPlans,
    familyUpdates,
    notifications,
    emergencyContacts,
    emergencyEvents,
  };
}

class OrbiCareStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse database file, reinitializing demo data', e);
    }
    const initial = getInitialDemoData();
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write database file', e);
    }
  }

  public resetDemoData(): DatabaseSchema {
    const initial = getInitialDemoData();
    this.data = initial;
    this.saveData(initial);
    return this.data;
  }

  // --- Users ---
  public getUsers(): User[] {
    return this.data.users;
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public addUser(user: User): User {
    this.data.users.push(user);
    this.saveData(this.data);
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.saveData(this.data);
    return this.data.users[idx];
  }

  // --- Profiles ---
  public getProfileByUserId(userId: string): UserProfile | undefined {
    return this.data.profiles.find(p => p.userId === userId);
  }

  public updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const idx = this.data.profiles.findIndex(p => p.userId === userId);
    if (idx !== -1) {
      this.data.profiles[idx] = { ...this.data.profiles[idx], ...updates };
      this.saveData(this.data);
      return this.data.profiles[idx];
    }
    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      userId,
      ...updates,
    };
    this.data.profiles.push(newProfile);
    this.saveData(this.data);
    return newProfile;
  }

  // --- Medications ---
  public getMedications(userId: string): Medication[] {
    return this.data.medications.filter(m => m.userId === userId);
  }

  public addMedication(med: Medication): Medication {
    this.data.medications.unshift(med);
    this.saveData(this.data);
    return med;
  }

  public updateMedication(id: string, updates: Partial<Medication>): Medication | undefined {
    const idx = this.data.medications.findIndex(m => m.id === id);
    if (idx === -1) return undefined;
    this.data.medications[idx] = { ...this.data.medications[idx], ...updates };
    this.saveData(this.data);
    return this.data.medications[idx];
  }

  public deleteMedication(id: string): boolean {
    const initialLen = this.data.medications.length;
    this.data.medications = this.data.medications.filter(m => m.id !== id);
    if (this.data.medications.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Medication Logs ---
  public getMedicationLogs(userId: string): MedicationLog[] {
    return this.data.medicationLogs.filter(l => l.userId === userId);
  }

  public addOrUpdateMedicationLog(log: MedicationLog): MedicationLog {
    const idx = this.data.medicationLogs.findIndex(l => l.id === log.id);
    if (idx !== -1) {
      this.data.medicationLogs[idx] = log;
    } else {
      this.data.medicationLogs.unshift(log);
    }
    this.saveData(this.data);
    return log;
  }

  // --- Meals ---
  public getMeals(userId: string): Meal[] {
    return this.data.meals.filter(m => m.userId === userId);
  }

  public addMeal(meal: Meal): Meal {
    this.data.meals.unshift(meal);
    this.saveData(this.data);
    return meal;
  }

  public updateMeal(id: string, updates: Partial<Meal>): Meal | undefined {
    const idx = this.data.meals.findIndex(m => m.id === id);
    if (idx === -1) return undefined;
    this.data.meals[idx] = { ...this.data.meals[idx], ...updates };
    this.saveData(this.data);
    return this.data.meals[idx];
  }

  public deleteMeal(id: string): boolean {
    const initialLen = this.data.meals.length;
    this.data.meals = this.data.meals.filter(m => m.id !== id);
    if (this.data.meals.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Vitals ---
  public getVitalReadings(userId: string): VitalReading[] {
    return this.data.vitalReadings.filter(v => v.userId === userId);
  }

  public addVitalReading(vital: VitalReading): VitalReading {
    this.data.vitalReadings.unshift(vital);
    this.saveData(this.data);
    return vital;
  }

  public deleteVitalReading(id: string): boolean {
    const initialLen = this.data.vitalReadings.length;
    this.data.vitalReadings = this.data.vitalReadings.filter(v => v.id !== id);
    if (this.data.vitalReadings.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Alert Rules & Alerts ---
  public getAlertRules(userId: string): AlertRule[] {
    return this.data.alertRules.filter(r => r.userId === userId);
  }

  public getAlerts(userId: string): Alert[] {
    return this.data.alerts.filter(a => a.userId === userId);
  }

  public addAlert(alert: Alert): Alert {
    this.data.alerts.unshift(alert);
    this.saveData(this.data);
    return alert;
  }

  public updateAlertStatus(id: string, status: 'new' | 'reviewed' | 'resolved'): Alert | undefined {
    const idx = this.data.alerts.findIndex(a => a.id === id);
    if (idx === -1) return undefined;
    this.data.alerts[idx].status = status;
    this.saveData(this.data);
    return this.data.alerts[idx];
  }

  // --- Medical Reports ---
  public getMedicalReports(userId: string): MedicalReport[] {
    return this.data.medicalReports.filter(r => r.userId === userId);
  }

  public addMedicalReport(report: MedicalReport): MedicalReport {
    this.data.medicalReports.unshift(report);
    this.saveData(this.data);
    return report;
  }

  public updateMedicalReport(id: string, updates: Partial<MedicalReport>): MedicalReport | undefined {
    const idx = this.data.medicalReports.findIndex(r => r.id === id);
    if (idx === -1) return undefined;
    this.data.medicalReports[idx] = { ...this.data.medicalReports[idx], ...updates };
    this.saveData(this.data);
    return this.data.medicalReports[idx];
  }

  public deleteMedicalReport(id: string): boolean {
    const initialLen = this.data.medicalReports.length;
    this.data.medicalReports = this.data.medicalReports.filter(r => r.id !== id);
    if (this.data.medicalReports.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Appointments ---
  public getAppointments(userId: string): Appointment[] {
    return this.data.appointments.filter(a => a.userId === userId);
  }

  public addAppointment(appointment: Appointment): Appointment {
    this.data.appointments.unshift(appointment);
    this.saveData(this.data);
    return appointment;
  }

  public updateAppointment(id: string, updates: Partial<Appointment>): Appointment | undefined {
    const idx = this.data.appointments.findIndex(a => a.id === id);
    if (idx === -1) return undefined;
    this.data.appointments[idx] = { ...this.data.appointments[idx], ...updates };
    this.saveData(this.data);
    return this.data.appointments[idx];
  }

  public deleteAppointment(id: string): boolean {
    const initialLen = this.data.appointments.length;
    this.data.appointments = this.data.appointments.filter(a => a.id !== id);
    if (this.data.appointments.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Diet Plans ---
  public getDietPlans(userId: string): DietPlan[] {
    return this.data.dietPlans.filter(d => d.userId === userId);
  }

  public updateDietPlanMeal(planId: string, mealId: string, completed: boolean): boolean {
    const plan = this.data.dietPlans.find(d => d.id === planId);
    if (!plan) return false;
    const meal = plan.meals.find(m => m.id === mealId);
    if (!meal) return false;
    meal.completed = completed;
    this.saveData(this.data);
    return true;
  }

  // --- Family Updates ---
  public getFamilyUpdates(): FamilyUpdate[] {
    return this.data.familyUpdates;
  }

  public addFamilyUpdate(update: FamilyUpdate): FamilyUpdate {
    this.data.familyUpdates.unshift(update);
    this.saveData(this.data);
    return update;
  }

  // --- Notifications ---
  public getNotifications(userId: string): InAppNotification[] {
    return this.data.notifications.filter(n => n.userId === userId);
  }

  public addNotification(notification: InAppNotification): InAppNotification {
    this.data.notifications.unshift(notification);
    this.saveData(this.data);
    return notification;
  }

  public markNotificationAsRead(id: string): boolean {
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public markAllNotificationsAsRead(userId: string): void {
    this.data.notifications.forEach(n => {
      if (n.userId === userId) {
        n.isRead = true;
      }
    });
    this.saveData(this.data);
  }

  // --- Emergency Contacts & Events ---
  public getEmergencyContacts(): EmergencyContact[] {
    return this.data.emergencyContacts;
  }

  public triggerEmergencySOS(event: EmergencyEvent): EmergencyEvent {
    this.data.emergencyEvents.unshift(event);
    // Broadcast notification to family members
    const notif: InAppNotification = {
      id: `notif-sos-${Date.now()}`,
      userId: 'user-ananya-02',
      title: '🚨 EMERGENCY SOS TRIGGERED',
      message: `Emergency SOS triggered for ${event.patientName} at ${event.locationNotes}. Contacts alerted.`,
      category: 'emergency',
      linkUrl: '/dashboard/sos',
      isRead: false,
      createdAt: event.triggeredAt,
    };
    this.data.notifications.unshift(notif);
    
    // Add to family activity feed
    const update: FamilyUpdate = {
      id: `sos-feed-${Date.now()}`,
      authorId: event.userId,
      authorName: event.patientName,
      authorRole: 'elderly',
      content: `🚨 Emergency SOS broadcast initiated at ${new Date(event.triggeredAt).toLocaleTimeString()}. Emergency contacts and local helpline notified.`,
      category: 'sos',
      createdAt: event.triggeredAt,
      likes: 0,
    };
    this.data.familyUpdates.unshift(update);

    this.saveData(this.data);
    return event;
  }
}

// Global singleton instance
export const db = new OrbiCareStore();
