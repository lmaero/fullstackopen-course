import express, { response } from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!weight || !height) {
    return res
      .status(400)
      .json({ error: 'Missing parameters' })
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res
      .status(400)
      .json({ error: 'Malformatted parameters' })
  }

  try {
    const bmiValues = parseBmiArguments([ height as string, weight as string ]);
    const bmiInfo = {
      weight: bmiValues.weight,
      height: bmiValues.height,
      bmi: calculateBmi(bmiValues.height, bmiValues.weight)
    }
    return res
      .status(200)
      .json(bmiInfo)
  } catch (e) {
    return response.status(400).json(e.message);
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
