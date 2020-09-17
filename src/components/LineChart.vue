<template>
<div>
	<button  type="button" class="btn btn-primary"  >
		<a class="btn_start_btn" href="#date_line_start" style="text-decoration: none;color:#3d3333">날짜별 추이(chart by date)</a>
	</button>
	<button  type="button" class="btn btn-primary" >
		<a href="#total_recovery_start" style="text-decoration: none;color:#3d3333">국가별 회복자(country recovery cases)</a>
	</button>
	
	<br/>
	<p>마지막 업데이트 시각(updated) :{{KR_data.updatedDateTime}} </p>
	<br/>
	
	<table style="text-align: center;  margin: auto;">
		<tr>
			<th>국가<br/>(country)</th>
			<th>총 확진자 수<br/>(totalConfirmed)</th> 
			<th>총 사망자 수<br/>(totalDeaths)</th>
		</tr>
		<tr>
			<td>KR(한국)</td>
			<td>{{KR_totalConfirmedCases}}</td>
			<td>{{KR_totalDeaths}}</td>
		</tr>
		<tr>
			<td>CN(중국)</td>
			<td>{{CN_data.totalConfirmedCases}}</td>
			<td>{{CN_data.totalDeaths}}</td>
		</tr>
		<tr>
			<td>IT(이탈리아)</td>
			<td>{{IT_data.totalConfirmedCases}}</td>
			<td>{{IT_data.totalDeaths}}</td>
		</tr>
		<tr>
			<td>US(미국)</td>
			<td>{{US_data.totalConfirmedCases}}</td>
			<td>{{US_data.totalDeaths}}</td>
		</tr>
		<tr>
			<td>ES(스페인)</td>
			<td>{{ES_data.totalConfirmedCases}}</td>
			<td>{{ES_data.totalDeaths}}</td>
		</tr>
		<tr>
			<td>IR(이란)</td>
			<td>{{IR_data.totalConfirmedCases}}</td>
			<td>{{IR_data.totalDeaths}}</td>
		</tr>
		<tr>
			<td>FR(프랑스)</td>
			<td>{{FR_data.totalConfirmedCases}}</td>
			<td>{{FR_data.totalDeaths}}</td>
		</tr>
		<tr>
			<tr>
			<td>DE(독일)</td>
			<td>{{DE_data.totalConfirmedCases}}</td>
			<td>{{DE_data.totalDeaths}}</td>
		</tr>
	</table >
	<br/><br/><br/>
	<p>바 클릭시 구체적 숫자 확인가능(Check the number by clicking on the bar.) </p>
	<div id="barchart_all_container" style="font-size: 0; text-align: center">
		<div id="barchart_container_num">
			<canvas ref="line4" id="barChart" ></canvas>
		</div>
		<div id="barchart_container_num">
			<canvas ref="line5" id="barChart_국가별확진" ></canvas>
		</div>
	</div>
	<br/><br/><br/>
	<!-- 전체 국가별 확진자 수 및 사망자 수 시작-->
	<p id="date_line_start">범례 클릭시 개별 보기 가능(Click Legend to view individual) </p>
	<div id="linechart_container" >
		<canvas ref="line" id="myChart" ></canvas>
			<!-- <progress id="animationProgress" max="1" value="0" style="width: 100%"></progress> -->
	</div>
	<br/><br/><br/>
	<p>범례 클릭시 개별 보기 가능(Click Legend to view individual) </p>
	<div id="linechart_container" >
		<canvas ref="line2" id="myChart_death" ></canvas>
	</div>
	<br/><br/><br/>
	<!-- 전체 국가별 확진자 수 및 사망자 수 끝 -->
	<p id="total_recovery_start"> 바 클릭시 구체적 숫자 확인가능(Check the number by clicking on the bar.)</p>
	<div id="recoveryChart"  >
			<div id="barchart_container_recovery">
				<canvas ref="line3" id="barChart" ></canvas>
			</div>
			<div id="barchart_container_recovery">
				<canvas ref="lineIT" id="barChart" ></canvas>
			</div>
	</div>
	<br/><br/><br/>
	<div id="recoveryChart">
		<div id="barchart_container_recovery">
				<canvas ref="lineUS" id="barChart" ></canvas>
		</div>
		<div id="barchart_container_recovery">
				<canvas ref="lineES" id="barChart" ></canvas>
		</div>
	</div>
	<br/><br/><br/>
	<div id="recoveryChart">
		<div id="barchart_container_recovery">
				<canvas ref="lineCN" id="barChart" ></canvas>
		</div>
		<div id="barchart_container_recovery">
				<canvas ref="lineFR" id="barChart" ></canvas>
		</div>
	</div>
	<br/><br/><br/>
	<div id="recoveryChart">
		<div id="barchart_container_recovery">
				<canvas ref="lineJP" id="barChart" ></canvas>
		</div>
		<div id="barchart_container_recovery">
				<canvas ref="lineDE" id="barChart" ></canvas>
		</div>
	</div>
