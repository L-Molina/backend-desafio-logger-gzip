const register = require("../utils/register")

class Contenedor {   
  static save(object) {
    return register.save(object);    
  }
} 

module.exports = Contenedor;