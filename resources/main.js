/* JavaScript for the Fluent skin */

// Show and hide elements

// Select the search box when clicking on the search icon
document.getElementById('p-search').getElementsByTagName('h3')[0].onclick = function(){
     document.getElementById("searchInput").focus();
}

// Toggle the search bar when clicking on the search icon
var searchIcon = document.getElementById("search-icon");
if (searchIcon) {
	var searchBox = document.getElementById("search-box");
	searchIcon.addEventListener("click", function() {
		searchBox.classList.toggle("fade-search");
	});
};

// Toggle the dropdown menu when clicking on the user icon
var userIcon = document.getElementById("user-icon");
if (userIcon) {
	var userMenu = document.getElementById("mw-user-links");
	userIcon.addEventListener("click", function() {
		userMenu.classList.toggle("fade-menu");
	});
};

// Toggle the dropdown menu when clicking on the namespaces label
var namespacesLabel = document.getElementById("p-namespaces-label");
if (namespacesLabel) {
	var namespacesMenu = document.getElementById("menu-namespaces");
	namespacesLabel.addEventListener("click", function() {
		namespacesMenu.classList.toggle("fade-menu");
	});
};

// Toggle the dropdown menu when clicking on the views label
var viewsLabel = document.getElementById("p-views-label");
if (viewsLabel) {
	var viewsMenu = document.getElementById("menu-views");
	viewsLabel.addEventListener("click", function() {
		viewsMenu.classList.toggle("fade-menu");
	});
};

// Toggle the dropdown menu when clicking on the actions label
var actionsLabel = document.getElementById("p-actions-label");
if (actionsLabel) {
	var actionsMenu = document.getElementById("menu-actions");
	actionsLabel.addEventListener("click", function() {
		actionsMenu.classList.toggle("fade-menu");
	});
};

// Hide any of the above if they're not selected
window.onclick = function(event) {
	if (searchIcon) {
	    if (!(event.target.closest('#search-box') || event.target.closest('#search-icon') || event.target.closest('.suggestions')) && searchBox.classList.contains("fade-search")) {
		searchBox.classList.toggle("fade-search");
	    }
	}
	if (userIcon) {
	    if (!(event.target.closest('#mw-user-links') || event.target.closest('#user-icon')) && userMenu.classList.contains("fade-menu")) {
		userMenu.classList.toggle("fade-menu");
	    }
	}
	if (namespacesLabel) {
	    if (!(event.target.closest('#menu-namespaces') || event.target.closest('#p-namespaces-label')) && namespacesMenu.classList.contains("fade-menu")) {
		namespacesMenu.classList.toggle("fade-menu");
	    }
	}
	if (viewsLabel) {
	    if (!(event.target.closest('#menu-views') || event.target.closest('#p-views-label')) && viewsMenu.classList.contains("fade-menu")) {
		viewsMenu.classList.toggle("fade-menu");
	    }
	}
	if (actionsLabel) {
	    if (!(event.target.closest('#menu-actions') || event.target.closest('#p-actions-label')) && actionsMenu.classList.contains("fade-menu")) {
		actionsMenu.classList.toggle("fade-menu");
	    }
	}
}

// Toggle the sidebar on mobile when clicking on the actions label
var expandCollapseButton = document.getElementById("expand-collapse");
if (expandCollapseButton) {
	var siteWrapper = document.getElementById("mw-wrapper");
	expandCollapseButton.addEventListener("click", function() {
		siteWrapper.classList.toggle("expanded-sidebar");
	});
};


// User Add
mw.hook('ve.activationComplete').add(function() {
  $('.ve-ui-surface').css({
    'max-height': 'none',
    'overflow-y': 'auto'
  });
  $('.ve-ui-surface-placeholder').css({
    'height': 'auto',
    'min-height': '100vh'
  });
});

