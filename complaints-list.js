
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

            const highBtnTD = document.createElement('td');
            highBtnTD.style.textAlign = 'center';
            const highPriorityBtn = document.createElement('button');
            highPriorityBtn.className = 'btn btn-light myButton';
            highBtnTD.appendChild(highPriorityBtn);
            highPriorityBtn.innerText = "High Priority";
            highPriorityBtn.dataset.complaintId = complaint.complaintId;
            highPriorityBtn.dataset.status = "high";
            highPriorityBtn.addEventListener('click', async event => {
                event.preventDefault();

                const complaintId = highPriorityBtn.dataset.complaintId;
                const status = highPriorityBtn.dataset.status;

                const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/complaints/${complaintId}/${status}`, {
                    method: "PATCH"
                });
                const complaints = await response.json();
                if (response.status === 202) {
                    alert("Status updated.")
                    location.reload();
                } else if (response.status === 304) {
                    alert("Error. Status not changed.")
                }
            });

            const lowBtnTD = document.createElement('td');
            lowBtnTD.style.textAlign = 'center';
            const lowPriorityBtn = document.createElement('button');
            lowPriorityBtn.className = 'btn btn-light myButton';
            lowBtnTD.appendChild(lowPriorityBtn);
            lowPriorityBtn.innerText = "Low Priority";
            lowPriorityBtn.dataset.complaintId = complaint.complaintId;
            lowPriorityBtn.dataset.status = "low";
            lowPriorityBtn.addEventListener('click', async event => {
                event.preventDefault();

                const complaintId = lowPriorityBtn.dataset.complaintId;
                const status = lowPriorityBtn.dataset.status;

                const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/complaints/${complaintId}/${status}`, {
                    method: "PATCH"
                });
                const complaints = await response.json();
                if (response.status === 202) {
                    alert("Status updated.")
                    location.reload();
                } else if (response.status === 304) {
                    alert("Error. Status not changed.")
                }
            });

            const ignoreBtnTD = document.createElement('td');
            ignoreBtnTD.style.textAlign = 'center';
            const ignoreBtn = document.createElement('button');
            ignoreBtn.className = 'btn btn-light myButton';
            ignoreBtnTD.appendChild(ignoreBtn);
            ignoreBtn.innerText = "Ignore";
            ignoreBtn.dataset.complaintId = complaint.complaintId;
            ignoreBtn.dataset.status = "ignore";
            ignoreBtn.addEventListener('click', async event => {
                event.preventDefault();

                const complaintId = ignoreBtn.dataset.complaintId;
                const status = ignoreBtn.dataset.status;

                const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/complaints/${complaintId}/${status}`, {
                    method: "PATCH"
                });
                const complaints = await response.json();
                if (response.status === 202) {
                    alert("Status updated.")
                    location.reload();
                } else if (response.status === 304) {
                    alert("Error. Status not changed.")
                }
            });            
            
            const addressedBtnTD = document.createElement('td');
            addressedBtnTD.style.textAlign = 'center';
            const addressedBtn = document.createElement('button');
            addressedBtn.className = 'btn btn-light myButton';
            addressedBtnTD.appendChild(addressedBtn);
            addressedBtn.innerText = "Addressed";
            addressedBtn.dataset.complaintId = complaint.complaintId;
            addressedBtn.dataset.status = "addressed";
            addressedBtn.addEventListener('click', async event => {
                event.preventDefault();

                const complaintId = addressedBtn.dataset.complaintId;
                const status = addressedBtn.dataset.status;

                const response = await fetch(`https://complaint-app.calmcoast-837dad38.eastus.azurecontainerapps.io/complaints/${complaintId}/${status}`, {
                    method: "PATCH"
                });
                const complaints = await response.json();
                if (response.status === 202) {
                    alert("Status updated.")
                    location.reload();
                } else if (response.status === 304) {
                    alert("Error. Status not changed.")
                }
            });


            complaintRow.appendChild(complaintIdData);
            complaintRow.appendChild(complaintTitleData);
            complaintRow.appendChild(complaintDescriptionData);
            complaintRow.appendChild(complaintStatusData);
            complaintRow.appendChild(complaintMeetingIdData);
            complaintRow.appendChild(highBtnTD);
            complaintRow.appendChild(lowBtnTD);
            complaintRow.appendChild(ignoreBtnTD);
            complaintRow.appendChild(addressedBtnTD);

            complaintTableBody.appendChild(complaintRow);
        }
    }

    renderComplaintTable();