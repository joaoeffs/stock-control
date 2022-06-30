var express = require('express');
var router = express.Router();

// CRUD DO REGISTRO_CONSUMO
/*  LISTAR OS REGISTROS NAS PÁGINAS */
router.get('/', async function(req, res) {
  const entrada = await global.db.listarComidasEntrada();
  const saida = await global.db.listarComidasSaida();
  res.render('index', {entrada, saida});
})

router.get('/indexComida', async function(req, res) {
  const data = await global.db.listarComidas();
  res.render('comidas/index', {data});
})

router.get('/indexComidaEntrada', async function(req, res) {
  const data = await global.db.listarComidasEntrada();
  res.render('comidas/index', {data});
})

router.get('/indexComidaSaida', async function(req, res) {
  const data = await global.db.listarComidasSaida();
  res.render('comidas/index', {data});
})

/* GET FORM PAGE COMIDA*/
router.get('/newComida', async function(req, res) {
  const produto = await global.db.produto();
  
  res.render('comidas/form', { title: 'New Comida', acao: '/newComida', produto, comida: {} });
})

/* CRIAR NOVO REGISTRO NA TABELA REGISTRO_CONSUMO */
router.post('/newComida', async function(req, res) {
  const produto = req.body.produto;
  const consumo = req.body.consumo;
  const quantidade = parseInt(req.body.quantidade);
  const motivo = req.body.motivo;
  const data = req.body.data;

  await global.db.criarComida({ produto, consumo, quantidade, motivo, data });
  res.redirect('/indexComida');
})

/* DELETAR REGISTRO DA TABELA REGISTRO_CONSUMO */ 
router.get('/deletarComida/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  await global.db.deletarComida(id);
  
  res.redirect('/indexComida');
})

/* RECUPARAR OS DADOS DO REGISTRO_CONSUMO E COLOCAR NO FORMULÁRIO */
router.get('/alterarComida/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const comida = await global.db.recuperarComida(id);
  const produto = await global.db.produto();

  res.render('comidas/form', { title: 'Alterar Comida', acao: '/alterarComida/' + id, comida, produto });
})

/* ALTERAR OS DADOS NO REGISTRO_CONSUMO */
router.post('/alterarComida/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  const produto = parseInt(req.body.produto);
  const consumo = parseInt(req.body.consumo); 
  const quantidade = parseInt(req.body.quantidade);
  const motivo = req.body.motivo;
  const data = req.body.data;

  await global.db.alterarComida({ id, produto, consumo, quantidade, motivo, data });
  res.redirect('/indexComida');
})

// ------------------------------------------------------------------------------------------------------------------------------------ //

/* GET home page Produto */
router.get('/indexProduto', async function(req, res) {
  const produto = await global.db.listarProdutos();
  res.render('produto/index', {produto});
})

/* GET form page Produto */
router.get('/newProduto', async function(req, res) {
  res.render('produto/form', {title: 'New Produto', acao: '/newProduto', produto: {} });
})

/* POST NEW PRODUTO */
router.post('/newProduto', async (req, res) => {
  const produto = req.body.produto;

  await global.db.criarProduto({ produto });
  res.redirect('/indexComida');
})

router.get('/deletarProduto/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  await global.db.deletarProduto(id);

  res.redirect('/indexProduto');
})

router.get('/alterarProduto/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const produto = await global.db.recuperarProduto(id);

  res.render('produto/form', { title: 'Alterar Produto', acao: '/alterarProduto/' + id, produto });
})

router.post('/alterarProduto/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  const produto = req.body.produto;

  await global.db.alterarProduto({ id, produto });
  res.redirect('/indexProduto');
})

module.exports = router;
