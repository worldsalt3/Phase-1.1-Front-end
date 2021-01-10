import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const url = 'http://api.enye.tech/v1/challenge/records';

const Record = () => {
  const [record, setRecord] = useState([]);
  
 

  const getProfiles = async () => {
    const response = await fetch(url);
    const record = await response.json();
    setRecord(record.records.profiles)
  }

  useEffect(async () => {
    getProfiles();
  }, [])
  return (
    <>
      <header className='header'>
        <h1>Records</h1>
        <Search />
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
          } = profile
          return (
            <li key={index} className='card'>
              <h2>
                {FirstName} {LastName}
              </h2>
              <a href={Email}>
                <p className='email'>{Email}</p>
              </a>
              <p>{PhoneNumber}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
};

const Search = () => {
  return(
    <>
      <input type="text" className="search" onkeyup="myFunction()" placeholder="Search for names.." />
    </>
  );
}

ReactDOM.render(
    <Record />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
