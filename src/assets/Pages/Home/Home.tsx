import React, { useEffect, useState } from 'react';


// Style 
import './Home.css';
import Dropdown from '../../components/DropDown/Dropdown';

export default function Home() {
  const [lotteries, setLotteries] = useState([]);
  const apiURL = `https://loteriascaixa-api.herokuapp.com/api/megasena/latest`;

  const getLotteries = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setLotteries(data);
  }

  useEffect(() => {
    const lotteries = apiURL;

    getLotteries(lotteries);

  }, []);

  return (
    <div className='container'>
      <div className='leftContainer'>
        <Dropdown />

        <div className='lotterieName'>
          <img src='/Logo_Sena.svg'></img>
          <h1>{lotteries.loteria}</h1>
        </div>

        <div className='lotterieInformations'>
          <p>Concurso</p>
          <p className='info'>{lotteries.concurso} - {lotteries.data}</p>
        </div>

      </div>
    </div>
  )
}
