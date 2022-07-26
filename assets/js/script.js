let ls = localStorage;
let isHours12 = true; 
let isTimerStarted = false; 
let monthsInWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let displayer = (id, content) => document.getElementById(id).innerHTML = content;

let displayDateTime = () => {
	let dateTime = new Date();

	let year = dateTime.getFullYear();
	let month = dateTime.getMonth();
	let date = dateTime.getDate();

	let hours = dateTime.getHours();
	let minutes = dateTime.getMinutes();
	let seconds = dateTime.getSeconds();

	let amPm = hours>12? 'PM': 'AM';
	let displayHours = isHours12 && hours>12? hours - 12 : hours == 0 ? 12 : hours;
	

	let nowTime = `${displayHours}:${minutes}:${seconds} ${amPm}`;
	let todayDate = `${date} ${monthsInWord[month]}, ${year}`;

	displayer("nowTimeBox", nowTime);
	displayer("todayDateBox", todayDate); 
}


let setTimer = () => {
	let setTimerMinutes =  document.getElementById("setTimerSetMinuts").value;
	let setTimerSeconds = document.getElementById("setTimerSetSeconds").value;
	console.log(setTimerSeconds);
	console.log(setTimerMinutes);
	let timerTime = {
		minutes: setTimerMinutes? setTimerMinutes : 0,
		seconds: setTimerSeconds? setTimerSeconds : 0,
	};
	timerTime = JSON.stringify(timerTime)
	ls.setItem("timer", timerTime)
}

let startTimer = () => {
	let timerStartedTime = new Date().getTime();
	isTimerStarted = !isTimerStarted;
	let timerTime = JSON.parse(ls.getItem("timer"));
	
	let timerCurrentSecond = 0;

	var interval = setInterval(()=>{
			let timerCurrentTime = new Date().getTime();
			let timerDeffTime = timerCurrentTime - timerStartedTime;
			let timerDeffTimeSec = Math.floor(timerDeffTime / 1000);
			let timerCurrentMinutes = Math.floor( timerDeffTimeSec / 60);
			if(timerDeffTimeSec%60){
				timerCurrentSecond += .10;
			} else{
				timerCurrentSecond = 0;
			} 
			let timerCurrentRemaningMin = (timerTime.minutes - timerCurrentMinutes) - 1;
			let timerCurrentRemaningSec = (timerTime.seconds != '00'?timerTime.seconds : 60) - timerCurrentSecond; 
			let timerCurrentMilliSecond = timerDeffTime / 1000; 
			timerCurrentMilliSecond = timerCurrentMilliSecond.toString().substring(3, 5);



			document.getElementById("timerCoundownBox").innerHTML = `${timerCurrentRemaningMin}:${Math.trunc(timerCurrentRemaningSec)}:${timerCurrentMilliSecond}`;
		}, 100);
	
	
	
 
	
}
let displayTimerTime = () => {
	let showTimerStartTime = JSON.parse(ls.getItem("timer"));
	document.getElementById("timerCoundownBox").innerHTML = `${showTimerStartTime.minutes}:${showTimerStartTime.seconds}`;
}

document.getElementById("setTimerButton").addEventListener("click", setTimer);
document.getElementById("startTimerButton").addEventListener("click", startTimer);

let invokedAllFunc = () => {
	displayTimerTime();
}

setInterval(displayDateTime, 1000)
invokedAllFunc();