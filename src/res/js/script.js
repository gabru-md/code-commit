let paraPlaceHolder = "Just Copy and Paste your code here to Share with the Class!"

var dataJSON;

let uniqueId1 = "fd1bf29d-c21d-4d4a-b1ed-e9a628c780cf"
let uniqueId = "cf9fdaae-c7ba-49e7-acaf-6b26282c225c" // Change it to your uniqueID

let keywords = './keywords.json';

$(window).on("load", function() {
  $("#preloader").delay(500).fadeOut("slow");
  $('body').css("overflow", "visible");
  getBoardData();
});

var User = prompt("Please Enter your Roll Number:") || "092792"
var UserRollNo = parseInt(User.substr(User.length - 4,User.length));

let exceptions = [2101,2111,2145,3046,4014,4019];

while(!(UserRollNo > 2560 && UserRollNo < 2623) || UserRollNo in exceptions){
	User = prompt("Please Enter a valid Roll Number:")
	UserRollNo = parseInt(User.substr(User.length - 4,User.length));
}

var even = false, odd = false;

if(UserRollNo % 2 == 0 ||UserRollNo > 3000){
    even = true;
}else{
    odd = true;
}
console.log(odd);
console.log(even);

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    getBoardData();
    console.log(dataJSON);
});

$('#board').attr('placeholder',paraPlaceHolder);


$(document).on('keypress', '#board', function(e){
    if(e.which == 40){
        setTimeout(function(){
            document.execCommand('insertHTML',false,')');
        },50);
    }
    else if(e.which == 123){
        setTimeout(function(){
            document.execCommand('insertHTML',false,'}');
        },50);
    }
    else if(e.which == 91){
        setTimeout(function(){
            document.execCommand('insertHTML',false,']');
        },50);
    }
    else if(e.keyCode == 9){
        document.execCommand('insertHTML', false, '&#009');
        e.preventDefault()
    }
});


// Add syntax highlighting in case later.
function syntaxHighlighting(value){
    $.ajax({
      url: keywords,
      beforeSend: function(xhr){
        if (xhr.overrideMimeType)
        {
          xhr.overrideMimeType("application/json");
        }
      },
      dataType: 'json',
      success: function(data){
            if(data[value]){
                console.log("Present");
            }else{
                console.log("Not Present");
            }
        }
    });
}

function getBoardData(){
	$('#fetching').css('display','inline-block');
	$.get("https://jsonstorage.net/api/items/" + uniqueId, function(data, textStatus, jqXHR) {
        dataJSON = data;
        console.log(dataJSON);
        if(even == true){
		  $('#board').html(data.message_even);
          $('#user').text('Last Changes by : ' + data.user_even);
        }else{
            $('#board').html(data.message_odd);
            $('#user').text('Last Changes by : ' + data.user_odd);
        }
		$('#fetching').css('display','none');

	});
}

function sendBoardData(){
	var boardValue = $('#board').html();
    syntaxHighlighting(boardValue);
	$('#sending').css('display','inline-block');

    var myJSON = {};
    if(even == true){
        myJSON = '{"user_even":"' + User + '","user_odd":"' + dataJSON.user_odd + '","message_even":"' + boardValue + '","message_odd":"' + dataJSON.message_odd + '"}' ;
    }else{
        myJSON = '{"user_odd":"' + User + '","user_even":"' + dataJSON.user_even + '","message_odd":"' + boardValue + '","message_even":"' + dataJSON.message_even + '"}' ;
    }

    console.log(myJSON);

	$.ajax({
	    url:"https://jsonstorage.net/api/items/" + uniqueId,
	    type:"PUT",
	    data:myJSON,
	    contentType:"application/json; charset=utf-8",
	    crossDomain:true,
	    dataType:"json",
	    success: function(data, textStatus, jqXHR){
	    	$('#sending').css('display','none');
    	}
	});

}