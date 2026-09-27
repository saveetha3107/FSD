// ==========================================
// LOAD USER
// ==========================================

function loadUserDetails() {

    const userName =
        sessionStorage.getItem("userName");

    const userAvatar =
        document.getElementById("userAvatar");

    const userNameElement =
        document.getElementById("userName");


    if (userName) {

        userNameElement.textContent =
            userName;

        userAvatar.textContent =
            userName
                .charAt(0)
                .toUpperCase();

    }

}



// ==========================================
// LOAD WATER QUALITY
// ==========================================

async function loadWaterQuality() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/water-quality"
        );


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const data =
            await response.json();


        if (data.length === 0) {

            return;

        }


        const latest =
            data[data.length - 1];


        // ===============================
        // VALUES
        // ===============================

        document.getElementById(
            "phValue"
        ).textContent =
            latest.ph;


        document.getElementById(
            "turbidityValue"
        ).textContent =
            latest.turbidity;


        document.getElementById(
            "flowValue"
        ).textContent =
            latest.flow_rate;


        document.getElementById(
            "pressureValue"
        ).textContent =
            latest.pressure;



        // ===============================
        // pH STATUS
        // ===============================

        if (
            latest.ph >= 6.5 &&
            latest.ph <= 8.5
        ) {

            document.getElementById(
                "phStatus"
            ).textContent =
                "● Normal";

        } else {

            document.getElementById(
                "phStatus"
            ).textContent =
                "● Critical";

        }



        // ===============================
        // TURBIDITY STATUS
        // ===============================

        if (
            latest.turbidity <= 4
        ) {

            document.getElementById(
                "turbidityStatus"
            ).textContent =
                "● Normal";

        } else {

            document.getElementById(
                "turbidityStatus"
            ).textContent =
                "● High";

        }



        // ===============================
        // PRESSURE STATUS
        // ===============================

        if (
            latest.pressure <= 4
        ) {

            document.getElementById(
                "pressureStatus"
            ).textContent =
                "● Normal";

        } else {

            document.getElementById(
                "pressureStatus"
            ).textContent =
                "● High";

        }



        // ===============================
        // QUALITY PARAMETERS
        // ===============================

        document.getElementById(
            "scorePh"
        ).textContent =
            latest.ph;


        document.getElementById(
            "scoreTurbidity"
        ).textContent =
            latest.turbidity;


        document.getElementById(
            "scorePressure"
        ).textContent =
            latest.pressure;



        // ===============================
        // QUALITY SCORE
        // ===============================

        let score = 100;


        if (
            latest.ph < 6.5 ||
            latest.ph > 8.5
        ) {

            score -= 30;

        }


        if (
            latest.turbidity > 4
        ) {

            score -= 25;

        }


        if (
            latest.pressure > 4
        ) {

            score -= 20;

        }


        if (
            latest.temperature > 35
        ) {

            score -= 15;

        }


        document.getElementById(
            "qualityScore"
        ).textContent =
            score;



        // ===============================
        // QUALITY STATUS
        // ===============================

        if (score >= 80) {

            document.getElementById(
                "qualityStatus"
            ).textContent =
                "● Excellent Water Quality";

        }

        else if (score >= 60) {

            document.getElementById(
                "qualityStatus"
            ).textContent =
                "● Acceptable Water Quality";

        }

        else {

            document.getElementById(
                "qualityStatus"
            ).textContent =
                "● Attention Required";

        }


        console.log(
            "Latest water data:",
            latest
        );

    }


    catch (error) {

        console.error(
            "Unable to load water quality data:",
            error
        );

    }

}



// ==========================================
// START
// ==========================================

loadUserDetails();

loadWaterQuality();