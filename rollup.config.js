import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import path from 'path';

console.log("Working source path=> " + path.resolve('./src/any.file'));

var config = {
	input: pkg.module,//'src/main.js', //entry 進入口主文件位置，預設讀取自 package.json module
	output: {
		file: 'dist/ptx.umd.js',
		name: 'rocptx', // Importnat , umd and iife format use this value to be global variable name. 全域變數名稱
		format: 'umd'
	},
	//external: ['vue','jQuery',path.resolve( './src/some-local-file.js' )],//不想要包進去的 library
	plugins: [
		resolve(),
		commonjs(),
		json(),
		babel({
			exclude: 'node_modules/**' // Do not translate node modules 不轉換此內容之 code
		})
	],
	watch: {// Watch only work on cli with --watch
		include: 'src/**'
	}
};

// ****** Custom control export config rule start ******
var options = process.argv;//Get cli parameter 取得執行命令帶的參數
var format = 'umd';
var flagMinify = false;//Set true or cli add --flag-use-minify to minify output code. 設為 true 或執行命令加參數 --flag-use-minify 以便將輸出檔案壓縮
var flagBanner = false;//Set true or cli add --flag-use-banner to add banner comment. 設為 true 或執行命令加參數 --flag-use-banner 以便將輸出檔頭加上宣告註解
options.forEach(function(c, idx, arr){
	if(c=='-f' || c=='--output.format'){
		format = arr[idx+1];
	}else if(c=='--flag-use-minify'){
		flagMinify = true;
	}else if(c=='--flag-use-banner'){
		flagBanner = true;
	}
});

switch(format){
	case 'es':
		config.output.file = 'dist/rocptx.es.js';
		config.plugins = [
			resolve(),
			commonjs(),
			json()
		]
	break;
	case 'iife':
		config.output.file = 'dist/rocptx.lib.js';
	break;
	case 'amd':
		config.output.file = 'dist/rocptx.amd.js';
	break;
	case 'cjs':
		config.output.file = 'dist/rocptx.cjs.js';
	break;
}
config.output.format = format;

// *** Add banner comment to export file ***
let commentString = '';
if(flagBanner){
	const commentTag = ["name", "description", "version", "license"];
	let commentArray = commentTag.map(function(k){
		return (pkg[k]) ? k + ': ' + pkg[k] : '';
	});
	const userDefineText = `
Edit by: Melix Yen
E-Mail: melixyen@gmail.com
	`;//Please change this information by your self or clean it. 請更換成自己要宣告的內容或清空

	commentArray.push(userDefineText);
	var collapseString = '*   ';
	commentString = collapseString + commentArray.join(' \n').replace(/\n/gi, '\n' + collapseString);
	commentString = '/*\n' + commentString + '\n*/';

	config.output.banner = commentString;
}

// *** Check if use minify
if(flagMinify && format!='es'){
	config.output.banner = undefined;
	config.plugins.push(minify({
		banner: (flagBanner) ? commentString : undefined
	}));
}
// ****** Custom control export config rule end ******

export default config;