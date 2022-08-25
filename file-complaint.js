
    const inputTitle = document.getElementById('inputTitle');
    const inputDescription = document.getElementById('inputDescription');

    document.addEventListener("submit", async event => {
        event.preventDefault();

        const title = inputTitle.value;
        const description = inputDescription.value;
        const complaint = {complaintId:0, title, description};

        const response = await fetch(`http://localhost:8080/complaint`,{
            method:"POST",
            body: JSON.stringify(complaint),
            headers:{
                "Content-Type":"application/json"
            }
        });
    

        if (response.status === 201) {
            alert("Complaint filed.")
            inputTitle.value = "";
            inputDescription.value = "";
        } else { 
            alert("Error. Complaint not filed.")
    }
    });