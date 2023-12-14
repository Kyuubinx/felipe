const session = require("express-session")

module.exports.cadastro_usuario = function (app, req, res) {
    res.render('usuario/cadastro_usuario', { erros: {}, usuario: {} })
}
module.exports.cardapio = function (app, req, res) {
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getListaProduto(function (error, result) {
        res.render('usuario/cardapio', {produtos:result})
    })
}
module.exports.cadastrar = function (app, req, res) {

    const dados = req.body

    req.assert('nome', 'voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'voce deve preencher o campo senha').notEmpty()
    req.assert('senha', 'o campo senha deve ter no minimo 6 caracteres').len(6)

    const erros = req.validationErrors()

    if (erros) {
        res.render('usuario/cadastro_usuario', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'este e-mail já está em uso' }]
            res.render('usuario/cadastro_usuario', { erros: erros, usuario: dados })
        }
        else {
            modelUsuario.cadastrarUsuario(dados, function (error, result) {
                res.redirect('/usuario/login')
            })
        }
    })
}
module.exports.login = function (app, req, res) {
    res.render('usuario/login', { erros: {}, usuario: {} })
}
module.exports.usuario_login = function (app, req, res) {
    res.render(`usuario/login`, { erros: {}, usuario: {} })
}
module.exports.validar = function (app, req, res) {
    const dados = req.body
    req.assert('email', 'vc deve prencher o campo email').notEmpty()
    req.assert('senha', 'vc deve prencher o campo senha').notEmpty()

    const erros = req.validationErrors()

    if (erros) {
        res.render('usuario/login', { erros: erros, usuario: dados })
        return
    }
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuario(dados, function (error, result) {

        if (result.length <= 0) {
            let erros = [{ msg: 'usuario não encontrado' }]
            res.render('usuario/login', { erros: erros, usuario: dados })
        }
        else {
            req.session.id_tipo_usuario = result[0].id_tipo_usuario
            req.session.id_usuario = result[0].id            
            res.redirect('/')
        }
    })
        app.get('/usuario/editar', function(req, res){
        app.app.controllers.admin.editar(app, req, res)
    })
   
}
module.exports.sair = function(app, req, res){
    req.session.destroy(function(error){
        res.redirect('/usuario/login')
    })
}

module.exports.usuario_config = function(app, req, res){
    res.render('usuario/config', {erros: {}, usuario: {}})
}


