/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React from 'react';
import M from 'materialize-css';
import axios from 'axios';

import * as api from './api/service';
import ModalTransaction from './components/Modal';

import { PERIODs, YEARS } from './helpers/periods';
import Action from './components/Action';



export default function App() {

  let color = '';
  let receita = 0;
  let despesa = 0;
  const [transactions, setTransactions] = React.useState([]);
  const [selectedTransactions, setSelectedTransactions] = React.useState({});
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODs[0]); 
  const [currentYear, setCurrentYear] = React.useState(YEARS[0]); 
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [searchName, setSearchName] = React.useState('');

 

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const url = `http://localhost:3001/api/transaction?yearMonth=${currentPeriod}`
      const resource = await fetch(url);

      const json = await resource.json();
      setTransactions(json);
     
    }

    fetchTransactions();
  }, [currentPeriod]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const url = `http://localhost:3001/api/transaction/year?year=${currentYear}`
      const resource = await fetch(url);

      const json = await resource.json();
      setTransactions(json);
     
    }

    fetchTransactions();
  }, [currentYear]);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  }

  const handleYearChange = (event) => {
    setCurrentYear(event.target.value);
  }

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const findByName = () => {

    const filtered = transactions.filter((transaction) => {
      return transaction.description.includes(searchName)
      
    })

    setTransactions(filtered)
   
  };

  const handleClose = () => {
    setIsModalOpen(false);
  }

 
  const handleEdit = (selected) => {
    setIsModalOpen(true);
    setSelectedTransactions(selected);
  }

  const handleActionClick = (id, type) => {
    const selected =  transactions.find((transaction) => transaction.id === id);
    if (type === 'delete'){
      handleDelet(selected.id)
      return;
    }

    handleEdit(selected);
  }

  function handleDelet(id){
    axios.delete(`http://localhost:3001/api/transaction/${id}`);
   
    const fetchTransactions = async () => {
      const url = `http://localhost:3001/api/transaction?yearMonth=${currentPeriod}`
      const resource = await fetch(url);

      const json = await resource.json();
      setTransactions(json);
    }

    fetchTransactions();
  }

  transactions.map((transaction) => {
    if (transaction.type === "+") {
     return receita = receita + transaction.value;
    } else {
     return despesa = despesa + transaction.value;
    }

  })
  
  return (

    <div className='container'>
   
      <h2 className="center"><b>Bootcamp Full Stack - Desafio Final</b></h2>
      <h3 className="center"><b>Controle Financeiro</b></h3>

      <select
        valeu={currentPeriod}
        onChange={handlePeriodChange}>
        {PERIODs.map(period => {
          return <option key={period} value={period}>{period}</option>
        })}
      </select>

      <select
        valeu={currentYear}
        onChange={handleYearChange}>
        {YEARS.map(period => {
          return <option key={period} value={period}>{period}</option>
        })}
      </select>

      <div className="valores" style={{marginTop: "20px"}}>
        <span><b>Lançamentos: </b> {transactions.length} </span>
        <span><b>Receita:</b> R$&nbsp;{receita} </span>
        <span><b>Despesas:</b> R$&nbsp;{despesa}</span>
        <span><b>Saldo:</b> R$&nbsp;{receita - despesa}</span>
      </div>

     

      <div className="filter-newTransaction">
        <a className="waves-effect waves-light btn-small"><i className="material-icons left">exposure_plus_1</i> Transação</a>
        <div className="input-field" style={{marginLeft: "10px", display: "flex", flex: "1 1 0%" }}>
          <input id="filter" type="text" className="validate"   value={searchName}
            onChange={onChangeSearchName}/>
          <label className="active" >Filtro</label>
        </div>
        <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
      </div>
      <div>
        {transactions.map((transaction) => {
          color = transaction.type === "-" ? 'rgb(190, 15, 15)' : 'rgb(0, 102, 33)';
          return (
            
            <div key={transaction.id} className="content" style={{ background: color }}>
              <span className="day">{transaction.day}</span>
              <div className="text-content">
                <div className="category-desc">
                  <span className="category">{transaction.category}</span>
                  <span className="description">{transaction.description}</span>
                </div>
                <span className="value">R$&nbsp;{transaction.value}</span>
              </div>

              <Action 
              type= 'delete'
              id={transaction.id}
              onActionClick={handleActionClick} />

              <Action 
              type= 'edit'
              id={transaction.id}
              onActionClick={handleActionClick} />
              {/* <div className="buttons">
                <span className="material-icons" style={{cursor: "pointer", marginRight: '10px'}} onClick={() => handleEdit(transaction.id)}>edit</span>
                <span className="material-icons" style={{cursor: "pointer"}} onClick={() => handleDelet(transaction.id)}> delete</span>
              </div> */}
            </div>
          )
        })}
      {isModalOpen && <ModalTransaction onSave={handleEdit} onClose={handleClose} selectedGrade={{selectedTransactions}}/>}
      </div>
    </div>
  );

}

