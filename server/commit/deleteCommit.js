var express = require("express");
var router = express.Router();
const axios = require("axios");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.post("/", async (req, res) => {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "gResume",
  });
  const response = req.body;
  console.log(response);
  var sql = "DELETE FROM commitlog WHERE stu_username=? and username=?";
  var params = [response.headers.stuname, response.headers.prof];
  await con.query(sql, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Deleted Only Yours`);
    }
  });
  con.end();
  res.end();
});

module.exports = router;
