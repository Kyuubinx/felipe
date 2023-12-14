function Produto(conexao){
    this._conexao = conexao
}

Produto.prototype.getProduto = function(callback){
    this._conexao.query('select * from produto', callback)
}

Produto.prototype.getProduto = function(id, callback){
    this._conexao.query(`select * from produto where id = ${id}`, callback)
}
Produto.prototype.cadastrarProduto = function(dados,  callback){
    this._conexao.query('insert into produto set ?', dados, callback)
}
Produto.prototype.getListaProduto = function(callback){
    this._conexao.query('select * from produto', callback)
}

module.exports = function (){    
    return Produto
}