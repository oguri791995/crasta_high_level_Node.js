let fetchData ; 
let delBtn ;
fetchDB()

function delBtnPush(selectID){
    sql_del = `sql_del_${selectID}`;
    // console.log(sql_del);
    return sql_del;
}
/**
 * DBから取得したデータのJSONファイルを読み込み、
 * tableタグとして表示
 */
function fetchDB(){
    fetch("../../response.json")
    .then(function(response){
        response.text().then(function(text){
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
                let btn = document.createElement("button");
                btn.textContent = "削除";
                btn.id = `id_${fetchData[k]["id"]}`;
                btn.onclick  = function(){
                    delBtn = btn.id.split("_")[1];
                    fetch(delBtnPush(delBtn));
                    location.reload();
                };
 
                trTag.appendChild(btn);

                DB_edit_table.appendChild(trTag); //1レコード度にtableタグの子要素として追加する。
            }
        })
    });
}


// fetch("../../response.json").then(function(response){
//     response.text().then(function(text){
//         if(text === "" ){
//             location.reload() //※1
//         }
//         if(JSON.parse(text)){
//             return fetchData = JSON.parse(text);
//         }
        
//     }).then(function(fetchData){
//         let DB_edit_table = document.querySelector("#db-edit-table");
//         for(let k =0;k <fetchData.length;k++){ //レコード数の分まわす。
//             let trTag = document.createElement("tr");

//             for (let i in fetchData[k]){//カラム分まわす。
//                 let tdTag = document.createElement("td");
//                 tdTag.textContent = fetchData[k][i];
//                 trTag.appendChild(tdTag);
//             }

//             DB_edit_table.appendChild(trTag); //1レコード度にtableタグの子要素として追加する。
//         }

//     });
// });