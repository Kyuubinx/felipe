function carrinho(conexao){
    this._conexao = conexao
}
carrinho.prototype.existeProduto = function (idProduto, idPedido){
    return new Promise ((resolve, reject) => {
        this._conexao.query(`select * from carrinho where id_produto = ${idProduto} and id_pedido = ${idPedido}`, callback) =
    function(error, result){
        resolve(result)
    }})
}
module.exports = function(){
return carrinho
}