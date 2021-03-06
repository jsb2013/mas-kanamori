/*
 * 文書テーブルに
 * アクセスする為のクラス
 */
var database = require("./database");
var client = database.createClient();

/* 読み込み */
exports.readBunsyo = function(callback) {
    var query = client.query('select * from t_sample_text order by id desc limit 1;');
    var rows = [];

    query.on('row', function(row) {
        rows.push(row);
    });
        
    query.on('end', function(row,err) {
            var bunsyo = rows[0];
            console.log(bunsyo);
            callback(bunsyo);
            return;
    });
        
};

/* 登録 */
exports.insertBunsyo = function(bunsyo,callback) {
    var query = client.query('INSERT INTO t_sample_text(text) values ( $1 )', [bunsyo]);

    query.on('end', function(row,err) {
            callback(false);
            return;
    });
};
