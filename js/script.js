function getData(callback){
	// we can try json but it works only on firefox
	/*
	$.ajax({
		type: "GET",
		url: "json/answers.json",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			if (typeof callback === "function") {
				callback(data);
			}
		},
		error: function () {
			alert("Please try firefox if you're viewing this example with the file:// path");
		}
	});
	*/
	var answers = {
		"quiz1": ["foggy", "raining", "sunny", "cloudy", "windy", "snowing"],
		"quiz2": ["2", "3", "4", "1", "5", "6"]
	};

	if (typeof callback === "function") {
		callback(answers);
	}
}

function checkQuiz(quiz){
	getData(function (data) {
		console.log(data);
		var answers = data[quiz];
		$("." + quiz + " input[type=text]").each(function(){

			$(this).siblings(".correct, .wrong").remove();

			var i = $(this).data("id");
				answer = $(this).val().toLowerCase().replace(/ /g,'');
				
			if (answers[i] == answer) {
				$(this).after("<div class='correct'></div>");
			}else{
				$(this).after("<div class='wrong'></div>");
			}
		});
	});
}
		
Quiz1View = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template( $("#quiz1-template").html(), {} );
		this.$el.html( template );
	},
	events: {
		"click input[type=button]": "check"
	},
	check: function( event ){
		var quizId = $(event.currentTarget).attr("value");
		checkQuiz(quizId);
	}
});

var quiz1_view = new Quiz1View({ el: $("#quiz1-container") });

Quiz2View = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template( $("#quiz2-template").html(), {} );
		this.$el.html( template );
	},
	events: {
		"click input[type=button]": "check"
	},
	check: function( event ){
		var quizId = $(event.currentTarget).attr("value");
		checkQuiz(quizId);
	}
});

var quiz2_view = new Quiz2View({ el: $("#quiz2-container") });

var active = 0;
$('.pager a').click(function() {
	var $btn = $(this);
	var $box = $('section').find('.quiz'); 
	$box.eq(active).addClass(function() {
		if ($btn.hasClass('next')) {
			if (active == $box.length - 1) {
				active = 0;
			}
			else {
				active++;
			}
		}
		else {
			if (active == 0) {
				active = $box.length - 1;
			}
			else {
				active--;
			}
		} 
		$box.eq(active).removeClass('hide');
		return 'hide';
	});

});