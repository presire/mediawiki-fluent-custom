## <div align="center"><b><a href="README.md">English</a> | <a href="README-ja.md">日本語</a></b></div>

<div align="center">

[![download](https://img.shields.io/github/downloads/presire/mediawiki-fluent-custom/total.svg?color=green&label=ダウンロード)](https://github.com/presire/mediawiki-fluent-custom/releases)
[![Open issue](https://img.shields.io/github/issues/presire/mediawiki-fluent-custom?color=red)](https://github.com/presire/mediawiki-fluent-custom/issues)
[![Closed issue](https://img.shields.io/github/issues-closed/presire/mediawiki-fluent-custom?color=blue)](https://github.com/presire/mediawiki-fluent-custom/issues)

</div>

# MediaWikiのためのFluentスキン

[Microsoft's Fluent design system](https://en.wikipedia.org/wiki/Fluent_Design_System)に基づいた[MediaWikiスキン](https://www.mediawiki.org/wiki/Manual:Skins)です。

インストールするには、Fluentフォルダを「\skins」に置き、`wfLoadSkin( 'Fluent' );`をLocalSettingsに追加してください。

## 最近の更新

### コード改善
* **`common-styles.less`** - ライト/ダーク/自動の3つのモードに対応した包括的なスタイリングシステム。画面の高さ（FHD、WQHD）に基づくレスポンシブデザイン、適切なカラースキームを持つコードブロックの構文ハイライト強化、グラデーションヘッダーとホバーエフェクトを備えた近代的なテーブルスタイリング、グラデーション背景を持つ目次のリデザイン、ダークモード反転フィルターによる数式レンダリングの改善が含まれています。

* **`theme-toggle.less`** - SVGアイコン（ライト用は太陽、ダーク用は月、自動用はモニター）を使用した完全なテーマ切り替えUI。3つすべてのテーマモードに適応するWikiEditorツールバースタイリングの完全統合、適切なアイコンカラー反転、背景調整、特殊文字パレットのダークモード対応を含みます。より良いユーザーエクスペリエンスのためのスムーズなトランジションとホバーエフェクト機能。

* **`main.js`** - 編集モードの改善されたフォーカス管理、コンテンツエリアへのスムーズスクロール、ドロップダウンメニューのトグル、サイドバー展開コントロール、ビジュアルエディターのサーフェス調整など、ユーザーインタラクションを改善するための強化されたJavaScript機能。ライトモードとダークモード間での自動画像表示切り替えの追加。

* **`screen-common.less`** - モバイル/タブレットのより良いレイアウトとアダプティブスペーシングによる改善されたレスポンシブデザインサポート。

* **`variables.less`** - より簡単なカスタマイズとメンテナンスのための洗練されたテーマカラー変数と一貫したデザイントークン。

## 既知の問題

* [SkinMustache](https://www.mediawiki.org/wiki/Manual:How_to_make_a_MediaWiki_skin/Migrating_SkinTemplate_based_skins_to_SkinMustache)に移行する必要があります。
* テーマカラーがハードコードされています。LocalSettings経由で設定できるようにする必要があります。
* Special:Preferences、Special:RecentChanges、および同様の特別なページには、適切なフォントとダークモードのスタイルがありません。

## 望ましい改善点

* いくつかのシャドウとアニメーションは、Fluentのデザイン言語により合うようにすると便利かもしれません。
* SemanticMediaWikiのフォントとダークモードのスタイルを導入したい。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細はLICENSEファイルを参照してください。
