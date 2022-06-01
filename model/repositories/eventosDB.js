const usuarioDB = require("../../controller/db")
const seguranca = require("../components/seguranca")

async function insertInscricaoEvento(eventos){
    const conn = await usuarioDB.connect();
    const sql = 'INSERT INTO membro_evento_teste(nome, cpf, data_realizacao, horario, localidade) VALUES (?,?,?,?,?);';
    const values = [eventos.nome, eventos.cpf, eventos.data, eventos.horario, eventos.local];
    return await conn.query(sql, values);
}

module.exports = { insertInscricaoEvento };

