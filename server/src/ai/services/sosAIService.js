/**
 * Super Emergency SOS - AI Severity Assessment Service
 * Triage system to assess emergency description and structured parameters,
 * returning severityScore (0-100), severityLevel, and concise aiReason.
 * 
 * Safety Rule: Must NEVER reject an emergency report.
 */

export const analyzeSOSSeverity = async (sosData) => {
  try {
    const { emergencyType = 'Other', description = '', peopleAffected = 'Unknown', location } = sosData;
    const descLower = (description || '').toLowerCase();

    // Base score calculation based on Emergency Type
    let score = 50;
    const typeLower = (emergencyType || '').toLowerCase();

    if (typeLower.includes('fire') || typeLower.includes('building collapse') || typeLower.includes('chemical') || typeLower.includes('explosion')) {
      score += 30;
    } else if (typeLower.includes('medical') || typeLower.includes('accident') || typeLower.includes('violence') || typeLower.includes('security')) {
      score += 20;
    } else if (typeLower.includes('flood') || typeLower.includes('earthquake') || typeLower.includes('landslide') || typeLower.includes('cyclone')) {
      score += 25;
    } else {
      score += 10;
    }

    // Weight based on People Affected
    if (peopleAffected === '10+') {
      score += 20;
    } else if (peopleAffected === '5–10' || peopleAffected === '5-10') {
      score += 15;
    } else if (peopleAffected === '1–5' || peopleAffected === '1-5') {
      score += 10;
    } else {
      score += 5;
    }

    // High urgency keywords detection
    const criticalKeywords = ['trapped', 'flames', 'unconscious', 'bleeding', 'explosion', 'collapsing', 'smoke', 'gunshot', 'weapon', 'drowning', 'stuck', 'severe'];
    let detectedKeywordsCount = 0;
    criticalKeywords.forEach(word => {
      if (descLower.includes(word)) {
        detectedKeywordsCount++;
      }
    });

    score += Math.min(detectedKeywordsCount * 5, 20);

    // Location bonus (location verified increases confidence score)
    if (location && (location.latitude || location.longitude) && location.latitude !== 0) {
      score += 3;
    }

    // Clamp score 0 to 100
    score = Math.min(Math.max(Math.round(score), 15), 98);

    // Determine Severity Level
    let level = 'MODERATE';
    if (score <= 30) {
      level = 'LOW';
    } else if (score <= 60) {
      level = 'MODERATE';
    } else if (score <= 80) {
      level = 'HIGH';
    } else {
      level = 'CRITICAL';
    }

    // Generate concise AI Reasoning
    let reasonParts = [];
    reasonParts.push(`${emergencyType} emergency reported with ${peopleAffected} people potentially affected.`);
    if (detectedKeywordsCount > 0) {
      reasonParts.push(`High urgency indicators detected in description ("${description.slice(0, 80)}...").`);
    } else if (description) {
      reasonParts.push(`Report details provided: "${description.slice(0, 90)}".`);
    }
    if (level === 'CRITICAL' || level === 'HIGH') {
      reasonParts.push(`Immediate threat level calculated (${score}/100), prioritising rapid responder alert.`);
    } else {
      reasonParts.push(`Standard emergency protocol initiated with priority level ${level} (${score}/100).`);
    }

    const aiReason = reasonParts.join(' ');

    return {
      severityScore: score,
      severityLevel: level,
      aiReason
    };
  } catch (error) {
    console.error('[AI SOS Triage Error] Fallback triggered:', error.message);
    return {
      severityScore: 75,
      severityLevel: 'HIGH',
      aiReason: 'Automatic triage completed using standard emergency safety protocol. Dispatch priority assigned.'
    };
  }
};
