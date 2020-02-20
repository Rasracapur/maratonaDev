//Configurando o servidor
const express = require('express')
const server = express()

//Configurar o servidor para mostrar arquivos extras
server.use(express.static("public"))

//Ligar o servidor e permitir que use a porta 3000
server.listen(3000, () => {
  console.log("Iniciei o servidor...")
})


//Configurando o template
const nunjucks = require('nunjucks')
nunjucks.configure("./",{
  autoescape: true,
  express: server
})

//Lista de Doadores: Vetor ou Array
const donors = [
  {
    name: 'Diego Fernandes',
    blood: "AB+"
  },
  {
    name: 'Cleiton Souza',
    blood: "B+"
  },
  {
    name: 'Robson Marques',
    blood: "A+"
  },
  {
    name: 'Mayk Brito',
    blood: "O+"
  },
]

//Configurar a apresentação da página
server.get("/", (req, res) => {
  return res.render("./public/index.html", {valor: "1"})
})


