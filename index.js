// configuracoes do ip 172.17.16.59

const cors = require('cors');
const express = require('express');
const admin = require("firebase-admin");

const serviceAccount = require("./chavefirebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const bd = admin.firestore();

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Caminhos

app.get('/salario', async (req, res) => {
    try {
        const response = await bd.collection('cartoes').get();
        const cartoes = response.docs.map(doc => ({
            id: doc.id, ...doc.data(),
        }));
        res.status(200).json({ cartoes });
    } catch (e){
        console.log(e);
    }

    console.log('oi')
})

// app.post('/salario', async (req, res) => {
//     try {
//         const { salario, vaga, descricao, horario, nome } = req.body
//         const novoDoc = await bd.collection('cartoes').add({
//             salario: salario,
//             vaga: vaga,
//             descricao: descricao,
//             horario: horario,
//             nome: nome
//         })

//         console.log(cartoes)
//         res.status(201).json({ mensagem: 'Saralio novo' })
//     }
//     catch { }

// })


// app.post('/salario', (req, res) => {
//     const { salario, vaga, descricao, horario, nome } = req.body

//     cartoes.push({ salario: salario, vaga: vaga, descricao: descricao, horario: horario, nome: nome })
//     console.log(cartoes)
//     res.status(201).json({ mensagem: 'Saralio novo' })
// })

// app.delete('/salario', async (req, res) => {
//     try {
//         const { cartao } = req.body;
//         const response = await bd.collection('cartoes').doc(id).delete(id);
//         console.log(`Cartão com ID ${id} deletado com sucesso.`);
//         res.status(200).json({ message: `Cartão com ID ${id} deletado com sucesso.` });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: "Erro ao deletar o cartão." });
//     }
//     console.log('oi')
// });


// app.delete('/salario', (req, res) => {
//     const { cartao } = req.body

//     cartoes.splice(cartao, 1)
//     console.log(cartao + 'deletado')
//     res.status(201).json({ mensagem: 'Saralio excluido' + cartao })
// })

// app.put('/salario', (req, res) => {
//     const { salario, vaga, descricao, horario, id, nome } = req.body;
//     cartoes[id] = { salario: salario, vaga: vaga, descricao: descricao, horario: horario, nome: nome, }

//     console.log('Atulazido')
//     console.log(cartoes);
//     res.status(201).json({ mensagem: 'Cartao atualizado' })
// })

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})

//partido novo

//aaaaaa