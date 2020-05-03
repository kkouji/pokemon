
// タイプリスト。文字列を初期化するときなどに使う。
const type_list = ["ノーマル","ほのお　","みず　　","でんき　","くさ　　","こおり　","かくとう","どく　　","じめん　","ひこう　","エスパー","むし　　","いわ　　","ゴースト","ドラゴン","あく　　","はがね　","フェアリ"];

// 相性表。行が攻撃、列が防御、どの程度のダメージを与えられるかの２次元配列。
const effect_table = [
//   nor fir wat ele gla ice fig poi gro fly psy bug roc gho dra dar ste fair
    [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1/2,0  ,1  ,1  ,1/2,1  ], // atack normal
    [1  ,1/2,1/2,1  ,2  ,2  ,1  ,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1/2,1  ,2  ,1  ], // atack fire
    [1  ,2  ,1/2,1  ,1/2,1  ,1  ,1  ,2  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ,1  ,1  ], // atack water
    [1  ,1  ,2  ,1/2,1/2,1  ,1  ,1  ,0  ,2  ,1  ,1  ,1  ,1  ,1/2,1  ,1  ,1  ], // atack electric
    [1  ,1/2,2  ,1  ,1/2,1  ,1  ,1/2,2  ,1/2,1  ,1/2,2  ,1  ,1/2,1  ,1/2,1  ], // atack glass
    [1  ,1/2,1/2,1  ,2  ,1/2,1  ,1  ,2  ,2  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ], // atack ice
    [2  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,1  ,1/2,1/2,1/2,2  ,0  ,1  ,2  ,2  ,1/2], // atack fighting
    [1  ,1  ,1  ,1  ,2  ,1  ,1  ,1/2,1/2,1  ,1  ,1  ,1/2,1/2,1  ,1  ,0  ,2  ], // atack poison
    [1  ,2  ,1  ,2  ,1/2,1  ,1  ,2  ,1  ,0  ,1  ,1/2,2  ,1  ,1  ,1  ,2  ,1  ], // atack ground
    [1  ,1  ,1  ,1/2,2  ,1  ,2  ,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1  ,1  ,1/2,1  ], // atack flying
    [1  ,1  ,1  ,1  ,1  ,1  ,2  ,2  ,1  ,1  ,1/2,1  ,1  ,1  ,1  ,0  ,1/2,1  ], // atack psychic
    [1  ,1/2,1  ,1  ,2  ,1  ,1/2,1/2,1  ,1/2,2  ,1  ,1  ,1/2,1  ,2  ,1/2,1/2], // atack bug
    [1  ,2  ,1  ,1  ,1  ,2  ,1/2,1  ,1/2,2  ,1  ,2  ,1  ,1  ,1  ,1  ,1/2,1  ], // atack rock
    [0  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1  ,2  ,1  ,1/2,1  ,1  ], // atack ghost
    [1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1/2,0  ], // atack dragon
    [1  ,1  ,1  ,1  ,1  ,1  ,1/2,1  ,1  ,1  ,2  ,1  ,1  ,2  ,1  ,1/2,1  ,1/2], // atack dark
    [1  ,1/2,1/2,1/2,1  ,2  ,1  ,1  ,1  ,1  ,1  ,1  ,2  ,1  ,1  ,1  ,1/2,2  ], // atack steel
    [1  ,1/2,1  ,1  ,1  ,1  ,2  ,1/2,1  ,1  ,1  ,1  ,1  ,1  ,2  ,2  ,1/2,1  ], // atack faily
];

//main buttonのリストを取得。
var btn_main = document.getElementById('main').getElementsByClassName('button');
//result buttonのリストを取得。
var btn_result = document.getElementById('result').getElementsByClassName('button');

// ボタンの個数分ループ
for (var i = 0 ; i < btn_main.length ; i++) {
    btnAction(btn_main[i],i);
}

////// functions //////
function btnAction(btnDOM, defense_ID) {
    btnDOM.addEventListener("click", function () {
        this.classList.toggle('select');
        var select_num = document.getElementById('main').getElementsByClassName('select').length;
        if(select_num > 2){
            alert("えらぶ　かずを　へらしてね");
            this.classList.toggle('select');
            return false;
        }else if (select_num == 2) {
            //TODO:２種類選ばれたときの処理
            var select_list =  document.getElementById('main').getElementsByClassName('select');
            var array_btn_main = btn_main;
            array_btn_main = [].slice.call(array_btn_main);
            var select_index0 = array_btn_main.indexOf(select_list[0]);
            var select_index1 = array_btn_main.indexOf(select_list[1]);

            for (var j = 0 ; j < effect_table[defense_ID].length ; j++) { // タイプを探索する。
                var damage = effect_table[j][select_index0] * effect_table[j][select_index1];
                btn_result[j].textContent = type_list[j];
                btn_result[j].classList.remove('transparecy');
                if (damage == 4) {
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>◎</b>');
                } else if (damage == 2) {
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>○</b>');
                } else if (damage == 1) {
                    btn_result[j].classList.add('transparecy');
                } else if (damage == 1/2) {
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>△</b>');
                } else if (damage == 1/4) {
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>↓</b>');
                } else if (damage == 0) {
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>X</b>');
                } else {
                    alert("Something wrong. Undefined damage data.");
                }
            }
        }else if (select_num == 1) {// 一つだけタイプ選ばれたときの処理。
            for (var j = 0 ; j < effect_table[defense_ID].length ; j++) { // タイプを探索する。
                btn_result[j].textContent = type_list[j];
                btn_result[j].classList.remove('transparecy');
                if(effect_table[j][defense_ID] == 2){//ダメージ2倍
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>○</b>');
                } else if(effect_table[j][defense_ID] == 1){//ダメージ1倍.このときだけ色を薄くする。
                    btn_result[j].classList.add('transparecy');
                } else if(effect_table[j][defense_ID] == 1/2){//ダメージ1/2倍
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>△</b>');
                } else if(effect_table[j][defense_ID] == 0){//ダメージ0倍
                    btn_result[j].insertAdjacentHTML('beforeend', ' <b>X</b>');
                }else{
                    alert("Something wrong. Undefined damage data.");
                }
            }
        }else if (select_num == 0){ //タイプの選択がすべて解除されたとき
            for (var j = 0 ; j < effect_table[defense_ID].length ; j++) { // タイプを探索する。
                btn_result[j].textContent = type_list[j]; //デフォルトも文字列に戻す。
                btn_result[j].classList.add('transparecy');//色を薄くする
            }
        }else{
            alert("Something wrong. Programming Error");
        }
    })
}

