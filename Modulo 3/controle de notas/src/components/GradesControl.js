import React from 'react';
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {

  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  })

  const handleActionClick = (id, type) => {

    const grade = grades.find(grade => grade.id === id);
    if (type === 'delete'){
      onDelete(grade)
      return;
    }

    onPersist(grade);

  }
  return (
    <div className='center conteiner'>
      {tableGrades.map(tableGrade => {
        return (
          <table className='striped center container' key={tableGrade.id}>
          <thead>
            <tr>
              <th style={{width: '20%'}}>Aluno</th>
              <th style={{width: '20%'}}>Disciplina</th>
              <th style={{width: '20%'}}>Avaliação</th>
              <th style={{width: '20%'}}>Nota</th>
              <th style={{width: '20%'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tableGrade.grades.map(({ id, student, subject, type, value, isDeleted }) => {
              return (<tr key={id}>
                <td>{student}</td>
                <td>{subject}</td>
                <td>{type}</td>
                <td>{isDeleted ? '-' : value}</td>
                <td> 
                  {! isDeleted && 
                  <Action 
                  type= "delete" 
                  id={id}  
                  onActionClick={handleActionClick}/> }

                  <Action 
                  type={isDeleted ? 'add' : "edit"} 
                  id={id} 
                  onActionClick={handleActionClick}
                  /> 
                </td>
              </tr>);
            })}
          </tbody>
          <tfoot>
    
          </tfoot>
        </table>
        )
      })}
    </div>
   
  );
}