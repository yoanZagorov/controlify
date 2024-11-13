export default function performDecimalCalculation(firstNum, secondNum, operator) {
  const workingFirstNum = firstNum * 100;
  const workingSecondNum = secondNum * 100;

  let result;

  if (operator === "+") {
    result = workingFirstNum + workingSecondNum;
  } else if (operator === "-") {
    result = workingFirstNum - workingSecondNum;
  }

  const normalizedResult = result / 100;

  return Number(normalizedResult.toFixed(2));
}