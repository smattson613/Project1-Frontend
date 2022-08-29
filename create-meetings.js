const complaintTableBody = document.getElementById("complaintTableBody");

    async function getComplaints() {
        const httpResponse = await fetch('https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/complaints');
        const complaints = await httpResponse.json();
        return complaints;
    }

    async function renderComplaintTable() {
        const testComplaint = await getComplaints()

        for (const complaint of testComplaint) {
            const complaintRow = document.createElement('tr');

            const complaintIdData = document.createElement('td');
            complaintIdData.innerText = complaint.complaintId;

            const complaintTitleData = document.createElement('td');
            complaintTitleData.innerText = complaint.title;

            const complaintDescriptionData = document.createElement('td');
            complaintDescriptionData.innerText = complaint.description;

            const complaintStatusData = document.createElement('td');
            complaintStatusData.innerText = complaint.status;

            const complaintMeetingIdData = document.createElement('td');
            complaintMeetingIdData.style.textAlign = 'center';
            complaintMeetingIdData.innerText = complaint.meetingId;

            const meetingAssignTD = document.createElement('td');
            const meetingAssignInput = document.createElement('input');
            meetingAssignInput.id = `assignInput` + `${complaint.complaintId}`;
            meetingAssignTD.appendChild(meetingAssignInput);

            const assignBtnTD = document.createElement('td');
            const assignBtn = document.createElement('button');
            assignBtn.className = 'btn btn-light myButton';
            assignBtnTD.appendChild(assignBtn);
            assignBtn.dataset.meetingId = meetingAssignInput.value;
            assignBtn.innerText = "Assign";
            assignBtn.addEventListener('click', async event => {
                event.preventDefault();

                const complaintId = complaint.complaintId;
                const meetingId = document.getElementById(`assignInput` + `${complaint.complaintId}`).value;

                const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/assign/${complaintId}/${meetingId}`, {
                    method: "PATCH"
                });
                const complaints = await response.json();
                if (response.status === 202) {
                    alert("Complaint assigned to meeting.")
                    location.reload();
                } else if (response.status === 304) {
                    alert("Error. Not assigned to meeting.")
                }
            });



            complaintRow.appendChild(complaintIdData);
            complaintRow.appendChild(complaintTitleData);
            complaintRow.appendChild(complaintDescriptionData);
            complaintRow.appendChild(complaintStatusData);
            complaintRow.appendChild(complaintMeetingIdData);
            complaintRow.appendChild(meetingAssignTD);
            complaintRow.appendChild(assignBtnTD);

            complaintTableBody.appendChild(complaintRow);
        }
    }
    renderComplaintTable();

    const inputDescription = document.getElementById('inputDescription');
    const inputAddress = document.getElementById('inputAddress');
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');

    document.addEventListener("submit", async event => {
        event.preventDefault();

        const description = inputDescription.value;
        const address = inputAddress.value;
        const date = inputDate.value;
        const time = inputTime.value;
        const fullDate = new Date(date + " " + time);
        const epochDate = fullDate.getTime() / 1000.0;
        const meeting = { meetingId: 0, description, address, time: epochDate };

        const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/meeting`, {
            method: "POST",
            body: JSON.stringify(meeting),
            headers: {
                "Content-Type": "application/json"
            }
        });


        if (response.status === 201) {
            alert("Meeting Created.")
            inputDescription.value = "";
            inputAddress.value = "";
            inputTime.value = "";
        } else {
            alert("Error. Meeting not created.")
        }
    });