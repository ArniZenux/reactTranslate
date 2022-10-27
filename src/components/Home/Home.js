import React, {useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export function Home() {
  const [nafn, setNafn] = useState('');
  const [setning, setSetning] = useState('');

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  
  let teljari = 0; 
  const max = 1000; 

  const recounter = e => {
    setNafn(e.target.value); 

    teljari = e.target.value.length; 
    if( teljari <= max ) setCount(teljari);
  }
  
  useEffect(() => {
    async function getData(){
    setLoading(true);
    setError(null); 
    
    try {
      const result = await fetch(apiUrl + `/translate`); 
      //console.log(result); 
      
      if(!result.ok){
        throw new Error('Ekki ok');
      }
    }
    catch(e){
      console.warn('unable to fetch data', e); 
      setError('Nær ekki í samband við vefþjónustuna.');
      return; 
    }
    finally{
      setLoading(false); 
    }
   }
  getData(); 
  }, []);

  if(error){
    return(
      <div> 
        <h2> Error - Engin í samband við þjónustuna </h2>
      </div>
    )
  }

  if(loading){
    return( 
        <div> 
          <h2> Loading - Augnblik! </h2> 
        </div>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { nafn };

    try {
      const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( data )
      }; 
  
      await fetch(apiUrl + `/translate`, requestOptions)
      .then(response => {
        return response.json() 
      })
      .then(data => {
        setSetning(data); 
      });
    }
    catch(e){
      console.warn('unable to fetch data', e); 
      return; 
    }
  }
    
  return(
    <div className='grid'>
      <div className='row'>

        <div className="col col-6">
          <div className="categories">
            <section>
              <h2>English</h2>
                <form onSubmit={onSubmit}>
                  <div className="smallBox">
                    <textarea 
                      className='textarea' 
                      id="xtext" 
                      name="text"
                      maxLength={1000} 
                      onChange={ recounter } 
                    />
                      <div className="small_button_box">
                        <button type="submit" className="button">Translate</button>
                          <div id="counter">
                            <span> <p> { count } / 1000 </p> </span>
                          </div>
                      </div>
                  </div>
                </form>
            </section>
          </div>
        </div>
        <div className="col col-6">

        <div className="categories">
            <section>
              <h2>Icelandic</h2>
                <form>
                  <div className="smallBox">
                    <textarea 
                      className='textarea' 
                      id="newText" 
                      name="newText"
                      defaultValue={setning}
                    />                      
                  </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}