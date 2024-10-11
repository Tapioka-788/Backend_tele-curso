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
        vaga: 'pedreiro',
        numero: '0'
    },
    {
        salario: 'salario 11',
        vaga: 'pizzaiolo',
        numero: '1'
    },
    {
        salario: 'salario 12',
        vaga: 'padeiro',
        numero: '2'
    },
    {
        salario: 'salario 13',
        vaga: 'padre',
        numero: '3'
    },
    {
        salario: 'salario 14',
        vaga: 'acogueiro',
        numero: '4'
    },
    {
        salario: 'salario 15',
        vaga: 'dev web',
        numero: '5'
    }
]

// Caminhos

app.get('/salario', (req, res) => {
    res.status(200).json({ cartoes })
    console.log('oi')
})

app.post('/salario', (req, res) => {
    const { salario, vaga, numero } = req.body

    cartoes.push({ salario: salario, vaga: vaga, descricao: descricao })
    console.log(cartoes)
    res.status(201).json({ mensagem: 'Saralio novo' })
})

app.delete('/salario', (req, res) => {
    const {cartao} = req.body
    
    cartoes.splice(cartao, 1)
    console.log(cartao + 'deletado')
    res.status(201).json({ mensagem: 'Saralio excluido' + cartao })
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