import { FormEvent, useState } from 'react';
import { Field, FieldPassword } from './Field';
import { Loading } from './Loading';
import { StyledForm } from './styles/StyledForm';

export const Login = () => {
  const defaultValues = { email: '', password: '' };
  const defaultLabelError = { email: '', password: '' };

  const [values, setValues] = useState<{ [key: string]: string }>(defaultValues);
  const [labelError, setLabelError] = useState(defaultLabelError);
  const [isLoading, setIsloading] = useState(false);

  const login = (e: FormEvent) => {
    e.preventDefault();
    console.log({ values });
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

// todo > login function
// todo > show and hide password
