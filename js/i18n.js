function update_captions(){
  if(window.innerWidth < 520){
    captions = ["admit", "PMP",
      "enroll", "lecture",
      "assign",
      "exam",
      "exco", "final",
      "group", "UROP", "exchange",
      "intern",
      "apply", "offer", "graduate"];
    captions_rel = ["<span style='font-size:9px;'>Relationship</span>",
      "<span style='font-size:11px;'>Break-up</span>"];
  }
  else{
    captions = ["admit", "PMP",
      "enroll", "lecture",
      "assign",
      "exam",
      "exco", "final",
      "group", "UROP", "exchange",
      "intern",
      "apply", "offer", "graduate"];
    captions_rel = ["<span style='font-size:9px;'>Relationship</span>",
      "<span style='font-size:11px;'>Break-up</span>"];
  }
}

var span_en;

function create_switch_en(){
  console.log("create_switch_en");
  span_en = document.createElement('div');
  span_en.style.position = "absolute";
  span_en.style.top = "0";
  if(window.innerWidth < 520)
    span_en.style.fontSize = "10px";
  else
    span_en.style.fontSize = "small";
  span_en.style.backgroundColor = "#8f7a66";
  span_en.style.borderRadius = "0 0 3px 3px";
  span_en.style.padding = "3px 10px";
  span_en.style.color = "white";
  span_en.style.cursor = "pointer";
  span_en.onclick = play_in_english;
  span_en.textContent = "English";
  var container = document.querySelector('.container');
  container.insertBefore(span_en, container.firstChild);
}

var span_zh;

function create_switch_zh(){
  console.log("create_switch_zh");
  span_zh = document.createElement('div');
  span_zh.style.position = "absolute";
  span_zh.style.top = "0";
  if(window.innerWidth < 520)
    span_zh.style.fontSize = "10px";
  else
    span_zh.style.fontSize = "small";
  span_zh.style.backgroundColor = "#8f7a66";
  span_zh.style.borderRadius = "0 0 3px 3px";
  span_zh.style.padding = "3px 10px";
  span_zh.style.color = "white";
  span_zh.style.cursor = "pointer";
  span_zh.onclick = play_in_chinese;
  span_zh.textContent = "简体";
  var container = document.querySelector('.container');
  container.insertBefore(span_zh, container.firstChild);
}

function create_switch_traditional(){
  console.log("create_switch_traditional");
  span_Hans = document.createElement('div');
  span_Hans.style.position = "absolute";
  span_Hans.style.top = "0";
  if(window.innerWidth < 520)
    span_Hans.style.fontSize = "10px";
  else
    span_Hans.style.fontSize = "small";
  span_Hans.style.backgroundColor = "#8f7a66";
  span_Hans.style.borderRadius = "0 0 3px 3px";
  span_Hans.style.padding = "3px 10px";
  span_Hans.style.color = "white";
  span_Hans.style.cursor = "pointer";
  span_Hans.onclick = play_in_traditional;
  span_Hans.textContent = "繁體";
  var container = document.querySelector('.container');
  container.insertBefore(span_Hans, container.firstChild);
}

