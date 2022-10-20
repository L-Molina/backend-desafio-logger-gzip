//imports
const express = require("express");
const session = require("express-session"); 
const passport = require("passport"); 
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const minimist = require("minimist");
const compression = require("compression");
const { fork } = require("child_process");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

dotenv.config();

//cluster
if (cluster.isPrimary) {
  console.log("num CPUs: " + numCPUs);
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
	//express
	const app = express();

	//socket.io
	const { Server: HttpServer } = require("http");
  const { Server: IOServer } = require("socket.io");
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

	//MongoAtlas
	const MongoStore = require("connect-mongo");
  const advanceOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

	//conexion a la db para las sessions
	app.use(cookieParser());
  let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

	//sessions
	app.use(
    session({
      store: new MongoStore({ 
        mongoUrl: mongoUrl,
        mongoOptions: advanceOptions   
      }),     
      secret: "coderhouse",
      resave: true,
      saveUninitialized: true,
      rolling: true, 
      cookie: { maxAge: 60000 },
    })
  );

	//compression(gzip)
	app.use(compression());

	//auth middleware
	app.use(passport.initialize());
  app.use(passport.session());

	//router
	const router = require("./src/routes/index");

	//plantillas (views)
	app.set('views', './src/views');
  app.set('view engine', 'ejs');

	//middlewares
	app.use(express.static(__dirname + "/public"));
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);

	//logger (para el chat)
	const logger = require("./src/logs/logger");

	//connection
	const chat = require("./src/utils/chat");
  io.on('connection', async function(socket) {
    const messages = await chat.showMessage();  
    socket.emit('messages', messages);
		io.sockets.emit('productos');
		socket.on ('new-message', async function (data){
      try {
        chat.save(data);
        logger.info(`Mensaje: Nuevo mensaje - time: ${new Date().toLocaleString()}`);        
        const messages = await chat.list();      
        io.sockets.emit('messages', messages);
      } catch (err) {
        logger.error(`Mensaje: Error al guardar el mensaje - time: ${new Date().toLocaleString()}`);
      }
    });
	});

	//PORT
	let PORT = 8080
  let data = minimist(["-p",process.argv.slice(2)])
  if(typeof(data.p) === "number"){
    PORT = data.p
  }

  httpServer.listen(PORT, function() {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  })

  console.log(`Worker ${process.pid} started`);
}