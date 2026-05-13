import mongoose from 'mongoose'

const improvedBulletSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      trim: true,
    },
    improved: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const resumeAnalysisSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  targetRole:{
    type:String,
    required:true,
    trim:true,
  },
  origanFileName:{
    type:String,
    trim:true
  },
  filetype:{
    type:String,
    trim:true,
  },
  jobDescription:{
    type:String,
    trim:true,
    default:""
  },
  roleMatchScore:{
    type:Number,
    default:0
  },
  atsScore:{
    type:Number,
    default:0,
  },
  jobMatchScore: {
      type: Number,
      default: null,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },
     missingSkills: {
      type: [String],
      default: [],
    },

    missingKeywords: {
      type: [String],
      default: [],
    },

    projectFeedback: {
      type: [String],
      default: [],
    },

    improvedBullets: {
      type: [improvedBulletSchema],
      default: [],
    },

    atsSuggestions: {
      type: [String],
      default: [],
    },
      actionPlan: {
      type: [String],
      default: [],
    },
},{timestamps:true}
)
const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysis;