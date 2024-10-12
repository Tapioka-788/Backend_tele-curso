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
        descricao: 'a vaga esta vaga',
        },
    {
        salario: 'salario 11',
        vaga: 'pizzaiolo',
        descricao: 'a vaga esta vaga',
        },
    {
        salario: 'salario 12',
        vaga: 'padeiro',
        descricao: 'a vaga esta vaga',
        },
    {
        salario: 'salario 13',
        vaga: 'padre',
        descricao: 'a vaga esta vaga',
        },
    {
        salario: 'salario 14',
        vaga: 'acogueiro',
        descricao: 'a vaga esta vaga',
        },
    {
        salario: 'salario 15',
        vaga: 'dev web',
        descricao: 'a vaga esta vaga',
        }
]

// Caminhos

app.get('/salario', (req, res) => {
    res.status(200).json({ cartoes })
    console.log('oi')
})

app.post('/salario', (req, res) => {
    const { salario, vaga, descricao } = req.body

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
    const { salario, vaga, descricao } = req.body
    cartoes[i].salario = salario
    cartoes[i].vaga = vaga
    cartoes[i].descricao = descricao
    console.log(cartao + 'Atulazido')
    res.status(201).json({ mensagem: 'Cartao atualizado' })
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})