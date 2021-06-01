const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080

const server = http.createServer();
server.on("request",doRequest);
server.listen(port);
console.log("server running");


/**
 * リクエスト処理
 */
function doRequest(req,res){
    let type = getType(req);
    let routeDir = switchDir(req.url)
    switchType(req,res,type,routeDir);
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
 * ブラウザからのリクエストurlを元にファイルを返す。
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
                res.write(data,"binary"); //２つの目引数はデフォルトでutf-8
                res.end();
            });
            break;
        case "jpg":
            fs.readFile(`./views${req.url}`,"binary",function(err,data){
                res.writeHead(200,{"Content-Type":"image/jpeg"});
                res.write(data,"binary"); //２つの目引数はデフォルトでutf-8
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
