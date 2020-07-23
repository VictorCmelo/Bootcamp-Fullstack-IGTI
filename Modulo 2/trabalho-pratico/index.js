import { promises } from "fs";

const { readFile, writeFile } = promises;

let resultado = [];

async function init() {

  try {
    const estados = await readFile('./Estados.json')
    const cidades = await readFile('./Cidades.json')

    const estadosJson = JSON.parse(estados);
    const cidadesJson = JSON.parse(cidades);

    estadosJson.forEach(estado => {



      cidadesJson.forEach(cidade => {

        if(estado.ID == cidade.Estado){
           resultado.push({...cidade, Sigla: estado.Sigla});
          writeFile(`./estados/${estado.Sigla}.json`, JSON.stringify(resultado));
        };

      });
      resultado = [];
    });




  } catch (error) {

    console.log(error);
  }

}

async function init() {

  try {
    const estados = await readFile('./Estados.json')
    const cidades = await readFile('./Cidades.json')

    const estadosJson = JSON.parse(estados);
    const cidadesJson = JSON.parse(cidades);

    estadosJson.forEach(estado => {



      cidadesJson.forEach(cidade => {

        if(estado.ID == cidade.Estado){
           resultado.push({...cidade, Sigla: estado.Sigla});
          writeFile(`./estados/${estado.Sigla}.json`, JSON.stringify(resultado));
        };

      });
      resultado = [];
    });




  } catch (error) {

    console.log(error);
  }

}






const estadosA = [];



async function size(uf) {

  try {
    const response = await readFile(`./estados/${uf}.json`);
    const dados = JSON.parse(response);

    estadosA.push({ uf: uf, tamanho: dados.length });

    // const maiores = estadosA.sort((a, b) => {
    //   return b.tamanho - a.tamanho;
    // });
  
    const menores = estadosA.sort((a, b) => {
      return a.tamanho - b.tamanho;
    });

   // console.log(maiores.slice(0, 5));
    console.log(menores.slice(0, 5));

  } catch (error) {

  }
}

async function countEstados() {
  try {

    const estados = await readFile('./Estados.json')

    const estadosJson = JSON.parse(estados);

    estadosJson.forEach(estado => {

     size(estado.Sigla);
  
      

    });


  } catch (error) {
    console.log('errou !');
  }
}



countEstados();
//size('rs');

//init();