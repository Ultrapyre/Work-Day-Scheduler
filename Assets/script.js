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

//Now to actually create the timeblocks. Each block consists of the time itself, the input field, and the save button.
for (var i=0;i<timeSlots.length-1;i++){
    var timeBlock = $('<div class="row time-block">');
    
    var hour = $('<div class="hour">');
    hour.css('width', '7.5%');
    hour.text(timeSlots[i].toLocaleString(DateTime.TIME_SIMPLE));
    timeBlock.append(hour);

    var taskInput = $('<input class="textarea">');
    taskInput.css('width', '85%');
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

    timeBlock.append(taskInput);

    var saveBtn = $('<button class="saveBtn">');
    saveBtn.css('width', '7.5%');
    saveBtn.text('💾')
    timeBlock.append(saveBtn);
    scheduleEl.append(timeBlock);
}