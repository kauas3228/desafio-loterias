import { useEffect, useState } from 'react';


// Style 
import './Home.css';

export default function Home() {
  
  // Data
  const [lotteries, setLotteries] = useState([]);
  const [seletValue, setSelectValue] = useState('megasena');

  // API URL

  const apiURL = `https://loteriascaixa-api.herokuapp.com/api/${seletValue}/latest`;

  // Getting data for api

  const getLotteries = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setLotteries(data);
  }

  useEffect(() => {
    const lotteries = apiURL;

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

  const handleDropdown = () => {
    const loterrie = `https://loteriascaixa-api.herokuapp.com/api/${seletValue}/latest`;

    getLotteries(loterrie);
    console.log(lotteries);
    console.log(seletValue);
  }

  return (
    <div className='container'>

      <div className='leftContainer'>

        <select defaultValue={seletValue} onChange={e => {
          setSelectValue(e.target.value)
          handleDropdown();
        }}>
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
