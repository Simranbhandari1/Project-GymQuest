import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    goal: String,
    dietPreference: String,
    health: {
      type: String,
      default: 'None',
    },

    htmlPlan: String,
  },
  {
    timestamps: true,
  },
);

const MealPlan =
  mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;
