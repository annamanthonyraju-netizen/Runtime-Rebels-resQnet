import { runAgenticWorkflow } from '../services/aiOrchestratorService.js';
import { sendSuccess } from '../../utils/responseHandler.js';

export const analyzeIncidentAI = async (req, res, next) => {
  try {
    const incidentData = req.body;
    const aiResults = await runAgenticWorkflow(incidentData);
    return sendSuccess(res, 200, '7-Agent Collaboration Complete', aiResults);
  } catch (err) {
    next(err);
  }
};
