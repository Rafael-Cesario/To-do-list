import { useState } from 'react';

type Values = { email: string; name: string; password: string; confirmPassword: string };

interface Props {
  props: {
    id: keyof Values;
    label: string;
    values: Values;
    setValues: (newValues: Values) => void;
  };
}

export const Field = ({ props: { id, label, values, setValues } }: Props) => {
  return (
    <div id={id} className="field">
      <label htmlFor={`${id}-input`} data-text={label}>
        {label}
      </label>
      <input id={`${id}-input`} type="text" value={values[id as keyof Values]} onChange={(e) => setValues({ ...values, [id]: e.target.value })} />
    </div>
  );
};

export const FieldPassword = ({ props: { id, label, values, setValues } }: Props) => {
  const [passwordInputType, setPasswordInputType] = useState('password');

  return (
    <div id={id} className="field">
      <label htmlFor={id} data-text={label}>
        {label}
      </label>

      <div className="password-field">
        {passwordInputType === 'password' && (
          <img onClick={() => setPasswordInputType('text')} className="icon" src="/icons/hidden.png" height={'15rem'} alt="show password" />
        )}

        {passwordInputType === 'text' && (
          <img onClick={() => setPasswordInputType('password')} className="icon" src="/icons/eye.png" height={'15rem'} alt="show password" />
        )}

        <input id={id} type={passwordInputType} value={values[id as keyof Values]} onChange={(e) => setValues({ ...values, [id]: e.target.value })} />
      </div>
    </div>
  );
};
