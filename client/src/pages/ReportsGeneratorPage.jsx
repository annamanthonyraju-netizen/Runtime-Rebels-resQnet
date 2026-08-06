import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaDownload, FaArrowLeft, FaFilePdf, FaFileCsv } from 'react-icons/fa';

function ReportsGeneratorPage() {
  const [reportPeriod, setReportPeriod] = useState('Monthly');

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Incident ID,Type,Severity,Status,Location,Date\nINC-9042,Fire,Critical,Dispatched,Sector 7 Corridor,2026-08-06\nINC-8812,Flood,High,Resolved,Zone 12 Harbor,2026-08-05";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ResQnet_Disaster_Report_${reportPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    alert(`[PDF EXPORT GENERATED] ${reportPeriod} ResQnet EOC Executive Report compiled successfully.`);
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      <Link to="/dashboard/analytics" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Analytics
      </Link>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
            EXECUTIVE AUDIT EXPORT CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Disaster Incident Report Generator</h1>
          <p className="text-xs text-slate-400 mt-1">Compile and export official EOC disaster reports in PDF and CSV formats</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-6 font-mono text-xs">
        <div>
          <label className="block text-slate-300 font-bold uppercase mb-2">Select Reporting Timeframe</label>
          <div className="grid grid-cols-4 gap-3 text-sm font-bold">
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(period => (
              <button
                key={period}
                onClick={() => setReportPeriod(period)}
                className={`py-3 rounded-xl border text-center transition-all cursor-pointer ${
                  reportPeriod === period
                    ? 'bg-orange-500 text-slate-950 border-orange-400 font-black'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {period} Report
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-sans">
          <h3 className="text-base font-bold text-white">Report Summary Preview ({reportPeriod})</h3>
          <ul className="text-xs text-slate-300 space-y-1 font-mono">
            <li>• Total Emergency Incidents Logged: 1,428</li>
            <li>• Resolution Rate: 97.0%</li>
            <li>• Average Emergency Response Time: 4.2 minutes</li>
            <li>• AI Recommendation Accuracy: 98.4%</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-4 pt-2 font-sans text-xs">
          <button
            onClick={handleExportCSV}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <FaFileCsv className="w-4 h-4" />
            <span>Download CSV Spreadsheets</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <FaFilePdf className="w-4 h-4" />
            <span>Export Official PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsGeneratorPage;
