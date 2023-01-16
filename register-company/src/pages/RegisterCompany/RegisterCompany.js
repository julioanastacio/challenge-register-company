import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import './RegisterCompany.css';

function RegisterCompany() {
  const [values, setValues] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    email: '',
    telefone: '',
    logradouro: '',
  });

  const inputs = useMemo(
    () => [
      {
        id: 1,
        name: 'cnpj',
        type: 'text',
        placeholder: 'CNPJ',
        errorMessage: 'Insira um CNPJ válido!',
        label: 'CNPJ (somente números)',
        pattern: '^[0-9]{14}',
        required: true,
      },
      {
        id: 2,
        name: 'razao_social',
        type: 'text',
        placeholder: 'Razão Social',
        errorMessage: 'Insira uma razao social válida!',
        label: 'Razão Social',
        pattern: `^(?!\s*$).+`,
        required: true,
      },
      {
        id: 3,
        name: 'nome_fantasia',
        type: 'text',
        placeholder: 'Nome Fantasia',
        errorMessage: 'Insira um nome fantasia válido!',
        label: 'Nome Fantasia',
      },
      {
        id: 4,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        errorMessage: 'Insira um e-mail válido!',
        label: 'Email',
        required: true,
      },
      {
        id: 5,
        name: 'telefone',
        type: 'text',
        placeholder: 'Telefone',
        errorMessage: 'Insira um telefone válido!',
        label: 'Telefone (somente números)',
        pattern: '^[0-9]{10,11}',
        required: true,
      },
      {
        id: 6,
        name: 'logradouro',
        type: 'text',
        placeholder: 'Logradouro',
        errorMessage: 'Insira um logradouro válido!',
        label: 'Logradouro',
        pattern: `^(?!\s*$).+`,
        required: true,
      },
    ],
    [],
  );

  const onChange = useCallback((event) => {
    setValues((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }, []);

  function createCompany(values) {
    fetch('http://localhost:3001/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      createCompany(values);
    },
    [values],
  );

  const location = useLocation();

  useEffect(() => {
    const company = location.state;

    setValues({
      cnpj: company.cnpj.replaceAll(/[^0-9]/g, ''),
      razao_social: company.nome,
      nome_fantasia: company.fantasia,
      email: company.email,
      telefone: company.telefone.replaceAll(/[^0-9]/g, ''),
      logradouro: `${company.logradouro} ${company.numero} ${company.complemento}`,
    });
  }, [location]);

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Empresa</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          ></FormInput>
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default RegisterCompany;
