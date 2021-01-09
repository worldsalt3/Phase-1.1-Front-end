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
      <h1>Hello World</h1>
      {record.map((profile, index) => {
        const {FirstName} = profile;
        return <p>{FirstName}</p>
      })}
    </>
  )
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
