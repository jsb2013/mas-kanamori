// Copyright (c) 2012, Hiromichi Matsushima <hylom@users.sourceforge.jp>
// All rights reserved.
// This file is released under New BSD License.
// fortune.js - シンプルな占いWebアプリケーション

// 必要なモジュールをロードする
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var pg = require('pg');

// 出力するHTMLコードを用意する
var htmlHeader = '<!DOCTYPE html>\
<html lang="ja">\
<head>\
<meta charset="utf-8">\
<title>Jsb(仮)</title>\
<style>\
.content {\
width: 480px;\
text-align: center;\
border: 4px solid lightblue;\
padding: 4px;\
margin: 16px auto;\
}\
.main-form div {margin-bottom: 4px;}\
.result {\
display: block;\
font-size: 200%;\
color: red;\
margin: 4px auto;\
border: 1px solid;\
width: 4em;\
}\
</style>\
</head>\
<body>\
<div class="content">\
<h1>医療点数表示</h1>';
var htmlMainForm = '<div class="main-form">\
<form method="post" action="/">\
<div>\
<label>検索名：<input type="text" name="name" size="20"></label>\
</div>\
<input type="submit" value="検索">\
</form>\
</div>';
var htmlFooter = '</div></body></html>';
// 「<」や「>」、「&」といった文字列をエンティティに変換する
function escapeHtmlSpecialChar(html) {
if (html === undefined) {
return '';
} else {
html = html.replace(/&/g, '&amp;');
html = html.replace(/</g, '&lt;');
html = html.replace(/>/g, '&gt;');
return html;
}
};

/*
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT name AS "SRY" FROM TBL_TENSU WHERE SRYCD like \'610421326\'', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].SRY);
    client.end();
  });
});*/


// http.Serverオブジェクトを作成する
var server = http.createServer(onRequest);

// pg.Clientオブジェクトを作成する
var conString = "postgres://posuser:posuser@localhost/orca";
var client = new pg.Client(conString);

// requestイベントハンドラを定義する
function onRequest(request, response2) {
// リクエストされたパスが「/」以外の場合、404エラーを返す
if (request.url != '/') {
response2.writeHead(404, {'Content-Type': 'text/plain'});
response2.end('Error 404: Not Found.');
return;
}
// POST以外のリクエストの場合、メインフォームを送信する
if (request.method != 'POST') {
response2.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
response2.write(htmlHeader);
response2.write(htmlMainForm);
response2.write(htmlFooter);
response2.end();
return;
}
// POSTリクエストの場合、送信されたデータから医療点数をDBから取得する
if (request.method == 'POST') {
// 送信されたデータを取得する
request.data = '';
request.on('data', function (chunk) {
request.data += chunk;
});
request.on('end', sendResponse);
return;
}
// データの受信が完了したら実行される関数
function sendResponse() {
var query = querystring.parse(request.data);
// 取得したデータでDBを検索し、結果を表示

var result_name = '----';
var result_ten = 0;
// デバッグ
console.log('aa='+result_name);
console.log('bb='+result_ten);

var seek = query.name
console.log('name='+seek);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT TEN AS "SRY_TEN" , name AS "KANJI_NAME" FROM TBL_TENSU WHERE name like \'\%'+ seek + '\%\' LIMIT 1;', function(err, result) {
    if(err) {
      //return console.error('error running query', err);
      console.log('query error');

    }
    result_name = result.rows[0].KANJI_NAME;
    result_ten = result.rows[0].SRY_TEN;
    console.log('AS='+result_name);
    console.log('ASS='+result_ten);

var resultStr = '<div><p>'
+ result_name + 'の点数は'
+ '<span class="result">'
+ result_ten + '</span>'
+ '点です。</p></div>'
+ '<a href="/">トップに戻る</a>';
// デバッグ
console.log('A='+result_name);
console.log('B='+result_ten);

response2.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
response2.write(htmlHeader);
response2.write(resultStr);
response2.write(htmlFooter);
response2.end();


    client.end();
  });
});

/*
// 結果出力するHTMLを生成する
var resultStr = '<div><p>'
+ result_name + 'の点数は'
+ '<span class="result">'
+ result_ten + '</span>'
+ '点です。</p></div>'
+ '<a href="/">トップに戻る</a>';


// デバッグ
console.log('A='+result_name);
console.log('B='+result_ten);

response2.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
response2.write(htmlHeader);
response2.write(resultStr);
response2.write(htmlFooter);
response2.end();
*/
}
}
// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';
// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.error('Server running at http://' + ADDRESS + ':' + PORT + '/');
