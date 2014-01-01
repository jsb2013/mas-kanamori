
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


// 払込取扱票の処理を行う
exports.haraikomi = function (req, res) {
  var kouzaNo1 = ['55555'];
  var kouzaNo2 = ['1'];
  var kouzaNo3 = ['7777777'];
  var kingaku = ['88888888'];
  var ryoukin = ['333'];
  var tokyusyu = ['特殊'];
  var kanyusyaMei = ['長伝寺','長伝寺','長伝寺'];
  var tusinRan = ['通信欄です。','　','通信欄だって！'];
  var y = 30;
  var goiraiMei = ['金森 雅人','山下 修史','宮本 武蔵'];



  // GETリクエストに対する処理
  res.render('haraikomi', {
    page: { kouzaNo1: kouzaNo1,
            kouzaNo2: kouzaNo2,
            kouzaNo3: kouzaNo3,
            kingaku: kingaku,
            ryoukin: ryoukin,
            tokyusyu: tokyusyu,
            kanyusyaMei: kanyusyaMei,
            tusinRan: tusinRan,
            goiraiMei: goiraiMei
          }
  });
};

