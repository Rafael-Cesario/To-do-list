import { FormEvent, useState } from 'react';
import { searchEmptyValues } from './utils/searchEmptyValues';
import { validateValues } from './utils/validateValues';
import { StyledForm } from './styles/StyledForm';
import { QueriesUser } from './utils/queriesUser';
import { useNotification } from '../../utils/hooks/useNotification';
import { Loading } from './Loading';
import { Field, FieldPassword } from './Field';

export const CreateAccount = () => {
  const defaultValues = { email: '', name: '', password: '', confirmPassword: '' };
  const defaultLabelError = { email: '', name: '', password: '', confirmPassword: '' };

  const [values, setValues] = useState<{ [key: string]: string }>(defaultValues);
  const [labelError, setLabelError] = useState(defaultLabelError);
  const [isLoading, setIsLoading] = useState(false);

  const { sendNotification } = useNotification();

  // todo > tests
  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    const queriesUser = new QueriesUser();

    const emptyValues = searchEmptyValues(values);
    if (emptyValues) return setLabelError({ ...defaultLabelError, ...emptyValues });

    const invalidValues = validateValues(values);
    if (invalidValues) return setLabelError({ ...defaultLabelError, ...invalidValues });

    setIsLoading(true);

    const { email, name, password } = values;
    const { error } = await queriesUser.createUser({ email, name, password });

    setIsLoading(false);

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Novo usuario criado, você já pode fazer login. Boas vindas!');
    setValues(defaultValues);
  };

  return (
    <StyledForm>
      <div className="header">
        <a href="https://www.flaticon.com/br/icones-gratis/mago" title="Mago ícones criados por Freepik - Flaticon ">
          <img src="/icons/mage.png" alt="mage icon" height={'100rem'} />
        </a>

        <h1 className="title">Criar conta</h1>
      </div>

      <form onSubmit={(e) => createAccount(e)}>
        <div className="inputs">
          <Field props={{ id: 'email', label: 'Email', values, setValues, error: labelError.email }} />
          <Field props={{ id: 'name', label: 'Nome', values, setValues, error: labelError.name }} />
          <FieldPassword props={{ id: 'password', label: 'Senha', values, setValues, error: labelError.password }} />
          <FieldPassword props={{ id: 'confirmPassword', label: 'Confirme sua senha', values, setValues, error: labelError.confirmPassword }} />
        </div>

        <Loading isLoading={isLoading} />
        <button className="submit">Criar conta</button>
      </form>
    </StyledForm>
  );
};
