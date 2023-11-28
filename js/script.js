////// init //////

//main buttonのリストを取得。
var btn_main = document.getElementById('main').getElementsByClassName('button');
//result buttonのリストを取得。
var btn_result = document.getElementById('result').getElementsByClassName('button');
//reset buttonを取得
var btn_reset = document.getElementById('main').getElementsByClassName('btn_06');
//input_formを取得
var input_form = document.getElementById("name");

// 選択ボタンの初期化
for (var i = 0; i < btn_main.length; i++) {
  btnAction(btn_main[i], i);
}
//リセット表示の初期化
btnReset(btn_reset[0]);
//結果表示の初期化
resetResult();
//inputフォームの初期化
search_pokemon(input_form);

////// functions //////
function btnAction(btnDOM) {
  btnDOM.addEventListener("click", function () {
    this.classList.toggle('select');
    var select_num = document.getElementById('main').getElementsByClassName('select').length;
    if (select_num > 2) {
      this.classList.toggle('select');
      return false;
    } else if (select_num == 2) { //２つタイプが選ばれたときの処理。
      updateResult();
    } else if (select_num == 1) {// 一つだけタイプが選ばれたときの処理。
      updateResult();
    } else if (select_num == 0) { //タイプの選択がすべて解除されたとき
      resetResult();
    } else {
      alert("Something wrong. Programming Error");
    }
  })
}

// リセットボタンが押された動作
function btnReset(btnDOM) {
  btnDOM.addEventListener("click", function () {
    resetMain();
    resetResult();
    resetInput();
  })
}

// mainボタンをデフォルトに戻す
function resetMain() {
  for (var j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    btn_main[j].classList.remove('select');//selectを外す
    btn_main[j].classList.remove('transparecy');//色を濃くする
  }
}
// 結果ボタンをデフォルトに戻す
function resetResult() {
  for (var j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    btn_result[j].textContent = type_list[j]; //デフォルトも文字列に戻す。
    btn_result[j].classList.add('transparecy');//色を薄くする
  }
}

// inputをデフォルトに戻す
function resetInput() {
  input_form.value = "";
  var disp_pokemon_list = document.getElementById("pokemon_list");
  disp_pokemon_list.innerHTML = "";
}

function updateResult() {
  //selectされているbtn_mainのindexリストを作成
  var select_list = document.getElementById('main').getElementsByClassName('select');
  var array_btn_main = btn_main;
  array_btn_main = [].slice.call(array_btn_main);
  let select_index = [];
  for (var j = 0; j < select_list.length; j++) {
    select_index.push(array_btn_main.indexOf(select_list[j]));
  }

  // btn_main操作
  if (select_list.length == 2) { // 2つselectされた場合選択されていないボタンを薄くする。
    for (var i = 0; i < btn_main.length; i++) {
      if (select_index.includes(i)) {
        btn_main[i].classList.remove('transparecy');
      } else {
        btn_main[i].classList.add('transparecy');
      }
    }
  } else if (select_list.length == 1) { // 1つselectされた場合、選択ボタンをすべて表示する。
    for (var i = 0; i < btn_main.length; i++) {
      btn_main[i].classList.remove('transparecy');
    }
  }

  //Result領域をリセット
  resetResult();

  //Result領域のアップデート
  for (var j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    //ダメージ計算
    var damage = 1;
    for (var i = 0; i < select_list.length; i++) {
      damage *= effect_table[j][select_index[i]];
    }

    if (damage == 4) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:1.0em">x4</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 2) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.8em">x2</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 1) {

    } else if (damage == 1 / 2) {
      btn_result[j].insertAdjacentHTML('beforeend', ' <b style="font-size:0.5em">x0.5</b>');
      btn_result[j].classList.remove('transparecy');
    } else if (damage == 1 / 4) {
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


function search_pokemon(inputDOM) {
  inputDOM.addEventListener("input", function () {
    var disp_pokemon_list = document.getElementById("pokemon_list");
    var name = input_form.value;
    var pokemon_name_list = [];
    for (let index = 0; index < pokemon_table.length; index++) {
      pokemon_name_list.push(pokemon_table[index][pokemon_table_name]);
    }

    var match_name_list = pokemon_name_list.filter(function (item) {
      return item.toLowerCase().includes(name.toLowerCase());
    });

    disp_pokemon_list.innerHTML = "";
    
    if (match_name_list.length != pokemon_name_list.length) {
      match_name_list.forEach(function (pokomen_name) {
        var pokemon_index = pokemon_name_list.indexOf(pokomen_name);
        var pokemon_type1 = pokemon_table[pokemon_index][pokemon_table_type1]
        var pokemon_type2 = pokemon_table[pokemon_index][pokemon_table_type2]

        disp_pokemon_list.insertAdjacentHTML('beforeend', '<div class="button">' + pokomen_name + "/" + pokemon_type1 + "/" + pokemon_type2 + "<br></div>");
      });
    }
  });
}

