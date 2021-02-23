import { useState } from 'react';
import './App.css';
import CurrenciesSums from './components/CurrenciesSums';

function App() {

  const [formState, setFormState] = useState({
    amount: 0,
    currency: "KGS"
  });

  const [convertedCurrencies, setConvertedCurrencies] = useState([]);

  const currenciesRatesInUSD = {
    "KGS": 84.54,
    "EUR": 0.83,
    "RUB": 73.93
  }

  const onInputChange = (e) => {
    
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
    
  }

  const onSubmit = (e) => {

    e.preventDefault();
    setConvertedCurrencies([])

    const {currency, amount} = formState;

    setConvertedCurrencies([{
      currency: currency,
      amount: +amount,
      amountInUSD: (+amount/currenciesRatesInUSD[currency]).toFixed(3)
    }])

  }

  console.log(convertedCurrencies);

  return (
    <div className="App">
      
      <form className="form" onSubmit={onSubmit}>
        
        <h1>
          Calculate payment in USD
        </h1>

        <input 
          name="amount" 
          type="number"
          placeholder="Amount" 
          onChange={onInputChange} 
          value={formState.amount}
          required
          />

        <select 
          name="currency" 
          onChange={onInputChange}
          value={formState.currency}
          required
          >
          <option value="KGS">{'Som (KGS)'}</option>
          <option value="EUR">{'Euro (EUR)'}</option>
          <option value="RUB">{'Ruble (RUB)'}</option>
        </select>

         <button className="button">
          Convert to USD
        </button>

      </form>

      {
        convertedCurrencies.map((sum, index) => (
          <CurrenciesSums data={sum} key={index} />
        ))
      }


    </div>
  );
}

export default App;
