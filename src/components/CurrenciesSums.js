import React from 'react'
import './CurrenciesSums.css';
export default function CurrenciesSums(props) {
    
    const {
        currency,
        amount,
        amountInUSD
    } = props.data;
    
      

    return (
        <div className="sum">
            <p>{`${amount} ${currency} is $ ${amountInUSD}`}</p> 
        </div>
    )
}
