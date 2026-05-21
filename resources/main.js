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

// Toggle header dropdown menus when clicking on their labels
var headerDropdowns = document.querySelectorAll('.header-dropdown');
headerDropdowns.forEach(function(dropdown) {
	var label = dropdown.querySelector('h3');
	var menu = dropdown.querySelector('.header-dropdown-body');
	if (label && menu) {
		label.addEventListener('click', function(event) {
			event.stopPropagation();
			// Close other open dropdowns first
			headerDropdowns.forEach(function(otherDropdown) {
				var otherMenu = otherDropdown.querySelector('.header-dropdown-body');
				if (otherMenu && otherMenu !== menu && otherMenu.classList.contains('fade-menu')) {
					otherMenu.classList.remove('fade-menu');
				}
			});
			menu.classList.toggle('fade-menu');
		});
	}
});

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
	// Close header dropdowns when clicking outside
	headerDropdowns.forEach(function(dropdown) {
		var menu = dropdown.querySelector('.header-dropdown-body');
		if (menu && menu.classList.contains('fade-menu')) {
			if (!event.target.closest('.header-dropdown')) {
				menu.classList.remove('fade-menu');
			}
		}
	});
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
    return window.location.search.indexOf('action=edit') !== -1 ||
           window.location.search.indexOf('action=submit') !== -1;
  }

  // 編集ページでhtml要素のスタイルを調整
  function adjustEditPageLayout() {
    if (isEditMode()) {
      const htmlElement = document.documentElement;
      htmlElement.style.height = 'auto';
      htmlElement.style.minHeight = '100vh';
      htmlElement.style.overflow = 'visible';
    }
  }

  // 編集モード時の処理
  function handleEditMode() {
    // #editformへの自動スクロールが既にある場合は何もしない
    if (window.location.hash === '#editform') {
      return;
    }

    setTimeout(() => {
      // 編集中のタイトル要素を取得
      const titleArea = document.querySelector('h1.firstHeading');
      // メインコンテンツ領域を取得
      const contentArea = document.getElementById('mw-content-text');

      if (titleArea && contentArea) {
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
    adjustEditPageLayout();
    if (isEditMode()) {
      handleEditMode();
    }
  });

  // できるだけ早くレイアウトを調整
  adjustEditPageLayout();

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
    // 編集モードまたはアンカーリンクがある場合はスキップ
    if (window.location.search.indexOf('action=edit') !== -1 || window.location.hash) {
      return;
    }

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

// ============================================
// MWDN画像の自動切り替え(クラスベース)
// ============================================
// テーマクラス(body.theme-light / body.theme-dark)に基づいて
// ライトモード用とダークモード用の画像を自動的に切り替えます。
// ============================================
$(document).ready(function() {
    function updateImageDisplay() {
        const body = document.body;
        const html = document.documentElement;
        let isDarkMode = false;

        // テーマクラスを確認してモードを判定
        if (body.classList.contains('theme-dark') || html.classList.contains('theme-dark')) {
            isDarkMode = true;
        } else if (body.classList.contains('theme-light') || html.classList.contains('theme-light')) {
            isDarkMode = false;
        } else {
            // クラスが設定されていない場合はライトモードをデフォルトとする
            // (通常はテーマ切り替え機能で必ずクラスが設定されるため、このケースは稀)
            isDarkMode = false;
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

    // テーマ変更イベントをリッスン(テーマトグルボタンクリック時に発火)
    $(document).on('themeChanged', updateImageDisplay);
});

// ============================================
// テーマ切り替え機能(クラスベース)
// ============================================
// CSSのメディアクエリ(prefers-color-scheme)は使用せず、
// body.theme-light / body.theme-dark クラスで完全に制御します。
// これにより、ユーザーの選択を確実に保存・適用できます。
// ============================================
(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'fluent-theme-preference';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';

    // テーマを適用する関数
    // bodyとhtmlの両方にクラスを適用することで、すべてのスタイルに確実に反映
    function applyTheme(theme) {
        const body = document.body;
        const html = document.documentElement;

        // 既存のテーマクラスを削除
        body.classList.remove('theme-light', 'theme-dark');
        html.classList.remove('theme-light', 'theme-dark');

        // 指定されたテーマを適用
        body.classList.add('theme-' + theme);
        html.classList.add('theme-' + theme);

        // テーマトグルボタンのdata-theme属性を更新
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.setAttribute('data-theme', theme);
        }

        // テーマ変更イベントを発火(画像切り替え機能などが受信)
        $(document).trigger('themeChanged');
    }

    // 保存されたテーマ設定を読み込む
    function loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
                return savedTheme;
            }
            // 保存値がない場合はシステムのカラースキームを検出
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return THEME_DARK;
            }
        } catch (e) {
            console.error('テーマ設定の読み込みに失敗しました:', e);
        }
        // デフォルトはライトモード
        return THEME_LIGHT;
    }

    // テーマ設定を保存する
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
            console.error('テーマ設定の保存に失敗しました:', e);
        }
    }

    // テーマを切り替える
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.classList.contains('theme-dark') ? THEME_DARK : THEME_LIGHT;
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;

        applyTheme(newTheme);
        saveTheme(newTheme);
    }

    // 初期化
    function init() {
        // 保存されたテーマを適用
        const savedTheme = loadSavedTheme();
        applyTheme(savedTheme);

        // トグルボタンのイベントリスナーを設定
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
    }

    // DOMContentLoaded時に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
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
            // 編集フォーム関連のアンカーは処理しない
            const editFormAnchors = ['#editform', '#wpTextbox1', '#mw-editform'];
            if (editFormAnchors.includes(href)) {
                return;
            }

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

        // 編集フォーム関連のアンカーは通常の動作を使用
        const editFormAnchors = ['#editform', '#wpTextbox1', '#mw-editform'];
        if (editFormAnchors.includes(targetHash)) {
            // ブラウザのデフォルト動作に任せる
            return;
        }

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

        // 編集フォーム等の特定要素には標準スクロールを使用
        const specialElements = ['editform', 'wpTextbox1', 'mw-editform'];
        const elementId = targetElement.id || '';

        if (specialElements.includes(elementId) || targetElement.closest('#editform')) {
            // 編集フォーム等には標準のscrollIntoViewを使用
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            return;
        }

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

        // 編集フォーム関連のアンカーは通常の動作を使用
        const editFormAnchors = ['#editform', '#wpTextbox1', '#mw-editform'];
        if (editFormAnchors.includes(href)) {
            // ブラウザのデフォルト動作を許可
            return;
        }

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

        // 編集フォーム関連のアンカーは通常の動作を使用
        const editFormAnchors = ['#editform', '#wpTextbox1', '#mw-editform'];
        if (editFormAnchors.includes(window.location.hash)) {
            // ブラウザのデフォルト動作に任せる
            return;
        }

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

