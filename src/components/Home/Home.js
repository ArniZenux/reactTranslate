import React, {useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export function Home() {
  const [count, setCount] = useState(null);
  //const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  
  let teljari = 0; 
  const max = 1000; 
  
  const recounter = e => {
    teljari = e.target.value.length; 
    if( teljari <= max ) setCount(teljari);
  }
  
  useEffect(() => {
    async function getData(){
    setLoading(true);
    setError(null); 
    let json;
    
    try {
      const result = await fetch(apiUrl + `/translate`); 
      console.log(result); 
      
      if(!result.ok){
        throw new Error('Ekki ok');
      }
      json = await result.json();
    }
    catch(e){
      console.warn('unable to fetch data', e); 
      setError('Gat ekki sótt efni í vefþjónustu - Bilað í þjónustuna.');
      return; 
    }
    finally{
      setLoading(false); 
    }
    }
 
  }, []);

  const onSubmit = async (e) => {
    console.log(apiUrl); 
  }
  /*const onSubmit = async (e) => {
    let success = true; 
    const info = 'arni';
    console.log('Hello log');
    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(info)
    };
    
    console.log(apiUrl); 

    success = await fetch(apiUrl + '/translate', requestOptions);
    if(success){
      console.log('success');
    }
    else{
      console.log(apiUrl);
    }
  }*/
    
  return(
    <div classNAme='grid'>
      <div className='row'>

        <div classNAme="col col-6">
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
                    <textarea className='textarea' id="newText" name="newText"></textarea>
                  </div>
              </form>
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}