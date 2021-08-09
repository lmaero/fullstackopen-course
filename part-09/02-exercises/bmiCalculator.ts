interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4 || args.length > 4) throw new Error('Use this program with the following arguments: npm run calculateBmi <height> <weight>');

  if (isNaN(Number(args[ 2 ])) && isNaN(Number(args[ 3 ]))) {
    throw new Error('Provided values were not numbers!');

  }

  let height = Number(args[ 2 ]);
  let weight = Number(args[ 3 ]);

  // According to Wikipedia
  const tallestPersonInTheWorld = 272;
  const shortestPersonInTheWorld = 24;
  if (height < shortestPersonInTheWorld || height > tallestPersonInTheWorld) {
    throw new Error('We don\'t know a person with that height, please verify and enter height in centimeters');
  }

  // According to Guinness World Records
  const lightestPersonInTheWorld = 2.13;
  // According to Wikipedia
  const heaviestPersonInTheWorld = 635;
  if (weight < lightestPersonInTheWorld || weight > heaviestPersonInTheWorld) {
    throw new Error('We don\'t know a person with that weight, please verify and enter weight in kilograms');
  }

  return {
    height: Number(args[ 2 ]),
    weight: Number(args[ 3 ])
  }
}

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
    return "Obese (Your health is in risk) ";
  }
}

try {
  const bmiValues = parseBmiArguments(process.argv);
  console.log(bmiValues)
  console.log(calculateBmi(bmiValues.height, bmiValues.weight));
} catch (e) {
  console.log(e.message);
}
