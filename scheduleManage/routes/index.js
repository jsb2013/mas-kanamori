
/*
 * GET home page.
 */

//var waitScheduleDao = require("../dao/waitScheduleDao");
var userAccountDao = require("../dao/userAccountDao");
var config = require("../conf/common_config");
var log = require("../util/logger");
var logger = log.createLogger();

// 1-1.ログイン画面（get:/login）
exports.login = function(req, res){
    res.render('login', {
        loginFailed: false
    });
};

// 1-2.ログイン画面（post:/login）
exports.loginpost = function(req, res){
    var userid = req.body.userid;
    var password = req.body.password;
    
    function authCallback(err, userInfo){
        // システムエラー[TBA:システムエラー時の画面を用意する]
        if (err) {
            res.render('login', {
                error: 100,
                loginFailed: true
            });
            return;
        }
        
        // ユーザID若しくはパスワードに誤りあり
        if (!userInfo) {
            res.render('login', {
                error: 200,
                loginFailed: true
            });
            return;
        }
        
        // 認証に成功
        req.session.user = {
            userid: userInfo.user_id,
            username: userInfo.user_name
        };
        // メイン画面へ推移
        logger.info('ILOGIN10', null, userInfo.user_id);
        res.redirect('/main');
        return;
    }
    userAccountDao.authenticate(userid, password, authCallback);
};