function play_in_english(){
  console.log("play_in_english");
  update_captions();
  window.addEventListener('resize', update_captions, true);

  caption_garbage = "<span style='font-size:9px;'>bad-grade</span>";
  window.game.actuate();

  game_title = "First Honor";
  game_alt_title = "Research";
  result_msg = "You got a ";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Research") titleElem.textContent = game_title;
  document.querySelector('.restart-button').textContent = "quitU";
  document.querySelector('.retry-button').textContent = "Try again";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>How to play:</strong> Use your <strong>arrow keys</strong> to move the bricks. When two bricks of the same type touch, they <strong>merge into one!</strong><br>However, your efforts may not always work &mdash; you may get a <strong>bad grade</strong>, which is resistant to moves. Two bad grade bricks vanish when they touch. You will stop producing bad grade after finishing a <strong>final</strong> (except for one more piece to help you eliminate any existing bad grade).<br>A <strong>new relationship</strong> upgrades any brick it touches for the first time. The brick shows the number of times you have benefited from it. When the 10-sec research ends, it will become a <strong>break-up</strong> (or bad grade if you didn't use it), which downgrades bricks until you have repaid the benefits.";

  if(span_en) span_en.parentNode.removeChild(span_en);
  create_switch_zh();
  window.game.storageManager.storage.setItem('lang', 'en');
}

var zh_var = null;

function determine_zh_var(){
  if(zh_var) return zh_var;
  var hant_locales = ['zh-hant', 'zh-tw', 'zh-hk', 'zh-mo'];
  var nav_langs = navigator.languages;
  var hant_fallback = false;
  if(nav_langs){
    for(var i=0; i<nav_langs.length; i++){
      var nav_lang = nav_langs[i].toLowerCase();
      if(nav_lang.startsWith('zh-')){
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
        break;
      }
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  else{
    var nav_lang = navigator.language || navigator.userLanguage;
    if(nav_lang){
      nav_lang = nav_lang.toLowerCase();
      if(nav_lang.startsWith('zh-'))
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  if(!zh_var) zh_var = hant_fallback ? "hant" : "hans";
  return zh_var;
}

function use_simplified(){
  captions = ["录取", "PMP",
    "选课", "走堂", "assign", "考试",
    "上庄", "结sem", "组家长", "UROP", "交换",
    "实习", "申请", "offer", "毕业"];
  captions_rel = ["出pool", "回pool"];
  caption_garbage = "烂龟";
  game_alt_title = "学习";
  window.game.actuate();

  document.querySelector('.restart-button').textContent = "quitU";
  document.querySelector('.retry-button').textContent = "善";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>玩法:</strong> 使用方向键搬砖. 当两块相同的砖碰在一起时, <strong>它们会组成一块更好的砖</strong>! <br>但是, 你的努力也可能只是变成<strong>烂龟</strong>. 烂龟会阻碍砖块的移动, 直到被别的烂龟击中而消失. 你 <strong>结sem</strong> 以后便不会再产生烂龟, 最多再来一块帮你清除别的D级.<br><strong>出pool</strong>砖触碰任何砖都能使其升级, 但一块砖只可享受一次. 砖上会显示你使用它的次数; 10 秒后它会变成<strong>回pool</strong>砖, 触碰任何砖都能使其降级, 以此来偿还之前使用的次数.";
}

function use_traditional(){
  captions = ["錄取", "PMP",
    "選課", "走堂", "assign", "考試",
    "上莊", "結sem", "組家長", "UROP", "交換",
    "實習", "申請", "offer", "畢業"];
  captions_rel = ["出pool", "回pool"];
  caption_garbage = "爛龜";
  game_alt_title = "學習";
  window.game.actuate();

  document.querySelector('.restart-button').textContent = "quitU";
  document.querySelector('.retry-button').textContent = "善";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>玩法：</strong>用方向鍵搬磚。當兩塊相同的磚碰在一起時，<strong>它們會併成一塊更好的磚</strong>！<br>但是，你的想法和實驗可能只是產生<strong>爛龜</strong>而已。黏在地上的垃圾會阻礙磚塊移動，直到被別的爛龜擊中而消失。你<strong>結sem</strong> 以後便不會再產生爛龜，最多再出一塊幫你清除場上剩下的爛龜。<br><strong>出pool</strong>磚觸碰任何磚都能使其升級，但一塊磚只得升級一次。出pool磚上會顯示你用它的次數。10 秒後它會變成<strong>回pool</strong>磚，觸碰任何磚都能使其降級，以此來償還之前使用的次數。";

  document.body.style.fontFamily = '"Clear Sans", "Helvetica Neue", Arial, "Hiragino Sans CNS", "PingFang TC", "Microsoft JhengHei", "Source Han Sans TC", "Noto Sans CJK TC", sans-serif';
}


function play_in_chinese(){
  console.log("play_in_chinese");
  window.removeEventListener('resize', update_captions, true);
  game_title = "First Honor";
  result_msg = "你得到了";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;

  //if(determine_zh_var() == 'hant') use_traditional();
  //else use_simplified();
  use_simplified();

  if(span_zh) span_zh.parentNode.removeChild(span_zh);
  create_switch_traditional();
  window.game.storageManager.storage.setItem('lang', 'zh');
}

function play_in_traditional(){
  console.log("play_in_traditional");
  window.removeEventListener('resize', update_captions, true);
  game_title = "First Honor";
  result_msg = "你得到了";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;

  use_traditional();

  if(span_Hans) span_Hans.parentNode.removeChild(span_Hans);
  create_switch_en();
  window.game.storageManager.storage.setItem('lang', 'Hans');
}