const {options} = require('./options/sqliteDB.js');
const knex = require('knex')(options);

knex.schema.createTable('chat', (table) => {    
  table.increments('id');
  table.string('email'); 
  table.string('fecha'); 
  table.string('mensaje');   
}).then (() => {
  console.log('Tabla "Chat" creada');  
}).catch((err) => {
  console.log(err);
}).finally (() => {
  knex.destroy(); 
})