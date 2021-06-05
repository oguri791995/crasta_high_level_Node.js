const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;

const crastaDB = require("./DB/crastaDB.js");

const db = new crastaDB();

const server = http.createServer();
server.on("request",doRequest);
server.listen(port);
console.log("server running");

let serchDB = db.showDB("select * from master");

/**
 * DBからの抽出データをjsonファイルに書き込む
 */
function createJSON(jsonDB){
    return new Promise(function(resolve,reject){
        console.log(jsonDB);
        jsonDB.then(function(result){
            fs.writeFile("response.json",JSON.stringify(result),function(){
            });
        });
        resolve();
    })
}

/**
 * リクエスト処理
 */
function doRequest(req,res){
    let type = getType(req);
    let routeDir = switchDir(req.url)
    formTreat(req)

    switchType(req,res,type,routeDir);

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
    let path = url;
    fileType = path.split(".");
    if(fileType[1]){
        return
    }
    let dir
    if(url == "/"){
        dir = "/home";
    }else{
        dir = url;
    }
    return dir + "/index.html";
}


/**
リクエストurlの拡張子を返す
*/
function getType(req){
    let path = req.url;
    fileType = path.split(".");
    if(!fileType[1]){  //top画面ではpathは"/"なのでfileType[1]は存在しない
        return "/"  
    }else{
        return fileType[1];
    }
    
}
/**
 * ブラウザからのリクエストurlを元にファイルをレスポンス。
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
            createJSON(serchDB).then(function(){
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
    }

}
