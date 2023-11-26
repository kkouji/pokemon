
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

//main buttonのリストを取得。
var btn_main   = document.getElementById('main').getElementsByClassName('button');
//result buttonのリストを取得。
var btn_result = document.getElementById('result').getElementsByClassName('button');
//reset buttonを取得
var btn_reset  = document.getElementById('main').getElementsByClassName('btn_06');


// ボタンの個数分ループ
for (var i = 0 ; i < btn_main.length ; i++) {
    btnAction(btn_main[i],i);
}

btnReset(btn_reset[0]);
resetResult();

////// functions //////
function btnAction(btnDOM) {
    btnDOM.addEventListener("click", function () {
        this.classList.toggle('select');
        var select_num = document.getElementById('main').getElementsByClassName('select').length;
        if(select_num > 2){
            this.classList.toggle('select');
            return false;
        }else if (select_num == 2) { //２つタイプが選ばれたときの処理。
          updateResult();
        }else if (select_num == 1) {// 一つだけタイプが選ばれたときの処理。
          updateResult();
        }else if (select_num == 0){ //タイプの選択がすべて解除されたとき
          resetResult();
        }else{
            alert("Something wrong. Programming Error");
        }
    })
}

// リセットボタンが押された動作
function btnReset(btnDOM){
  btnDOM.addEventListener("click", function () {
    resetMain();
    resetResult();
  })
}

// mainボタンをデフォルトに戻す
function resetMain(){
  for (var j = 0 ; j < effect_table[0].length ; j++) { // タイプを探索する。
    btn_main[j].classList.remove('select');//selectを外す
    btn_main[j].classList.remove('transparecy');//色を濃くする
  }
}
// 結果ボタンをデフォルトに戻す
function resetResult(){
  for (var j = 0 ; j < effect_table[0].length ; j++) { // タイプを探索する。
    btn_result[j].textContent = type_list[j]; //デフォルトも文字列に戻す。
    btn_result[j].classList.add('transparecy');//色を薄くする
  }
}

function updateResult(){
  //selectされているbtn_mainのindexリストを作成
  var select_list =  document.getElementById('main').getElementsByClassName('select');
  var array_btn_main = btn_main;
  array_btn_main = [].slice.call(array_btn_main);
  let select_index = [];
  for (var j = 0 ; j < select_list.length ; j++){
    select_index.push(array_btn_main.indexOf(select_list[j]));
  }

  // btn_main操作
  if(select_list.length == 2){ // 2つselectされた場合選択されていないボタンを薄くする。
    for (var i = 0 ; i < btn_main.length ; i++) {
      if(select_index.includes(i)){
        btn_main[i].classList.remove('transparecy');
      } else {
        btn_main[i].classList.add('transparecy');
      }
    }
  } else if (select_list.length == 1){ // 1つselectされた場合、選択ボタンをすべて表示する。
    for (var i = 0 ; i < btn_main.length ; i++) {
      btn_main[i].classList.remove('transparecy');
    }
  }

  //Result領域をリセット
  resetResult();

  //Result領域のアップデート
  for (var j = 0 ; j < effect_table[0].length ; j++) { // タイプを探索する。
    //ダメージ計算
    var damage = 1;
    for(var i = 0 ; i < select_list.length ; i++){
      damage *= effect_table[j][select_index[i]];
    }

    if (damage == 4) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:1.0em">x4</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 2) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.8em">x2</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 1) {

    } else if (damage == 1/2) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.5em">x0.5</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 1/4) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.3em">x0.25</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 0) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.05em">x0</b>');
      btn_result[j].classList.remove('transparecy');
    } else {
      alert("Something wrong. Undefined damage data.");
    }
  }
}

