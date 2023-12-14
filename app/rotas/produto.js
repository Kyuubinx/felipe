module.exports = function (app){
    app.get('/produto/adicionar/:idProduto', function(req, res){
        app.app.controllers.produto.adicionar(app, req, res)
    })
}