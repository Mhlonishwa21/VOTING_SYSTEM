
const party = document.getElementById("partyForm");
const municipality = document.getElementById("municipalityForm");
const election = document.getElementById("electionForm");

party.addEventListener("submit", async function(event) {

    event.preventDefault();

    const partyName = document.getElementById("partyName").value;
    const abbreviation = document.getElementById("abbreviation").value;
    const description = document.getElementById("description").value;
    const partyLogo = document.getElementById("partyLogo").files[0];

    const formData = new FormData();

    formData.append("partyName", partyName);
    formData.append("abbreviation", abbreviation);
    formData.append("description", description);

    if (partyLogo) {
        formData.append("partyLogo", partyLogo);
    }

    try {
        const response = await fetch("http://localhost:3000/api/admin/parties", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Political party added successfully!");
            party.reset();
        } else {
            alert(data.message || "Failed to add political party.");
        }

    } catch (error) {
        console.error("Political party error:", error);
        alert("Unable to connect to the server.");
    }
});


municipality.addEventListener("submit", async function(event) {

    event.preventDefault();

    const municipalityName = document.getElementById("municipalityName").value;
    const district = document.getElementById("district").value;
    const province = document.getElementById("province").value;

    try {
        const response = await fetch("http://localhost:3000/api/admin/municipalities", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                municipalityName,
                district,
                province
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Municipality added successfully!");
            municipality.reset();
        } else {
            alert(data.message || "Failed to add municipality.");
        }

    } catch (error) {
        console.error("Municipality error:", error);
        alert("Unable to connect to the server.");
    }
});

election.addEventListener("submit", async function(event) {

    event.preventDefault();

    const electionName = document.getElementById("electionName").value;
    const electionDescription = document.getElementById("electionDescription").value;
    const electionMunicipality = document.getElementById("electionMunicipality").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
        alert("Election end date must be after the start date!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/admin/elections", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                electionName,
                electionDescription,
                electionMunicipality,
                startDate,
                endDate
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Election created successfully!");
            election.reset();
        } else {
            alert(data.message || "Failed to create election.");
        }

    } catch (error) {
        console.error("Election error:", error);
        alert("Unable to connect to server.");
    }
});
