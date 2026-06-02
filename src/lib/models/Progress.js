// models/Progress.js

import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    weight: Number,

    height: Number,

    bmi: Number,

    goal: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Progress ||
  mongoose.model('Progress', progressSchema);
