import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const url = 'http://api.enye.tech/v1/challenge/records';

const Record = () => {

  // When the user clicks on the button, open the modal
  const display = (e) => {
    // e.style.display = 'block'
  }

  // When the user clicks on <span> (x), close the modal
  const x = (e) => {
    // e.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target) {
      // event.style.display = 'none'
    }
  }

  const [record, setRecord] = useState([]);
  
  const getProfiles = async () => {
    const response = await fetch(url);
    const record = await response.json();
    setRecord(record.records.profiles);
  }

  useEffect(async () => {
    getProfiles();
  }, []);

  return (
    <>
      <header className='header'>
        <h1>Records</h1>
        <Search />
        <Filter />
      </header>

      <ul>
        {record.map((profile, index) => {
          const {
            FirstName,
            LastName,
            Gender,
            Latitude,
            Longitude,
            CreditCardNumber,
            CreditCardType,
            Email,
            DomainName,
            PhoneNumber,
            MacAddress,
            URL,
            UserName,
            LastLogin,
            PaymentMethod,
          } = profile;

          if(index < 20) {
            return (
              <li key={index} className='card' onClick={display()}>
                <h2>
                  {FirstName} {LastName}
                </h2>
                <a href={Email}>
                  <p className='email'>{Email}</p>
                </a>
                <p>{PhoneNumber}</p>
                <div className='modal'>
                  <div className="modal-content">
                    <div className="modal-header">
                      <span className="close" onClick={x()}>&times;</span>
                      <h2>Modal Header</h2>
                    </div>
                    <div className="modal-body">
                      <p>Some text in the Modal Body</p>
                      <p>Some other text...</p>
                    </div>
                    <div className="modal-footer">
                      <h3>Modal Footer</h3>
                    </div>
                  </div>
                </div>
              </li>
            )
          }
        })}
      </ul>
      <Pagination />
    </>
  )
};

const Search = () => {
  return(
    <>
      <input type="text" className="search"  placeholder="Search for names.." />
    </>
  );
};

const Pagination = () => {
  return (
    <div className='pagination pagin'>
      <a href='#'>&laquo;</a>
      <a href='#'>1</a>
      <a className='active' href='#'>
        2
      </a>
      <a href='#'>3</a>
      <a href='#'>4</a>
      <a href='#'>5</a>
      <a href='#'>6</a>
      <a href='#'>&raquo;</a>
    </div>
  )
};

const Filter = () => {
  return(
    <div className="dropdown">
      <button className="dropbtn">Filter</button>
      <div id="myDropdown" className="dropdown-content">
        <a href="#about">About</a>
        <a href="#base">Base</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
        <a href="#custom">Custom</a>
        <a href="#support">Support</a>
        <a href="#tools">Tools</a>
      </div>
    </div>
  );
};

ReactDOM.render(
    <Record />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
