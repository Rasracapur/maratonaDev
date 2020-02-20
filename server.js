//Configurando o servidor
const express = require('express')
const server = express()

//Configurar o servidor para mostrar arquivos extras
server.use(express.static("public"))

//Habilitar o body no formulário
server.use(express.urlencoded({extended: true}))

//Configurar a conexão com o banco de dados
const Pool = require("pg").Pool
const db = Pool({
  user: "postgres",
  password: "382855",
  host: "localhost",
  port: 5432,
  database: "doe"
})

//Configurando o template
const nunjucks = require('nunjucks')
nunjucks.configure("./",{
  express: server,
  noCache: true
})

server.post("/", function (req, res) {
  //Pegar os dados do formulário
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood

  if(name == "" || email == "" || blood == ""){
    return res.send("Todos os Campos são obrigatórios")

  }

  //Coloca os valores dentro do banco de dados
  let q = `
  INSERT INTO donors ("name", "email", "blood")
  VALUES ($1, $2, $3) 
  `
  const values = [name, email, blood]
  db.query(q, values, (err) => {
    if(err) {
      console.log("Os dados não foram enviados")
      return res.send("Erro no Banco de Dados")
    }
    console.log("Os dados foram envidados")
    console.log({
      name,
      email,
      blood
    })
  
    return res.redirect("/")
  })
})


//Configurar a apresentação da página
server.get("/", (req, res) => {
  const seleção = "SELECT * FROM donors"
  db.query(seleção, (err, result) => {
    if(err) {
      console.log("Os dados não foram enviados")
      return res.send("Erro no Banco de Dados")
    }
    const donors = result.rows
    return res.render("index.html", { donors })
  })
})

//Ligar o servidor e permitir que use a porta 3000
server.listen(3000, () => {
  console.log("Iniciei o servidor...")
})

