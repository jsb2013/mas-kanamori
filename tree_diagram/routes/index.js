
/*
 * GET home page.
 */

// 払込取扱票の処理を行う
exports.index = function (req, res) {
  //テストデータ。
  var data =  [123200,123100,123000,122000,
               121000,120000,112110,112100,
               112000,111000,110000,100000];

/*  var data_ko = [0,0,2,0,
                 0,3,0,0,
                 1,0,2,2];

  var data_reef = [1,1,2,1,
                   1,4,1,0,
                   0,1,2,0];
*/
  var reef_flag = [1,1,0,1,
                   1,0,1,0,
                   0,1,0,0];

  // GETリクエストに対する処理
  res.render('tree_diagram', {
    page: { data: data,
            //data_ko: data_ko,
            //data_reef: data_reef,
            reef_flag: reef_flag
          }
  });
};

