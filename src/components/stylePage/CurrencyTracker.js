//API source: https://polygon.io/
//API Keys or passwords should go into ".env" file
//They don't upload into your repo because they are stored
//in ".gitignore" file. People will not hack your app this way.
import React, { useState } from 'react'
//import your API key from apiKey.js file
import { api_key2 } from './apiKey'
import './CurrencyTracker.css'

export default function StockTracker() {
    //set initial status of object being retrieved from API
    const [date, setDate] = useState([]);
    //set initial status for loading while waitng for response from API
    const [loading, setLoading] = useState(false);
    //set initial status for error while waitng for response from API
    const [error, setError] = useState('')

    //Delay loading, like when you see "Loading . . ." messages on other web apps
    //async keeps the communication open between your server and the API
    async function pause(ms) {
        //promises are similar to direction of traffic
        //each time we request and get a response, it uses up that "promise"
        //think of it like calling someone with a coin, you can use it only once
        //But the async creates a new promise each time, keeping the channel open until
        //we get some kind of response after a certain amount of milliseconds
        return new Promise(resolve => setTimeout(resolve, ms))
    }


    /**********************************GET Data function********************************** */

    async function getDate() {
        //The URL for your API, Authentication with API KEY, imported from apiKey.js file
        let url = `https://api.polygon.io/v2/aggs/grouped/locale/global/market/fx/${date}?unadjusted=true&apiKey=${api_key2}`;

        //Reset every status before sending a new fetch request
        setLoading(true);
        setError('');
        setDate([]);

        //delay for 500ms
        await pause(500)


        //How to send a fetch request to get data
        //when using fetch and async, it always require a "try" and "catch" encapsulation
        //try = sending request
        try {
            let response = await fetch(url);
            if (response.ok) {
                //server received and understood my request, returns data in response and turns into JSON format
                let data = await response.json()
                //This is how we update and set the data to our requested object
                setDate(data);
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


    return (
        <div className="StockTracker">
            <h2>Currency Tracker</h2>
            {/* {loading && <h2>Loading...</h2>}

            {error && <h2 style={{color: 'red'}}>{error}</h2>}

            <ul>
                {
                date.map(d => <li key={d.results.T}>{d.results[0]}</li>)
                }
            </ul> */}

            <form>
                <div className="label-date">
                <label htmlFor="date" className="date">
                Enter Date
                </label>
                </div>
                <div className="input-date">
                <input type="date" className="date" placeholder="mm/dd/yy" />
                </div>
                <button type="submit" className="date">Get Current Rate</button>
                
            </form>
        
        </div>
    )
}