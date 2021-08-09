const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight (non-healthy weight)";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight (non-healthy weight)";
  } else {
    return "Obese (You're health is in risk)";
  }
}

console.log(calculateBmi(180, 74));
