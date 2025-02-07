

import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  adminUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetModel: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, refPath: "targetModel" },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