</div>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios';

export default {
	data(){
			return {
				date:[],
				KR_data:{},
				CN_data:{},
				IT_data:{},
				US_data:{},
				ES_data:{},
				IR_data:{},
				FR_data:{},
				JP_data:{},
				DE_data:{},
				KR_confirmed:[],
				CN_confirmed:[],
				IT_confirmed:[],
				US_confirmed:[],
				ES_confirmed:[],
				IR_confirmed:[],
				FR_confirmed:[],
				JP_confirmed:[],
				DE_confirmed:[],
				KR_death:[],
				CN_death:[],
				IT_death:[],
				US_death:[],
				ES_death:[],
				IR_death:[],
				FR_death:[],
				JP_death:[],
				DE_death:[],
				KR:"KR",
				CN:"CN",
				IT:"IT",
				US:"US",
				ES:"ES",
				IR:"IR",
				FR:"FR",
				JP:"JP",
				DE:"DE",
				KR_totalConfirmedCases:'',
				KR_totalDeaths:'',
				KR_totalRecoveredCases:'',
				global:{}
			}
	},
	watch: {
				'CN_data':'start_chart',
				'IT_data':'start_chart',
				'US_data':'start_chart',
				'ES_data':'start_chart',
				'IR_data':'start_chart',
				'KR_data':'start_chart',
				'FR_data':'start_chart',
				'JP_data':'start_chart',
				'DE_data':'start_chart',
	},

	methods:{
			get_date(KR){
				this.get_date_country(KR)
				.then(
					(res)=>{
							this.KR_data = res.data;
							this.KR_totalConfirmedCases = res.data.stats.totalConfirmedCases;
							this.KR_totalDeaths = res.data.stats.totalDeaths;
							this.KR_totalRecoveredCases = res.data.stats.totalRecoveredCases;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.date.push(res.data.stats.history[i].date.slice(0,10))
							this.KR_confirmed.push(res.data.stats.history[i].confirmed)
							this.KR_death.push(res.data.stats.history[i].deaths)
								}	
							this.start_chart()
							}
				)
			},
			get_date_CN(CN){
				this.get_date_country(CN)
				.then(
					(res)=>{
							this.CN_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.CN_confirmed.push(res.data.stats.history[i].confirmed)
							this.CN_death.push(res.data.stats.history[i].deaths)
							}	
						}
				)
			},
			get_date_IT(IT){
				this.get_date_country(IT)
				.then(
					(res)=>{
							this.IT_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.IT_confirmed.push(res.data.stats.history[i].confirmed)
							this.IT_death.push(res.data.stats.history[i].deaths)
							}	
						}
				)
			},
			get_date_US(US){
				this.get_date_country(US)
				.then(
					(res)=>{
							this.US_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.US_confirmed.push(res.data.stats.history[i].confirmed)
							this.US_death.push(res.data.stats.history[i].deaths)
							}	
						}
				)
			},
			get_date_ES(ES){
				this.get_date_country(ES)
				.then(
					(res)=>{ 
							this.ES_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.ES_confirmed.push(res.data.stats.history[i].confirmed)
							this.ES_death.push(res.data.stats.history[i].deaths)
							}	
						}
				)
			},
			get_date_IR(IR){
				this.get_date_country(IR)
				.then(
					(res)=>{ 
						
							this.IR_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.IR_confirmed.push(res.data.stats.history[i].confirmed)
							this.IR_death.push(res.data.stats.history[i].deaths)
							}	
						}
				)
			},
			get_date_FR(FR){
				this.get_date_country(FR)
				.then(
					(res)=>{ 
						
							this.FR_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.FR_confirmed.push(res.data.stats.history[i].confirmed)
							this.FR_death.push(res.data.stats.history[i].deaths)
							
							}	
						}
				)
			},
			get_date_JP(JP){
				this.get_date_country(JP)
				.then(
					(res)=>{ 
						
							this.JP_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.JP_confirmed.push(res.data.stats.history[i].confirmed)
							this.JP_death.push(res.data.stats.history[i].deaths)
							
							}	
						}
				)
			},
			get_date_DE(DE){
				this.get_date_country(DE)
				.then(
					(res)=>{ 
						
							this.DE_data = res.data.stats;
							for (var i = 0; i < res.data.stats.history.length; i++) {
							this.DE_confirmed.push(res.data.stats.history[i].confirmed)
							this.DE_death.push(res.data.stats.history[i].deaths)
							
							}	
						}
				)
			},
			get_date_country(country){
			return axios.get(`https://api.smartable.ai/coronavirus/stats/${country}`,
				{headers: { 'Subscription-Key': '60010fad4e444677a25402efa4528b2e' }})
			},

			show_chart(date,confirmed,CN_confirmed,IT_confirmed,US_confirmed,ES_confirmed,IR_confirmed,FR_confirmed,JP_confirmed,DE_confirmed){
				// var progress = document.getElementById('animationProgress');
				var ctx  = this.$refs.line.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'line',
				// The data for our dataset
				data: {
					labels:date,
					datasets: [{
						label: '한국/KR',
						borderColor: '	rgb(0, 0, 255)',
						data:confirmed,
						fill: false,
					},{
						label: '중국/CN',
						borderColor: 'rgb(255, 64, 0)',
						data:CN_confirmed,
						fill: false,
					},
					{
						label: '이탈리아/IT',
						borderColor: 'rgb(255, 0, 255)',
						data:IT_confirmed,
						fill: false,
					},
					{
						label: '미국/US',
						borderColor: '	rgb(255, 255, 0)',
						data:US_confirmed,
						fill: false,
					},
					{
						label: '스페인/ES',
						borderColor: '	rgb(75, 245, 66)',
						data:ES_confirmed,
						fill: false,
					},
					{
						label: '이란/IR',
						borderColor: '	rgb(122, 13, 66)',
						data:IR_confirmed,
						fill: false,
					},
						{
						label: '프랑스/FR',
						borderColor: '	rgb(36, 203, 226)',
						data:FR_confirmed,
						fill: false,
					},
					{
						label: '일본/JP',
						borderColor: '	rgb(245, 158, 66)',
						data:JP_confirmed,
						fill: false,
					},
					{
						label: '독일/DE',
						borderColor: '	rgb(16, 125, 4)',
						data:DE_confirmed,
						fill: false,
					}
				],
				},
				// Configuration options go here
				options: {
					elements: {
								line: {
									tension: 0 // disables bezier curves
								}
					 },
					responsive: true,
					title: {
						display: true,
						text: '국가별 코로나19 발생 현황(확진자 수), NATIONAL COVID19 CONFIRMED DASHBOARD'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: '날짜'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: '확진자 수'
							}
						}]
					}
				}
			});
			}	,
			show_chart_deaths(date,KR_deaths,CN_deaths,IT_deaths,US_deaths,ES_deaths,IR_deaths,FR_deaths,JP_deaths,DE_deaths){
				var ctx  = this.$refs.line2.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'line',
				// The data for our dataset
				data: {
					labels:date,
					datasets: [{
						label: '한국/KR',
						borderColor: '	rgb(0, 0, 255)',
						data:KR_deaths,
						fill: false,
					},{
						label: '중국/CN',
						borderColor: 'rgb(255, 64, 0)',
						data:CN_deaths,
						fill: false,
					},
					{
						label: '이탈리아/IT',
						borderColor: 'rgb(255, 0, 255)',
						data:IT_deaths,
						fill: false,
					},
					{
						label: '미국/US',
						borderColor: 'rgb(255, 255, 0)',
						data:US_deaths,
						fill: false,
					},
					{
						label: '스페인/ES',
						borderColor: 'rgb(75, 245, 66)',
						data:ES_deaths,
						fill: false,
					},
					{
						label: '이란/IR',
						borderColor: 'rgb(75, 32, 66)',
						data:IR_deaths,
						fill: false,
					},
					{
						label: '프랑스/FR',
						borderColor: 'rgb(36, 203, 226)',
						data:FR_deaths,
						fill: false,
					},{
						label: '일본/JP',
						borderColor: 'rgb(245, 158, 66)',
						data:JP_deaths,
						fill: false,
					},
					{
						label: '독일/DE',
						borderColor: 'rgb(16, 125, 4)',
						data:DE_deaths,
						fill: false,
					}
				],
				},
				// Configuration options go here
				options: {
					responsive: true,
					title: {
						display: true,
						text: '국가별 코로나19 발생 현황(사망자 수), NATIONAL COVID19 DEATHS DASHBOARD'
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: '날짜'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: '사망자 수'
							}
						}]
					}
				}
			});
				},

			show_barChart(){
				var ctx  = this.$refs.line3.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '한국 전체 통계(South Korea Total Stats)',
						data: [this.KR_totalConfirmedCases,
						this.KR_totalDeaths,
						this.KR_totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_IT_Recovery(){
				var ctx  = this.$refs.lineIT.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '이탈리아 전체 통계(Italy Total Stats)',
						data: [this.IT_data.totalConfirmedCases,
						this.IT_data.totalDeaths,
						this.IT_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_US_Recovery(){
				var ctx  = this.$refs.lineUS.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '미국 전체 통계(United State Total Stats)',
						data: [this.US_data.totalConfirmedCases,
						this.US_data.totalDeaths,
						this.US_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_ES_Recovery(){
				var ctx  = this.$refs.lineES.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '스페인 전체 통계(Spain Total Stats)',
						data: [this.ES_data.totalConfirmedCases,
						this.ES_data.totalDeaths,
						this.ES_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_CN_Recovery(){
				var ctx  = this.$refs.lineCN.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '중국 전체 통계(China Total Stats)',
						data: [this.CN_data.totalConfirmedCases,
						this.CN_data.totalDeaths,
						this.CN_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_FR_Recovery(){
				var ctx  = this.$refs.lineFR.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '프랑스 전체 통계(France Total Stats)',
						data: [this.FR_data.totalConfirmedCases,
						this.FR_data.totalDeaths,
						this.FR_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_JP_Recovery(){
				var ctx  = this.$refs.lineJP.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '일본 전체 통계(Japan Total Stats)',
						data: [this.JP_data.totalConfirmedCases,
						this.JP_data.totalDeaths,
						this.JP_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart_DE_Recovery(){
				var ctx  = this.$refs.lineDE.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
				data: {
					labels: ['확진자(totalConfirmed)', '사망자(totalDeaths)', '회복자(totalRecoveredCases)'],
					datasets: [{
						label: '독일 전체 통계(Germany Total Stats)',
						data: [this.DE_data.totalConfirmedCases,
						this.DE_data.totalDeaths,
						this.DE_data.totalRecoveredCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			},
			show_barChart2(){
				var ctx  = this.$refs.line4.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'horizontalBar',
				data: {
					labels: ['KR', 'CN', 'IT','US','ES','IR','FR','JP','DE'],
					datasets: [{
						label: '국가별 확진자 수 / confirmed',
						data: [this.KR_totalConfirmedCases,
						this.CN_data.totalConfirmedCases,
						this.IT_data.totalConfirmedCases,
						this.US_data.totalConfirmedCases,
						this.ES_data.totalConfirmedCases,
						this.IR_data.totalConfirmedCases,
						this.FR_data.totalConfirmedCases,
						this.JP_data.totalConfirmedCases,
						this.DE_data.totalConfirmedCases],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(36, 229, 81,0.2)',
							'rgba(245, 158, 66,0.2)',
							'rgba(16, 125, 4,0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(36, 229, 81,1)',
							'rgba(245, 158, 66,1)',
							'rgba(16, 125, 4,0.2)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],

					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},
					
				}
			});
			},
			show_barChart3(){
				var ctx  = this.$refs.line5.getContext('2d');
				var chart = new this.$_Chart(ctx, {
				// The type of chart we want to create
				type: 'horizontalBar',
				data: {
					labels: ['KR', 'CN', 'IT','US','ES','IR','FR','JP','DE'],
					datasets: [{
						label: '국가별 사망자 수 / deaths',
						data: [this.KR_totalDeaths,
						this.CN_data.totalDeaths,
						this.IT_data.totalDeaths,
						this.US_data.totalDeaths,
						this.ES_data.totalDeaths,
						this.IR_data.totalDeaths,
						this.FR_data.totalDeaths,
						this.JP_data.totalDeaths,
						this.DE_data.totalDeaths],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(36, 229, 81,0.2)',
							'rgba(245, 158, 66,0.2)',
							'rgba(16, 125, 4,0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(36, 229, 81,1)',
							'rgba(245, 158, 66,1)',
							'rgba(16, 125, 4,0.2)'
						],
						borderWidth: 1
					}]
				},
				options: {
					events: [ 'click'],
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},
					
				}
			});
			},
		
		
			start_api(){
				return this.get_date_FR(this.FR),this.get_date_IR(this.IR),this.get_date_ES(this.ES),this.get_date_US(this.US)
				,this.get_date_IT(this.IT),this.get_date_CN(this.CN),this.get_date(this.KR),this.get_date_JP(this.JP),this.get_date_DE(this.DE)
			},
			start_chart(){
				return 	this.show_chart(this.date,this.KR_confirmed,this.CN_confirmed,this.IT_confirmed,this.US_confirmed,this.ES_confirmed,this.IR_confirmed,this.FR_confirmed,this.JP_confirmed,this.DE_confirmed)
						,this.show_chart_deaths(this.date,this.KR_death,this.CN_death,this.IT_death,this.US_death,this.ES_death,this.IR_death,this.FR_death,this.JP_death,this.DE_death)
						,this.show_barChart(),this.show_barChart2(),this.show_barChart3(),this.show_barChart_IT_Recovery(),this.show_barChart_US_Recovery(),this.show_barChart_ES_Recovery()
						,this.show_barChart_CN_Recovery(),this.show_barChart_FR_Recovery(),this.show_barChart_JP_Recovery(),this.show_barChart_DE_Recovery()
			}	
	},
	created(){
		this.start_api()
		
	}

}
</script>


<style scoped>
table{
	font-size: 11px;
}

#recoveryChart{
	font-size: 0; 
	text-align: center;

}
#barchart_container_num{
	position:relative;
	width:450px;
	display: inline-block
}
#barchart_container_recovery{
	position:relative;
	width:500px;
	display: inline-block
}
.btn-primary:hover{
	background-color: #deccff;
	border-color: white;
}
.btn-primary:active{
	color: #cbafff;
	border-color: white;
}
button{
	background-color:#ebe0ff;
	border-color: white;
	margin: 10px;
	box-shadow: 3px 4px #8888884a;
}
</style>