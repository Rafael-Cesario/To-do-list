export const searchEmptyValues = (values: { [key: string]: string }) => {
  type TKey = keyof typeof values;

  const keys = Object.keys(values);
  const emptyValues: { [key: string]: string } = {};

  keys.forEach((key) => {
    const emptyValue = values[key as TKey].trim() === '';
    if (emptyValue) emptyValues[key as TKey] = `Este campo não pode ficar vazio.`;
  });

  const hasEmptyValues = Object.keys(emptyValues).length !== 0;
  return hasEmptyValues && emptyValues;
};
