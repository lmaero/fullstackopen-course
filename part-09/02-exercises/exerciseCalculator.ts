interface calculateExercisesValues {
  dailyHours: number[]
  target: number
}

export const parseExercisesArguments = (args: string[]): calculateExercisesValues => {
  if (args.length < 2) throw new Error('Use this program with the following arguments: <yourDailyTarget> <dailyHoursOfExercise, ...>');

  const toNumbers = args.map(number => Number(number));
  const areNumbers = toNumbers.every(number => !isNaN(number));

  if (!areNumbers) throw new Error('The arguments must be numbers');

  if (args.length === 1) throw new Error('Please don\'t be lazy and specify daily hours of exercise');

  const target = Number(args[ 0 ]);
  const dailyHours = args.map(Number).slice(1);

  return {
    dailyHours,
    target
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(days => days > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;

  const calculateRating = (success: boolean, trainingDays: number, periodLength: number): number => {
    if (!success) {
      return 1;
    } else if (success && trainingDays === periodLength) {
      return 3;
    } else if (success && trainingDays > 0) {
      return 2;
    }
    return 0;
  };
  const rating = calculateRating(success, trainingDays, periodLength);

  const calculateRatingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'We know starting is hard';
      case 2:
        return 'You can improve your discipline!';
      case 3:
        return 'Excellent, keep working like that!';
      default:
        return 'Something went wrong';
    }
  };
  const ratingDescription = calculateRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
