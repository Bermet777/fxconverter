//API source: https://polygon.io/
//API Keys or passwords should go into ".env" file
//They don't upload into your repo because they are stored
//in ".gitignore" file. People will not hack your app this way.
import React, { useState } from 'react'
//import your API key from apiKey.js file
// import { api_key2 } from './apiKey'
import './CurrencyTracker.css'

export default function StockTracker(props) {

    //check props
    // console.log("tracker", JSON.stringify(props))
    // console.log("tracker",Object.entries(props.date))


            // This works to get the value of i, but need to try to get 
            //the values of arrays nested inside
        for (let i in props.date.results) {
            if(i.length <=1 && i.length >=0){
                console.log(props.date.results[i])
                console.log(Object.values(props.date.results[i]))
                
            }
        }

    

    const [date, setDate] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        //check event
        console.log("tracker", event);

        const currentDate = { date: date };
        //check date
        console.log("tracker", date)

        props.onSubmit(currentDate.date)
        setDate("")
        console.log( "submit", currentDate)
    }
    

    function handleChange(event) {
        let {name, value} = event.target;
        if (name) {
            setDate(value);
        }
        //check values
        console.log({name:value})
    }
    

    return (
        <div className="StockTracker">
            <h2>Currency Tracker</h2>

            {props.loading && <h2>Loading...</h2>}

            {props.error && <h2 style={{color: 'red'}}>{props.error}</h2>}

            <ul>
                {   
            
                }
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="label-date">
                <label htmlFor="date" className="date">
                Enter Date
                </label>
                </div>
                <div className="input-date">
                <input type="date" name="date" onChange={handleChange} value={date} className="date" placeholder="mm/dd/yy" />
                </div>
                <button type="submit" className="date">Get Current Rate</button>
                
            </form>
        
        </div>
    )
}