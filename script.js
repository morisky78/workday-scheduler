// update the Header with current date
var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY"));

// get the hour number in 0-24.
var thisHour = moment().format('k');

// local storage variable will have this prefix following after the hour number eg. sch-text-9
var localStoragePrefix = 'sch-text-';


// To refresh every top of the hour
var thisMinute = moment().format('m');
// get remaining minutes until Hour 
var minutesLeftToRefresh = 60 - thisMinute;


console.log(thisHour+':'+thisMinute);
console.log('minutes left: '+minutesLeftToRefresh);


var clickedHour;

// When 'save' button is clicked
$('.saveBtn').on('click', function(){

    var timeBlockHour = $(this).parent().attr('data-hour');
    var storageKey =  localStoragePrefix+timeBlockHour ;
    console.log("key:"+storageKey);
    
    // get the inserted text
    var txtInserted = $(this).siblings('textarea').val();
    // get the Local storage data to compare new text
    var oldText = localStorage.getItem(storageKey);

    // this is the <p> to show the updated result message
    var msgEl = $(this).siblings('.update-msg');

    // when there is no change on textarea
    // or no storage record and nothing entered
    if ( (txtInserted == oldText) || (!oldText && !txtInserted)  ) {
        msgEl.text('No Change');   
    // if not, store the new data
    } else {
        msgEl.text('Schedule updated on local storage');
        localStorage.setItem(storageKey, txtInserted);       
    }
  
    // show the updated message and hide in 1 sec
    msgEl.show();
    setTimeout(function() {
        msgEl.hide();
    }, 1000 );

})

// style changes for buttons mouseover / out - 
// highlight the textarea when the button is mouseovred
$('.saveBtn').on('mouseover', function(){
    $(this).children('i').removeClass().addClass('far fa-save');
    $(this).siblings('textarea').css('font-weight','bold');
})
$('.saveBtn').on('mouseout', function(){
    $(this).children('i').removeClass().addClass('fas fa-save');
    $(this).siblings('textarea').css('font-weight','normal');
})


// each time-block div, 
// fill out the textarea with local storage value 
// and style based on the data-hour value
var timeblockArr = $('.time-block');
$.each( timeblockArr, function(){
    
    var textareaEl = $(this).children('textarea');

    // ParseInt to compare with current time
    var timeBlockHour = parseInt($(this).attr('data-hour'));

    if (timeBlockHour == thisHour ) {
        // console.log('CURRENT TIME');
        textareaEl.removeClass().addClass('col-10 present');
    } else if ( timeBlockHour < thisHour ) {
        // console.log('PAST TIME');
        textareaEl.removeClass().addClass('col-10 past');
    } else if ( timeBlockHour > thisHour ) {
        // console.log('FUTURE TIME');
        textareaEl.removeClass().addClass('col-10 future');
    }
    
    var storageKey =  localStoragePrefix+timeBlockHour ;
    textareaEl.val(localStorage.getItem(storageKey));

})

// refresh when the hour changes
setInterval( function(){
    window.location.reload(true);
}, minutesLeftToRefresh*60000);

