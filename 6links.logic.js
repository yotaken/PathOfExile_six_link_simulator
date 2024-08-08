let fadeOldHistoryTimeout = setTimeout(fadeOldHistory.bind(), 1500);

function fadeOldHistory() {
    $('#history').fadeOut(1500, function () {
        $(this).slideUp(150, function () {
            $(this).empty();
        }).fadeIn();
    });
}

$(document).ready(function () {

    let simulations = [];

    $('#simulateButton').click(function () {
        const maxTries = parseInt($('#maxTries').val()) || 1;
        simulateMultipleTimes(maxTries);
    });

    function simulateMultipleTimes(maxTries) {
        for (let i = 0; i < maxTries; i++) {
            simulate(maxTries === 1);
        }
    }

    function simulate(displayHistoric = true) {
        const chance6L = 1 / 1000;
        let fusingsUsed = 0;
        let sixLinkAchieved = false;

        while (!sixLinkAchieved) {
            fusingsUsed++;
            let roll = Math.random();

            if (roll <= chance6L) {
                sixLinkAchieved = true;
            }
        }

        displayResults(fusingsUsed);
        updateHistory(fusingsUsed, displayHistoric);
        simulations.push(fusingsUsed);
    }

    function displayResults(fusingsUsed) {
        const resultText = `It took ${fusingsUsed} Orbs of Fusing to get a 6-Link.`;
        $('#results').val(resultText);

        const within1500 = fusingsUsed <= 1500 ? "Yes" : "No";
        $('#stats').html(`
            Average fusings per 6L: ${(fusingsUsed / 1).toFixed(2)}<br>
            Achieved within 1500 fusings: ${within1500}
        `);
    }

    function updateHistory(fusingsUsed, displayHistory) {
        const within1500 = fusingsUsed <= 1500 ? "Yes" : "No";
        const historyEntry = `<li class="list-group-item">
            <strong>${fusingsUsed} fusings</strong> - 6L Achieved - Within 1500: ${within1500}
        </li>`;
        if (displayHistory) {
            clearTimeout(fadeOldHistoryTimeout);
            $('#history').append(historyEntry);
            fadeOldHistoryTimeout = setTimeout(fadeOldHistory.bind(), 1500);
        }

        updateSummary();
    }

    function updateSummary() {
        const totalSimulations = simulations.length;
        const over1500 = simulations.filter(fusings => fusings > 1500).length;
        const averageFusings = (simulations.reduce((sum, fusings) => sum + fusings, 0) / totalSimulations).toFixed(2);

        $('#summary').html(`
            <strong>Total Simulations:</strong> ${totalSimulations}<br>
            <strong>Average fusings per 6L:</strong> ${averageFusings}<br>
            <strong>6L Achieved after more than 1500 fusings:</strong> ${over1500} (${((over1500 / totalSimulations) * 100).toFixed(2)}%)
        `);
    }
});
