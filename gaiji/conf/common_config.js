/*
 * ユーザ待ちステータステーブルに
 * アクセスする為のクラス
 */

// データベース接続情報
exports.connectionString = process.env.DATABASE_URL
        || "tcp://posuser:posuser@localhost:5432/gaiji";

