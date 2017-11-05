let paraPlaceHolder = "Just Copy and Paste your code here to Share with the Class!"

let uniqueId = "fd1bf29d-c21d-4d4a-b1ed-e9a628c780cf" // Change it to your uniqueID

var User = prompt("Please Enter your Roll Number:") || "092792"
var UserRollNo = parseInt(User.substr(User.length - 4,User.length));

let exceptions = [2101,2111,2145,3046,4014,4019];

while(!(UserRollNo > 2560 && UserRollNo < 2623) || UserRollNo in exceptions){
	User = prompt("Please Enter a valid Roll Number:")
	UserRollNo = parseInt(User.substr(User.length - 4,User.length));
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$('#board').attr('placeholder',paraPlaceHolder);

function getBoardData(){
	$('#fetching').css('display','inline-block');
	$.get("https://jsonstorage.net/api/items/" + uniqueId, function(data, textStatus, jqXHR) {
		$('#board').val(data.message);
		$('#fetching').css('display','none');
		$('#user').text('Last Changes by : ' + data.user);
	});
}

function sendBoardData(){
	var boardValue = $('#board').val();
	$('#sending').css('display','inline-block');
	$.ajax({
	    url:"https://jsonstorage.net/api/items/" + uniqueId,
	    type:"put",
	    data:'{"user":"' + User + '","message":"' + boardValue + '"}',
	    contentType:"application/json; charset=utf-8",
	    crossDomain:true,
	    dataType:"json",
	    success: function(data, textStatus, jqXHR){
	    	$('#sending').css('display','none');
    	}
	});

}