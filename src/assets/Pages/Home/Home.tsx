import React, { useEffect, useState } from 'react';


// Style 
import './Home.css';

export default function Home() {
  const [lotteries, setLotteries] = useState([]);
  const apiURL = 'https://loteriascaixa-api.herokuapp.com/api';

  const getLotteries = async (url: any) =>{
    const res = await fetch(url);
    const data = await res.json();

    setLotteries(data);
  }

    useEffect(() => {
      const lotteries = apiURL;

      getLotteries(lotteries);
    }, []);

    const handleConsoleLotteries = () =>{
      console.log(lotteries);
    }
  return (
    <div>
      <button onClick={handleConsoleLotteries}>Test</button>
    </div>
  )
}
