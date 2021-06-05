let fetchData ; 

fetch("../../response.json").then(function(response){
    response.text().then(function(text){
        return fetchData = JSON.parse(text);
        
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

    })
})

