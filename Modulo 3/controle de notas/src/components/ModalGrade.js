import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

import * as api from '../api/service';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {

  const { id, student, subject, type, value } = selectedGrade

  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [erroMessage, setErroMessage] = useState('');

  useEffect(() => {
    const getValidation = async () => {

      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    }

    getValidation();
  }, [type])

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErroMessage(`O valor ta errado burro !!`);
      return;
    }

  }, [gradeValidation, gradeValue]);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      newValue: gradeValue,
    };

    onSave(formData);
  };

  const handleClose = () => {
    onClose(null);
  };

  const handleGradeChange = (event) => {
    setGradeValue(+event.target.value);
  };


  return (
    <div>
      <Modal isOpen={true}>

        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de Notas</span>
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input id="first_name" type="text" value={student} readOnly />
            <label className="active" htmlfor="inputName">Nome do Aluno: </label>
          </div>

          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlfor="inputSubject">Disciplina: </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlfor="inputType">Tipo de avaliação: </label>
          </div>

          <div className="input-field">
            <input id="inputGrade" type="number" min={gradeValidation.minValue} max={gradeValidation.maxValue} step="1" autoFocus value={gradeValue} onChange={handleGradeChange} />
            <label className="active" htmlfor="inputGrade">Nota: </label>
          </div>

          <div style={styles.flexRow}>
            <button className="waves-effect waves-light btn" 
            disabled={erroMessage.trim() !== ''}>
              SALVAR
            </button>
            <span>{erroMessage}</span>
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

  flexStart : {
    justifyContent: 'flex-start',
  }
}
