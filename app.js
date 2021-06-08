const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;

const crastaDB = require("./DB/crastaDB.js");

let requestSQL ;

const db = new crastaDB();

const server = http.createServer();
server.on("request",doRequest);
server.listen(port);
console.log("server running");

let sql = "select * from master"

/**
 * DBからの抽出データをjsonファイルに書き込む
 */
async function createJSON(){
    let jsonDB = db.showDB(sql);
        await jsonDB.then(function(result){
            fs.writeFileSync("response.json",JSON.stringify(result),function(){
            });
        });
}


/**
 * リクエスト処理
 */
function doRequest(req,res){
    let type = getType(req);
    let routeDir = switchDir(req.url)
    formTreat(req)
    switchType(req,res,type,routeDir);

    // console.log(decodeURIComponent(req.url));
}

/** 
 * form処理
*/
function formTreat(req){
    if(req.method == "POST"){
        let data ="";
        req.on("data",function(chunk){
            data += chunk
        }).on("end",function(){
            DBinsert(data)
        })
    }
}
/**
 * DB登録
 */

function DBinsert(data){
    dataArray = data.split("&");
    dataItems = [];
    for(let i=0; i<dataArray.length; i++){
        decodeItem = decodeURIComponent(dataArray[i].split("=")[1]);
        dataItems.push(decodeItem);
    } 
    db.masterInsert(dataItems[0],dataItems[1],dataItems[2],dataItems[3],dataItems[4],dataItems[5]);

    console.log(dataItems);
}

/**
 * route処理
 */
function switchDir(url){
    let dir
    fileType = url.split(".");

    if(fileType[1]){
        return
    }
    if(url == "/"){
        dir = "/home";
    }else{
        dir = url;
    }
    return dir + "/index.html";
}

/**
 * 
 * リクエストurlの拡張子を返す
 * SQL文なら正規のSQL文に変換し、返す。
 * 
 */

function getType(req){
    let path = req.url;
    BooleanSQL = path.indexOf("sql");
    fileType = path.split(".");

    if(BooleanSQL === 1){ //SQL文は正規の文に変換して返す。
        return "sql";
    }

    if(!fileType[1] && BooleanSQL == -1){  //top画面ではpathは"/"なのでfileType[1]は存在しない
        return "/"  
    }else{
        return fileType[1];
    }
    
}

function sqlDelete(id){
    let sql = `delete from master where id = ${id}`;
    db.delSQL(sql);
}

/**
 * ブラウザからのリクエストurlを元にファイルをレスポンス。
 * レスポンスを返した後にjsonファイルが作成されるっぽい
 */
function switchType(req,res,type,routeDir){

    switch(type){
        case "/":
            fs.readFile(`./views/HTML${routeDir}`,"utf-8",function(err,data){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.write(data);
                res.end();
            }); 
            break;
        case "txt":
            // fs.readFile(`./views/test/${req.url}`,"utf-8",function(err,data){
            fs.readFile(`./views/${req.url}`,"utf-8",function(err,data){
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.write(data);
                res.end();
            }); 
            break;
        case "json":
                createJSON().then(function(){ //※1
                    fs.readFile(`.${req.url}`,"utf-8",function(err,data){
                        res.writeHead(200,{"Content-Type":"application/json"});
                        res.write(data);
                        res.end();
                    })
                });

            break;
        case "css":
            fs.readFile(`./views${req.url}`,"utf-8",function(err,data){
                res.writeHead(200,{"Content-Type" : "text/css"});
                res.write(data);
                res.end();
            });
            break;
        case "svg":
            fs.readFile(`./views${req.url}`,"binary",function(err,data){
                res.writeHead(200,{"Content-Type":"image/svg+xml"});
                res.write(data,"binary"); //２つの目引数はデフォルトでutf-8 https://nodejs.org/api/http.html#http_request_write_chunk_encoding_callback
                res.end();
            });
            break;
        case "jpg":
            fs.readFile(`./views${req.url}`,"binary",function(err,data){
                res.writeHead(200,{"Content-Type":"image/jpeg"});
                res.write(data,"binary"); //２つの目引数はデフォルトでutf-8 https://nodejs.org/api/http.html#http_request_write_chunk_encoding_callback
                res.end();
            })
            break;
        case "js":
            fs.readFile(`./views${req.url}`,"utf-8",function(err,data){
                res.writeHead(200,{"Content-Type":"text/javascript"});
                res.write(data);
                res.end();
            })
            break;
        case "sql":
            let sqlPart = decodeURIComponent(req.url).split("_");
            if(sqlPart[1] === "del"){
                sqlDelete(sqlPart[2]);
            }
    
            break;
        default:
            return;
    }

}
