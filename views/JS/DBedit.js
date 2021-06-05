let fetchData ; 


/**
 * DBから取得したデータのJSONファイルを読み込み、
 * tableタグとして表示
 * 
 * ※1
 * サーバ側のJSONファイルをレスポンスする非同期処理と、
 * このファイルのfetchの順番が逆になることがあるらしく、
 * 読み込んだjsonファイルが""になりリストが表示されないことが
 * あるため、reload()関数で目的のjsonファイルが読み込まれるまでリロード
 * 処理を行った(応急処置)
 * 原因は未解決。
 */
fetch("../../response.json").then(function(response){
    response.text().then(function(text){
        if(text === ""){
            location.reload() //※1
        }
        if(JSON.parse(text)){
            return fetchData = JSON.parse(text);
        }
        
    }).then(function(fetchData){
        let DB_edit_table = document.querySelector("#db-edit-table");
        for(let k =0;k <fetchData.length;k++){ //レコード数の分まわす。
            let trTag = document.createElement("tr");

            for (let i in fetchData[k]){//カラム分まわす。
                let tdTag = document.createElement("td");
                tdTag.textContent = fetchData[k][i];
                trTag.appendChild(tdTag);
            }

            DB_edit_table.appendChild(trTag); //1レコード度にtableタグの子要素として追加する。
        }

    });
});
