$(document).ready(function(){
	localStorage.clear();
	$('.loadingimg').hide();
	$('#login_btn').click(function() {
		
	  var user = $("#username").val();
   var pwd = $("#password").val();
  if (user == "") {

    alert("Please Enter Employee Id.");

   $("#username").focus(); 

  } else if (pwd == "") {

   alert("Please Enter Password.");

   $("#password").focus();
  }
  else
   {
     localStorage.setItem('username',user);
        var param = "{'USERNAME':" + JSON.stringify(user) + 
        ",'PASSWORD':" + JSON.stringify(pwd) + "}";
        $.ajax({
            type: "POST",
            url: "http://192.168.1.30:8050//Service1.asmx/exValidate",
            data: param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: SetTabSessionValueSucceed,
            error: SetTabSessionValueFailed
        });
   }
	});
	
	function SetTabSessionValueSucceed(result) {
	var myData = result.d;
	$('.loadingimg').show();
	localStorage.setItem('rolecode',myData.rolecode[0]);
	var rolecode = localStorage.getItem('rolecode');
	 if(myData.errorno == 'Success') 
	 {
	 
		 if(rolecode =="USER")
             window.location="dashboard_employee.html";
          else
            window.location="dashboard.html";
     } 
     else if(myData.errorno == 'Fail') 
     {
     $('.loadingimg').hide();
        alert("Invalid Username or Password.");
     }
     else
     {
     $('.loadingimg').hide();
      alert(myData.errorno);
     }
    }

    function SetTabSessionValueFailed() {
     $('.loadingimg').hide();
        alert("Please Check Your Data or Wifi Connection.");
    }
});
