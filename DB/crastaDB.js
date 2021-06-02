
let sqlite = require("sqlite3").verbose();

class crastaDB {
    /**
     *コンストラクタ：dbがなければ作成
     */
    constructor(){
        let db = new sqlite.Database("./DB/crastaDB");
        console.log("DB関数接続");
        db.serialize(function(){
            db.run("create table if not exists master(id INTEGER PRIMARY KEY autoincrement NOT NULL,contact_type text, company text,name text NOT NULL, email text NOT NULL, tel text, contact_msg text NOT NULL)");
            console.log("DB作成");
        })
        db.close();
    }

    /**
     * dbにフォームデータを登録
     */
    masterInsert(contactRadio,company,name,email,tel,contactMsg){
        let db = new sqlite.Database("./DB/crastaDB");
        db.serialize(function(){
            let stmt = db.prepare("insert into master(contact_type,company,name,email,tel,contact_msg) values(?,?,?,?,?,?)");
            stmt.run([contactRadio,company,name,email,tel,contactMsg]);
            stmt.finalize();

           console.log("入力データを登録しました。") 
        });
        db.close();
    }
    
}

// let cdb = new crastaDB();
// cdb.masterInsert("aaa","bbb","ccc","ddd",1234,"eee");

module.exports = crastaDB;