const menuButton = document.getElementById('menu-btn');
const menuCloseButton = document.getElementById('close-btn');
const addTimesPerYear = document.getElementById('slider-plus-1');
const removeTimesPerYear = document.getElementById('slider-minus-1');
const addPeople = document.getElementById('slider-plus-2');
const removePeople = document.getElementById('slider-minus-2');
const times = document.getElementById('times');
const people = document.getElementById('people');
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const result = document.getElementById('result');
const radio1 = document.getElementById('selector-radio-true');
const radio2 = document.getElementById('selector-radio-false');
const subscribeBtn = document.getElementById('subscribe-btn');
const successMsg = document.getElementById('success-msg');
const falilureMsg = document.getElementById('failure-msg');
const email = document.getElementById('email');

const timePerYearRange = 200;
const peopleTotalRange = 10;
const emailCheckRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g;

let timesTotal = times.innerHTML;
let peopleTotal = people.innerHTML;
let isMember = true;

result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);

// MENU SECTION
menuButton.addEventListener("click", () => {
    document.getElementById('menu-dropdown').style.transform = 'translateX(0px)';
})

menuCloseButton.addEventListener("click", () => {
    document.getElementById('menu-dropdown').style.transform = 'translateX(-500px)';
})

menuButton.addEventListener("mouseenter", () => {
    document.getElementById('burger-line-1').style.margin = '0px 8px';
    document.getElementById('burger-line-2').style.margin = '0px 8px';
    document.getElementById('burger-line-3').style.margin = '0px 8px';
})

menuButton.addEventListener("mouseleave", () => {
    document.getElementById('burger-line-1').style.margin = '8px';
    document.getElementById('burger-line-2').style.margin = '8px';
    document.getElementById('burger-line-3').style.margin = '8px';
})

menuCloseButton.addEventListener("mouseenter", () => {
    document.getElementById('cross-line-1').style.transform = 'rotate(45deg)';
    document.getElementById('cross-line-2').style.transform = 'rotate(-45deg)';
})

menuCloseButton.addEventListener("mouseleave", () => {
    document.getElementById('cross-line-1').style.transform = 'rotate(-45deg)';
    document.getElementById('cross-line-2').style.transform = 'rotate(45deg)';
})

// FORMULA SECTION
addTimesPerYear.addEventListener('click', () => {
    if(times.innerHTML < timePerYearRange) {
        times.innerHTML = ++timesTotal;
        slider1.value = times.innerHTML;
        result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
    }
})

removeTimesPerYear.addEventListener('click', () => {
    if(times.innerHTML > 0) {
        times.innerHTML = --timesTotal;
        slider1.value = times.innerHTML;
        result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
    }
})

addPeople.addEventListener('click', () => {
    if(people.innerHTML < peopleTotalRange) {
        people.innerHTML = ++peopleTotal;
        slider2.value = people.innerHTML;
        result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
    }
})

removePeople.addEventListener('click', () => {
    if(people.innerHTML > 1) {
        people.innerHTML = --peopleTotal;
        slider2.value = people.innerHTML;
        result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
    }
})

slider1.oninput = function() {
    timesTotal = slider1.value;
    times.innerHTML = timesTotal;
    result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
}

slider2.oninput = function() {
    peopleTotal = slider2.value;
    people.innerHTML = peopleTotal;
    result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
}

radio1.onchange = function() {
    isMember = !isMember;
    result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
}

radio2.onchange = function() {
    isMember = !isMember;
    result.innerHTML = calculateResultValue(timesTotal, peopleTotal, isMember);
}

function calculateResultValue(times, people, member) {
    let result = times * 10 * (1 + people * 0.15);
    return member ? parseInt(result) : parseInt(result * 0.8);
}

// NOTIFICATIONS

function isValidEmail(email) {
    return email.match(emailCheckRegex) !== null;
}

function notification(notification) {
    notification.style.transform = 'translateY(+60px)';
    setTimeout(() => {notification.style.transform = 'translateY(0px)'}, 1500);
}

subscribeBtn.addEventListener('click', () => {
    let emailText = email.value;
    isValidEmail(emailText) ? notification(successMsg) : notification(falilureMsg);
})

//MAILCHIMP SECTION

subscribeBtn.addEventListener('click', () => {
    let emailText = email.value;
    if(isValidEmail(emailText)) {

        notification(successMsg);

        const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listID}`;

        let emailData = {
            members: [
                {
                    email_address: emailText,
                    status: 'subscribed'
                }
            ]
        }

        let method = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Authorization': 'Basic ' + btoa(`${userName}:${mailChimpApiKey}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        }

        console.log(method);
        console.log(emailData);

        fetch(url, method);
        
    } else {
        notification(falilureMsg);
    }
})