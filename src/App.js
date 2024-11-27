import React, { useEffect, useState } from "react";
import axios from "axios";

const useBitcoin = () => {
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const usdPrice = response.data.bpi.USD.rate_float;
        setPrice(usdPrice);
      } catch (error) {
        console.error("Bitcoin fiyatı çekilirken hata oluştu:", error);
      }
    };

    fetchBitcoinPrice(); 
    const intervalId = setInterval(fetchBitcoinPrice, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  return price;
};


function App() {
  const bitcoinPrice = useBitcoin();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bitcoin Fiyatı</h1>
      {bitcoinPrice === undefined ? (
        <p>Loading...</p>
      ) : (
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          ${bitcoinPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      )}
    </div>
  );
}

export default App;
