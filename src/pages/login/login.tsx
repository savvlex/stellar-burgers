import { FC, FormEvent, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginThunk } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [form, setField] = useForm({ email: '', password: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk({ email: form.email, password: form.password }));
  };

  return (
    <LoginUI
      errorText=''
      email={form.email}
      setEmail={setField('email')}
      password={form.password}
      setPassword={setField('password')}
      handleSubmit={handleSubmit as (e: SyntheticEvent<Element, Event>) => void}
    />
  );
};
