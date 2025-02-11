import React from 'react';
import './app.css';

export function Accounts() {
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
    
        </div>
        </div>
    </div>
    </main>
    );
}