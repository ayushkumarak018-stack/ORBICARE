export type UserRole = 'elderly' | 'family' | 'caregiver' | 'doctor';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  priorityOrder: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  city?: string;
  state?: string;
  patientId?: string; // Links family/caregiver/doctor to the elderly patient
  relationshipToPatient?: string; // e.g. "Daughter", "Visiting Caregiver", "Consulting Cardiologist"
  passwordHash?: string;
  createdAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  emergencyAddress?: string;
  emergencyGateCode?: string;
  preferredLanguage?: string;
  textSizePreference?: 'normal' | 'large' | 'xl';
  highContrast?: boolean;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string; // e.g. "Twice daily", "Once at night"
  timesOfDay: string[]; // ["08:00", "20:00"]
  instructions?: string; // e.g. "Take after food with water"
  prescribingDoctor?: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'archived';
  reminderEnabled: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  medicationName: string;
  userId: string;
  scheduledTime: string;
  recordedAt?: string;
  status: 'taken' | 'skipped' | 'snoozed' | 'pending';
  notes?: string;
  recordedByName?: string;
}

export interface Meal {
  id: string;
  userId: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  loggedAt: string;
  portion: string;
  ingredients: string[];
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  notes?: string;
  isAiScanned: boolean;
  aiConfidence?: number; // 0 - 100
  imageUrl?: string;
}

export type VitalType = 
  | 'blood_pressure' 
  | 'heart_rate' 
  | 'blood_glucose' 
  | 'oxygen_saturation' 
  | 'temperature' 
  | 'weight';

export interface VitalReading {
  id: string;
  userId: string;
  type: VitalType;
  value: string; // e.g. "128/82" or "98" or "115"
  numericValue: number; // For plotting (e.g. systolic 128, or HR 74, or glucose 110)
  secondaryNumericValue?: number; // Diastolic for BP (e.g. 82)
  unit: string;
  recordedAt: string;
  context?: string; // e.g. "Fasting", "Post-walk", "Resting"
  notes?: string;
  isAbnormal?: boolean;
  recordedByName?: string;
}

export interface AlertRule {
  id: string;
  userId: string;
  vitalType: VitalType;
  condition: 'gt' | 'lt' | 'between';
  thresholdMin?: number;
  thresholdMax?: number;
  severity: 'warning' | 'critical';
  message: string;
  enabled: boolean;
}

export interface Alert {
  id: string;
  userId: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  vitalType?: VitalType;
  readingValue?: string;
  triggeredAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface MedicalReport {
  id: string;
  userId: string;
  title: string;
  documentType: 'Blood Test' | 'Lipid Profile' | 'ECG' | 'Prescription' | 'Discharge Summary' | 'Scan Report' | 'Other';
  documentDate: string;
  fileUrl: string;
  fileSize: string;
  extractedText?: string;
  aiSummary?: string;
  uploadedAt: string;
  sharedWithUserIds: string[];
}

export interface Appointment {
  id: string;
  userId: string;
  doctorName: string;
  specialty: string;
  clinicOrHospital: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: 'in_person' | 'telehealth';
  addressOrLink?: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  sharedWithFamily: boolean;
}

export interface DietPlanMeal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  description: string;
  calories: number;
  completed: boolean;
}

export interface DietPlan {
  id: string;
  userId: string;
  dayOfWeek: string; // "Monday", "Tuesday", etc.
  date: string;
  targetCalories: number;
  dietaryRestrictions: string[];
  meals: DietPlanMeal[];
}

export interface FamilyUpdate {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  category: 'vital' | 'medication' | 'meal' | 'note' | 'appointment' | 'alert' | 'sos';
  createdAt: string;
  likes: number;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'medication' | 'vital' | 'appointment' | 'family' | 'system' | 'emergency';
  linkUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface EmergencyEvent {
  id: string;
  userId: string;
  patientName: string;
  triggeredAt: string;
  resolvedAt?: string;
  status: 'active' | 'resolved';
  alertedContacts: { name: string; phone: string; status: 'dispatched' | 'confirmed' }[];
  locationNotes: string;
  dispatchHelpline: string;
}
