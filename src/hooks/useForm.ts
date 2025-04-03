import { useState } from 'react';

export function useForm<T extends Record<string, string>>(
  initial: T
): [T, (key: keyof T) => React.Dispatch<React.SetStateAction<string>>] {
  const [form, setForm] = useState<T>(initial);

  const setField =
    (key: keyof T): React.Dispatch<React.SetStateAction<string>> =>
    (value) =>
      setForm((prev) => ({
        ...prev,
        [key]: typeof value === 'function' ? value(prev[key]) : value
      }));

  return [form, setField];
}
