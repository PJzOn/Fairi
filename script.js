/* =========================================================
   FAIRI OFFICIAL WEBSITE
   JAVASCRIPT
   ========================================================= */

/* =========================================================
   APK DOWNLOAD LINK
   CHANGE ONLY THIS ONE URL WHEN YOU RELEASE A NEW APK
   ========================================================= */

const APK_DOWNLOAD_URL = "https://drive.google.com/file/d/1Zd8UU7tzQ5MQBBw5JR6kgdtnXwbwW-Sm/view?usp=sharing";


/* =========================================================
   FAIRI VERSION HISTORY
   Add a new object here when a new version is released.
   The page will render it automatically.
   ========================================================= */

const FAIRI_VERSIONS = [
    {
        version: "v0.1",
        name: "First Light",
        status: "CURRENT",
        current: true,
        description:
            "The first experimental Android prototype — establishing Fairi as a floating Guardian AI companion.",
        features: [
            "Floating on-screen Fairi companion",
            "Layered animated character",
            "Voice interaction and listening",
            "AI-generated conversational responses",
            "Text-to-speech output",
            "Experimental live context / monitoring",
            "Initial Fairi Brain interaction loop"
        ],
        footnote:
            "Experimental prototype. Reliable content filtering, device restrictions and the full parent ecosystem are not implemented yet."
    },

    {
        version: "v0.2",
        name: "Awakening",
        status: "PLANNED",
        current: false,
        description:
            "A more natural Fairi presence with improved interaction quality and character responsiveness.",
        features: [
            "Improved hovering and idle animation",
            "More natural TTS pronunciation",
            "Better listening behavior",
            "Improved AI response quality",
            "More responsive Fairi interaction states"
        ],
        footnote:
            "Development target — features may change as the prototype evolves."
    },

    {
        version: "v0.3",
        name: "Growing",
        status: "PLANNED",
        current: false,
        description:
            "Fairi becomes more context-aware and personalized as the Guardian AI layer develops.",
        features: [
            "Stronger contextual understanding",
            "Deeper personalization",
            "Improved memory behavior",
            "Better intervention timing",
            "Additional Fairi interaction states"
        ],
        footnote:
            "Development target — deeper safety intelligence remains under active development."
    },

    {
        version: "v1.0",
        name: "FAIRI",
        status: "VISION",
        current: false,
        description:
            "The long-term Guardian AI vision: a mature context-aware companion built around guidance, safety and connection.",
        features: [
            "Reliable safety intelligence",
            "Deeper device context",
            "Secure memory and synchronization",
            "Advanced personalization",
            "Mature parent ecosystem",
            "Expanded platform support"
        ],
        footnote:
            "Long-term product vision, not a claim about the current prototype."
    }
];


/* =========================================================
   VERSION HISTORY RENDERER
   ========================================================= */

function renderVersionHistory(){

    const container = document.getElementById("version-list");

    if(!container){
        return;
    }

    container.innerHTML = FAIRI_VERSIONS.map(version => `
        <article class="version-card ${version.current ? "current" : ""} reveal">

            <div class="version-top">
                <span class="version-number">
                    ${version.version}
                </span>

                <span class="version-status">
                    ${version.status}
                </span>
            </div>

            <h3>
                ${version.name}
            </h3>

            <p>
                ${version.description}
            </p>

            <ul class="version-features">
                ${version.features
                    .map(feature => `<li>${feature}</li>`)
                    .join("")}
            </ul>

            <div class="version-footnote">
                ${version.footnote}
            </div>

        </article>
    `).join("");

    container
        .querySelectorAll(".reveal")
        .forEach(el => {

            if(typeof revealObserver !== "undefined"){
                revealObserver.observe(el);
            }

        });
}


/* =========================================================
   DOWNLOAD LINKS
   ========================================================= */

