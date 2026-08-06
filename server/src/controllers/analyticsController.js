import { sendSuccess } from '../utils/responseHandler.js';

export const getOverviewAnalytics = async (req, res, next) => {
  try {
    const overviewData = {
      totalIncidents: 1428,
      activeIncidents: 42,
      resolvedIncidents: 1386,
      averageResponseTime: '4.2 mins',
      averageResolutionTime: '28.5 mins',
      resourcesDeployed: 184,
      aiAnalysesCompleted: 2450,
      activeVolunteers: 1240,
      activeOfficers: 340,
      aiAccuracyRate: 98.4,
      dispatchSuccessRate: 99.1
    };

    return sendSuccess(res, 200, 'Overview analytics retrieved successfully', overviewData);
  } catch (err) {
    next(err);
  }
};

export const getIncidentTrends = async (req, res, next) => {
  try {
    const monthlyTrends = [
      { month: 'Jan', incidents: 120, resolved: 115 },
      { month: 'Feb', incidents: 140, resolved: 138 },
      { month: 'Mar', incidents: 180, resolved: 175 },
      { month: 'Apr', incidents: 240, resolved: 232 },
      { month: 'May', incidents: 310, resolved: 300 },
      { month: 'Jun', incidents: 280, resolved: 275 },
      { month: 'Jul', incidents: 158, resolved: 151 }
    ];

    return sendSuccess(res, 200, 'Incident trends retrieved successfully', monthlyTrends);
  } catch (err) {
    next(err);
  }
};

export const getAiPerformance = async (req, res, next) => {
  try {
    const aiStats = {
      totalAnalyses: 2450,
      severityAccuracy: 98.6,
      averageConfidenceScore: 98.4,
      recommendationAcceptanceRate: 97.8,
      averageProcessingTimeMs: 1240
    };

    return sendSuccess(res, 200, 'AI performance analytics retrieved', aiStats);
  } catch (err) {
    next(err);
  }
};
