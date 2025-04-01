import React, { useState, useEffect } from 'react';
import './app.css';
import Chat, {ChatClient} from './chat';

export function Accounts() {
    const [accountsLinked, setAccountsLinked] = useState(false);
    const [cryptoSymbol, setCryptoSymbol] = useState('');
    const [cryptoPrice, setCryptoPrice] = useState(null);
    const [chatClient] = useState(new ChatClient());
    
    useEffect(() => {
        const linked = localStorage.getItem('accounts_linked');
        if (linked) {
            setAccountsLinked(true);
        }
    }, []);

    const linkAccounts = () => {
        localStorage.setItem('accounts_linked', 'true');
        setAccountsLinked(true);
    };

    const removeAccounts = () => {
        localStorage.removeItem('accounts_linked');
        setAccountsLinked(false);
    };

    const fetchCryptoPrice = async () => {
        const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${cryptoSymbol}`);
        const data = await response.json();
        if (data.quotes && data.quotes.USD) {
            setCryptoPrice(data.quotes.USD.price);
        } else {
            setCryptoPrice('Invalid symbol');
        }
    };

    return (  
    <main>
    <div className="login-background">
        <div className="container d-flex justify-content-center align-items-center" type="page-format">
        <div className="account-container">

            <div id="picture" className="picture-box"><img width="400px" src="stock_icon.png" alt="random" /></div>

            <p>
            Here you can connect your bank accounts through a service called Plaid. This service is used by nearly all banks in the world for 
            secure and easy access to your financial information. We do not store any of your information on our servers since the information
            comes from Plaid.
            </p>
            <p style={{padding_bottom: "10px"}}>Plaid Login Here:</p>
            
            {accountsLinked ? (
                <button className="btn btn-danger" onClick={removeAccounts}>Remove Accounts</button>
            ) : (
                <button className="btn btn-primary" onClick={linkAccounts}>Link Accounts</button>
            )}

            
    
        </div>
        </div>
    </div>
    <div className="crypto-price-container mt-4">
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    placeholder="Ex: btc-bitcoin" 
                    value={cryptoSymbol} 
                    onChange={(e) => setCryptoSymbol(e.target.value)} 
                />
                <button className="btn btn-primary" onClick={fetchCryptoPrice}>Fetch Crypto Price</button>
                {cryptoPrice && (
                    <p className="mt-2">Crypto Price: ${cryptoPrice}</p>
                )}
            </div>
    <div className="chat-container mt-4">
    <Chat webSocket={chatClient} />
    </div>
    </main>
    );
}