document.querySelectorAll("[data-download]").forEach(link => {

    link.href = APK_DOWNLOAD_URL;

    /*
       Prevent broken placeholder links.
    */

    if(
        APK_DOWNLOAD_URL ===
        "YOUR_APK_DOWNLOAD_LINK_HERE"
    ){

        link.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "The APK download link has not been added yet."
            );

        });

    }

});


/* =========================================================
   NAVIGATION
   ========================================================= */

const nav = document.getElementById("nav");

function updateNav(){

    if(!nav){
        return;
    }

    nav.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

}

window.addEventListener(
    "scroll",
    updateNav,
    { passive:true }
);

updateNav();


/* =========================================================
   FAIRI ELEMENTS
   ========================================================= */

const fairi = document.getElementById("fairi");

if(fairi){

    const display =
        fairi.querySelector(".display");

    const displayHighlight =
        fairi.querySelector(".display-highlight");

    const leftEye =
        fairi.querySelector(".eye-left");

    const rightEye =
        fairi.querySelector(".eye-right");

    const leftEyeHighlight =
        fairi.querySelector(".eye-left-highlight");

    const rightEyeHighlight =
        fairi.querySelector(".eye-right-highlight");

    const leftHand =
        fairi.querySelector(".hand-left");

    const rightHand =
        fairi.querySelector(".hand-right");


    /* =====================================================
       AUTONOMOUS LOOKING

       Fairi chooses where to look periodically.
       This does NOT depend on the mouse cursor.
       ===================================================== */

    let targetFaceX = 0;
    let targetFaceY = 0;

    let currentFaceX = 0;
    let currentFaceY = 0;


    function chooseLook(){

        const directions = [

            { x:-1,   y:0 },

            { x:0,    y:0 },

            { x:1,    y:0 },

            { x:-0.7, y:-0.35 },

            { x:0.7,  y:-0.35 },

            { x:0,    y:0.55 }

        ];

        const direction =
            directions[
                Math.floor(
                    Math.random() *
                    directions.length
                )
            ];

        targetFaceX = direction.x;
        targetFaceY = direction.y;


        /*
           Choose another look after
           roughly 1.3–3.9 seconds.
        */

        const nextDelay =
            1300 +
            Math.random() * 2600;

        setTimeout(
            chooseLook,
            nextDelay
        );

    }


    function animateFace(){

        currentFaceX +=
            (targetFaceX - currentFaceX) *
            0.055;

        currentFaceY +=
            (targetFaceY - currentFaceY) *
            0.055;


        /*
           Display moves less.
           Eyes move more.
        */

        const displayX =
            currentFaceX * 13;

        const displayY =
            currentFaceY * 9;


        const eyeX =
            currentFaceX * 30;

        const eyeY =
            currentFaceY * 24;


        const displayTransform =
            `translate3d(
                ${displayX}px,
                ${displayY}px,
                0
            )`;

        const eyeTransform =
            `translate3d(
                ${eyeX}px,
                ${eyeY}px,
                0
            )`;


        if(display){
            display.style.transform =
                displayTransform;
        }

        if(displayHighlight){
            displayHighlight.style.transform =
                displayTransform;
        }


        if(leftEye){
            leftEye.style.transform =
                eyeTransform;
        }

        if(rightEye){
            rightEye.style.transform =
                eyeTransform;
        }


        if(leftEyeHighlight){
            leftEyeHighlight.style.transform =
                eyeTransform;
        }

        if(rightEyeHighlight){
            rightEyeHighlight.style.transform =
                eyeTransform;
        }


        requestAnimationFrame(
            animateFace
        );

    }


    chooseLook();
    animateFace();


    /* =====================================================
       BLINKING
       ===================================================== */

    function blink(){

        const leftPosition =
            leftEye.style.transform ||
            "translate3d(0,0,0)";

        const rightPosition =
            rightEye.style.transform ||
            "translate3d(0,0,0)";

        const leftHighlightPosition =
            leftEyeHighlight.style.transform ||
            "translate3d(0,0,0)";

        const rightHighlightPosition =
            rightEyeHighlight.style.transform ||
            "translate3d(0,0,0)";


        const options = {
            duration:155,
            easing:"ease-in-out"
        };


        if(leftEye){

            leftEye.animate(

                [
                    {
                        transform:
                            `${leftPosition} scaleY(1)`
                    },

                    {
                        transform:
                            `${leftPosition} scaleY(.08)`
                    },

                    {
                        transform:
                            `${leftPosition} scaleY(1)`
                    }
                ],

                options

            );

        }


        if(rightEye){

            rightEye.animate(

                [
                    {
                        transform:
                            `${rightPosition} scaleY(1)`
                    },

                    {
                        transform:
                            `${rightPosition} scaleY(.08)`
                    },

                    {
                        transform:
                            `${rightPosition} scaleY(1)`
                    }
                ],

                options

            );

        }


        if(leftEyeHighlight){

            leftEyeHighlight.animate(

                [
                    {
                        transform:
                            `${leftHighlightPosition} scaleY(1)`
                    },

                    {
                        transform:
                            `${leftHighlightPosition} scaleY(.08)`
                    },

                    {
                        transform:
                            `${leftHighlightPosition} scaleY(1)`
                    }
                ],

                options

            );

        }


        if(rightEyeHighlight){

            rightEyeHighlight.animate(

                [
                    {
                        transform:
                            `${rightHighlightPosition} scaleY(1)`
                    },

                    {
                        transform:
                            `${rightHighlightPosition} scaleY(.08)`
                    },

                    {
                        transform:
                            `${rightHighlightPosition} scaleY(1)`
                    }
                ],

                options

            );

        }


        /*
           Random blink interval:
           approximately 2.6–5.6 seconds.
        */

        setTimeout(
            blink,
            2600 +
            Math.random() * 3000
        );

    }


    /*
       First blink.
    */

    setTimeout(
        blink,
        2400
    );


    /* =====================================================
       HAND MICRO-MOVEMENT
       ===================================================== */

    let handDirection = 1;


    function animateHands(){

        if(leftHand){

            leftHand.animate(

                [
                    {
                        transform:
                            "translate3d(0,0,0)"
                    },

                    {
                        transform:
                            "translate3d(3px,-2px,0)"
                    }
                ],

                {
                    duration:900,

                    direction:
                        handDirection === 1
                            ? "normal"
                            : "reverse",

                    easing:"ease-in-out",

                    fill:"forwards"
                }

            );

        }


        if(rightHand){

            rightHand.animate(

                [
                    {
                        transform:
                            "translate3d(0,0,0)"
                    },

                    {
                        transform:
                            "translate3d(-3px,-2px,0)"
                    }
                ],

                {
                    duration:900,

                    direction:
                        handDirection === 1
                            ? "reverse"
                            : "normal",

                    easing:"ease-in-out",

                    fill:"forwards"
                }

            );

        }


        handDirection *= -1;

    }


    animateHands();


    setInterval(
        animateHands,
        900
    );


    /* =====================================================
       TOUCH / POINTER INTERACTION
       ===================================================== */

    fairi.addEventListener(
        "pointerdown",
        () => {

            /*
               Fairi looks slightly upward
               when touched.
            */

            targetFaceX = 0;
            targetFaceY = -0.75;


            fairi.animate(

                [
                    {
                        transform:
                            "translate3d(0,0,0) scale(1)"
                    },

                    {
                        transform:
                            "translate3d(0,-8px,0) scale(1.025)"
                    },

                    {
                        transform:
                            "translate3d(0,0,0) scale(1)"
                    }
                ],

                {
                    duration:500,

                    easing:
                        "cubic-bezier(.22,1,.36,1)"
                }

            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold:.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(el => {

        revealObserver.observe(el);

    });


/* =========================================================
   RENDER VERSION HISTORY
   ========================================================= */

renderVersionHistory();