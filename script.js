var today = moment();
var thisHour = moment().format('k');

console.log(thisHour);
$("#currentDay").text(today.format("MMM Do, YYYY"));


// save butns
$('.saveBtn').on('click', function(){
    // console.log($(this).siblings( "textarea" ).val());
    var txtInserted = $(this).siblings( "textarea" ).val();

    // console.log($(this).siblings( "textarea" ).attr('id'));
    var txtareaId = $(this).siblings( "textarea" ).attr('id');
    localStorage.setItem(txtareaId, txtInserted);
    
    $('.added').show();
    setTimeout(function() {
        $('.added').hide();
      }, 1000 );

    

})

$('.saveBtn').on('mouseover', function(){
    $(this).children().eq(0).removeClass().addClass('far fa-save');

})

$('.saveBtn').on('mouseout', function(){
    $(this).children().eq(0).removeClass().addClass('fas fa-save');

})



var timeblockArr = $('.time-block');
$.each( timeblockArr, function(){
    
    console.log($(this));
    var textareaEl = $(this).children().eq(1);
    var timeBlockHour = $(this).attr('data-hour');

    if (timeBlockHour == thisHour ) {
        console.log('CURRENT TIME');
        textareaEl.removeClass().addClass('col-10 present');
    } else if (timeBlockHour > thisHour ) {
        console.log('PAST TIME');
        textareaEl.removeClass().addClass('col-10 past');
    } else {
        console.log('FUTURE TIME');
        textareaEl.removeClass().addClass('col-10 future');
    }
    
    textareaEl.val(localStorage.getItem(textareaEl.attr('id')));



})