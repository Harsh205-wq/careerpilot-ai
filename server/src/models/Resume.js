import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
      trim: true,
    },

    targetRole: {
      type: String,
      trim: true,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      trim: true,
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;