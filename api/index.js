const cors = require('cors');
const express = require('express');
const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "bdbridgeworks",
    private_key_id: "2d19fcbb720a8c41627ff3ee360b89fc2d78c240",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHn2VD9ydxP91d\naHdbYfR2i4Tnnq3ruBC3cAVwnwt3raBGv+e6DR1Etbaoto67nN9hYZTJW8kVbBOA\nQjVIly/b88ZI12Kq679lX4prWpVG6FiVtT26BABTErgwCdLh2dhkAaRMFXL9fJXI\nr7GCdHU/CTCranHSmdt2KZKkVDJOnUMInKGn5u4sQxmXgK+H4awoKUmmytoqQEWu\nN490OvhDNoiEzFZbXAwU1i+3v/rQd2jQY0kGgJpISPW1yahnWx35ENUQWSwOJoGn\neQawzfkPq173Sjo4U7mLtr+zCzE+yjE7uRtMKJK7fCHp80FqCFvwtT9huV/8gmfV\nQ9I4TEWlAgMBAAECggEAM6vqxoD/UK07W6Zi3uCoKtdKe7nzQwTOLu1sOw6wJTZo\nOmgKT3p9jP+MXHeE0sN0fvyHSufbURQ8qAJ7UGLyHHkpZkl6XMvRKyhj6A32ffg+\nleHoLHJEszwxOR4R3CxLeveB07/pl/vbuargw+fpQXvbgUN4Ww9AY4G3V5oDu507\n/MpLrQaf/xmUJ90ud37ulqkn6RYvQ64X5lzdz8YYsbqY4dOH/TFD9SnnI6MAworQ\n7pLD1bk+Uk21HGcY5OA8C6H33C2khQ+naMQH9pb4ySJEXBBZ7bRxvtBZyft9CNTf\ncgZTz94HlAfitUOMYHgaRQm1rlWkRtZ8gxM4ZF8DMQKBgQD2FBgRZC11yz8RWQf8\nbNsfzFMFOwWOATkPKj/X63Z2xhIG6o31qGcK5EbHw6eBoCRplYq0cafnvjArYgOR\nlsQbo8x3MHa8PfPuYlDXyqZBPT3r7Dq8Od1/1VE4G/mOSFrmVndg9urd0sIjhxxT\nrzK26pBQYWvHlOjOcX9YL7TmqwKBgQDPq85hbtlyf2o8+sjELZin66+oC/FbduBI\n+s+iGH5bV4wMyyGth8dK2z0v2lk8rn1RySBgTLI+1IYtWe18lmH/E1H0v/14Cs66\nQiWygu8qz+gVr8ffFlRuLeJKhx0e0qvFsNW15LJGtx27i/khOCQivkCJ8+Dm/YAT\nTLZ7AWrE7wKBgQCq6T3mJlvkqmt9UwbW7Ywrw7ANu/aZsIO+4qtA/ktjJyKyJwq+\nCl63E+GNMXkP8PgZVUHnHeFudYvjNcogvkQqplOGnOR6zdS0Rxi7KAbc3Po69/G7\ndb0/4hrtC5ECn4Jy5K85a4Wo1477OgYUoWRp4vSkv2UqU2R2riGyUEAmzQKBgEWM\nSCWhNfl+alnZsvrgOkuiRsWEmmQDP8GxHXAvu8FjZGe0b6bp3fhXy/oGqfQEi7uk\nG8+kX91i1zzA7SPYSSFfmwbYdU6KcAk4td8+slIoJpV8tPclR0lO3IYREdOMwjIG\nssujt4CvOqngiqJxZsir5nlMz3kMVKQiAMrZAqTJAoGAa6SlVM5z09519cPmpE7G\nwytaMgo0kPU84ARpnJ8Z09MXsbsA4jwJuane/ZgH7EvjaefTznQDuCXlauq4OMBX\ngJ/uc6hqI6ebCs5d/mZUVvJl7BN3T4jw1SEp1pPOwVa99WEt++i+MCwD/n64zxfb\napnPhvKySTxaXDHk/MrKH3g=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-pb9to@bdbridgeworks.iam.gserviceaccount.com",
    client_id: "107634538118374514886",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pb9to%40bdbridgeworks.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const bd = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

