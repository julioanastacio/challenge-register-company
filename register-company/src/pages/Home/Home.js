import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import './Home.css';

function Home() {
  const [cnpj, setCnpj] = useState('');

  const input = useMemo(() => {
    return {
      id: 1,
      name: 'cnpj',
      type: 'text',
      placeholder: 'CNPJ',
      errorMessage: 'Insira um CNPJ válido!',
      label: 'CNPJ (somente números)',
      pattern: '^[0-9]{14}',
      required: true,
    };
  }, []);

  const onChange = useCallback((event) => {
    setCnpj(event.target.value);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          navigate('/register-company', {
            state: data,
          });
        })
        .catch((err) => console.log(err));
    },
    [cnpj, navigate],
  );

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <h1>Buscar Empresa</h1>
        <FormInput
          key={input.id}
          {...input}
          value={cnpj[input.name]}
          onChange={onChange}
        ></FormInput>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Home;
