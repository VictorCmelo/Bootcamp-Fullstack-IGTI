import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({ onSave, onClose, selectedTransactions }) {

 // const { description, value, category, type, yearMonthDay } = SelectedTransactions;
 console.log(JSON.selectedTransactions);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  }

  const handleClose = () => {
    onClose(null);
  };

  const handleGradeChange = (event) => {
    setTransaction(+event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave();
  };


  return (
    <div>
      <Modal isOpen={true}>

        <div style={styles.flexRow}>
          <span style={styles.title}>Edição de Lançamento</span>
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>

          <div style={styles.flexRowRadio}>
            <p>
              <label>
                <input className="with-gap" name="type" type="radio" readOnly />
                <span>Despesa</span>
              </label>
            </p>
            <p>
              <label>
                <input className="with-gap" name="type" type="radio" readOnly />
                <span>Receita</span>
              </label>
            </p>
          </div>


          <div className="input-field">
            <input id="first_name" type="text" />
            <label className="active">Descrição: </label>
          </div>

          <div className="input-field">
            <input id="inputSubject" type="text"  />
            <label className="active" >Categoria: </label>
          </div>


          <div style={styles.flexRow}>
            <div className="input-field">
              <input id="inputGrade" type="number" step="1"   onChange={handleGradeChange} />
              <label className="active" >Valor: </label>
            </div>
            <div className="input-field">
            <input type="date" className="datepicker" />
            </div>
          </div>
          <div style={styles.flexRow}>
            <button className="waves-effect waves-light btn">
              SALVAR
            </button>

          </div>

        </form>
      </Modal>
    </div>
  )
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  flexStart: {
    justifyContent: 'flex-start',
  },

  flexRowRadio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '150px',
    marginRight: '150px',
  },
}