'use strict'

const mapa = document.querySelector('svg')

const preencherDados = async(sigla) => {
    const preencherHeader = await preencherDadosHeader(sigla)
    document.getElementById('siglaDoEstado').innerText = preencherHeader.sigla
    document.getElementById('nomeEstado').innerText = preencherHeader.nome
    document.getElementById('nomeCapital').innerText = preencherHeader.capital
    document.getElementById('nomeRegiao').innerText = preencherHeader.regiao

}

const preencherDadosHeader = async(sigla) => {
    const url = `http://localhost:8080/estado/${sigla}`
    const response = await fetch(url)
    const estado = await response.json()

    return {
        sigla: estado.sigla,
        nome: estado.nome,
        capital: estado.capital,
        regiao: estado.regiao
    }
}

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-', '')
    preencherDados(estado)
}

mapa.addEventListener('click', getEstados)