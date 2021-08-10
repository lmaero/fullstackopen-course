import express, { response } from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExercisesArguments } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!weight || !height) {
    return res
      .status(400)
      .json({ error: 'Missing parameters' });
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res
      .status(400)
      .json({ error: 'Malformatted parameters' });
  }

  try {
    const bmiValues = parseBmiArguments([ height as string, weight as string ]);
    const bmiInfo = {
      weight: bmiValues.weight,
      height: bmiValues.height,
      bmi: calculateBmi(bmiValues.height, bmiValues.weight)
    };
    return res
      .status(200)
      .json(bmiInfo);
  } catch (e) {
    if (e instanceof TypeError) {
      return response.status(400).json(e.message);
    }
    return res.json(e);
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res
      .status(400)
      .json({ error: 'Missing parameters' });
  }
  if (isNaN(Number(target))) {
    return res
      .status(400)
      .json({ error: 'Malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const completeArray = [ target, ...daily_exercises ];

  try {
    const { target, dailyHours } = parseExercisesArguments(completeArray);
    const exerciseInfo = calculateExercises(target, dailyHours);

    return res
      .status(200)
      .json(exerciseInfo);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(400).json(e.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
