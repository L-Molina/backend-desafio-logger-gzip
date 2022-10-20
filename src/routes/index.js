const express = require("express");
const router = express.Router();

const products = require("./product/productRouter");
const productsList = require("./product/productListRouter");
const home = require("./home/homeRouter");
const login = require("./login/loginRouter");
const loginError = require("./login/loginErrorRouter");
const logout = require("./login/logoutRouter");
const register = require("./login/registerRouter");
const info = require("./other/infoRouter");
const randoms = require("./other/randomsRouter");
const error = require("./other/errorRouter");

//middleware
router.use("/productos", products);
router.use("/lista-productos", productsList);
router.use("/", home);
router.use("/login", login);
router.use("/loginerror", loginError);
router.use("/register", register);
router.use("/logout", logout);

// 14
router.use("/info", info);

// 15
router.use("/api/randoms", randoms);

// Error
router.use("*", error);

module.exports = router;