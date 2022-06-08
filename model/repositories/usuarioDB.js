const { get } = require("express/lib/response");
const usuarioDB = require("../../controller/db")
const seguranca = require("../components/seguranca")

async function getUsuarioId(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

async function login(email, senha){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro where email=? and senha=?;';
    const values = [email, seguranca.ocultarsenha(senha)];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

//Utilzando a view para buscar dados do usuario para diminiuir o código
async function getDadosUsuario(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro_curso where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

//Descontinuada
async function getCursoUsuarioId(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

//Descontinuada
async function getCursoUsuario(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM curso where id=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows[0];
    else return null;
}

async function getEventoUsuario(id){
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM membro_evento_teste where id_membro=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if(rows.length > 0) return rows;
    else return null;
}



//Utilzando a view para buscar dados do usuario para diminiuir o código
async function getRelatorioMembrosCursos(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM membro_curso;');
    return rows;
}


//Descontinuada
async function getRelatorioMembros(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM membro;');
    return rows;
}

async function getRelatorioCursos(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM curso;');
    return rows;
}

async function getRelatorioEventos(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM eventos;');
    return rows;
}

async function getRelatorioModalidades(){
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM modalidade_esportiva;');
    return rows;
}


async function updateUsuario(usuario){
    const conn = await usuarioDB.connect();
    const sql = 'UPDATE membro SET cpf=?, nome=?, email=?, telefone=?, data_nascimento=?, turma=? where id=?';
    const values = [usuario.cpf, usuario.nome, usuario.email, usuario.telefone, usuario.data, usuario.turma, usuario.id];
    return await conn.query(sql, values);
}

module.exports = {getUsuarioId, login, getCursoUsuarioId, getDadosUsuario, getRelatorioMembrosCursos, getCursoUsuario, getRelatorioMembros, getRelatorioCursos, getRelatorioEventos, getRelatorioModalidades, getEventoUsuario, updateUsuario};

