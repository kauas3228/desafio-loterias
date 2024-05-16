import { useEffect, useState } from 'react';

// Style 

import './Home.css';

export default function Home() {

  // Data
  const [lotteries, setLotteries] = useState<any>([]);
  const defaultValue = 'megasena';
  const [color, setColor] = useState<String>(defaultValue);

  // Getting data for api

  const getLotteries = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setLotteries(data);
  }

  useEffect(() => {
    const lotteries = `https://loteriascaixa-api.herokuapp.com/api/${defaultValue}/latest`;

    getLotteries(lotteries);

  }, []);

  // Dropdown itens list

  const list = [
    { id: 1, name: 'megasena' },
    { id: 2, name: 'quina' },
    { id: 3, name: 'lotofacil' },
    { id: 4, name: 'lotomania' },
    { id: 5, name: 'timemania' },
    { id: 6, name: 'diadesorte' }
  ];

  // Dropdownd function

  const handleDropdown = (e: any) => {
    const selectedValue = e.target.value;
    const lotterieNewUrl = `https://loteriascaixa-api.herokuapp.com/api/${selectedValue}/latest`;

    setColor(selectedValue);
    getLotteries(lotterieNewUrl);
  }

  return (
    <div className='container'>

      <div className='leftContainer' style={{'backgroundColor': `var(--${color})`}}>

        <select defaultValue={defaultValue} onChange={handleDropdown}>
          {
            list.map((item) => (
              <option value={item.name} key={item.id}>{item.name}</option>
            ))
          }
        </select>

        <div className='lotterieName'>
          <img src='/Logo_Sena.svg'></img>
          <h1>{lotteries.loteria}</h1>
        </div>

        <div className='lotterieInformations'>
          <p>Concurso</p>
          <p className='info'>{lotteries.concurso} - {lotteries.data}</p>
        </div>

      </div>

      <div className='rigthContainer'>

      </div>

    </div>
  )
}
