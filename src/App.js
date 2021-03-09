import { useState, useEffect } from 'react';
import './App.css';
import CurrenciesSums from './components/CurrenciesSums';
//This is your style and page structure component
//It does not interfere with your data flow, or your App set up
import Header from './components/stylePage/Header';
import CurrencyTracker from './components/stylePage/CurrencyTracker'
import { api_key2 } from './components/stylePage/apiKey'

const URL= 'https://api.exchangeratesapi.io/latest?base=USD';

const URLe='https://api.exchangeratesapi.io/latest?base=USD&symbols=';

function App() {

 
    const [convertedCurrencies, setConvertedCurrencies] = useState([]);
    const [amount, setAmount] = useState();
    const [selectedCurrency,setSelectedCurrency]=useState();
    const [currencyOptions,setCurrencyOptions]= useState([])

  //This is for the CurrencyTrack.js to save all dates to an array
  const [date, setDate] = useState([])
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  
    /**********************************GET Data function********************************** */

    async function getDate(date) {
      
      //The URL for your API, Authentication with API KEY, imported from apiKey.js file
      let trackerUrl = `https://api.polygon.io/v2/aggs/grouped/locale/global/market/fx/${date}?unadjusted=true&apiKey=${api_key2}`;
      
     //check value in tackerUrl, passes
      console.log("parent", JSON.stringify(date))

      //Reset every status before sending a new fetch request
      setLoading(true);
      setError('');
      setDate([]);

      //delay for 500ms
      await pause(500)

      //check 
      console.log('parent',loading, error, date)

      async function pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      //How to send a fetch request to get data
      //when using fetch and async, it always require a "try" and "catch" encapsulation
      //try = sending request
      try {
          let response = await fetch(trackerUrl);
          if (response.ok) {
              //server received and understood my request, returns data in response and turns into JSON format
              let data = await response.json()
              //This is how we update and set the data to our requested object
              setDate(data);
              console.log("response", JSON.stringify(data))
          } else {
              //if we encounter any errors, like a server error
              setError(`Server error: ${response.status} ${response.statusText0}`)
          }
          //if not a server error, it is a network error, and we want to catch this error
      }  catch (err) {
          //network server cannot be contacted
          setError(`Network error: ${err.message}`);
      }

      //if nothing is sent or received, loading status returns to false before sending another request
      setLoading(false);
  
  }

  
  /********************************************************************************************************* */


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

    <div className="AddPageStructure">
    
        {/* This is your style and structure component, it will not affect your data flow or setup */}
        <Header id="header"/>
      </div>
      
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
    
    {/* This was added to help compliment the form */}
    <main>
      <CurrencyTracker date={date}  onSubmit={(d) => getDate(d)} />
    </main>

    </div>
  );
}

export default App;

