import { useEffect, useState } from 'react';

// Style 

import './Home.css';

export default function Home() {

  // Data

  const [allLoteries, setAllLotteries] = useState<any>([]);
  const [lotterie, setLotterie] = useState<any>([]);
  const defaultValue = 'maismilionaria';
  const [color, setColor] = useState<String>(defaultValue);

  // Getting data for api

  const getAllLoterreis = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setAllLotteries(data);
  }

  const getLotterie = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setLotterie(data);
  }

  useEffect(() => {
    const allLoteries = 'https://loteriascaixa-api.herokuapp.com/api';
    const lotterie = `https://loteriascaixa-api.herokuapp.com/api/${defaultValue}/latest`;

    getLotterie(lotterie);
    getAllLoterreis(allLoteries)
  }, []);


  // Dropdownd function

  const handleDropdown = (e: any) => {
    const selectedValue = e.target.value;
    const lotterieNewUrl = `https://loteriascaixa-api.herokuapp.com/api/${selectedValue}/latest`;

    setColor(selectedValue);
    getLotterie(lotterieNewUrl);
  }

  return (
    <div className='container'>

      <div className='leftContainer' style={{ 'backgroundColor': `var(--${color})` }}>

        <select defaultValue={defaultValue} onChange={handleDropdown}>
          {
            allLoteries.map((item: any) => (
              <option value={item} key={item}>{item}</option>
            ))
          }
        </select>

        <div className='lotterieName'>
          <img src='/Logo_Sena.svg'></img>
          <h1>{lotterie.loteria}</h1>
        </div>

        <div className='lotterieInformations'>
          <p>Concurso</p>
          <p className='info'>{lotterie.concurso} - {lotterie.data}</p>
        </div>

      </div>

      <div className='rigthContainer'>
          <p></p>
        {// Map the number in draw order 
        }
        <div className='numbersContainer'>
          {
            lotterie.dezenasOrdemSorteio?.map((item: any) => (
              <div key={item} className='numbers'><p>{item}</p></div>
            ))
          }
        </div>

        <p>Este sorteio é meramente ilustrativo e não possui nenhuma ligagação com a CAIXA.</p>
      </div>

    </div>
  )
}
