$(function() {
    // グリッドのコンテナとアイコンの要素を取得
    var $container = $(".grid-container");
    var $icons = $(".icon");

    // グリッドの幅と高さを取得
    var gridWidth = $container.width();
    var gridHeight = $container.height();

    // アイコンの数とページ数を計算
    var iconCount = $icons.length;
    var pageCount = Math.ceil(iconCount / (4 * 6));

    // グリッドのコンテナの幅をページ数に合わせて拡張
    $container.width(gridWidth * pageCount);

    // 現在のページ番号を保持する変数
    var currentPage = 1;

    // スワイプの開始位置と終了位置を保持する変数
    var startX = 0;
    var endX = 0;

    // グリッドのコンテナにタッチイベントのリスナーを登録
    $container.on("touchstart", function(e) {
        // タッチの開始位置を取得
        startX = e.originalEvent.touches[0].pageX;
    });

    $container.on("touchmove", function(e) {
        // タッチの移動位置を取得
        endX = e.originalEvent.touches[0].pageX;
    });

    $container.on("touchend", function(e) {
        // スワイプの距離を計算
        var swipeDistance = endX - startX;

        // スワイプの方向に応じてページ番号を更新
        if (swipeDistance < -100 && currentPage < pageCount) {
            // 右から左へスワイプ（次のページへ）
            currentPage++;
        } else if (swipeDistance > 100 && currentPage > 1) {
            // 左から右へスワイプ（前のページへ）
            currentPage--;
        }

        // グリッドのコンテナの位置をページ番号に合わせて移動
        $container.css("transform", "translateX(" + (-gridWidth * (currentPage - 1)) + "px)");
    });

    // アイコンにタッチイベントのリスナーを登録
    $icons.on("touchstart", function(e) {
        // アイコンのインデックスを取得
        var index = $(this).index();

        // アイコンに対応する音声ファイルの名前を生成
        var audioName = (index + 1) + ".mp3";

        // 音声ファイルを再生するオブジェクトを作成
        var audio = new Audio(audioName);

        // 音声ファイルを再生
        audio.play();
    });
});
