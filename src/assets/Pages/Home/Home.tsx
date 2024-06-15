import { useEffect, useState } from 'react';

// Style 

import './Home.css';
import Load from '../../Components/Load/Load';

export default function Home() {

  // Data

  const [lotterie, setLotterie] = useState<any>([]);
  const defaultValue = 'megasena';
  const [color, setColor] = useState<String>(defaultValue);


  const itens = [
    { id: 1, name: 'megasena' },
    { id: 2, name: 'lotofacil' },
    { id: 3, name: 'quina' },
    { id: 4, name: 'lotomania' },
    { id: 5, name: 'timemania' },
    { id: 6, name: 'diadesorte' },
  ]
  // Getting data for api

  const getLotterie = async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();

    setLotterie(data);
  }

  useEffect(() => {
    const lotterie = `https://loteriascaixa-api.herokuapp.com/api/${defaultValue}/latest`;

    getLotterie(lotterie);
  }, []);


  // Dropdownd function

  const handleDropdown = (e: any) => {
    const selectedValue = e.target.value;
    const lotterieNewUrl = `https://loteriascaixa-api.herokuapp.com/api/${selectedValue}/latest`;

    setColor(selectedValue);
    getLotterie(lotterieNewUrl);
  }

  return (

    <div>
      
      {Object.keys(lotterie).length == 0 && (
        <Load />
      )}

      {Object.keys(lotterie).length > 0 && (
        <div className='container'>
          <div className='leftContainer' style={{ 'backgroundColor': `var(--${color})` }}>

            <select defaultValue={defaultValue} onChange={handleDropdown}>
              {
                itens.map((item: any) => (
                  <option value={item.name} key={item.id}>{item.name}</option>
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
      )}

    </div>
  )
}