// ============================================
// 目次のドラッグ&ドロップ、リサイズ機能
// ============================================
(function() {
    'use strict';

    // ローカルストレージのキー
    const STORAGE_KEY_X = 'toc-position-x';
    const STORAGE_KEY_Y = 'toc-position-y';
    const STORAGE_KEY_WIDTH = 'toc-width';
    const STORAGE_KEY_HEIGHT = 'toc-height';
    const STORAGE_KEY_MINIMIZED = 'toc-minimized';

    let isDragging = false;
    let isResizing = false;
    let resizeDirection = null;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let resizeStartX = 0;
    let resizeStartY = 0;
    let resizeStartWidth = 0;
    let resizeStartHeight = 0;

    /**
     * 目次の高さを動的に調整
     * 目次の内容量に応じて最適な高さを設定
     */
    function adjustTocHeight(toc) {
        // 最小化されている場合は調整しない
        if (toc.classList.contains('toc-minimized')) {
            return;
        }

        // 目次のリスト部分を取得
        const tocList = toc.querySelector('ul');
        if (!tocList) return;

        // タイトル部分を取得
        const tocTitle = toc.querySelector('.toctitle');
        if (!tocTitle) return;

        // 一時的にheightをautoにして実際のコンテンツ高さを測定
        const originalHeight = toc.style.height;
        const originalMinHeight = toc.style.minHeight;
        const originalMaxHeight = toc.style.maxHeight;

        toc.style.height = 'auto';
        toc.style.minHeight = '0';
        toc.style.maxHeight = 'none';

        // 実際のコンテンツの高さを取得
        const titleHeight = tocTitle.offsetHeight;
        const listScrollHeight = tocList.scrollHeight;
        const padding = parseInt(window.getComputedStyle(toc).paddingTop) +
                       parseInt(window.getComputedStyle(toc).paddingBottom);
        const listPadding = parseInt(window.getComputedStyle(tocList).paddingTop) +
                           parseInt(window.getComputedStyle(tocList).paddingBottom);

        // 必要な高さを計算（タイトル + リストの内容 + パディング）
        const contentHeight = titleHeight + listScrollHeight + padding + listPadding + 20; // 余白20px

        // 画面の高さの50%を上限とする
        const maxHeight = window.innerHeight * 0.5;

        // 最小の高さを200pxとする
        const minHeightValue = Math.max(200, Math.min(contentHeight, maxHeight));

        // 初期高さを設定（保存された高さがない場合）
        const savedHeight = loadHeight();
        let initialHeight;

        if (savedHeight) {
            // 保存された高さがある場合はそれを使用
            initialHeight = savedHeight;
        } else {
            // 保存された高さがない場合は、コンテンツの高さに基づいて設定
            initialHeight = Math.min(contentHeight, maxHeight);
        }

        // スタイルを適用
        toc.style.minHeight = minHeightValue + 'px';
        toc.style.height = initialHeight + 'px';
        toc.style.maxHeight = '80vh';

        console.log('目次の高さを調整:', {
            contentHeight: contentHeight,
            minHeight: minHeightValue,
            initialHeight: initialHeight,
            maxHeight: maxHeight
        });
    }

    /**
     * 保存された高さを読み込み
     */
    function loadHeight() {
        try {
            const savedHeight = localStorage.getItem(STORAGE_KEY_HEIGHT);
            return savedHeight ? parseInt(savedHeight) : null;
        } catch (e) {
            console.log('高さの読み込みに失敗しました:', e);
            return null;
        }
    }

    /**
     * 初期化
     */
    function init() {
        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        // モバイル表示の場合は機能を無効化
        if (window.innerWidth <= 768) {
            return;
        }

        // タイトル要素にドラッグ可能な属性を追加
        const tocTitle = toc.querySelector('.toctitle') || toc.querySelector('#mw-toc-heading')?.parentElement;
        if (tocTitle) {
            tocTitle.setAttribute('data-draggable', 'true');
        }

        // 保存された位置とサイズを復元
        loadPosition(toc);
        loadSize(toc);

        // 最小化状態を復元
        loadMinimizedState(toc);

        // 目次の高さを動的に調整
        adjustTocHeight(toc);

        // リセットボタンを追加
        addResetButton(toc);

        // イベントリスナーの設定
        setupEventListeners(toc);

        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                constrainToViewport(toc);
                adjustTocHeight(toc); // リサイズ時にも高さを調整
            }
        });
    }

    /**
     * 最小化状態を読み込み
     */
    function loadMinimizedState(toc) {
        try {
            const isMinimized = localStorage.getItem(STORAGE_KEY_MINIMIZED) === 'true';
            if (isMinimized) {
                toc.classList.add('toc-minimized');
                // トグルチェックボックスの状態も更新
                const checkbox = document.getElementById('toctogglecheckbox');
                if (checkbox) {
                    checkbox.checked = true;
                }
            }
        } catch (e) {
            console.log('最小化状態の読み込みに失敗しました:', e);
        }
    }

    /**
     * 最小化状態を保存
     */
    function saveMinimizedState(isMinimized) {
        try {
            localStorage.setItem(STORAGE_KEY_MINIMIZED, isMinimized.toString());
        } catch (e) {
            console.log('最小化状態の保存に失敗しました:', e);
        }
    }

    /**
     * イベントリスナーの設定
     */
    function setupEventListeners(toc) {
        // ドラッグイベント
        toc.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // タッチイベント
        toc.addEventListener('touchstart', dragStart, { passive: true });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);

        // リサイズイベント
        toc.addEventListener('mousedown', resizeStart);
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', resizeEnd);

        // 最小化トグル機能
        const checkbox = document.getElementById('toctogglecheckbox');
        if (checkbox) {
            // チェックボックスの変更イベントを監視
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    toc.classList.add('toc-minimized');
                } else {
                    toc.classList.remove('toc-minimized');
                    // 展開時に高さを再調整
                    setTimeout(function() {
                        adjustTocHeight(toc);
                    }, 100); // アニメーション後に実行
                }
                // 最小化状態を保存
                saveMinimizedState(this.checked);
            });
        }
    }

    /**
     * リセットボタンを追加
     */
    function addResetButton(toc) {
        const tocTitle = toc.querySelector('.toctitle');
        if (!tocTitle) return;

        // 既にボタンが存在する場合は追加しない
        if (tocTitle.querySelector('.toc-reset-button')) return;

        const resetButton = document.createElement('button');
        resetButton.className = 'toc-reset-button';
        resetButton.textContent = '↺';
        resetButton.title = '位置とサイズをリセット';
        resetButton.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2em;
            padding: 4px 8px;
            margin-left: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
            flex: 0 0 auto;
        `;

        resetButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            resetPosition(toc);
        });

        tocTitle.appendChild(resetButton);
    }

    /**
     * 位置をリセット
     */
    function resetPosition(toc) {
        // localStorageから位置情報を削除
        try {
            localStorage.removeItem(STORAGE_KEY_X);
            localStorage.removeItem(STORAGE_KEY_Y);
            localStorage.removeItem(STORAGE_KEY_WIDTH);
            localStorage.removeItem(STORAGE_KEY_HEIGHT);
            localStorage.removeItem(STORAGE_KEY_MINIMIZED);
        } catch (e) {
            console.log('位置情報の削除に失敗しました:', e);
        }

        // 位置とサイズをリセット
        xOffset = 0;
        yOffset = 0;
        currentX = 0;
        currentY = 0;
        initialX = 0;
        initialY = 0;

        toc.style.transform = 'translate3d(0, 0, 0)';
        toc.style.width = '';
        toc.style.height = '';

        // 最小化状態を解除
        toc.classList.remove('toc-minimized');
        const checkbox = document.getElementById('toctogglecheckbox');
        if (checkbox) {
            checkbox.checked = false;
        }
    }

    /**
     * 保存された位置を読み込み
     */
    function loadPosition(toc) {
        try {
            const savedX = localStorage.getItem(STORAGE_KEY_X);
            const savedY = localStorage.getItem(STORAGE_KEY_Y);

            if (savedX !== null && savedY !== null) {
                xOffset = parseFloat(savedX);
                yOffset = parseFloat(savedY);
                currentX = xOffset;
                currentY = yOffset;
                setTranslate(xOffset, yOffset, toc);
            }
        } catch (e) {
            console.log('位置の読み込みに失敗しました:', e);
        }
    }

    /**
     * 保存されたサイズを読み込み
     */
    function loadSize(toc) {
        try {
            const savedWidth = localStorage.getItem(STORAGE_KEY_WIDTH);
            const savedHeight = localStorage.getItem(STORAGE_KEY_HEIGHT);

            if (savedWidth !== null) {
                toc.style.width = savedWidth + 'px';
            }
            if (savedHeight !== null) {
                toc.style.height = savedHeight + 'px';
            }
        } catch (e) {
            console.log('サイズの読み込みに失敗しました:', e);
        }
    }

    /**
     * 幅を保存
     */
    function saveWidth(width) {
        try {
            localStorage.setItem(STORAGE_KEY_WIDTH, width.toString());
        } catch (e) {
            console.log('幅の保存に失敗しました:', e);
        }
    }

    /**
     * 高さを保存
     */
    function saveHeight(height) {
        try {
            localStorage.setItem(STORAGE_KEY_HEIGHT, height.toString());
        } catch (e) {
            console.log('高さの保存に失敗しました:', e);
        }
    }

    /**
     * リサイズ開始
     */
    function resizeStart(e) {
        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        const rect = toc.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // 左端8px以内のクリック → 横方向リサイズ
        if (clickX <= 8) {
            e.preventDefault();
            e.stopPropagation();

            isResizing = true;
            resizeDirection = 'horizontal';
            resizeStartX = e.clientX;
            resizeStartWidth = toc.offsetWidth;

            // リサイズ中のスタイルを追加
            toc.classList.add('toc-resizing');
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
            return;
        }

        // 下端8px以内のクリック → 縦方向リサイズ
        if (clickY >= rect.height - 8) {
            e.preventDefault();
            e.stopPropagation();

            isResizing = true;
            resizeDirection = 'vertical';
            resizeStartY = e.clientY;
            resizeStartHeight = toc.offsetHeight;

            // リサイズ中のスタイルを追加
            toc.classList.add('toc-resizing');
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            return;
        }
    }

    /**
     * リサイズ中
     */
    function resize(e) {
        if (!isResizing) return;

        e.preventDefault();

        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        if (resizeDirection === 'horizontal') {
            // 横方向のリサイズ
            // 左方向へのドラッグで幅を広げる(マウスが左に移動すると幅が増える)
            const deltaX = resizeStartX - e.clientX;
            let newWidth = resizeStartWidth + deltaX;

            // 最小幅と最大幅の制限
            const minWidth = 200;
            const edgeMargin = 10; // 画面端からの余白

            // 目次の現在位置を考慮して、画面左端までの距離を計算
            const rect = toc.getBoundingClientRect();
            const maxWidthByScreen = rect.right - edgeMargin; // 右端から左端(画面端+余白)までの距離
            const maxWidthByHalf = window.innerWidth * 0.5; // 画面の1/2
            const maxWidth = Math.min(maxWidthByScreen, maxWidthByHalf);

            newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
            toc.style.width = newWidth + 'px';
        } else if (resizeDirection === 'vertical') {
            // 縦方向のリサイズ
            // 下方向へのドラッグで高さを広げる
            const deltaY = e.clientY - resizeStartY;
            let newHeight = resizeStartHeight + deltaY;

            // 最小高さと最大高さの制限
            const minHeight = 200;
            const edgeMargin = 10; // 画面端からの余白

            // 目次の現在位置を考慮して、画面下端までの距離を計算
            const rect = toc.getBoundingClientRect();
            const maxHeightByScreen = window.innerHeight - rect.top - edgeMargin; // 上端から画面下端(-余白)までの距離
            const maxHeight = maxHeightByScreen;

            newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
            toc.style.height = newHeight + 'px';
        }
    }

    /**
     * リサイズ終了
     */
    function resizeEnd(e) {
        if (!isResizing) return;

        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        isResizing = false;

        // リサイズ中のスタイルを削除
        toc.classList.remove('toc-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        // サイズを保存
        if (resizeDirection === 'horizontal') {
            saveWidth(toc.offsetWidth);
        } else if (resizeDirection === 'vertical') {
            saveHeight(toc.offsetHeight);
        }

        resizeDirection = null;
    }

    /**
     * ドラッグ開始
     */
    function dragStart(e) {
        // リサイズ中はドラッグを開始しない
        if (isResizing) return;

        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        // タイトル部分からのドラッグのみ許可
        const tocTitle = e.target.closest('.toctitle') || e.target.closest('#mw-toc-heading');
        if (!tocTitle) return;

        // リンクやボタンのクリックは無視
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        isDragging = true;

        // ドラッグ中のスタイルを追加
        toc.classList.add('toc-dragging');
    }

    /**
     * ドラッグ中
     */
    function drag(e) {
        if (!isDragging || isResizing) return;

        e.preventDefault();

        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, toc);
    }

    /**
     * ドラッグ終了
     */
    function dragEnd(e) {
        if (!isDragging || isResizing) return;

        const toc = document.getElementById('toc') || document.querySelector('.toc');
        if (!toc) return;

        initialX = currentX;
        initialY = currentY;

        isDragging = false;

        // ドラッグ中のスタイルを削除
        toc.classList.remove('toc-dragging');

        // 位置を保存
        savePosition();

        // 画面外に出ないように調整
        constrainToViewport(toc);
    }

    /**
     * 要素の位置を設定
     */
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    /**
     * 画面内に収まるように調整
     */
    function constrainToViewport(toc) {
        const rect = toc.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let adjustX = 0;
        let adjustY = 0;

        // 左端チェック
        if (rect.left < 0) {
            adjustX = -rect.left + 10;
        }
        // 右端チェック
        if (rect.right > viewportWidth) {
            adjustX = viewportWidth - rect.right - 10;
        }
        // 上端チェック
        if (rect.top < 0) {
            adjustY = -rect.top + 10;
        }
        // 下端チェック
        if (rect.bottom > viewportHeight) {
            adjustY = viewportHeight - rect.bottom - 10;
        }

        if (adjustX !== 0 || adjustY !== 0) {
            xOffset += adjustX;
            yOffset += adjustY;
            setTranslate(xOffset, yOffset, toc);
            savePosition();
        }
    }

    /**
     * 位置を保存
     */
    function savePosition() {
        try {
            localStorage.setItem(STORAGE_KEY_X, xOffset.toString());
            localStorage.setItem(STORAGE_KEY_Y, yOffset.toString());
        } catch (e) {
            console.log('位置の保存に失敗しました:', e);
        }
    }

    // DOMContentLoaded時に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ページ遷移後も初期化(MediaWikiのAjaxナビゲーション対応)
    mw.hook('wikipage.content').add(init);
})();

// ============================================
// WikiEditor内でのPageUp/PageDownキーの制御
// ============================================
// WikiEditor内にフォーカスがある時、
// PageUp/PageDownキーでページ全体がスクロールしないようにします
// ============================================
(function() {
	'use strict';

	/**
	 * WikiEditorのキーボードイベントを制御
	 */
	function handleWikiEditorKeydown(e) {
		// PageUpまたはPageDownキーの場合
		if ((e.key === 'PageUp' || e.key === 'PageDown') && !e.ctrlKey) {
			const editor = e.target;

			// 常にイベントの伝播を停止
			// これにより、エディターの最上部/最下部でも
			// ページ全体がスクロールしないようにする
			e.preventDefault();
			e.stopPropagation();

			// エディター内でのスクロールとカーソル移動を手動で実装
			const lineHeight = parseInt(window.getComputedStyle(editor).lineHeight) || 20;
			const editorHeight = editor.clientHeight;
			const linesPerPage = Math.floor(editorHeight / lineHeight);

			// 現在のカーソル位置を取得
			const cursorPosition = editor.selectionStart;
			const textBeforeCursor = editor.value.substring(0, cursorPosition);
			const lines = textBeforeCursor.split('\n');
			const currentLine = lines.length - 1;

			// 全体の行数を計算
			const totalLines = editor.value.split('\n').length;

			let targetLine;
			if (e.key === 'PageUp') {
				// PageUp: linesPerPage分上に移動
				targetLine = Math.max(0, currentLine - linesPerPage);
			} else {
				// PageDown: linesPerPage分下に移動
				targetLine = Math.min(totalLines - 1, currentLine + linesPerPage);
			}

			// 目標行の先頭位置を計算
			const allLines = editor.value.split('\n');
			let newPosition = 0;
			for (let i = 0; i < targetLine; i++) {
				newPosition += allLines[i].length + 1; // +1は改行文字
			}

			// 現在の列位置を維持
			const currentColumn = textBeforeCursor.length - textBeforeCursor.lastIndexOf('\n') - 1;
			const targetLineLength = allLines[targetLine].length;
			const newColumn = Math.min(currentColumn, targetLineLength);
			newPosition += newColumn;

			// カーソル位置を更新
			editor.selectionStart = newPosition;
			editor.selectionEnd = newPosition;

			// スクロール位置を調整してカーソルが見えるようにする
			const cursorTop = targetLine * lineHeight;
			const scrollTop = editor.scrollTop;
			const scrollBottom = scrollTop + editorHeight;

			if (cursorTop < scrollTop) {
				// カーソルが上にはみ出る場合
				editor.scrollTop = cursorTop;
			} else if (cursorTop + lineHeight > scrollBottom) {
				// カーソルが下にはみ出る場合
				editor.scrollTop = cursorTop + lineHeight - editorHeight;
			}
		}
	}

	/**
	 * 初期化
	 */
	function init() {
		const editor = document.getElementById('wpTextbox1');
		if (!editor) return;

		// 既にイベントリスナーが設定されている場合はスキップ
		if (editor.dataset.pageKeyHandlerAttached === 'true') {
			return;
		}

		// キーダウンイベントリスナーを設定
		editor.addEventListener('keydown', handleWikiEditorKeydown, false);

		// テキスト選択の保護
		// 選択テキストのドラッグ&ドロップを無効化（テキストの意図しない移動/削除を防止）
		editor.addEventListener('dragstart', function(e) {
			e.preventDefault();
		}, false);

		// テキストのドロップを無効化（外部からのドロップによる選択テキストの上書きを防止）
		editor.addEventListener('drop', function(e) {
			e.preventDefault();
		}, false);

		// mousedownイベントの伝播を停止（documentレベルのハンドラの干渉を防止）
		editor.addEventListener('mousedown', function(e) {
			e.stopPropagation();
		}, false);

		// 右クリック時のイベント伝播を停止
		editor.addEventListener('contextmenu', function(e) {
			e.stopPropagation();
		}, false);

		// フォーカス時にuser-selectがnoneになっていたらリセット
		editor.addEventListener('focus', function() {
			if (document.body.style.userSelect === 'none') {
				document.body.style.userSelect = '';
			}
		}, false);

		// 処理済みフラグを設定
		editor.dataset.pageKeyHandlerAttached = 'true';
	}

	// DOMContentLoaded時に初期化
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// MediaWikiのコンテンツ更新時にも初期化
	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(init);
	}
})();

// ============================================
// 画像クリックポップアップ機能
// ============================================
// MediaWiki内の画像を左クリックすると、
// フルサイズの画像をポップアップ表示します
// マウスホイールで拡大・縮小が可能です
// ============================================
(function() {
	'use strict';

	let overlay = null;
	let container = null;
	let closeButton = null;
	let resetButton = null;
	let currentImage = null;
	let scale = 1.0;
	let translateX = 0;
	let translateY = 0;
	let isDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let dragStartTranslateX = 0;
	let dragStartTranslateY = 0;

	/**
	 * 画像の変形を更新
	 */
	function updateImageTransform(imgElement) {
		imgElement.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
		imgElement.style.transformOrigin = 'center center';
		imgElement.style.transition = 'transform 0.1s ease-out';
	}

	/**
	 * ズームをリセット
	 */
	function resetZoom() {
		scale = 1.0;
		translateX = 0;
		translateY = 0;

		const popupImg = container.querySelector('img');
		if (popupImg) {
			updateImageTransform(popupImg);
		}
	}

	/**
	 * ポップアップ要素を作成
	 */
	function createPopupElements() {
		// オーバーレイが既に存在する場合は何もしない
		if (overlay) return;

		// オーバーレイを作成
		overlay = document.createElement('div');
		overlay.id = 'image-popup-overlay';

		// コンテナを作成
		container = document.createElement('div');
		container.id = 'image-popup-container';

		// 閉じるボタンを作成
		closeButton = document.createElement('button');
		closeButton.id = 'image-popup-close';
		closeButton.innerHTML = '×';
		closeButton.setAttribute('aria-label', '閉じる');

		// 元に戻すボタンを作成
		resetButton = document.createElement('button');
		resetButton.id = 'image-popup-reset';
		resetButton.innerHTML = '元に戻す';
		resetButton.setAttribute('aria-label', '元に戻す');

		// 要素を組み立て
		container.appendChild(closeButton);
		container.appendChild(resetButton);
		overlay.appendChild(container);
		document.body.appendChild(overlay);

		// イベントリスナーを設定
		overlay.addEventListener('click', function(e) {
			// オーバーレイ自体がクリックされた場合のみ閉じる
			if (e.target === overlay) {
				hidePopup();
			}
		});

		closeButton.addEventListener('click', hidePopup);
		resetButton.addEventListener('click', resetZoom);

		// Escapeキーで閉じる
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && overlay.classList.contains('active')) {
				hidePopup();
			}
		});

		// マウスホイールでの拡大・縮小
		overlay.addEventListener('wheel', function(e) {
			if (!overlay.classList.contains('active')) return;

			e.preventDefault();

			const popupImg = container.querySelector('img');
			if (!popupImg) return;

			// 拡大・縮小の倍率
			const zoomSpeed = 0.1;
			const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;

			// 最小0.5倍、最大5倍まで
			const newScale = Math.max(0.5, Math.min(5.0, scale + delta));

			if (newScale !== scale) {
				// マウスカーソルの位置を取得
				const rect = popupImg.getBoundingClientRect();
				const mouseX = e.clientX - rect.left - rect.width / 2;
				const mouseY = e.clientY - rect.top - rect.height / 2;

				// 現在のスケールでのマウス位置
				const mouseXInImage = (mouseX - translateX * scale) / scale;
				const mouseYInImage = (mouseY - translateY * scale) / scale;

				// 新しいスケールでマウス位置が同じになるようにtranslateを調整
				translateX = (mouseX - mouseXInImage * newScale) / newScale;
				translateY = (mouseY - mouseYInImage * newScale) / newScale;

				scale = newScale;
				updateImageTransform(popupImg);
			}
		}, { passive: false });

		// ドラッグ機能
		container.addEventListener('mousedown', function(e) {
			const popupImg = container.querySelector('img');
			if (!popupImg || e.target !== popupImg) return;

			isDragging = true;
			dragStartX = e.clientX;
			dragStartY = e.clientY;
			dragStartTranslateX = translateX;
			dragStartTranslateY = translateY;

			popupImg.style.cursor = 'grabbing';
			e.preventDefault();
		});

		document.addEventListener('mousemove', function(e) {
			if (!isDragging) return;

			const popupImg = container.querySelector('img');
			if (!popupImg) return;

			// マウスの移動量を計算
			const deltaX = e.clientX - dragStartX;
			const deltaY = e.clientY - dragStartY;

			// 移動量をスケールで割って、拡大時も適切に動くようにする
			translateX = dragStartTranslateX + deltaX / scale;
			translateY = dragStartTranslateY + deltaY / scale;

			updateImageTransform(popupImg);
			e.preventDefault();
		});

		document.addEventListener('mouseup', function(e) {
			if (isDragging) {
				isDragging = false;
				const popupImg = container.querySelector('img');
				if (popupImg) {
					popupImg.style.cursor = 'grab';
				}
			}
		});
	}

	/**
	 * 画像のフルサイズURLを取得
	 */
	function getFullSizeImageUrl(imgElement) {
		let imgSrc = imgElement.getAttribute('src');

		// サムネイル画像の場合、フルサイズのURLに変換
		if (imgSrc.includes('/thumb/')) {
			// /thumb/ を削除し、最後のサイズ指定部分を削除
			imgSrc = imgSrc.replace(/\/thumb\//, '/');
			imgSrc = imgSrc.replace(/\/\d+px-[^/]*$/, '');
		}

		return imgSrc;
	}

	/**
	 * ポップアップを表示
	 */
	function showPopup(imgElement) {
		if (!overlay || !container) {
			createPopupElements();
		}

		// ズームをリセット
		resetZoom();

		const fullSizeUrl = getFullSizeImageUrl(imgElement);

		// 既存の画像を削除
		const existingImg = container.querySelector('img');
		if (existingImg) {
			existingImg.remove();
		}

		// 新しい画像を作成
		const popupImg = document.createElement('img');
		popupImg.src = fullSizeUrl;
		popupImg.alt = imgElement.alt || '画像';
		popupImg.style.cursor = 'grab';

		// 画像をコンテナに追加(閉じるボタンとリセットボタンの後に)
		container.appendChild(popupImg);

		// ポップアップを表示
		overlay.classList.add('active');
		currentImage = imgElement;

		// スクロールを無効化
		document.body.style.overflow = 'hidden';
	}

	/**
	 * ポップアップを非表示
	 */
	function hidePopup() {
		if (!overlay) return;

		overlay.classList.remove('active');
		currentImage = null;

		// ズームをリセット
		resetZoom();

		// スクロールを再有効化
		document.body.style.overflow = '';
	}

	/**
	 * 画像要素にクリックイベントを設定
	 */
	function attachImageClickEvents() {
		// MediaWiki内のすべての画像を取得
		const images = document.querySelectorAll('.mw-file-element, .mw-body-content img');

		images.forEach(function(img) {
			// 既にイベントが設定されている場合はスキップ
			if (img.dataset.imagePopupAttached === 'true') {
				return;
			}

			// クリック時にポップアップを表示
			img.addEventListener('click', function(e) {
				// リンクのデフォルト動作を防止
				e.preventDefault();
				e.stopPropagation();

				showPopup(this);
			});

			// 処理済みフラグを設定
			img.dataset.imagePopupAttached = 'true';
		});
	}

	/**
	 * 初期化
	 */
	function init() {
		// ポップアップ要素を作成
		createPopupElements();

		// 画像にイベントを設定
		attachImageClickEvents();
	}

	// DOMContentLoaded時に初期化
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// MediaWikiのコンテンツ更新時にも初期化
	// (Ajaxでページ遷移した場合など)
	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(function() {
			attachImageClickEvents();
		});
	}
})();
