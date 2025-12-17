"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "../components/organisms/Access/ProtectedRoute";
import LiquidChrome from "../components/organisms/LiquidChrome";
import Navbar from "../components/molecules/navbar";

function BMICalculatorPage() {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [healthTip, setHealthTip] = useState("");
  const [calories, setCalories] = useState("");

  const validateInputs = () => {
    if (!feet || !inches || !weight || !gender || !age) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (feet < 1 || feet > 8) {
      toast.error("Feet must be between 1 and 8");
      return false;
    }

    if (inches < 0 || inches > 11) {
      toast.error("Inches must be between 0 and 11");
      return false;
    }

    if (weight < 20 || weight > 300) {
      toast.error("Weight must be between 20kg and 300kg");
      return false;
    }

    if (age < 5 || age > 100) {
      toast.error("Age must be between 5 and 100");
      return false;
    }

    return true;
  };

  const calculateBMI = async () => {
    if (!validateInputs()) return;

    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    const heightInMeters = totalInches * 0.0254;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const finalBMI = bmiValue.toFixed(1);
    setBmi(finalBMI);

    let bmiCategory = "";
    let tip = "";
    let calorieInfo = "";

    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
      tip = "Increase calorie intake with protein and healthy fats.";
    } else if (bmiValue < 24.9) {
      bmiCategory = "Normal";
      tip = "Keep up the good work with balanced nutrition.";
    } else if (bmiValue < 29.9) {
      bmiCategory = "Overweight";
      tip = "Reduce sugar intake and increase daily activity.";
    } else {
      bmiCategory = "Obese";
      tip = "Follow a strict diet and regular cardio workouts.";
    }

    if (age < 18) {
      calorieInfo = "Teens require 2200-2800 calories/day.";
    } else if (age < 40) {
      calorieInfo = gender === "male"
        ? "You require 2400-2800 calories/day."
        : "You require 1800-2200 calories/day.";
    } else if (age < 60) {
      calorieInfo = gender === "male"
        ? "Recommended: 2200-2600 calories/day."
        : "Recommended: 1600-2000 calories/day.";
    } else {
      calorieInfo = gender === "male"
        ? "Recommended: 2000-2200 calories/day."
        : "Recommended: 1500-1800 calories/day.";
    }

    setCategory(bmiCategory);
    setHealthTip(tip);
    setCalories(calorieInfo);

    try {
      const res = await fetch("/api/auth/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feet,
          inches,
          weight,
          age,
          gender,
          bmi: finalBMI,
          category: bmiCategory,
        }),
      });
      const data = await res.json();
      if (!data.success) toast.error("BMI not saved");
    } catch (err) {
      toast.error("Error saving BMI");
    }
  };

  const restart = () => {
    setFeet("");
    setInches("");
    setWeight("");
    setGender("");
    setAge("");
    setBmi(null);
    setCategory("");
    setHealthTip("");
    setCalories("");
  };

  return (
    <div className="relative bg-gradient-to-b mt-10 from-black via-[#0f3e3b] to-black min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.05, 0.1, 0.1]} interactive />
      </div>
      <Toaster position="top-right" />

      <div className="relative z-10 min-h-screen p-6 flex items-center justify-center">
        <div className={`transition-all duration-500 w-full ${bmi ? "max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10" : "max-w-lg mx-auto"}`}>
          
          {/* FORM */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-2xl text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">BMI Calculator</h1>

            <div className="space-y-5">
              
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Height (ft)"
                  min={1}
                  max={8}
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="w-1/2 p-3 rounded bg-white/20 border border-white/30"
                />

                <input
                  type="number"
                  placeholder="Height (in)"
                  min={0}
                  max={11}
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="w-1/2 p-3 rounded bg-white/20 border border-white/30"
                />
              </div>

              <input
                type="number"
                placeholder="Weight (kg)"
                min={20}
                max={300}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 rounded bg-white/20 border border-white/30"
              />

              <input
                type="number"
                placeholder="Age"
                min={5}
                max={100}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded bg-white/20 border border-white/30"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded bg-white/20 border border-white/30"
              >
                <option className="text-black" value="">Select Gender</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="male">Male</option>
              </select>

              <button
                onClick={calculateBMI}
                className="w-full py-3 bg-emerald-600 rounded hover:bg-emerald-700 transition text-white font-semibold"
              >
                Calculate BMI
              </button>
            </div>
          </div>

          {bmi && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-2xl text-white text-center">
              <h2 className="text-3xl mt-20 font-bold mb-2">Your BMI: {bmi}</h2>
              <p className="text-lg font-medium mb-4">Category: <span className="font-semibold">{category}</span></p>

              <div className="w-full h-4 rounded-full bg-white/20 mb-6 overflow-hidden">
                <div className={`h-full transition-all duration-700 ${
                  bmi < 18.5 ? "bg-blue-400 w-1/4" :
                  bmi < 25 ? "bg-green-400 w-2/4" :
                  bmi < 30 ? "bg-yellow-400 w-3/4" : "bg-red-500 w-full"
                }`} />
              </div>

              <p className="text-sm mb-2">{calories}</p>
              <p className="text-sm italic">{healthTip}</p>

              <button
                onClick={restart}
                className="mt-4 bg-white/20 hover:bg-white/30 transition py-3 px-6 rounded font-semibold"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProtectedBMICalculator() {
  return (
    <ProtectedRoute>
      <BMICalculatorPage />
    </ProtectedRoute>
  );
}
