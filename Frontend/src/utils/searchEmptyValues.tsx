export const searchEmptyValues = (values: object) => {
  type TKey = keyof typeof values;

  const keys = Object.keys(values);
  const emptyValues: { [key: string]: string } = {};

  keys.forEach((key) => {
    const emptyValue = values[key as TKey] === '';
    if (emptyValue) emptyValues[key as TKey] = `Este campo não pode ficar vazio.`;
  });

  const hasEmptyValues = Object.keys(emptyValues).length !== 0;
  return hasEmptyValues && emptyValues;
};

// todo > tests
