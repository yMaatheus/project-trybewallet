export const currenciesFetch = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resolve = await response.json();
  const currencies = Object.keys(resolve).filter((moeda) => moeda !== 'USDT');
  return currencies;
};

export const teste = '';
