import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaDatabase, FaTable, FaHdd, FaBolt, FaCodeBranch } from 'react-icons/fa';

const schemas = [
  {
    table: "incidents",
    engine: "PostgreSQL + PostGIS",
    keys: [
      "id: UUID (Primary Key)",
      "location: Geometry(Point, 4326)",
      "hazard_type: Enum (WILDFIRE, FLOOD, STORM)",
      "urgency_score: Float (0.00 - 10.00)",
      "assigned_unit_ids: Array[UUID]",
      "status: Enum (REPORTED, DISPATCHED, RESOLVED)"
    ]
  },
  {
    table: "responder_units",
    engine: "Redis Geospatial + PostGIS",
    keys: [
      "unit_id: UUID (Primary Key)",
      "agency_type: Enum (POLICE, FIRE, MEDICAL)",
      "current_gps: Geometry(Point, 4326)",
      "fuel_medical_capacity: JSONB",
      "active_route_geojson: LineString",
      "status: Enum (AVAILABLE, DISPATCHED)"
    ]
  },
  {
    table: "spatial_risk_heatmaps",
    engine: "PostGIS + GeoJSON Tile Server",
    keys: [
      "heatmap_id: UUID (Primary Key)",
      "polygon_boundary: Geometry(Polygon, 4326)",
      "thermal_index: Float",
      "flood_depth_meters: Float",
      "created_at: Timestamp (Indexed)",
      "model_confidence: Float"
    ]
  },
  {
    table: "telemetry_logs",
    engine: "InfluxDB (Time-Series Engine)",
    keys: [
      "sensor_id: String (Tag)",
      "satellite_orbit_id: String (Tag)",
      "water_level_cm: Float (Field)",
      "wind_speed_kmh: Float (Field)",
      "timestamp: Time (Nanosecond Index)",
      "node_status: String"
    ]
  }
];

function DatabaseArchitecture() {
  return (
    <section id="database" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="DATA ENGINE SCHEMAS"
        title="High-Performance"
        highlightTitle="Database Architecture"
        subtitle="PostGIS spatial indexing, InfluxDB time-series metrics, and Redis pub/sub caching for sub-10ms queries."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {schemas.map((sch, index) => (
          <motion.div
            key={sch.table}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/25 p-8 transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_35px_rgba(255,107,0,0.2)]"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 font-mono">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-orange-400">
                  <FaTable className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    table: <span className="text-orange-400">{sch.table}</span>
                  </h3>
                  <span className="text-xs text-slate-400">{sch.engine}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 rounded">
                INDEXED
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs sm:text-sm text-slate-300">
              {sch.keys.map((k, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-2">
                  <FaCodeBranch className="w-3.5 h-3.5 text-orange-500" />
                  <span>{k}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default DatabaseArchitecture;
