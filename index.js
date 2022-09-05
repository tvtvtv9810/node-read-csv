"use strict";

const fs = require('fs')
const path = require('path')
// オブジェクトの分割代入：const parse = require('csv-parse/sync').parse;
const {parse} = require('csv-parse/sync')

 // このモジュールを node で直接起動した場合のみ実行
if (require.main === module) {
  main()
}

function main () {
  // ファイルの絶対パス
  const source = path.join(__dirname, './csv-data/data.csv')
  // CSVファイル読込
  const buffer = fs.readFileSync(source)
  // パース
  const options = {escape: '\\'} 
  const {ok, err} = canParse(buffer, options) 

  if (ok) {
    const rows = parse(buffer, options) 
    console.info(rows)
  } else {
    console.error(err)
  }
}

/**
 * CSVデータをパース
 * @param {*} data データ
 * @param {*} options オプション
 * @returns パース結果
 */
function canParse (data, options) {
  let ok, message

  try {
    parse(data, options)
    return {ok: true, err: null}
  } catch (err) {
    return {ok: false, err}
  }
}
