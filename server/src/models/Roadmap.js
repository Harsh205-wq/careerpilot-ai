const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    steps: [{
      title: {
        type: String,
        required: true,
      },
      description: String,
      completed: {
        type: Boolean,
        default: false,
      },
      dueDate: Date,
      resources: [String], // URLs or links
    }],
    category: {
      type: String,
      enum: ['career', 'skill', 'education', 'other'],
      default: 'career',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
module.exports = Roadmap;