// Source editor focus handling
(function() {
  // URLのクエリパラメータからaction=editを検知
  function isEditMode() {
    return window.location.search.indexOf('action=edit') !== -1;
  }

  // 編集モード時の処理
  function handleEditMode() {
    setTimeout(() => {
      // 編集中のタイトル要素を取得
      const titleArea = document.querySelector('h1.firstHeading');
      // メインコンテンツ領域を取得
      const contentArea = document.getElementById('mw-content-text');

      if (titleArea && contentArea) {
        // スムーズにスクロール
        titleArea.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // コンテンツ領域をフォーカス可能に
        contentArea.tabIndex = -1;
        // コンテンツ領域にフォーカス
        contentArea.focus();

        // フォーカス時のアウトラインを制御
        contentArea.style.outline = 'none';

        // キーボードイベントのハンドリングを追加
        contentArea.addEventListener('keydown', function(e) {
          // PageDown, ↓, スペース等のキー入力を許可
          if (e.key === 'PageDown' ||
              e.key === 'ArrowDown' ||
              e.key === ' ' ||
              e.key === 'PageUp' ||
              e.key === 'ArrowUp') {
            // デフォルトのスクロール動作を許可
            return true;
          }
        });
      }
    }, 100);
  }

  // DOMContentLoaded時に実行
  document.addEventListener('DOMContentLoaded', function() {
    if (isEditMode()) {
      handleEditMode();
    }
  });

  // 編集ボタンクリック時のイベントハンドラ
  document.addEventListener('click', function(e) {
    const editButton = e.target.closest('[href*="action=edit"]');
    if (editButton) {
      localStorage.setItem('shouldScrollEditor', 'true');
    }
  });

  // ページロード時にフラグをチェック
  if (localStorage.getItem('shouldScrollEditor') === 'true' && isEditMode()) {
    handleEditMode();
    localStorage.removeItem('shouldScrollEditor');
  }
})();

// コンテンツエリアへのフォーカス制御
(function() {
  function setMainContentFocus() {
    const mainContent = document.getElementById('mw-main-content');
    if (!mainContent) return;

    mainContent.tabIndex = -1;
    mainContent.style.outline = 'none';
    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    mainContent.focus();
  }

  document.addEventListener('DOMContentLoaded', setMainContentFocus);
  mw.hook('wikipage.content').add(setMainContentFocus);
})();

// MWDN画像の自動切り替え (ライトモード / ダークモード)
$(document).ready(function() {
    function updateImageDisplay() {
        const body = document.body;
        const html = document.documentElement;
        let isDarkMode = false;

        // 手動テーマ設定を確認
        if (body.classList.contains('theme-dark') || html.classList.contains('theme-dark')) {
            isDarkMode = true;
        } else if (body.classList.contains('theme-light') || html.classList.contains('theme-light')) {
            isDarkMode = false;
        } else if (body.classList.contains('theme-auto') || html.classList.contains('theme-auto')) {
            // 自動モードの場合はOSの設定を使用
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            // クラスが設定されていない場合もOSの設定を使用
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        // 画像の表示切り替え
        if (isDarkMode) {
            $('div.dark-mode-image').css('display', 'block');
            $('div.light-mode-image').css('display', 'none');
        } else {
            $('div.dark-mode-image').css('display', 'none');
            $('div.light-mode-image').css('display', 'block');
        }
    }

    // 初回実行
    updateImageDisplay();

    // OSのカラースキーム変更を監視(自動モード用)
    window.matchMedia('(prefers-color-scheme: dark)').addListener(updateImageDisplay);

    // テーマ変更イベントをリッスン
    $(document).on('themeChanged', updateImageDisplay);
});

// ============================================
// テーマ切り替え機能
// ============================================
(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'fluent-theme-preference';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    const THEME_AUTO = 'auto';

    // テーマを適用する関数
    function applyTheme(theme) {
        const body = document.body;
        const html = document.documentElement;

        // 既存のテーマクラスを削除
        body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
        html.classList.remove('theme-light', 'theme-dark', 'theme-auto');

        if (theme === THEME_AUTO) {
            // 自動モード: OSの設定を使用
            body.classList.add('theme-auto');
            html.classList.add('theme-auto');
        } else {
            // 手動モード: 指定されたテーマを使用
            body.classList.add('theme-' + theme);
            html.classList.add('theme-' + theme);
        }

        // テーマトグルボタンのdata-theme属性を更新
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.setAttribute('data-theme', theme);
        }

        // テーマ変更イベントを発火(画像切り替え用)
        if (typeof jQuery !== 'undefined') {
            jQuery(document).trigger('themeChanged');
        }

        // localStorageに保存
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
            // localStorageが使えない環境への対応
            console.warn('Could not save theme preference to localStorage', e);
        }
    }

    // 現在のテーマを取得
    function getCurrentTheme() {
        // localStorageから取得
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && [THEME_LIGHT, THEME_DARK, THEME_AUTO].includes(savedTheme)) {
                return savedTheme;
            }
        } catch (e) {
            // localStorageが使えない環境への対応
        }

        // デフォルトはauto
        return THEME_AUTO;
    }

    // テーマトグルボタンのクリックイベント
    function setupThemeToggle() {
        const toggleButton = document.getElementById('theme-toggle');
        if (!toggleButton) return;

        toggleButton.addEventListener('click', function() {
            const currentTheme = getCurrentTheme();
            let nextTheme;

            // テーマを順番に切り替え: light → dark → auto → light
            if (currentTheme === THEME_LIGHT) {
                nextTheme = THEME_DARK;
            } else if (currentTheme === THEME_DARK) {
                nextTheme = THEME_AUTO;
            } else {
                nextTheme = THEME_LIGHT;
            }

            applyTheme(nextTheme);
        });
    }

    // ページロード時にテーマを適用
    function initTheme() {
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);
    }

    // 初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            setupThemeToggle();
        });
    } else {
        initTheme();
        setupThemeToggle();
    }
})();

