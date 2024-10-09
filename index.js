const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Dados do cartao

let cartoes = [
    {
        salario: 'salario 10' ,
        img: ''},
    {
        salario: 'salario 11' ,
        img: ''},
    {
        salario: 'salario 12' ,
        img: ''},
    {
        salario: 'salario 13' ,
        img: ''},
    {
        salario: 'salario 14' ,
        img: ''},
    {
        salario: 'salario 15' ,
        img: ''}
]

app.get('/api/cartoes', (req, res) => {
    res.status(200).json(cartoes)
    console.log('oi')
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})