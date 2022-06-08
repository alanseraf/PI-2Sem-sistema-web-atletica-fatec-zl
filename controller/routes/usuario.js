const seguranca = require('../../model/components/seguranca')
const usuarioBanco = require('../../model/repositories/usuarioDB')

module.exports = function (app){
    

    app.get('/usuario', seguranca.autenticar, async(req, res, next) => {
        try {
                if (req.user.perfil != "adm") {
                    const usuarioID = req.user.id;
                    const usuarioLogado = await usuarioBanco.getDadosUsuario(usuarioID);
                    const eventosDoUsuario = await usuarioBanco.getEventoUsuario(usuarioID);
                    res.render('usuario/usuario', {usuarioLogado, eventosDoUsuario});
                } else {
                    const usuarioID = req.user.id;
                    const usuarioLogado = await usuarioBanco.getUsuarioId(usuarioID);
                    const membros = await usuarioBanco.getRelatorioMembrosCursos();
                    const cursos = await usuarioBanco.getRelatorioCursos();
                    const eventos = await usuarioBanco.getRelatorioEventos();
                    const modalidades = await usuarioBanco.getRelatorioModalidades();
                    res.render('usuario/usuario-adm', {usuarioLogado, membros, cursos, eventos, modalidades});
                } 
        } catch (err){
            next(err);
        }
    });


    app.get('/edit:id', seguranca.autenticar, async (req, res, next) => {
        try{
            var id = req.params.id;
            const membro = await usuarioBanco.getDadosUsuario(id);
            res.render('forms/form5-edicao', { mensagem: '', membro });
        } catch (err){
            next(err);
        }
    });

    app.post('/edicao-salvar', async(req, res) => {
        try {
            //var dataFormatada = `${ano}-${mes}-${dia}`
            var usuario = {
                           id: req.body.id,
                           email: req.body.email,
                           cpf: req.body.cpf,
                           nome: req.body.nome,
                           data : req.body.data,
                           telefone: req.body.telefone,
                           curso: req.body.curso,
                           turma: req.body.turma         
                        }
                        console.log(usuario);
            usuarioBanco.updateUsuario(usuario);
            res.render('forms/sucesso-edicao', {mensagem: 'Alteração realizada com Sucesso'});
            //corrigir erro do css
        } catch (error){
            res.render('forms/sucesso-edicao', { mensagem: "Alteração não realizada, tente novamente mais tarde"})
            console.log(error);
        }
    });



}



