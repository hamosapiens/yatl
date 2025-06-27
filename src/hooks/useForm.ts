import { useState } from 'react';

type FormFields = Record<string, string>;
type TouchedFields = Record<string, boolean>;

export function useForm<T extends FormFields>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<TouchedFields>(
    Object.fromEntries(Object.keys(initialValues).map(k => [k, false])) as TouchedFields
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  return {
    values,
    touched,
    setValues,
    setTouched,
    handleChange,
    handleBlur,
  };
}
