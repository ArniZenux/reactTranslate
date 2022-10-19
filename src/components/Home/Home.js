import React, { useState } from 'react';
export function Home() {
  const [count, setCount] = useState(0);
  
  const recounter = e => {
    setCount(e.target.value.length);
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log("balblbalab");
  }
  
  return(
    <div class="grid">
      <div class="row">

        <div class="col col-6">
          <div class="categories">
            <section>
              <h2>English</h2>
                <form action="/translate" method="POST">
                  <div class="smallBox">
                    <textarea 
                      class="textarea" 
                      id="xtext" 
                      name="text" 
                      onChange={ recounter } 
                    />
                      <div class="small_button_box">
                        <button type="submit" class="button">Translate</button>
                          <div id="counter">
                            <span> <p> { count } </p> </span>
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
                <form onSubmit={handleSubmit}>
                  <div class="smallBox">
                    <textarea class="textarea" id="newText" name="newText"></textarea>
                      <div class="small_button_box">
                        <button type="submit" class="button">Translate</button>
                      </div>
                  </div>
              </form>
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}
