const meetingTableBody = document.getElementById("meetingTableBody");

async function getMeetings() {
    const httpResponse = await fetch(`http://localhost:8080/meetings`);
    const meetings = await httpResponse.json();
    return meetings;
}

async function renderMeetingTable() {
    const testMeeting = await getMeetings()

    for (const meeting of testMeeting) {
        const meetingRow = document.createElement('tr');

        const meetingIdData = document.createElement('td');
        meetingIdData.innerText = meeting.meetingId;

        const meetingDescriptionData = document.createElement('td');
        meetingDescriptionData.innerText = meeting.description;

        const meetingAddressData = document.createElement('td');
        meetingAddressData.innerText = meeting.address;

        const meetingTimeData = document.createElement('td');
        const readableDate = new Date(meeting.time * 1000.0)
        meetingTimeData.innerText = readableDate.toLocaleString();

        meetingRow.appendChild(meetingIdData);
        meetingRow.appendChild(meetingDescriptionData);
        meetingRow.appendChild(meetingAddressData);
        meetingRow.appendChild(meetingTimeData);

        if (meetingIdData.innerText > 0) {
        meetingTableBody.appendChild(meetingRow);
        }
    }
}
renderMeetingTable();

const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');

document.addEventListener('submit', async event => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const credentials = {username, password};

    const httpResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        body:JSON.stringify(credentials),
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(httpResponse.status === 200) {
        const resident = await httpResponse.json();
        alert("login successful");
        window.location = "member-landing-page.html";
        resident.password = null;
         
        localStorage.setItem("resident", JSON.stringify(resident));
        localStorage.getItem("resident");
        localStorage.clear();
    }
    console.log(httpResponse.status)
    if(httpResponse.status === 404){
        alert("username not found");
    }

    if(httpResponse.status === 400){
        alert("password does not match");
    }
});
