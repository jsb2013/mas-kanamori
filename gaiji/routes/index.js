
/*
 * GET home page.
 */

var userAccountDao = require("../dao/userAccountDao");
var config = require("../conf/common_config");

exports.index = function(req, res){
    var bunsyo = req.body.bunsyo;

    function authCallback(data){
      res.render('index', { title:'外字テスト', res:data.text });
      return;
    }

    userAccountDao.readBunsyo(authCallback);
};


exports.indexpost = function(req, res){
    var bunsyo = req.body.bunsyo;

    function authCallback2(){

      function authCallback(data){
        res.render('index', { title:'外字テスト', res:data.text });
        return;
      }

      userAccountDao.readBunsyo(authCallback);
      return;
    }

    userAccountDao.insertBunsyo(bunsyo,authCallback2);

};
