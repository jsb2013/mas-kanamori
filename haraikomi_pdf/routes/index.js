
/*
 * GET home page.
 */

// 払込取扱票の処理を行う
exports.index = function (req, res) {
  //テストデータ。本番は配列を渡せばOK。印刷数はgoiraiMeiの配列数に依存(キー)。
  var daimei = '平成25年度護持会費納入のお知らせ';
  var souhujo = '謹啓　新緑の候長伝寺檀家の皆様方には、長伝寺護持の為、日頃より御協力頂きまして誠にありがとうございます。さて、平成２５年度「護持会費・祠堂経料（御住職への手当）」の納入のお願いをお知らせいたします。';
  var kouzaNo1 = ['55555','55555','55555'];
  var kouzaNo2 = ['1','1','1'];
  var kouzaNo3 = ['7777777','7777777','7777777'];
  var kingaku = ['1000'];
  var ryoukin = ['333','333','333'];
  var tokyusyu = ['特殊','特殊','特殊'];
  var kanyusyaMei = ['長伝寺','長伝寺','長伝寺'];
  var tusinRan = ['通信欄ですあああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ。'];
  var goiraiYubin = ['140-0014','xxx-xxxx','228-0026']
  var goiraiJusyo1 = ['東京都品川区大井4-5-1','東京都xxx-xxxx-xx','神奈川県座間市xxx-xxx-x']
  var goiraiJusyo2 = ['品川サウスヒルズ３０１号','','']
  var goiraiMei = ['金森 雅人','山下 修史','宮本 武蔵'];
  var goiraiTel = ['090-4xxx-xxxx','03-37xx-xxxx','046-xxx-xxxx'];

  // GETリクエストに対する処理
  res.render('haraikomi', {
    page: { daimei: daimei,
            souhujo: souhujo,            
            kouzaNo1: kouzaNo1,
            kouzaNo2: kouzaNo2,
            kouzaNo3: kouzaNo3,
            kingaku: kingaku,
            ryoukin: ryoukin,
            tokyusyu: tokyusyu,
            kanyusyaMei: kanyusyaMei,
            tusinRan: tusinRan,
            goiraiYubin:goiraiYubin,
            goiraiJusyo1:goiraiJusyo1,
            goiraiJusyo2:goiraiJusyo2,
            goiraiMei: goiraiMei,
            goiraiTel: goiraiTel
          }
  });
};

