////// init //////

//main buttonのリストを取得。jj
var btn_main = document.getElementById('main').getElementsByClassName('button');
//result buttonのリストを取得。
var result_boxes = document.getElementById('new_result').getElementsByClassName('result_box');
//reset buttonを取得
var btn_reset = document.getElementById('main').getElementsByClassName('btn_06');
//input_formを取得
var input_form = document.getElementById("name");

//全ポケモンの名前リスト生成
var pokemon_name_list = []; //全ポケモンの名前リスト
// ポケモンの全リストから名前リストを作る。
for (let index = 0; index < pokemon_table.length; index++) {
  pokemon_name_list.push(pokemon_table[index][pokemon_table_name]);
}

// 選択ボタンの初期化
for (let i = 0; i < btn_main.length; i++) {
  btn_main[i].addEventListener("click", click_select)
}
//リセット表示の初期化
btnReset(btn_reset[0]);
//結果表示の初期化
resetResult();
//inputフォームの初期化
search_pokemon(input_form);

////// functions //////

// リセットボタンにアクション追加
function btnReset(btnDOM) {
  btnDOM.addEventListener("click", function () {
    resetMain();
    resetResult();
    resetInput();
  })
}

//selectボタンアクション
function click_select() {
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
}

// mainボタンをデフォルトに戻す
function resetMain() {
  for (let j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    btn_main[j].classList.remove('select');//selectを外す
    btn_main[j].classList.remove('transparecy');//色を濃くする
  }
}
// 結果ボタンをデフォルトに戻す
function resetResult() {
  result_boxes[0].innerHTML = "<div>x4</div>"
  result_boxes[1].innerHTML = "<div>x2</div>"
  result_boxes[2].innerHTML = "<div>x1</div>"
  result_boxes[3].innerHTML = "<div>x0.5</div>"
  result_boxes[4].innerHTML = "<div>x0.25</div>"
  result_boxes[5].innerHTML = "<div>x0</div>"
}

// inputをデフォルトに戻す
function resetInput() {
  input_form.value = "";
  var disp_pokemon_list = document.getElementById("pokemon_list");
  disp_pokemon_list.innerHTML = "";
}

//結果ボタンをアップデートする
function updateResult() {
  //selectされているbtn_mainのindexリストを作成
  var select_list = document.getElementById('main').getElementsByClassName('select');
  var array_btn_main = btn_main;
  array_btn_main = [].slice.call(array_btn_main);
  let select_index = [];
  for (let j = 0; j < select_list.length; j++) {
    select_index.push(array_btn_main.indexOf(select_list[j]));
  }

  // btn_main操作
  if (select_list.length == 2) { // 2つselectされた場合選択されていないボタンを薄くする。
    for (let i = 0; i < btn_main.length; i++) {
      if (select_index.includes(i)) {
        btn_main[i].classList.remove('transparecy');
      } else {
        btn_main[i].classList.add('transparecy');
      }
    }
  } else if (select_list.length == 1) { // 1つselectされた場合、選択ボタンをすべて表示する。
    for (let i = 0; i < btn_main.length; i++) {
      btn_main[i].classList.remove('transparecy');
    }
  }

  //Result領域をリセット
  resetResult();

  //Result領域のアップデート
  for (let j = 0; j < effect_table[0].length; j++) { // タイプを探索する。
    //ダメージ計算
    var damage = 1;
    for (let i = 0; i < select_list.length; i++) { // 選択されているタイプ分ダメージを走査し掛け算
      damage *= effect_table[j][select_index[i]];
    }

    if (damage == 4) {
      result_boxes[0].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else if (damage == 2) {
      result_boxes[1].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else if (damage == 1) {
      result_boxes[2].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else if (damage == 1 / 2) {
      result_boxes[3].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else if (damage == 1 / 4) {
      result_boxes[4].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else if (damage == 0) {
      result_boxes[5].insertAdjacentHTML('beforeend', `<div class="button ${type_list[j]}">${type_list[j]}<img src="image/${type_list[j]}.png"></div>`);
    } else {
      alert("Something wrong. Undefined damage data.");
    }
  }
}

//名前検索機能
function search_pokemon(inputDOM) {
  inputDOM.addEventListener("input", function () {
    var disp_pokemon_list = document.getElementById("pokemon_list"); // 検索結果を出す領域
    var name = input_form.value; //Inputフォーム

    //文字が入力されたらリセットする。
    resetMain();
    resetResult();

    // Inputフォームに一致するポケモンの名前リストを作る
    var match_name_list = pokemon_name_list.filter(function (item) {
      return item.toLowerCase().includes(name.toLowerCase());
    });


    // 結果表示を初期化
    disp_pokemon_list.innerHTML = "";

    //ポケモン選択ボタンを複数作成
    if (match_name_list.length != pokemon_name_list.length) {
      match_name_list.forEach(function (pokemon_name) {
        var pokemon_index = pokemon_name_list.indexOf(pokemon_name);
        var pokemon_type1 = pokemon_table[pokemon_index][pokemon_table_type1]
        var pokemon_type2 = pokemon_table[pokemon_index][pokemon_table_type2]

        disp_pokemon_list.insertAdjacentHTML('beforeend', `<div class="button">${pokemon_name}/${pokemon_type1}/${pokemon_type2}<br></div>`);

      });
    }

    //作成したポケモン選択ボタンにアクションを追加
    //ポケモン選択ボタンのリストを取得。
    var btn_pokemon = document.getElementById('search').getElementsByClassName('button');

    for (let i = 0; i < btn_pokemon.length; i++) {
      btn_pokemon[i].addEventListener("click", function () {
        //　選択ボタン、結果ボタンを初期化
        resetMain();
        resetResult();

        //ポケモン選択ボタンを取得
        var btns_pokemon_select = Array.from(document.getElementById('search').getElementsByClassName('button'));

        btns_pokemon_select.forEach(function (btn_pokemon_select) {
          btn_pokemon_select.classList.remove('select');
        });

        //選択されたボタンにselectクラスをaddする
        this.classList.add('select');

        //選択されたボタンの情報を取得
        var pokemon_info = this.textContent.trim().split('/');
        console.log(pokemon_info);
        var pokemon_name = pokemon_info[0];
        var pokemon_type1 = pokemon_info[1];
        var pokemon_type2 = pokemon_info[2];

        //type_listからIndex番号を取得
        var pokemon_type1_index = type_list.indexOf(pokemon_type1);
        var pokemon_type2_index = type_list.indexOf(pokemon_type2);

        //type listのIndex番号から選択ボタンをselect
        btn_main[pokemon_type1_index].classList.toggle('select');
        if (pokemon_type2_index > 0) {
          btn_main[pokemon_type2_index].classList.toggle('select');
        }

        //選択されているボタンから結果をアップデートする
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
  });
}

