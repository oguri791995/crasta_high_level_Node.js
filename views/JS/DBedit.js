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
                    if(i === "contact_type"){
                        
                        switch(fetchData[k]["contact_type"]){
                            case "production-request":
                                tdTag.textContent = "制作依頼"; 
                                break;
                            case "recruitment":
                                tdTag.textContent = "採用";
                                break;
                            case "IR":
                                break;
                            case "another":
                                tdTag.textContent = "その他"
                                break;
                            default:
                                break;
                        }
                    }

                }

                let delBtn = document.createElement("button");
                let editBtn = document.createElement("button");

                delBtn.textContent = "削除";
                editBtn.textContent = "編集";
                trTag.id = `id_${fetchData[k]["id"]}`;

                let tdDelTag = document.createElement("td");
                tdDelTag.appendChild(delBtn);
                trTag.appendChild(tdDelTag);

                let tdEditTag = document.createElement("td");
                tdEditTag.appendChild(editBtn);
                trTag.appendChild(tdEditTag);

                delBtn.onclick = function(){
                    sendDelID(trTag.id .split("_")[1]);

                };

                editBtn.onclick = function(){
                   editPopup(trTag.id);
                }

                DB_edit_table.appendChild(trTag); //1レコード度にtableタグの子要素として追加する。
            }
        })
    });
}

/**
 * 削除idをリクエストする。
 */
function sendDelID(id){
    fetch(delBtnPush(id));
    location.reload();
}

/**
 * 編集ボタンの押下時のポップアップ表示処理
 * ※1 二回目以降のxボタンクリック時に複数回実行されてしまうので、onceプロパティを指定。
 */
function editPopup(id){
    let Xflag = false;

    let popup = document.querySelector(".popup");
    let background = document.querySelector(".background");

    popup.classList.toggle("displayNone");  
    background.classList.toggle("displayNone");

    let editlist = document.getElementById(id);

    let recordID = document.getElementsByName("recordID")[0];
    let contact_type = document.getElementsByName("contact-radio");
    let company = document.getElementsByName("company")[0];
    let name = document.getElementsByName("name")[0];
    let eMail = document.getElementsByName("email")[0];
    let tel = document.getElementsByName("tel")[0];
    let contactMsg = document.getElementsByName("contact-msg")[0];


    let selectRadioType = editlist.querySelectorAll("td")[1].textContent;
    for(let i in contact_type){
        if(contact_type[i].value === selectRadioType){
            contact_type[i].checked = true;
        }
    }

    recordID.value = editlist.querySelectorAll("td")[0].textContent;
    company.value = editlist.querySelectorAll("td")[2].textContent;
    name.value = editlist.querySelectorAll("td")[3].textContent;
    eMail.value = editlist.querySelectorAll("td")[4].textContent;
    tel.value = editlist.querySelectorAll("td")[5].textContent;
    contactMsg.value = editlist.querySelectorAll("td")[6].textContent;


    let x_button = document.querySelector(".x-button");

    count = 0;
    x_button.addEventListener("click", function(){
            popup.classList.toggle("displayNone");  
            background.classList.toggle("displayNone");
        count++
        console.log(count)
    },{
        once:true //※１
    })

}

