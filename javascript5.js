$(document).ready(function() {
	// console.log("here");
	// getMeetups();
	$('.box').bind({
		click: function() {
			$(this).css('background-color', 'green')
			$(this).html('Clicked!')
		},
		mouseenter: function() {
			$(this).css('background-color', 'purple')
			$(this).html('Hi!')
		},
		mouseleave: function() {
			$(this).css('background-color', 'orange')
			$(this).html('Bye!')
		}
	});
    $('#calculate').submit(function(event){
        var givenAge = $('#age').val();
        var givenSnack = $('#snack').val();
        var givenPerDay = $('#times-per-day').val();
        $('#lifetime-supply').html(calculate(givenAge, givenSnack, givenPerDay));
        return false;
    });
    $('#averages').submit(function(event){
        var givenAverage = $('#average').val();
        studentAverages(givenAverage);
        return false
    });
    $('#friends').click(myFriends);
    $('#friends').submit(function(event){
       var name = $('#friend-name').val();
       var hair = $('#friend-hair').val();
       var friend = {name: name, hair:hair};
        myFriends(friend);
        return false;
    });
    $('#meetup').submit(function(event){
    	getMeetups($('#topic').val(), $('#zipcode').val());
    	return false;
    });


	// $('#about-me').submit(function(event){
 //            //code to execute after submission
 //            $('#name').val();
 //            $('select#friend').val();
 //            $('#name').val('Karuna');
 //            $('select#friend').val('santa');
 //            $('select#friend').val('easter');
 //            $('select#friend').val('tooth');
 //            $('select#friend').val('other');
 //            return false;
        // });
});

function getMeetups(topic, zipcode) {
	var api_key = "8194b344312422b7b2b384523205972";
	var url = "https://api.meetup.com/2/";
	var method = "open_events";
	$.ajax({
		url: url + method, 
		data: {
			key: api_key,
			zip: zipcode,
			topic: topic,
			// lat: 40.7143528,
			// lon: -74.0059731,
			// topic: 'JavaScript',
		},
		crossDomain: true,
		dataType: 'jsonp',
		type: "GET",
		success: function (data) {
			parseMeetups(data.results);
		},
		error: function (data) {
			console.log("Error", data);
		}
	});
}

function parseMeetups(results) {
	for(var i = 0; i < results.length; i++) {
		var div = $('<div class = "event"></div>');
		var name = $('<div> Name: '+ results[i].name+'</div>');
		var description = $('<div> Description: '+ results[i].description+'</div>');
		var group = $('<div> Group: '+ results[i].group.name+'</div>');

		div.append(name, description, group);
		$('#events').append(div);
	}
}

function calculate(age, snack, perDay) {

var maxAge = 99;
var perDay = 1;

var days = (maxAge - age) * 365;
var totalSnacks = perDay * days;
var resultDiv = $('#lifetime-supply');
if(totalSnacks > 40000) {
	resultDiv.html("You will need " + totalSnacks + " to last you until the ripe old age of " + maxAge + ". Wow! That's a lot!");
} else { 
	resultDiv.html("You will need " + totalSnacks + " to last you until the ripe old age of " + maxAge + ". You seem pretty reasonable");
}
}

// function studentAverages() {
// 	var allAverages = [95, 90, 93, 52, 70, 88];
// 	var goodAverages = [];
// 	var badAverages = [];
// 	var resultDiv = $('#student-averages');
// 	var resultParagraph = $('<p></p>');

// 	resultDiv.append(resultParagraph);

// 	for (var i = 0; i < allAverages.length; i++) {
// 		if (allAverages[i] >= 80) {
// 			goodAverages.push(allAverages[i]);
// 		} 
// 		else { 
// 			badAverages.push(allAverages[i]);
// 		}
// 	}
// 	var result = goodAverages.length + " students have averages greater than or equal to 80 and " + badAverages.length + " have averages below 80.";
// 	resultParagraph.append(result)
// }

function studentAverages(average){
    $('#student-averages').append('<p>'+ average +'</p>');
}

function myFriends (friend) {
	// var friends = [
	// {name: "Santa Claus",
 //     hair: "white"},
 //    {name: "Easter Bunny",
 //     hair: "brown"},
 //    {name: "Tooth Fairy",
 //     hair: "blue"}
 //    ];

    var resultDiv = $('<div></div>');
    var resultParagraph = $('<p>' + describeFriend(friend) + '</p>');
    resultDiv.append(resultParagraph);
    $('body').append(resultDiv);

    // var introParagraph = $('<p>My friends are:</p>');
    // resultDiv.append(introParagraph);

    // for(var i = 0; i < friends.length; i++) {
    // 	var resultParagraph = $('<p>' + describeFriend(friends[i]) + '</p>');
    // 	resultDiv.append(resultParagraph);
    // }
    // $('body').append(resultDiv);

}

function describeFriend(friends) {
	return " My friend " + friends.name + " has " + friends.hair + " hair.";
}