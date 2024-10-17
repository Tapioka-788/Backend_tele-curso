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
        horario: 'horas para dar',
    },
    {
        salario: 'salario 11',
        vaga: 'pizzaiolo',
        descricao: 'a vaga esta vaga',
        horario: 'horas para dar',
    },
    {
        salario: 'salario 12',
        vaga: 'padeiro',
        descricao: 'a vaga esta vaga',
        horario: 'horas para dar',
    },
    {
        salario: 'salario 13',
        vaga: 'padre',
        descricao: 'a vaga esta vaga',
        horario: 'horas para dar',
    },
    {
        salario: 'salario 14',
        vaga: 'acogueiro',
        descricao: 'a vaga esta vaga',
        horario: 'horas para dar',
    },
    {
        salario: 'salario 15',
        vaga: 'dev web',
        descricao: 'a vaga esta vaga',
        horario: 'horas para dar',
    }
]

// Caminhos

app.get('/salario', (req, res) => {
    res.status(200).json({ cartoes })
    console.log('oi')
})

app.post('/salario', (req, res) => {
    const { salario, vaga, descricao, horario } = req.body

    cartoes.push({ salario: salario, vaga: vaga, descricao: descricao, horario: horario })
    console.log(cartoes)
    res.status(201).json({ mensagem: 'Saralio novo' })
})

app.delete('/salario', (req, res) => {
    const { cartao } = req.body

    cartoes.splice(cartao, 1)
    console.log(cartao + 'deletado')
    res.status(201).json({ mensagem: 'Saralio excluido' + cartao })
})

app.put('/salario', (req, res) => {
    const { salario, vaga, descricao, horario, id, } = req.body;
    cartoes[id] = { salario: salario, vaga: vaga, descricao: descricao, horario: horario }

    console.log('Atulazido')
    console.log(cartoes);
    res.status(201).json({ mensagem: 'Cartao atualizado' })
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})

//partido novo

//aaaaab