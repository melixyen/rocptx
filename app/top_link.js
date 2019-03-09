(function(){
	
	var tpl =  Vue.compile('<div style="display:flex; font-size:13px; margin:5px 10px; color:rgb(34, 51, 238); line-height:16px;">' +
	'<div v-on:click="open(\'jg\')" v-bind:style="getStyle()">接軌時刻</div> | ' +
		//'<div v-on:click="link(\'index\')" v-bind:style="getStyle(\'index\')">首頁</div> | ' +
		'<div v-on:click="link(\'dradra\')" v-bind:style="getStyle(\'dradra\')">資料抓取器</div> | ' +
		//'<div v-on:click="link(\'line_time\')" v-bind:style="getStyle(\'line_time\')">路線時刻表</div> | ' +
		'<div v-on:click="link(\'station_time\')" v-bind:style="getStyle(\'station_time\')">車站時刻表</div> | ' +
	'</div>');
	Vue.component('vcmp_top_link_bar', {
		render: tpl.render,
		staticRenderFns: tpl.staticRenderFns,
		data: function(){return{
			flagGo: false
		}},
		methods: {
			link: function(page){
				location.href = page + '.html';
			},
			open: function(site){
				switch(site){
					case 'jg':
						window.open('http://melixyen.github.io/railtime/', '_blank');
					break;
				}
			},
			getStyle: function(page){
				var rt = "padding: 1px 5px; cursor:pointer; ";
				var file = page + '.html';
				if(page && location.pathname.indexOf(file)>=0) rt = "padding: 1px 5px; color:#222;";
				return rt;
			}
		}
	});


	var bottomTpl = Vue.compile('<div class="bottomArea" style="margin-top: 20px;">' +
		'發行單位: <span style="background-color: #BBB;"><span style="color:blue;">極</span><span style="color:#FEFE11;">光</span><span style="color:#005530;">駭</span><span style="color:red;">客</span></span>' +
		' | 函式庫: <a href="http://melixyen.github.io/railtime/" target="_blank" style="color:#2233EE;">接軌時刻 </a><a href="https://github.com/melixyen/rocptx" target="_blank" style="color:#2233EE;">公共交通動態查詢 PTX Javascript Library</a> | <span>資料源: 資料介接交通部PTX服務平臺</span>' +
	'</div>');
	Vue.component('vcmp_bottom_area_div', {
		render: bottomTpl.render,
		staticRenderFns: bottomTpl.staticRenderFns,
		data: function(){return{
			flagGo: false
		}},
		methods: {
		}
	});
})()