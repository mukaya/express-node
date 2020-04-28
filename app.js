const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');

//Configuration de la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'kda_test',
  password: 'root',
});

//Connexion à la base de données
connection.connect((erreur) => {
  if (erreur) {
    throw erreur;
  }
  console.log('La connexion à la base de données est établie');
});

//Initialisation du serveur express
const server = express();

//Dire à express de mettre les données venants du formulaire dans BODY
server.use(express.urlencoded({ extended: false }));

//Dire à express où aller trouver les vues(Nos pages web que le user sait voir)
server.set('views');

//Dire à express d'utiliser EJS comme moteur de template
server.set('view engine', 'ejs');
server.use(express.static('public'));

server.get('/apprenants', (req, res) => {
  connection.query('select * from students', (erreur, resultat) => {
    if (erreur) throw erreur;
    return res.render('apprenants/index', { apprenants: resultat });
  });
});

server.post('/apprenants', (req, res) => {
  connection.query(
    `insert into students(nom,prenom) values('${req.body.nom}','${req.body.prenom}')`,
    (erreur, resultat) => {
      if (erreur) throw erreur;
      return res.redirect('/apprenants');
    }
  );
});

server.get('/apprenants/new', (req, res) => {
  return res.render('apprenants/new',{
    title:"Ajouter un apprenant",
    apprenant: {
      id : '',
      nom: '',
      prenom: ''
    }
  });
});

server.get('/apprenants/:id', (req, res) => {
  connection.query(
    `select * from students where id=${req.params.id}`,
    (erreur, resultat) => {
      if (erreur) throw erreur;
      return res.render('apprenants/show', { apprenant: resultat[0] });
    }
  );
});
//delete apprenant
server.get('/apprenants/delete/:apprenantId', (req, res)=>{
  const id = req.params.apprenantId;
  const sql = `delete from students where id = ?`;
  connection.query(sql,[id],(error,resultat)=>{
    if(!error){
       res.redirect('/apprenants');
    }else{
      console.log(error);
    }
  });
});
// get apprenant by id
server.get('/apprenants/edit/:apprenantId', (req, res)=>{
  const id = req.params.apprenantId;
  const sql = `select * from students where id = ?`;
  connection.query(sql,[id],(error,resultat)=>{
    if(!error){
       res.render('apprenants/new',{
         apprenant: resultat[0],
         title: 'Modifier un apprenant'
       });
    }else{
      console.log(error);
    }
  });
});
//edit apprenant
server.post('/apprenants/edit', (req, res) => {
  const { id, nom, prenom } = req.body;
  const sql = `update students set nom = ?, prenom = ? where id = ?`
 connection.query(sql,[nom,prenom,id],(erreur, resultat) => {
      if (erreur) throw erreur;
      return res.redirect('/apprenants');
    }
  );
});


//Définition du port
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
