//For the sake of practice, I'm doing this as much in JQuery as possible.
//So we need to affect two elements: the date, and the schedule itself. 
//So in go the elements into the script...
var dateEl = $('#currentDay');
var scheduleEl = $('.container');

//The current day displayed will of course need to reflect the current day.
var DateTime = luxon.DateTime;
var dt = DateTime.now();
dateEl.text(dt.toLocaleString({weekday:'long', month: 'long', day: 'numeric'}));

/*Now to actually render the schedule itself. 
A working day is 9am to 5pm, so first an array is made to generate the timeslots.
An extra entry is included in the array for calculation purposes.

The array below generates a series of values, which is just that day, except the hour is set to specific times.
*/

var timeSlots = [
    DateTime.fromObject({hour: 9}),
    DateTime.fromObject({hour: 10}),
    DateTime.fromObject({hour: 11}),
    DateTime.fromObject({hour: 12}),
    DateTime.fromObject({hour: 13}),
    DateTime.fromObject({hour: 14}),
    DateTime.fromObject({hour: 15}),
    DateTime.fromObject({hour: 16}),
    DateTime.fromObject({hour: 17}),
    DateTime.fromObject({hour: 18})
];

//It's possible for entries to have already been added before, so the upcoming timeblocks need values.
//By default, they should be blank. So first to add a data block that should be empty.
var scheduledEvents = ['', '', '', '', '', '', '', '', '']
//Then to check for any possible entries already saved,
var savedata = JSON.parse(localStorage.getItem("events"))
if(savedata){
    scheduledEvents = savedata;
}
//Now to actually create the timeblocks. Each block consists of the time itself, the input field, and the save button.
//Since 6 pm is when (most) folks clock out, it isn't included in the schedule.
//So the loop stops before it.
for (var i=0;i<timeSlots.length-1;i++){
    var timeBlock = $('<div class="row time-block">');
    
    var hour = $('<div class="hour">');
    hour.css('width', '7.5%');
    //Probably unnecessarily complicated compared to simply typing a number and 'am/pm' afterwards,
    //but this bit here converts the times in the array into those simple-to-read values.
    hour.text(timeSlots[i].toLocaleString(DateTime.TIME_SIMPLE));
    timeBlock.append(hour);

    var taskInput = $('<input class="textarea">');
    taskInput.css('width', '85%');
    taskInput.val(scheduledEvents[i]);
    //Changes the input color depending on the current time.
    if (timeSlots[i]< DateTime.now() && DateTime.now() < timeSlots[i+1]){
        taskInput.addClass('present');
    }
    else if(DateTime.now() < timeSlots[i]){
        taskInput.addClass('future');
    }
    else if(DateTime.now() > timeSlots[i]){
        taskInput.addClass('past');
    }
    taskInput.css('color', 'black');
    timeBlock.append(taskInput);

    var saveBtn = $('<button class="saveBtn">');
    saveBtn.css('width', '7.5%');
    saveBtn.text('💾')
    timeBlock.append(saveBtn);
    scheduleEl.append(timeBlock);
}
//Those save buttons need to do something. So time to add an event listener to the schedule.
scheduleEl.on('click', '.saveBtn', function(event){
    
    //Technically pressing any of those save buttons do the same thing of updating the array of events, so might as well make them all do the same thing.
    //This loop will check for any values in the inputs, then save it to the event array.
    for(i=0; i<$('input').length;i++){
        if($('input').eq(i)){
            scheduledEvents[i]=$('input').eq(i).val();
        }
    }
    //Once the array's been updated, save it within local storage.
    localStorage.setItem("events", JSON.stringify(scheduledEvents));
})