import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export function Home() {
  const [count, setCount] = useState(null);
  const [text, setText] = useState('');
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(null);
  
  let teljari = 0 ; 
  const max = 1000; 
  
  const recounter = e => {
    teljari = e.target.value.length; 
    if( teljari <= max ) setCount(teljari);
  }

  let success = true; 

  const onSubmit = async(e) => {
    console.log(text);
    const data =  { text };
    console.log(data); 
    
    const requestOptions = {
      //method: 'POST',
      //headers: {"Content-Type": "application/json" },
      //body: JSON.stringify(data)
    };

    success = await fetch(apiUrl + '/tulkur/adduser', requestOptions);
    
    /*if(success){
      history.push('/tulkur');
    }
    else{
      console.log("Virkar ekki");
    }*/
  }
    
  return(
    <div class="grid">
      <div class="row">

        <div class="col col-6">
          <div class="categories">
            <section>
              <h2>English</h2>
                <form onSubmit={onSubmit}>
                  <div class="smallBox">
                    <textarea 
                      class="textarea" 
                      id="xtext" 
                      name="text"
                      value={text}
                      maxLength={1000} 
                      onChange={ recounter } 
                    />
                      <div class="small_button_box">
                        <button type="submit" class="button">Translate</button>
                          <div id="counter">
                            <span> <p> { count } / 1000 </p> </span>
                          </div>
                      </div>
                  </div>
                </form>
            </section>
          </div>
        </div>
        <div class="col col-6">

        <div class="categories">
            <section>
              <h2>Icelandic</h2>
                <form>
                  <div class="smallBox">
                    <textarea class="textarea" id="newText" name="newText"></textarea>
                  </div>
              </form>
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}
