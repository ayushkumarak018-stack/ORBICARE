import { 
  mysqlTable, 
  varchar, 
  text, 
  int, 
  boolean, 
  timestamp, 
  index, 
  json, 
  mysqlEnum 
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 191 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['elderly', 'family', 'caregiver', 'doctor']).notNull().default('elderly'),
  avatar: text('avatar'),
  phone: varchar('phone', { length: 32 }),
  city: varchar('city', { length: 64 }),
  state: varchar('state', { length: 64 }),
  patientId: varchar('patient_id', { length: 64 }),
  relationshipToPatient: varchar('relationship_to_patient', { length: 64 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('email_idx').on(table.email),
  index('role_idx').on(table.role),
  index('patient_id_idx').on(table.patientId),
]);

export const userProfiles = mysqlTable('user_profiles', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  age: int('age'),
  gender: varchar('gender', { length: 32 }),
  bloodGroup: varchar('blood_group', { length: 16 }),
  allergies: json('allergies').$type<string[]>(),
  chronicConditions: json('chronic_conditions').$type<string[]>(),
  emergencyAddress: text('emergency_address'),
  emergencyGateCode: varchar('emergency_gate_code', { length: 32 }),
  preferredLanguage: varchar('preferred_language', { length: 32 }).default('English'),
  textSizePreference: mysqlEnum('text_size_preference', ['normal', 'large', 'xl']).default('normal'),
  highContrast: boolean('high_contrast').default(false),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('profile_user_idx').on(table.userId),
]);

export const medications = mysqlTable('medications', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  name: varchar('name', { length: 128 }).notNull(),
  dosage: varchar('dosage', { length: 64 }).notNull(),
  frequency: varchar('frequency', { length: 64 }).notNull(),
  timesOfDay: json('times_of_day').$type<string[]>().notNull(),
  instructions: text('instructions'),
  prescribingDoctor: varchar('prescribing_doctor', { length: 128 }),
  startDate: varchar('start_date', { length: 32 }).notNull(),
  endDate: varchar('end_date', { length: 32 }),
  status: mysqlEnum('status', ['active', 'archived']).default('active').notNull(),
  reminderEnabled: boolean('reminder_enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('med_user_idx').on(table.userId),
  index('med_status_idx').on(table.status),
]);

