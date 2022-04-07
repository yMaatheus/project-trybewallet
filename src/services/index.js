export const currenciesFetch = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resolve = await response.json();
  return resolve;
};

export const teste = '';
