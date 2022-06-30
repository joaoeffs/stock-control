const mysql = require('mysql2/promise')

async function conectarDB() {
    const conexao = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'controle_comida'
    })

    return conexao
}

/*
    FUNCTION DA TABELA REGISTRO_CONSUMO
*/
async function listarComidas() {
    const conexao = await conectarDB()
    const sql = 'SELECT RC.ID_CONSUMO, ' +
                'RC.DATA_CONSUMO, ' +
                'RC.QUANTIDADE_CONSUMO, ' +
                'RC.MOTIVO_CONSUMO, ' +
                'CP.NOME_PRODUTO, ' +
                'TC.NOME_CONSUMO ' + 
                'FROM REGISTRO_CONSUMO RC ' +
                'INNER JOIN CADASTRO_PRODUTO CP ON CP.ID_CADASTRO_PRODUTO = RC.ID_CADASTRO_PRODUTO ' +
                'INNER JOIN TIPO_CONSUMO TC ON TC.ID_TIPO_CONSUMO = RC.ID_TIPO_CONSUMO '
    const [comidas] = await conexao.query(sql)

    return comidas
}

async function listarComidasEntrada() {
    const conexao = await conectarDB()
    const sql = 'SELECT RC.ID_CONSUMO, ' +
                'RC.DATA_CONSUMO, ' +
                'RC.QUANTIDADE_CONSUMO, ' +
                'RC.MOTIVO_CONSUMO, ' +
                'CP.NOME_PRODUTO, ' +
                'TC.NOME_CONSUMO ' +
                'FROM REGISTRO_CONSUMO RC ' +
                'INNER JOIN CADASTRO_PRODUTO CP ON CP.ID_CADASTRO_PRODUTO = RC.ID_CADASTRO_PRODUTO ' +
                'INNER JOIN TIPO_CONSUMO TC ON TC.ID_TIPO_CONSUMO = RC.ID_TIPO_CONSUMO ' +
                'WHERE TC.ID_TIPO_CONSUMO = 1 ' +
                'ORDER BY RC.ID_CONSUMO DESC ' +
                'LIMIT 4'
    const [comidas] = await conexao.query(sql)

    return comidas
}

async function listarComidasSaida() {
    const conexao = await conectarDB()
    const sql = 'SELECT RC.ID_CONSUMO, ' +
                'RC.DATA_CONSUMO, ' +
                'RC.QUANTIDADE_CONSUMO, ' +
                'RC.MOTIVO_CONSUMO, ' +
                'CP.NOME_PRODUTO, ' +
                'TC.NOME_CONSUMO ' +
                'FROM REGISTRO_CONSUMO RC ' +
                'INNER JOIN CADASTRO_PRODUTO CP ON CP.ID_CADASTRO_PRODUTO = RC.ID_CADASTRO_PRODUTO ' +
                'INNER JOIN TIPO_CONSUMO TC ON TC.ID_TIPO_CONSUMO = RC.ID_TIPO_CONSUMO ' +
                'WHERE TC.ID_TIPO_CONSUMO = 2 '
                'ORDER BY TC.ID_TIPO_CONSUMO DESC ' +   
                'LIMIT 4'
    const [comidas] = await conexao.query(sql)

    return comidas
}

async function criarComida(comida) {
    const conexao = await conectarDB();
    const sql = 'insert into REGISTRO_CONSUMO (id_cadastro_produto, id_tipo_consumo, quantidade_consumo, motivo_consumo, data_consumo) values (?, ?, ?, ?, ?);';

    return await conexao.query(sql, [comida.produto, comida.consumo, comida.quantidade, comida.motivo, comida.data]);
}

async function deletarComida(id) {
    const conexao = await conectarDB();
    const sql = 'delete from REGISTRO_CONSUMO where ID_CONSUMO = ?;';

    return await conexao.query(sql, [id]);
}

async function recuperarComida(id) {
    const conexao = await conectarDB();
    const sql = 'select * from REGISTRO_CONSUMO where ID_CONSUMO = ?;';
    const [comida] = await conexao.query(sql, [id]);

    return comida[0];
}

async function alterarComida(comida) {
    const conexao = await conectarDB();
    const sql = 'update REGISTRO_CONSUMO set ID_CADASTRO_PRODUTO = ?, ID_TIPO_CONSUMO = ?, QUANTIDADE_CONSUMO = ?, DATA_CONSUMO = ?, MOTIVO_CONSUMO = ? where ID_CONSUMO = ?;';

    return await conexao.query(sql, [comida.produto, comida.consumo, comida.quantidade, comida.data, comida.motivo, comida.id ])
}

/*
    FUNCTION DA TABELA CADASTRO_PRODUTO
*/

async function listarProdutos() {
    const conexao = await conectarDB();
    const sql = 'SELECT * FROM CADASTRO_PRODUTO;'
    const [produtos] = await conexao.query(sql)

    return produtos
}

async function criarProduto(produto) {
    const conexao = await conectarDB();
    const sql = 'INSERT INTO CADASTRO_PRODUTO (NOME_PRODUTO) VALUES (?);'
    
    return await conexao.query(sql, [produto.produto]);
}

async function deletarProduto(id) {
    const conexao = await conectarDB();
    const sql = 'delete from CADASTRO_PRODUTO where ID_CADASTRO_PRODUTO = ?;';

    return await conexao.query(sql, [id]);
}

async function recuperarProduto(id) {
    const conexao = await conectarDB();
    const sql = 'select * from CADASTRO_PRODUTO where ID_CADASTRO_PRODUTO = ?;';
    const [produto] = await conexao.query(sql, [id]);

    return produto[0];
}

async function alterarProduto(produto) {
    const conexao = await conectarDB();
    const sql = 'update CADASTRO_PRODUTO set NOME_PRODUTO = ? where ID_CADASTRO_PRODUTO = ?;';

    return await conexao.query(sql, [produto.produto, produto.id ])
}

async function produto() {
    const conexao = await conectarDB();
    const sql = 'SELECT * FROM CADASTRO_PRODUTO;';
    const [produto] = await conexao.query(sql);

    return produto;
}

module.exports = { 
    listarComidas,
    listarComidasEntrada,
    listarComidasSaida,
    listarProdutos,
    criarComida,
    criarProduto,
    deletarComida,
    deletarProduto,
    recuperarComida,
    recuperarProduto,
    alterarComida,
    alterarProduto,
    produto
}