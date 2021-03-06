import { useState, useEffect } from 'react';
import './App.css';
import CurrenciesSums from './components/CurrenciesSums';
import PageStructure from './components/PageStructure';



const URL= 'https://api.exchangeratesapi.io/latest?base=USD';

const URLe='https://api.exchangeratesapi.io/latest?base=USD&symbols=';

function App() {

 
    const [convertedCurrencies, setConvertedCurrencies] = useState([]);
    const [amount, setAmount] = useState();
    const [selectedCurrency,setSelectedCurrency]=useState();
    const [currencyOptions,setCurrencyOptions]= useState([])

//fetching data from API and storing currency rates
  useEffect(() => {    
  fetch(URL)         
   .then(request => request.json ()) 
   .then (data => setCurrencyOptions ([...Object.keys(data.rates)]));

  }, []);
// fetching rate for selected currency
  useEffect(() => { 
    if (selectedCurrency!=null)    {
      fetch(URLe+selectedCurrency)         
      .then(request => request.json ()) 
      .then (data => (data));
    }
    
  
    }, [selectedCurrency]);
  
  const onInputChange = (e) => {
    
    setAmount(e.target.value) }
    
    
  const onSelectChange = (e) => {
    setSelectedCurrency(e.target.value)
  }

  const onSubmit = (e) => {

    e.preventDefault();
    //setConvertedCurrencies([])

   // const {currency, amount} = formState;

    //setConvertedCurrencies([{
    //  currency: currency,
    //  amount: +amount,
    //  amountInUSD: (+amount/currenciesRatesInUSD[currency]).toFixed(3)
    //}])

  }


  return (
    <div className="App">
      <PageStructure />

      <form className="form" onSubmit={onSubmit}>
        
        <h1>
          Calculate payment in USD
        </h1>
        

        <input 
          name="amount" 
          type="number"
          placeholder="Amount" 
          onChange={onInputChange} 
          value={amount}
          required
          />

        <select 
          name="currency" 
          onChange={onSelectChange}
          value={selectedCurrency}
          required
          > 
          {currencyOptions.map(element => (<option key={element} > {element} </option>))}
         
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
