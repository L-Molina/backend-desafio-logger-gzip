const productos = require("../utils/productos")

class Contenedor { 
  static list() {
   return productos.showProducts();
  }
  static save(object) {
    return productos.saveProducts(object);    
  }
} 

module.exports = Contenedor;