// ============================================
// アンカーリンクと履歴管理の改善
// ブラウザの戻る/進むボタンでのスムーズスクロールに対応
// ============================================
(function() {
    'use strict';

    const STORAGE_KEY = 'fluent-page-base-url';
    let lastHash = window.location.hash;
    let currentBaseUrl = window.location.href.split('#')[0];

    /**
     * 初期化処理
     */
    function init() {
        // 現在のベースURLを保存
        currentBaseUrl = window.location.href.split('#')[0];

        // ページロード時にハッシュがある場合、localStorageに保存
        if (window.location.hash) {
            try {
                localStorage.setItem(STORAGE_KEY, currentBaseUrl);
            } catch (e) {
                // localStorageが使えない環境への対応
            }
        }

        lastHash = window.location.hash;
    }

    /**
     * アンカーリンククリックの処理
     * localStorageにベースURLを保存して、戻る/進むボタンでの動作をサポート
     */
    function handleAnchorClick(e) {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');

        // ページ内アンカー(#で始まる)の場合
        if (href && href.startsWith('#')) {
            // 現在のベースURLをlocalStorageに保存
            currentBaseUrl = window.location.href.split('#')[0];

            try {
                localStorage.setItem(STORAGE_KEY, currentBaseUrl);
            } catch (e) {
                // localStorageが使えない環境への対応
            }
        }

        // MediaWikiのデフォルト動作を許可(ハッシュによる遷移)
        // preventDefault()は呼ばない
    }

    /**
     * ハッシュ変更の監視
     * 主にlocalStorageの管理とページトップへのスクロール処理
     */
    function handleHashChange(e) {
        const newHash = window.location.hash;

        // ハッシュが追加された場合
        if (!lastHash && newHash) {
            // ベースURLを保存
            try {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    localStorage.setItem(STORAGE_KEY, currentBaseUrl);
                }
            } catch (e) {
                // localStorageが使えない環境への対応
            }
        }

        // ハッシュが削除された場合(戻るボタンでの遷移)
        if (lastHash && !newHash) {
            // localStorageをクリア
            try {
                localStorage.removeItem(STORAGE_KEY);
            } catch (e) {
                // localStorageが使えない環境への対応
            }
        }

        lastHash = newHash;
    }

    /**
     * popstateイベントの処理
     * ブラウザの戻る/進むボタンでのスムーズスクロールに対応
     */
    function handlePopState(e) {
        // ステートからハッシュ情報を取得
        const stateHash = e.state ? e.state.hash : null;
        const currentHash = window.location.hash;

        // 使用するハッシュを決定（ステートにあればそれを使用、なければcurrentHashを使用）
        const targetHash = stateHash || currentHash;

        // 少し遅延させてブラウザのデフォルトスクロールの後に実行
        setTimeout(() => {
            // ハッシュがない場合（ページトップに戻る）
            if (!targetHash) {
                if (localStorage.getItem(STORAGE_KEY)) {
                    try {
                        localStorage.removeItem(STORAGE_KEY);
                    } catch (e) {
                        // localStorageが使えない環境への対応
                    }
                }
                scrollToTop();
            }
            // ハッシュがある場合（セクションに移動）
            else {
                const targetId = targetHash.startsWith('#') ? targetHash.substring(1) : targetHash;
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // スマートアンカースクロール機能の関数を呼び出し
                    if (window.smartScrollToElement) {
                        window.smartScrollToElement(targetElement);
                    } else {
                        // フォールバック: 通常のスムーズスクロール
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        }, 10);
    }

    /**
     * ページトップへのスムーズスクロール
     */
    function scrollToTop() {
        const scrollContainer = document.getElementById('mw-main-content') ||
                               document.querySelector('.mw-body-content') ||
                               document.documentElement;

        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // 念のため、body/htmlもスクロール
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // イベントリスナー登録
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    // 初期化実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ============================================
// スマートアンカースクロール機能
// 目次から最下部のセクションへ移動する際、自然な表示位置にスクロール
// ============================================
(function() {
    'use strict';

    /**
     * 要素を自然な位置にスクロールさせる
     * 要素が画面下部にある場合は、無理に最上部に持ってこようとせず、
     * 見える範囲内に自然に表示する
     */
    function smartScrollToElement(targetElement) {
        if (!targetElement) return;

        // スクロール可能なコンテナを取得(MediaWikiのメインコンテンツエリア)
        const scrollContainer = document.getElementById('mw-main-content') ||
                               document.querySelector('.mw-body-content') ||
                               document.documentElement;

        /**
         * スクロールコンテナ内での要素の相対位置を計算
         */
        function getOffsetTopRelativeToContainer(element, container) {
            let offsetTop = 0;
            let currentElement = element;

            // コンテナに到達するまで、各親要素のoffsetTopを累積
            while (currentElement && currentElement !== container) {
                offsetTop += currentElement.offsetTop;
                currentElement = currentElement.offsetParent;

                // offsetParentがnullになった場合、またはcontainerを超えた場合は終了
                if (!currentElement || !container.contains(currentElement)) {
                    break;
                }
            }

            return offsetTop;
        }

        // 対象要素のコンテナ内での位置を取得
        const targetOffsetTop = getOffsetTopRelativeToContainer(targetElement, scrollContainer);

        // コンテナの情報を取得
        const containerHeight = scrollContainer.clientHeight;
        const scrollHeight = scrollContainer.scrollHeight;

        // 対象要素の高さを取得
        const targetHeight = targetElement.offsetHeight;

        // 対象要素がページ下部にあるかチェック
        const distanceFromBottom = scrollHeight - (targetOffsetTop + targetHeight);

        // 余白を考慮したスクロール位置を計算
        // より多くの上方向コンテンツが見えるように余白を大きく設定
        const topPadding = 50; // 上部の余白(ピクセル)

        // ケース1: 対象要素がコンテナの高さより下部にある場合
        // → 自然な位置までスクロール(下部に余白が残る)
        if (distanceFromBottom < containerHeight * 0.3) {
            // ページ下部のセクションの場合は、できるだけ下までスクロール
            const maxScrollTop = scrollHeight - containerHeight;
            const desiredScrollTop = Math.min(
                targetOffsetTop - topPadding,
                maxScrollTop
            );

            scrollContainer.scrollTo({
                top: desiredScrollTop,
                behavior: 'smooth'
            });
        }
        // ケース2: 通常のスクロール
        // → 対象要素を画面の上部に配置
        else {
            scrollContainer.scrollTo({
                top: targetOffsetTop - topPadding,
                behavior: 'smooth'
            });
        }
    }

    /**
     * アンカーリンククリックを処理
     */
    function handleAnchorClick(event) {
        const link = event.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // ページ内アンカー(#で始まる)の場合のみ処理
        if (!href || !href.startsWith('#')) return;

        // 目次リンクかどうかをチェック
        const isTocLink = link.closest('#toc') ||
                         link.closest('.toc') ||
                         link.classList.contains('tocnumber') ||
                         link.classList.contains('toctext');

        // 目次リンク以外は通常の動作
        if (!isTocLink) return;

        // 対象要素を取得
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        // デフォルトのスクロール動作をキャンセル
        event.preventDefault();

        // スマートスクロールを実行
        smartScrollToElement(targetElement);

        // URLのハッシュを更新(履歴に追加)
        // ステートにハッシュ情報を保存することで、戻る/進むボタンで復元できるようにする
        if (history.pushState) {
            history.pushState({ hash: href }, '', href);
        } else {
            window.location.hash = href;
        }
    }

    /**
     * ページロード時のハッシュ処理
     */
    function handleInitialHash() {
        if (!window.location.hash) return;

        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // 少し遅延させてから実行(ページレイアウトが確定してから)
            setTimeout(() => {
                smartScrollToElement(targetElement);
            }, 100);
        }
    }

    // smartScrollToElement関数をグローバルにエクスポート
    // アンカーリンクと履歴管理の改善機能から呼び出せるようにする
    window.smartScrollToElement = smartScrollToElement;

    // イベントリスナーを登録
    document.addEventListener('click', handleAnchorClick, true);

    // DOMContentLoaded時に初期ハッシュを処理
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleInitialHash);
    } else {
        handleInitialHash();
    }

    // ページ読み込み完了後にも再度実行(MathMLの読み込みが遅い場合に対応)
    window.addEventListener('load', () => {
        if (window.location.hash) {
            setTimeout(handleInitialHash, 200);
        }
    });
})();
