import { FormEvent, useState } from 'react';
import { Field, FieldPassword } from './Field';
import { useNotification } from './hooks/useNotification';
import { Loading } from './Loading';
import { StyledForm } from './styles/StyledForm';
import { QueriesUser } from './utils/queriesUser';
import { searchEmptyValues } from './utils/searchEmptyValues';

export const Login = () => {
  const defaultValues = { email: '', password: '' };
  const defaultLabelError = { email: '', password: '' };

  const [values, setValues] = useState<{ [key: string]: string }>(defaultValues);
  const [labelError, setLabelError] = useState(defaultLabelError);
  const [isLoading, setIsloading] = useState(false);

  const { sendNotification, closeNotification } = useNotification();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    closeNotification();

    const hasEmptyValues = searchEmptyValues(values);
    if (hasEmptyValues) return setLabelError({ ...defaultLabelError, ...hasEmptyValues });

    setLabelError(defaultLabelError);

    setIsloading(true);

    const queriesUser = new QueriesUser();
    const { email, password } = values;
    const { error } = await queriesUser.login({ email, password });

    setIsloading(false);

    if (error) return sendNotification('error', error);

    // todo > send user to index page
  };

  return (
    <StyledForm>
      <div className="header">
        <a href="https://www.flaticon.com/br/icones-gratis/mago" title="Mago ícones criados por Freepik - Flaticon ">
          <img src="/icons/mage.png" alt="mage icon" height={'100rem'} />
        </a>

        <h1 className="title">Login</h1>
      </div>

      <form onSubmit={(e) => login(e)}>
        <div className="inputs">
          <Field props={{ id: 'email', label: 'Email', values, setValues, error: labelError.email }} />
          <FieldPassword props={{ id: 'password', label: 'Senha', values, setValues, error: labelError.password }} />
        </div>

        <Loading isLoading={isLoading} />
        <button className="submit">Entrar</button>
      </form>
    </StyledForm>
  );
};
