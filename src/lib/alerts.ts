import { db } from '@/db/storage';
import { VitalReading, Alert, InAppNotification, FamilyUpdate } from '@/types';

export function evaluateVitalAlerts(vital: VitalReading, patientName: string): Alert | null {
  const rules = db.getAlertRules(vital.userId);
  const matchingRule = rules.find(r => r.enabled && r.vitalType === vital.type);

  if (!matchingRule) return null;

  let isTriggered = false;
  const val = vital.numericValue;

  if (matchingRule.condition === 'gt' && matchingRule.thresholdMin !== undefined) {
    if (val > matchingRule.thresholdMin) {
      isTriggered = true;
    }
  } else if (matchingRule.condition === 'lt' && matchingRule.thresholdMin !== undefined) {
    if (val < matchingRule.thresholdMin) {
      isTriggered = true;
    }
  } else if (
    matchingRule.condition === 'between' && 
    matchingRule.thresholdMin !== undefined && 
    matchingRule.thresholdMax !== undefined
  ) {
    if (val < matchingRule.thresholdMin || val > matchingRule.thresholdMax) {
      isTriggered = true;
    }
  }

  if (isTriggered) {
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      userId: vital.userId,
      title: `${vital.type.replace('_', ' ').toUpperCase()} Alert: ${vital.value} ${vital.unit}`,
      message: matchingRule.message,
      severity: matchingRule.severity,
      vitalType: vital.type,
      readingValue: `${vital.value} ${vital.unit}`,
      triggeredAt: new Date().toISOString(),
      status: 'new',
    };

    db.addAlert(alert);

    // Notify family guardian (Ananya)
    const notif: InAppNotification = {
      id: `notif-alert-${Date.now()}`,
      userId: 'user-ananya-02',
      title: `Health Alert: ${patientName}`,
      message: `${vital.type.replace('_', ' ')} reading of ${vital.value} ${vital.unit} is outside configured parameters.`,
      category: 'vital',
      linkUrl: '/dashboard/alerts',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    db.addNotification(notif);

    // Add update to family feed
    const feedItem: FamilyUpdate = {
      id: `feed-alert-${Date.now()}`,
      authorId: vital.userId,
      authorName: patientName,
      authorRole: 'elderly',
      content: `⚠️ Health Alert: ${vital.type.replace('_', ' ')} recorded at ${vital.value} ${vital.unit} (${vital.context || 'Resting'}). Alert notification dispatched to family care circle.`,
      category: 'alert',
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    db.addFamilyUpdate(feedItem);

    return alert;
  }

  return null;
}
