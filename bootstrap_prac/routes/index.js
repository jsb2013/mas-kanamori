/*
 * GET home page.
 */

var users = require('../models/users');

// メインページ（仮）
exports.index = function(req, res){
  if (req.session.user === undefined) {
    res.redirect(403, '/');
    return;
  }
  res.render('index', { 
    page: {title: 'Express', name: req.session.user.name }
  });
};

// ログイン処理を行う
exports.login = function (req, res) {
  var name = req.body.name || '';
  var password = '';

  // GETリクエストに対する処理
  res.render('login', {
    page: { title: 'login' , sysname: 'おとかけ', serifu: '"otonari no kakeibo ha"?'},
//    user: req.session.user || null,
    name: name,
    error: 200,
    loginFailed: false
  });
  return;
};

// ログインフォームを処理する
exports.login.post = function (req, res) {
  var name = req.body.name || '';
  var password = req.body.password || '';
    
  function authCallback(err, userInfo) {
    if (err || userInfo === null) {
      // 認証に失敗
      res.render('login', {
        page: { title: 'login_err' },
//        user: req.session.user || null,
	name: name,
	error: 200,
	loginFailed: true
      });
      return;
    }
    // 認証に成功
    if (req.session.user === undefined) {
        req.session.user = {
            uid: userInfo.uid,
            name: userInfo.name
        };
        console.log("---session created---");
        console.log(req.session.user);
    }
    res.redirect('/top');
    return;
  }
  users.authenticate(name, password, authCallback);
};

// TOP画面の処理を行う
exports.top = function (req, res) {
  var name = req.body.name || '';
  var password = '';

  // GETリクエストに対する処理
  res.render('top', {
    page: { title: 'top' , sysname: 'おとかけ', serifu: '"otonari no kakeibo ha"?'},
//    user: req.session.user || null,
    name: name,
    error: 200,
    loginFailed: false
  });
  return;
};



