import React, { useState, useEffect } from 'react';

const selectedCurrencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

const CurrencyTable = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    fetch('https://api.currencyfreaks.com/latest?apikey=ec65d39764e244c184395e2daabb8813')
      .then(response => response.json())
      .then(data => {
        const rates = Object.keys(data.rates)
          .filter(currency => selectedCurrencies.includes(currency))
          .map(currency => {
            const exchangeRate = parseFloat(data.rates[currency]);
            const weBuy = (exchangeRate + (exchangeRate * 0.05)).toFixed(4); 
            const weSell = (exchangeRate - (exchangeRate * 0.05)).toFixed(4);
            return {
              currency,
              exchangeRate: exchangeRate.toFixed(4),
              weBuy,
              weSell,
            };
          });
        setExchangeRates(rates);
      })
      .catch(error => console.error('Error fetching currency rates:', error));
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#FF7F00', 
      color: '#fff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <table style={{ textAlign: 'center', fontSize: '1.3em', marginBottom: '10px', borderSpacing: '30px 10px' }}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map(rate => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ textAlign: 'center', fontSize: '1em' }}>
        Rates are based from 1 USD.<br />
        This application uses API from <a href="https://currencyfreaks.com" style={{ color: '#fff' }}>https://currencyfreaks.com</a>.
      </p>
    </div>
  );
};

export default CurrencyTable;
