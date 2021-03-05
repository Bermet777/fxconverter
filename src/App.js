import { useState, useEffect } from 'react';
import './App.css';
import CurrenciesSums from './components/CurrenciesSums';

const URL= 'https://api.exchangeratesapi.io/latest?base=USD';


function App() {

 
    const [convertedCurrencies, setConvertedCurrencies] = useState([]);
    const [amount, setAmount] = useState();
    const [selectedCurrency,setSelectedCurrency]=useState();
    const [currencyOptions,setCurrencyOptions]= useState([]);
    const [exchangeRate, setExchangeRate] = useState();
  //  const [convertedAmount,setConvertedAmount]=useState();


    let convertedAmount=Math.round(amount/exchangeRate)

//fetching data from API and storing currency rates
  useEffect(() => {    
  fetch(URL)         
   .then(request => request.json ()) 
   .then (data => {
    setCurrencyOptions ([...Object.keys(data.rates)])
    if (selectedCurrency!=null)    {
    
      setExchangeRate(data.rates[selectedCurrency]);
    }
  } );
   
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

         <button className="button">Convert to USD </button>

      </form>

      {/* {
        convertedCurrencies.map((sum, index) => (
          <CurrenciesSums data={sum} key={index} />
        )
        )
      } */}
      {!selectedCurrency && <div>Amount in USD=</div>} 
      {selectedCurrency && <div name="sum">Amount in USD={convertedAmount} </div>}

    </div>
  );
}

export default App;
