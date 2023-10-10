import { useEffect, useState } from "react";
// JSX表記が無いときはimport React from 'react';する必要がないということです。Reactをimportしないようにすれば、ESLintに怒られなくなります。



const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    //ローカルストレージに値が入っているなら取得する
    if (jsonValue !== null) return JSON.parse(jsonValue);

    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
};

export default useLocalStorage;