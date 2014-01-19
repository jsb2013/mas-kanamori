
/*
 * GET home page.
 */

// 払込取扱票の処理を行う
exports.index = function (req, res) {
  //テストデータ。
  var data = [100000,120000,110000,123000,122000,121000,112000,111000,
              123200,123100,112100,112110];

  // GETリクエストに対する処理
  res.render('tree_diagram', {
    page: { data: data
          }
  });
};

