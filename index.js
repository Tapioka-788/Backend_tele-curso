// configuracoes do ip 172.17.16.59

const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Variaveis

const cartoes = [
    {
        salario: 'salario 10',
        numero: '0'
    },
    {
        salario: 'salario 11',
        numero: '1'
    },
    {
        salario: 'salario 12',
        numero: '2'
    },
    {
        salario: 'salario 13',
        numero: '3'
    },
    {
        salario: 'salario 14',
        numero: '4'
    },
    {
        salario: 'salario 15',
        numero: '5'
    }
]

// Caminhos

app.get('/salario', (req, res) => {
    res.status(200).json(cartoes)
    console.log('oi')
})

app.post('/salario', (req, res) => {
    const salario = req.body.salario
    cartoes.push({salario:salario, cartoes: cartoes.length})
    console.log(cartoes)
    res.status(201).json({ salario: 'Saralio novo' })
})    

app.delete('/salario', (req, res) => {
    const numero = req.body.numero
    cartoes.splice(numero, 1)
    console.log(cartoes)
    res.status(201).json({ salario: 'Saralio excluido' })
})  

app.put('/salario', (req, res) => {
    const numero = req.body.numero
    const salario = req.body.salario
    cartoes[numero].salario = salario
    console.log(cartoes)
    res.status(201).json({ salario: 'Saralio atualizado' })
})  

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})