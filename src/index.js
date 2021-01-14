import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination'
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

Modal.setAppElement('#root');

const url = 'https://api.enye.tech/v1/challenge/records';

const Record = () => {
  
  const [record, setRecord] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchRecord, setSearchRecord] = useState([]);
  const [updateRecord, setUpdateRecord] = useState([]);
  const [filter, setFilter] = useState([])
 
  
  const getProfiles = async () => {
    const response = await fetch(url);
    const record = await response.json();
    setRecord(record.records.profiles);
    setSearchRecord(record.records.profiles);
    setUpdateRecord(record.records.profiles)
    setFilter(record.records.profiles)
  }

  const recordPerPage = 20
  const [activePage, setCurrentPage] = useState(1)

  const indexOfLastRecord = activePage * recordPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage
  const currentRecord = updateRecord.slice(indexOfFirstRecord, indexOfLastRecord)

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    setCurrentPage(pageNumber)
  }

  // console.log(record)
  
  
  const data = () => {
    setModalData(record)
  }
  
  
  const openModal = (UserName) => {
    data();
    setModalIsOpen(true);
    setModalData((record) => {
      return record.filter((profile) => profile.UserName === UserName)
    })
  }
  
  const getSelection = async (selected) => {
    setFilter((record) => {
      return record.filter(
        (profile) =>
        selected.includes(profile) ||
        profile.Gender.toLowerCase() === selected.toLowerCase() ||
        profile.PaymentMethod.toLowerCase() === selected.toLowerCase()
        )
      })
    }
    
    console.log(filter)
  const clickSearch = async (search) => {
    setSearchRecord((record) => {
      return record.filter(
        (profile) =>
          profile.Gender.toLowerCase() === search.toLowerCase() ||
          profile.FirstName.toLowerCase() === search.toLowerCase() ||
          profile.LastName.toLowerCase() === search.toLowerCase() ||
          profile.UserName.toLowerCase() === search.toLowerCase() ||
          profile.Email.toLowerCase() === search.toLowerCase() ||
          profile.PhoneNumber.toLowerCase() === search.toLowerCase() ||
          profile.CreditCardNumber.toLowerCase() === search.toLowerCase() ||
          profile.CreditCardType.toLowerCase() === search.toLowerCase() ||
          profile.PaymentMethod.toLowerCase() === search.toLowerCase() 
      )
    })
    
  }

  // const renderSearch = searchRecord.map((profile, index) => {
  //   const { FirstName, LastName, PhoneNumber, Email, UserName } = profile

  //   if (index < 20) {
  //     return (
  //       <div
  //         key={index}   
  //         className='card'
  //         onClick={() => {
  //           openModal(UserName)
  //         }}
  //       >
  //         <h2>
  //           {FirstName} {LastName}
  //         </h2>
  //         <a href={Email}>
  //           <p className='email'>{Email}</p>
  //         </a>
  //         <p>{PhoneNumber}</p>
  //       </div>
  //     )
  //   }
  // })

  const renderRecords = currentRecord.map((profile, index) => {
    const { FirstName, LastName, PhoneNumber, Email, UserName } = profile
      return (
        <div
          key={index}
          className='card'
          onClick={() => {
            data()
            openModal(UserName)
          }}
        >
          <h2>
            {FirstName} {LastName}
          </h2>
          <a href={Email}>
            <p className='email'>{Email}</p>
          </a>
          <p>{PhoneNumber}</p>
        </div>
      )
  })
    
  useEffect(async () => {
    getProfiles();
  }, []);

  useEffect(async() => {
    setUpdateRecord(searchRecord)
  },[<Search/>])

