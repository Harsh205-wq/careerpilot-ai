const mongoose = require('mongoose');

const aptitudeAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    testId: {
      type: String,
      required: true,
    },
    answers: [{
      questionId: String,
      answer: String,
      isCorrect: Boolean,
    }],
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number, // in seconds
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const AptitudeAttempt = mongoose.model('AptitudeAttempt', aptitudeAttemptSchema);
module.exports = AptitudeAttempt;