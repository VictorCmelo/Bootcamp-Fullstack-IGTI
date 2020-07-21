
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');
const { response, request } = require('express');

const create = async (request, response) => {
  const transaction = new TransactionModel({
    description: request.body.description,
    value: request.body.value,
    category: request.body.category,
    year: request.body.year,
    month: request.body.month,
    day: request.body.day,
    yearMonth: request.body.yearMonth,
    yearMonthDay: request.body.yearMonthDay,
    type: request.body.type,
  });

  try {
    await transaction.save(transaction);

    response.send({ message: "Transação inserida com sucesso" })
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message });
  }
};

const findAll = async (request, response) => {
  const description = request.query.description;

  var condition = description
    ? { description: { $regex: new RegExp(description), $options: 'i' } }
    : {};

  try {
    const data = await TransactionModel.find(condition);

    if (data.length < 1) {
      response.status(404).send({ message: 'Nenhuma transação encontrada' });
    } else {
      response.send(data);
    }

  } catch (error) {
    response
      .status(500)
      .send({message: error.message });
  }
};


const find = async (request, response) => {
  const period = request.query.yearMonth;

  try {
    const data = await TransactionModel.find({yearMonth: {$eq: period}});

    if (data.length < 1) {
      response.status(404).send({ message: 'é necessário informar o parametro yearMonth no formato  yyyy-mm' });
    } else {
      response.send(data);
    }
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findYear = async (request, response) => {
  const period = request.query.year;

  try {
    const data = await TransactionModel.find({year: {$eq: period}});

    if (data.length < 1) {
      response.status(404).send({ message: 'é necessário informar o parametro yearMonth no formato  yyyy' });
    } else {
      response.send(data);
    }
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const remove = async(request, response) => {
  const id = request.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });

    if (data.length < 1) {
      response
        .status(404)
        .send({ message: 'Nenhuma transação encontrada para exclusão' });
    } else {
      response.send({ message: 'Transação excluído com sucesso' });
    }
  } catch (error) {
    response
    .status(500)
    .send({ message: 'Nao foi possivel deletar a Transação id: ' + id });
  }
}

const update = async (request, response) =>{
  if(!request.body){
    return response.status(400).send({
      message: 'Dados para atualização vazio',
    });
  }

  const id = request.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate({ _id: id}, request.body, {
      new: true,
    });

    if (data.length < 1) {
      response
        .status(404)
        .send({ message: 'Nenhuma Transação encontrado para atualizar' });
    } else {
      response.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Transação id: ' + id });
  }
}


module.exports = { create, findAll, find, remove, update, findYear };
