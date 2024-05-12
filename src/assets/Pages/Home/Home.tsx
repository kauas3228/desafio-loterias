import React, { useEffect, useState } from 'react';


// Style 
import './Home.css';
import Dropdown from '../../components/DropDown/Dropdown';

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

  return (
    <div>
        <Dropdown></Dropdown>
    </div>
  )
}
