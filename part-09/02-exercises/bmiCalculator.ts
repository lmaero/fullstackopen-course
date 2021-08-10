interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 2 || args.length > 2) throw new Error('Use this program with the following arguments: <height> <weight>');

  if (isNaN(Number(args[ 0 ])) && isNaN(Number(args[ 1 ]))) {
    throw new Error('Provided values were not numbers!');

  }

  let height = Number(args[ 0 ]);
  let weight = Number(args[ 1 ]);

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
    height: Number(args[ 0 ]),
    weight: Number(args[ 1 ])
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

export { parseBmiArguments, calculateBmi };
