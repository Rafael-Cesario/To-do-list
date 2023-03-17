import { Validations } from './validations';

// todo > tests
export const validateValues = (valuesToValidate: { [key: string]: string }) => {
  type Key = keyof typeof valuesToValidate;
  const validations = new Validations();
  const invalidValues: { [key: string]: string } = {};

  const isValueValid = {
    email: validations.email(valuesToValidate.email),
    name: validations.name(valuesToValidate.name),
    password: validations.password(valuesToValidate.password),
    confirmPassword: validations.confirmPassword(valuesToValidate.confirmPassword, valuesToValidate.password),
  };

  Object.entries(isValueValid).forEach(([key, value]) => {
    const valueNotValid = value !== undefined;
    if (valueNotValid) invalidValues[key as Key] = value;
  });

  const hasInvalidValues = Object.keys(invalidValues).length > 0;
  return hasInvalidValues && invalidValues;
};
