var chart01;
var chart02;
var chart03;
var chart04;
var chart05;
var chartData = [
	{
		"names": "결측값",
		"litres": 250.9
	},
	{
		"names": "활용성",
		"litres": 431.1
	},
	{
		"names": "신뢰성",
		"litres": 300.8
	},
	{
		"names": "지역범위",
		"litres": 239.9
	},
	{
		"names": "갱신\n주기",
		"litres": 270.3
	},
	/*{
		"names": "테스트",
		"litres": 99
	}*/
];
AmCharts.ready(function(){
	// chartdiv01 
	chart01 = new AmCharts.AmRadarChart();
	chart01.dataProvider = chartData;
	chart01.categoryField = "names";

	var valueAxis01 = new AmCharts.ValueAxis();
	valueAxis01.axisAlpha = 0.1;
	valueAxis01.minimum = 0;
	valueAxis01.dashLength = 0;
	valueAxis01.axisTitleOffset = 5;
	valueAxis01.labelsEnabled = false;
	valueAxis01.gridCount = 4;
	chart01.addValueAxis(valueAxis01);

	var graph01 = new AmCharts.AmGraph();
	graph01.valueField = "litres";
	graph01.lineColor = "#1681c7";
	graph01.fillAlphas = 0.1;
	chart01.addGraph(graph01);

	chart01.write("chartdiv01");
	

	// chartdiv02 
	chart02 = new AmCharts.AmRadarChart();
	chart02.dataProvider = chartData;
	chart02.categoryField = "names";

	var valueAxis02 = new AmCharts.ValueAxis();
	valueAxis02.axisAlpha = 0.1;
	valueAxis02.minimum = 0;
	valueAxis02.dashLength = 0;
	valueAxis02.axisTitleOffset = 5;
	valueAxis02.labelsEnabled = false;
	valueAxis02.gridCount = 4;
	chart02.addValueAxis(valueAxis02);

	var graph02 = new AmCharts.AmGraph();
	graph02.valueField = "litres";
	graph02.lineColor = "#1681c7";
	graph02.fillAlphas = 0.1;
	chart02.addGraph(graph02);

	chart02.write("chartdiv02");


	// chartdiv03 
	chart03 = new AmCharts.AmRadarChart();
	chart03.dataProvider = chartData;
	chart03.categoryField = "names";

	var valueAxis03 = new AmCharts.ValueAxis();
	valueAxis03.axisAlpha = 0.1;
	valueAxis03.minimum = 0;
	valueAxis03.dashLength = 0;
	valueAxis03.axisTitleOffset = 5;
	valueAxis03.labelsEnabled = false;
	valueAxis03.gridCount = 4;
	chart03.addValueAxis(valueAxis03);

	var graph03 = new AmCharts.AmGraph();
	graph03.valueField = "litres";
	graph03.lineColor = "#1681c7";
	graph03.fillAlphas = 0.1;
	chart03.addGraph(graph03);

	chart03.write("chartdiv03");

	// chartdiv04 
	chart04 = new AmCharts.AmRadarChart();
	chart04.dataProvider = chartData;
	chart04.categoryField = "names";

	var valueAxis04 = new AmCharts.ValueAxis();
	valueAxis04.axisAlpha = 0.1;
	valueAxis04.minimum = 0;
	valueAxis04.dashLength = 0;
	valueAxis04.axisTitleOffset = 5;
	valueAxis04.labelsEnabled = false;
	valueAxis04.gridCount = 4;
	chart04.addValueAxis(valueAxis04);

	var graph04 = new AmCharts.AmGraph();
	graph04.valueField = "litres";
	graph04.lineColor = "#1681c7";
	graph04.fillAlphas = 0.1;
	chart04.addGraph(graph04);

	chart04.write("chartdiv04");


	// chartdiv05 
	chart05 = new AmCharts.AmRadarChart();
	chart05.dataProvider = chartData;
	chart05.categoryField = "names";

	var valueAxis05 = new AmCharts.ValueAxis();
	valueAxis05.axisAlpha = 0.1;
	valueAxis05.minimum = 0;
	valueAxis05.dashLength = 0;
	valueAxis05.axisTitleOffset = 5;
	valueAxis05.labelsEnabled = false;
	valueAxis05.gridCount = 4;
	chart05.addValueAxis(valueAxis05);

	var graph05 = new AmCharts.AmGraph();
	graph05.valueField = "litres";
	graph05.lineColor = "#1681c7";
	graph05.fillAlphas = 0.1;
	chart05.addGraph(graph05);

	chart05.write("chartdiv05");
});