//  useEffect(async () => {
//    setUpdateRecord(filter)
//  }, [<Filter />])

  return (
    <>
      <header className='header'>
        <h1>Records</h1>
        <Search
          search={search}
          setSearch={setSearch}
          clickSearch={clickSearch}
          setRecord={setRecord}
          record={record}
          setSearchRecord={setSearchRecord}
        />
        <Filter getSelection={getSelection} record={record} setFilter={setFilter}/>
      </header>

      <List
        search={Search}
        renderRecords={renderRecords}
      />
      <DisplayModal
        setModalIsOpen={setModalIsOpen}
        modalData={modalData}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      />
      <Paginations
        record={record}
        activePage={activePage}
        handlePageChange={handlePageChange}
        updateRecord={updateRecord}
      />
    </>
  )
};

const Search = ({
  search,
  setSearch,
  clickSearch,
  record,
 setSearchRecord
}) => {
  return (
    <>
      <input
        type='text'
        className='search'
        placeholder='Search...'
        value={search}
        onChange={(e) => {
          e.preventDefault()
          setSearch(e.target.value)
        }} 
        onInput={() => {setSearchRecord(record)}}
      />
      <button
        className='button'
        onClick={(e) => {
          e.preventDefault()
          clickSearch(search)
        }} 
      ></button>
    </>
  )
}

const Paginations = ({record, activePage, handlePageChange, updateRecord}) => {
  return (
    <div className='pagination'>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={20}
        totalItemsCount={updateRecord.length}
        pageRangeDisplayed={20}
        onChange={handlePageChange}
        itemClass=''
        activeClass='active'
        innerClass=''
      />
    </div>
  )
};

const Filter = ({getSelection, record, setFilter}) => {
  
  return (
    <>
      <label htmlFor='Gender' className='dropdown'>
        Gender
        <select
          name='Gender'
          id='Gender'
          placeholder='Filter'
          className=' dropbtn'
          onChange={(e) => {
            e.preventDefault()
            getSelection(e.target.value)}}
          onBlur={() => setFilter(record)}
        >
          <option value={record}>All</option>
          <option value='male'>
            Male
          </option>
          <option value='female'>
            Female
          </option>
        </select>
      </label>
    </>
  )
};

const List = ({
  search,
  renderRecords,
  renderSearch
}) => {
  return (
    <>
      {renderRecords}
    </>
  )
}

const DisplayModal = ({modalData, modalIsOpen, setModalIsOpen}) => {
  return(
    <>
      {modalData.map((object, index) => {
      const {FirstName,LastName,PhoneNumber,Email,Gender,CreditCardType,CreditCardNumber} = object;
  
      return (

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.151)' /* Fallback color */,
              backgroundColor: 'rgba(0, 0, 0, 0.082)' /* Black w/ opacity */,
            },
            content: {
              position: 'relative',
              backgroundColor: '#fefefe',
              margin: 'auto',
              padding: 0,
              border: '1px solid #888',
              width: '40%',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
              /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.096),0 6px 20px 0 rgba(0, 0, 0, 0.034); */
              animationName: 'animatetop',
              animationDuration: '0.4s',
              textAlign: 'left',
            },
          }}
         key={index}>
          <div>
            <div className='modal-header'>
              <span className='close' onClick={() => setModalIsOpen(false)}>
                &times;
              </span>
              <h2>Personal Information</h2>
            </div>
            <div className='modal-body'>
              <div className='content'>
                <p>Name</p>
                <p>
                  {FirstName} {LastName}
                </p>
              </div>
              <div className='content'>
                <p>Gender</p>
                <p>{Gender}</p>
              </div>
              <div className='content'>
                <p>Email</p>
                <p> {Email}</p>
              </div>
              <div className='content'>
                <p>Phone Number</p>
                <p>{PhoneNumber}</p>
              </div>
            </div>
            <div className='modal-footer'>
              <h3>CARD</h3>
            </div>
            <div className='modal-body'>
              <div className='content'>
                <p>Credit Card Number</p>
                <p>{CreditCardNumber}</p>
              </div>
              <div className='content'>
                <p>Credit Card Type</p>
                <p>{CreditCardType}</p>
              </div>
            </div>
          </div>
        </Modal>
      )
      })}
    </>
  ) 
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