export const medicationLogs = mysqlTable('medication_logs', {
  id: varchar('id', { length: 64 }).primaryKey(),
  medicationId: varchar('medication_id', { length: 64 }).notNull().references(() => medications.id),
  medicationName: varchar('medication_name', { length: 128 }).notNull(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  scheduledTime: varchar('scheduled_time', { length: 32 }).notNull(),
  recordedAt: timestamp('recorded_at'),
  status: mysqlEnum('status', ['taken', 'skipped', 'snoozed', 'pending']).default('pending').notNull(),
  notes: text('notes'),
  recordedByName: varchar('recorded_by_name', { length: 128 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('medlog_user_idx').on(table.userId),
  index('medlog_med_idx').on(table.medicationId),
  index('medlog_status_idx').on(table.status),
]);

export const meals = mysqlTable('meals', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  name: varchar('name', { length: 128 }).notNull(),
  mealType: mysqlEnum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack']).notNull(),
  loggedAt: timestamp('logged_at').defaultNow().notNull(),
  portion: varchar('portion', { length: 64 }).notNull(),
  ingredients: json('ingredients').$type<string[]>().notNull(),
  calories: int('calories').notNull(),
  protein: int('protein').notNull(),
  carbs: int('carbs').notNull(),
  fat: int('fat').notNull(),
  fiber: int('fiber').notNull(),
  notes: text('notes'),
  isAiScanned: boolean('is_ai_scanned').default(false).notNull(),
  aiConfidence: int('ai_confidence'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('meal_user_idx').on(table.userId),
  index('meal_type_idx').on(table.mealType),
  index('meal_logged_at_idx').on(table.loggedAt),
]);

export const vitalReadings = mysqlTable('vital_readings', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  type: varchar('type', { length: 32 }).notNull(), // blood_pressure, heart_rate, blood_glucose, oxygen_saturation, temperature, weight
  value: varchar('value', { length: 32 }).notNull(),
  numericValue: int('numeric_value').notNull(),
  secondaryNumericValue: int('secondary_numeric_value'),
  unit: varchar('unit', { length: 16 }).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
  context: varchar('context', { length: 64 }),
  notes: text('notes'),
  isAbnormal: boolean('is_abnormal').default(false).notNull(),
  recordedByName: varchar('recorded_by_name', { length: 128 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('vital_user_idx').on(table.userId),
  index('vital_type_idx').on(table.type),
  index('vital_recorded_at_idx').on(table.recordedAt),
]);

export const alertRules = mysqlTable('alert_rules', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  vitalType: varchar('vital_type', { length: 32 }).notNull(),
  condition: mysqlEnum('condition', ['gt', 'lt', 'between']).notNull(),
  thresholdMin: int('threshold_min'),
  thresholdMax: int('threshold_max'),
  severity: mysqlEnum('severity', ['warning', 'critical']).notNull(),
  message: text('message').notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('rule_user_idx').on(table.userId),
]);

export const alerts = mysqlTable('alerts', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  title: varchar('title', { length: 128 }).notNull(),
  message: text('message').notNull(),
  severity: mysqlEnum('severity', ['info', 'warning', 'critical']).notNull(),
  vitalType: varchar('vital_type', { length: 32 }),
  readingValue: varchar('reading_value', { length: 32 }),
  triggeredAt: timestamp('triggered_at').defaultNow().notNull(),
  status: mysqlEnum('status', ['new', 'reviewed', 'resolved']).default('new').notNull(),
}, (table) => [
  index('alert_user_idx').on(table.userId),
  index('alert_status_idx').on(table.status),
]);

export const medicalReports = mysqlTable('medical_reports', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  title: varchar('title', { length: 128 }).notNull(),
  documentType: varchar('document_type', { length: 64 }).notNull(),
  documentDate: varchar('document_date', { length: 32 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: varchar('file_size', { length: 32 }).notNull(),
  extractedText: text('extracted_text'),
  aiSummary: text('ai_summary'),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  sharedWithUserIds: json('shared_with_user_ids').$type<string[]>().notNull(),
}, (table) => [
  index('report_user_idx').on(table.userId),
]);

export const appointments = mysqlTable('appointments', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  doctorName: varchar('doctor_name', { length: 128 }).notNull(),
  specialty: varchar('specialty', { length: 64 }).notNull(),
  clinicOrHospital: varchar('clinic_or_hospital', { length: 128 }).notNull(),
  appointmentDate: varchar('appointment_date', { length: 32 }).notNull(),
  appointmentTime: varchar('appointment_time', { length: 32 }).notNull(),
  locationType: mysqlEnum('location_type', ['in_person', 'telehealth']).notNull(),
  addressOrLink: text('address_or_link'),
  notes: text('notes'),
  status: mysqlEnum('status', ['upcoming', 'completed', 'cancelled']).default('upcoming').notNull(),
  sharedWithFamily: boolean('shared_with_family').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('appt_user_idx').on(table.userId),
  index('appt_status_idx').on(table.status),
]);

export const familyUpdates = mysqlTable('family_updates', {
  id: varchar('id', { length: 64 }).primaryKey(),
  authorId: varchar('author_id', { length: 64 }).notNull().references(() => users.id),
  authorName: varchar('author_name', { length: 128 }).notNull(),
  authorRole: varchar('author_role', { length: 32 }).notNull(),
  content: text('content').notNull(),
  category: mysqlEnum('category', ['vital', 'medication', 'meal', 'note', 'appointment', 'alert', 'sos']).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  likes: int('likes').default(0).notNull(),
}, (table) => [
  index('update_created_at_idx').on(table.createdAt),
]);

export const inAppNotifications = mysqlTable('in_app_notifications', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  title: varchar('title', { length: 128 }).notNull(),
  message: text('message').notNull(),
  category: mysqlEnum('category', ['medication', 'vital', 'appointment', 'family', 'system', 'emergency']).notNull(),
  linkUrl: text('link_url'),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('notif_user_idx').on(table.userId),
  index('notif_is_read_idx').on(table.isRead),
]);

export const emergencyContacts = mysqlTable('emergency_contacts', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  name: varchar('name', { length: 128 }).notNull(),
  relationship: varchar('relationship', { length: 64 }).notNull(),
  phone: varchar('phone', { length: 32 }).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  priorityOrder: int('priority_order').default(1).notNull(),
}, (table) => [
  index('emg_user_idx').on(table.userId),
]);

export const emergencyEvents = mysqlTable('emergency_events', {
  id: varchar('id', { length: 64 }).primaryKey(),
  userId: varchar('user_id', { length: 64 }).notNull().references(() => users.id),
  patientName: varchar('patient_name', { length: 128 }).notNull(),
  triggeredAt: timestamp('triggered_at').defaultNow().notNull(),
  resolvedAt: timestamp('resolved_at'),
  status: mysqlEnum('status', ['active', 'resolved']).default('active').notNull(),
  alertedContacts: json('alerted_contacts').notNull(),
  locationNotes: text('location_notes'),
  dispatchHelpline: varchar('dispatch_helpline', { length: 64 }).notNull(),
}, (table) => [
  index('emg_event_user_idx').on(table.userId),
  index('emg_event_status_idx').on(table.status),
]);
