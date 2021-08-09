interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(days => days > 0).length
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength

  const success = average >= target

  const calculateRating = (success: boolean, trainingDays: number, periodLength: number): number => {
    if (!success) {
      return 1
    } else if (success && trainingDays === periodLength) {
      return 3
    } else if (success && trainingDays > 0) {
      return 2
    }
  }
  const rating = calculateRating(success, trainingDays, periodLength)

  const calculateRatingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'We know starting is hard'
      case 2:
        return 'You can improve your discipline!'
      case 3:
        return 'Excellent, keep working like that!'
      default:
    }
  }
  const ratingDescription = calculateRatingDescription(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([ 3, 0, 2, 4.5, 0, 3, 1 ], 2))
