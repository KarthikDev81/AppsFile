
var currentdate;
var employeecode = localStorage.getItem('username');
$(document).ready(function () {
app.initialize();
var dateval = new Date();
var month = dateval.getUTCMonth() + 1; 
var day = dateval.getUTCDate();
var year = dateval.getUTCFullYear();
currentdate = year + "/" + month + "/" + day;
$("#date_value").val(currentdate);
    pageload();
});


function pageload() {
    var param = "{'EMPLOYEECODE':" + JSON.stringify(employeecode)+ "}";
        $.ajax({
            type: "POST",
            url: "http://192.168.1.30:8050//Service1.asmx/Fetchdashboard",
            data: param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: SetpageloadSucceed,
            error: SetTabSessionValueFailed
        });
}

function SetpageloadSucceed(result) {
	var myData = result.d;
	var label = [];
	var labeldata1 = [];
	var labeldata2 = [];
	var labeldata3 = [];
	var permissionlabel = [];
	var permissionlabeldata1 = [];
	var permissionlabeldata2 = [];
	var doughnutDatapermission = [];
	for(i=0;i<myData.totalleave.length;i++)
	{
	 label[i] = myData.leavetype[i];
	 labeldata1[i] = myData.totalleave[i];
	 labeldata2[i] = myData.usedleave[i];
	 labeldata3[i] = myData.balanceleave[i]; 
	 }
	 var leavedesc =["Total","Used","Available"];
	var colourvarleave = 1;
	$('#legend3 li').remove();
	for(i=0;i<leavedesc.length;i++)
	{
	 $("#legend3").append(
		'<li class="color0'+colourvarleave+'"><span></span>'+leavedesc[i]+'</li>'
		);
		colourvarleave++;
	}
	 
	 permissionlabel[0] = "Permission";
	 permissionlabeldata1[0] = myData.usedpermission[0];
	 permissionlabeldata2[0] = myData.balancepermission[0];
	var permissioncount=[4,myData.usedpermission[0],myData.balancepermission[0]];
	var permissiondescription =["Total","Used", "Available"];
	for(i=0;i<permissioncount.length;i++)
	    {
	  doughnutDatapermission.push({
			                    value: parseInt(permissioncount[i]),
								color: colour_array[i],
								highlight: highlight_array[i],
							label: permissiondescription[i]
			    });
		
		}	
	
	
	//var doughnutDatapermission = {
	//	labels : permissionlabel,
	//	datasets : [
	//	    {
	//			fillColor : "#F7464A",
	//			highlightFill : "#FF5A5E",
	//			data : [4]
	//		},
	//		{
	//			fillColor : "#46BFBD",
	//			highlightFill : "#5AD3D1",
	//			data : permissionlabeldata1
	//		},
	//		{
	//			fillColor : "#FDB45C",
	//			highlightFill : "#FFC870",
	//			data : permissionlabeldata2
	//		}
	//	]

	//}
	
	var barChartData = {
		labels : label,
		datasets : [
			{
				fillColor : "#F7464A",
				highlightFill: "#FF5A5E",
				data : labeldata1
			},
			{
				fillColor : "#46BFBD",
				highlightFill : "#5AD3D1",
				data : labeldata2
			},
			{
				fillColor : "#FDB45C",
				highlightFill : "#FFC870",
				data : labeldata3
			}
		]

	}
	
	
		var ctx = document.getElementById("leave_chart").getContext("2d");
		var myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true});
			var ctx1 = document.getElementById("permission_chart_id").getContext("2d");
		//	var myDoughnut = new Chart(ctx1).Bar(doughnutDatapermission, {
		//	responsive : true});
	var myDoughnut =new Chart(ctx1).Doughnut(doughnutDatapermission, {responsive : true});
    }

	function SetTabSessionValueFailed(result) {
	alert("call Failed");
	}