// Caminhos

app.get('/salario', async (req, res) => {
    try {
        const response = await bd.collection('cartoes').get();
        const cartoes = response.docs.map(doc => ({
            id: doc.id, ...doc.data(),
        }));
        console.log(cartoes)
        res.status(200).json({ cartoes });
        console.log('Cartões devolvidos com sucesso!')
    } catch (e) {
        console.log(e);
        res.status(500).json({ mensagem: 'Erro' + e })
        console.log('Erro ao buscar dados' + e)
    }
});



app.post('/salario', async (req, res) => {
    const { salario, vaga, descricao, horario, nome } = req.body
    if (!salario) {
        res.status(400).json({ mensagem: 'Salario do cartão inválido!' })
        console.log('Novo cartao não cadastrado')
    }
    else if (!vaga) {
        res.status(400).json({ mensagem: 'Vaga do cartão inválido!' })
        console.log('Novo cartao não cadastrado')
    }
    else if (!descricao) {
        res.status(400).json({ mensagem: 'Descricao do cartão inválido!' })
        console.log('Novo cartao não cadastrado')
    }
    else if (!horario) {
        res.status(400).json({ mensagem: 'Horario do cartão inválido!' })
        console.log('Novo cartao não cadastrado')
    }
    else if (!nome) {
        res.status(400).json({ mensagem: 'Nome do cartão inválido!' })
        console.log('Novo cartao não cadastrado')
    } else {
        try {
            const novoCartaoRef = await bd.collection('cartoes').add({
                salario: salario,
                vaga: vaga,
                descricao: descricao,
                horario: horario,
                nome: nome,
                criadoEm: admin.firestore.FieldValue.serverTimestamp()
            })
            res.status(201).json({ mensagem: 'Cartao cadastrado com sucesso', id: novoCartaoRef.id })
            console.log('Novo cartão cadastrado com ID:', novoCartaoRef.id)
        } catch (error) {
            console.error('Erro ao cadastrar cartão!', error)
            res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' })
        }
    }
})

app.delete('/salario', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ mensagem: 'Id não fornecido' })
        console.log('Id não fornecido')
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id)
            const doc = await cartaoRef.get()
            if (!doc.exists) {
                res.status(404).json({ mensagem: 'Cartão com Id ' + cartao + ' não encontrado' })
                console.log('Cartão não encontrado')
            } else {
                await cartaoRef.delete()
                res.status(200).json({ mensagem: 'Cartão com Id ' + cartao + ' excluido' })
            }
        } catch (e) {
            console.error('Erro ao excluir cartão!', error)
            res.status(500).json({ mensagem: 'Erro ao excluir cartão' })
        }
    }
});

app.put('/salario', async (req, res) => {
    const { salario, vaga, descricao, horario, nome, id } = req.body;
    if (!id) {
        res.status(400).json({ mensagem: 'Id não fornecido' })
        console.log('Cartão não atulizado, Id inválido')
    } else {
        try {
            const cartaoRef = bd.collection('cartoes').doc(id)
            const doc = await cartaoRef.get()
            if (!doc.exists) {
                res.status(404).json({ mensagem: 'Cartão com id ' + id + ' não encontrado' })
                console.log('Cartão não encontrado')
            } else {
                const dadosAtualizados = {}
                if (salario) dadosAtualizados.salario = salario
                if (vaga) dadosAtualizados.vaga = vaga
                if (descricao) dadosAtualizados.descricao = descricao
                if (horario) dadosAtualizados.horario = horario
                if (nome) dadosAtualizados.nome = nome
                await cartaoRef.update(dadosAtualizados)
                res.status(200).json({ mensagem: 'Cartão com id ' + id + ' atulizado' })
                console.log('Cartão com id ' + id + ' atulizado')
            }
        } catch (e) {
            console.error('Erro ao atulizar cartão!', error)
            res.status(500).json({ mensagem: 'Erro ao atulizar cartão' })
        }
    }
})

module.exports = app

// app.listen(3000, () => {
//     console.log(`Servidor rodando`);
// })