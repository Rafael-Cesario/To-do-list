import { useState } from 'react';

type Values = { email: string; name: string; password: string; confirmPassword: string };

interface Props {
  props: {
    id: keyof Values;
    label: string;
    values: Values;
    setValues: (newValues: Values) => void;
    error: string;
  };
}

export const Field = ({ props: { id, label, values, setValues, error } }: Props) => {
  return (
    <div id={id} className="field">
      <label className={error && 'error'} htmlFor={`${id}-input`} data-text={label}>
        {error || label}
      </label>

      <input id={`${id}-input`} type="text" value={values[id as keyof Values]} onChange={(e) => setValues({ ...values, [id]: e.target.value })} />
    </div>
  );
};

export const FieldPassword = ({ props: { id, label, values, setValues, error } }: Props) => {
  const [passwordInputType, setPasswordInputType] = useState('password');

  return (
    <div id={id} className="field">
      <label className={error && 'error'} htmlFor={id} data-text={label}>
        {error || label}
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
