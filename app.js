'use strict'

const mapa = document.querySelector('svg')

const preencherDados = async(sigla) => {
    const preencherHeader = await preencherDadosHeader(sigla)
    document.getElementById('siglaDoEstado').innerText = preencherHeader.sigla
    document.getElementById('nomeEstado').innerText = preencherHeader.nome
    document.getElementById('nomeCapital').innerText = preencherHeader.capital
    document.getElementById('nomeRegiao').innerText = preencherHeader.regiao

//   const preencherListaCidades = await preencherLista(sigla)

//     const ul = document.getElementById('nome-cidades')

//     preencherListaCidades.cidades.forEach(function (cidade) {
//         const cidades = document.createElement('li')
//         cidades.textContent = cidade
//         ul.append(cidades)
//     })
    
    const preencherListaCidades = await preencherLista(sigla)
    document.getElementById('nome-cidades').innerHTML = preencherListaCidades.cidades

}

const preencherDadosHeader = async(sigla) => {
    const url = `http://localhost:8080/estado/${sigla}`
    const response = await fetch(url)
    const estado = await response.json()

    return {
        sigla: estado.uf,
        nome: estado.descricao,
        capital: estado.capital,
        regiao: estado.regiao
    }
}

const preencherLista = async(sigla) => {
    const url = `http://localhost:8080/v1/senai/cidades/${sigla}`
    const response = await fetch(url)
    const estado = await response.json()

    return {
        cidades: estado.cidades
    }
}

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-', '')
    preencherDados(estado)
}

mapa.addEventListener('click', getEstados)