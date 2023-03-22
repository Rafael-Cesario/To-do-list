import { FormEvent, useState } from 'react';
import { resetTextFromLabels } from './utils/resetTextFromLabels';
import { searchEmptyValues } from './utils/searchEmptyValues';
import { sendError } from './utils/sendError';
import { validateValues } from './utils/validateValues';
import { StyledForm } from './styles/StyledForm';
import { QueriesUser } from './utils/queriesUser';
import { useNotification } from './hooks/useNotification';
import { Loading } from './Loading';
import { Field, FieldPassword } from './Field';

export const CreateAccount = () => {
  const initialStateValues = { email: '', name: '', password: '', confirmPassword: '' };
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(initialStateValues);
  const { sendNotification } = useNotification();

  // todo > tests
  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    const queriesUser = new QueriesUser();

    resetTextFromLabels(Object.keys(values));

    const emptyValues = searchEmptyValues(values);
    if (emptyValues) return sendError(emptyValues);

    const invalidValues = validateValues(values);
    if (invalidValues) return sendError(invalidValues);

    setIsLoading(true);

    const { email, name, password } = values;
    const { error } = await queriesUser.createUser({ email, name, password });

    setIsLoading(false);

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Novo usuario criado, você já pode fazer login. Boas vindas!');
    setValues(initialStateValues);
  };

  return (
    <StyledForm>
      <h1 className="title">Criar conta</h1>

      <form onSubmit={(e) => createAccount(e)}>
        <div className="inputs">
          <Field props={{ id: 'email', label: 'Email', values, setValues }} />
          <Field props={{ id: 'name', label: 'Nome', values, setValues }} />
          <FieldPassword props={{ id: 'password', label: 'Senha', values, setValues }} />
          <FieldPassword props={{ id: 'confirmPassword', label: 'Confirme sua senha', values, setValues }} />
        </div>

        <Loading isLoading={isLoading} />
        <button className="submit">Criar conta</button>
      </form>
    </StyledForm>
  );
};
