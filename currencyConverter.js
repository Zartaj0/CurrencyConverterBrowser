



const getExchangeRate = async (fromCurrency, toCurrency) => {

  return fetch('http://api.currencylayer.com/live?access_key=485ee24b4cefc557411750d36d72e3a5')

    .then((res) => {

      return res.json()

    }).then((res) => {
      const rate = res.quotes;
      const usd = 1 / rate[`USD${fromCurrency}`];
      const exchangeRate = usd * rate[`USD${toCurrency}`];
      return exchangeRate


    }).catch((err) => { console.log(err); })

};


const getCountries = async (c) => {
  return await fetch(`https://restcountries.com/v3.1/currency/${c}`)
    .then((response) => {
      return response.json()

    }).then((res)=>{
     return res.map(country => country.name.common).join(',')
    }).catch(err => console.log(err))
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

  const countries = await getCountries(toCurrency);
  const convertedAmount = await (amount * exchangeRate);
  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}


const from =window.prompt('enter from which currency you want to convert')
const tocu =window.prompt('enter to which currency you want to convert')
const amount = Number(window.prompt('enter amount you want to convert'))






console.log('converting currency,please wait');
convertCurrency(from, tocu, amount)
  .then(data => console.log(data))
  .catch(err => console.log(err))