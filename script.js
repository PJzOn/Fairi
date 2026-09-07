/* =========================================================
   FAIRI — ANIMATION ENGINE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");

const fairi =
    document.getElementById("fairi");

const body =
    document.querySelector(".body");

const display =
    document.querySelector(".display");

const displayHighlight =
    document.querySelector(".display-highlight");

const leftEye =
    document.querySelector(".eye-left");

const rightEye =
    document.querySelector(".eye-right");

const bodyHighlight =
    document.querySelector(".body-highlight");

const leftEyeHighlight =
    document.querySelector(".eye-left-highlight");

const rightEyeHighlight =
    document.querySelector(".eye-right-highlight");

const leftHand =
    document.querySelector(".hand-left");

const rightHand =
    document.querySelector(".hand-right");


/* =========================================================
   STATE
========================================================= */

let currentSlide = 0;

let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let fairiTurningPage = false;

let fairiLookingDown = false;

let handDirection = 1;


/* =========================================================
   POINTER TRACKING
========================================================= */

window.addEventListener(
    "pointermove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


/* =========================================================
   CLAMP
========================================================= */

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


/* =========================================================
   FAIRI FACE TRACKING
========================================================= */

function animateFairi() {

    if (!fairi) {
        return;
    }


    const rect =
        fairi.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    const dx =
        mouseX - centerX;


    const dy =
        mouseY - centerY;


    let faceDX = dx;
    let faceDY = dy;


    /* -----------------------------------------
       LOOK DOWN DURING PAGE TURN
    ----------------------------------------- */

    if (fairiLookingDown) {

        faceDX = 0;
        faceDY = 100;

    }


    /* =====================================================
       DISPLAY
       
       Android values:
       X = 0.22
       Y = 0.18
    ===================================================== */

    const displayX =
        clamp(
            faceDX * 0.22,
            -18,
            18
        );


    const displayY =
        clamp(
            faceDY * 0.18,
            -14,
            6
        );


    display.style.transform =
        `translate(${displayX}px, ${displayY}px)`;


    displayHighlight.style.transform =
        `translate(${displayX}px, ${displayY}px)`;


    /* =====================================================
       EYES
       
       Android values:
       X = 0.60
       Y = 0.52
    ===================================================== */

    const eyeX =
        clamp(
            faceDX * 0.60,
            -48,
            48
        );


    const eyeY =
        clamp(
            faceDY * 0.52,
            -40,
            40
        );


    leftEye.style.transform =
        `translate(${eyeX}px, ${eyeY}px)`;


    rightEye.style.transform =
        `translate(${eyeX}px, ${eyeY}px)`;


    leftEyeHighlight.style.transform =
        `translate(${eyeX}px, ${eyeY}px)`;


    rightEyeHighlight.style.transform =
        `translate(${eyeX}px, ${eyeY}px)`;


    requestAnimationFrame(
        animateFairi
    );

}


requestAnimationFrame(
    animateFairi
);


/* =========================================================
   HAND ANIMATION
========================================================= */

function animateHands() {

    if (!leftHand || !rightHand) {
        return;
    }


    leftHand
        .getAnimations()
        .forEach(
            animation => animation.cancel()
        );


    rightHand
        .getAnimations()
        .forEach(
            animation => animation.cancel()
        );


    leftHand.animate(
        [
            {
                transform:
                    "translate(0px, 0px)"
            },
            {
                transform:
                    "translate(3px, -2px)"
            }
        ],
        {
            duration: 600,

            direction:
                handDirection === 1
                    ? "normal"
                    : "reverse",

            easing: "ease-in-out",

            fill: "forwards"
        }
    );


    rightHand.animate(
        [
            {
                transform:
                    "translate(0px, 0px)"
            },
            {
                transform:
                    "translate(-3px, -2px)"
            }
        ],
        {
            duration: 600,

            direction:
                handDirection === 1
                    ? "normal"
                    : "reverse",

            easing: "ease-in-out",

            fill: "forwards"
        }
    );


    handDirection *= -1;

}


setInterval(
    animateHands,
    600
);


/* =========================================================
   BLINKING
========================================================= */

function blink() {

    if (
        !leftEye ||
        !rightEye
    ) {
        return;
    }


    const leftPosition =
        leftEye.style.transform ||
        "translate(0px, 0px)";


    const rightPosition =
        rightEye.style.transform ||
        "translate(0px, 0px)";


    const leftHighlightPosition =
        leftEyeHighlight.style.transform ||
        "translate(0px, 0px)";


    const rightHighlightPosition =
        rightEyeHighlight.style.transform ||
        "translate(0px, 0px)";


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
        {
            duration: 165,
            easing: "ease-in-out"
        }
    );


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
        {
            duration: 165,
            easing: "ease-in-out"
        }
    );


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
        {
            duration: 165,
            easing: "ease-in-out"
        }
    );


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
        {
            duration: 165,
            easing: "ease-in-out"
        }
    );


    setTimeout(
        blink,
        2500 +
        Math.random() * 2500
    );

}


setTimeout(
    blink,
    3000
);


/* =========================================================
   FAIRI SIZE
========================================================= */

function updateFairiSize() {

    if (!fairi) {
        return;
    }


    fairi.classList.remove(
        "big",
        "small"
    );


    if (currentSlide === 0) {

        fairi.classList.add(
            "big"
        );

    } else {

        fairi.classList.add(
            "small"
        );

    }

}


/* =========================================================
   SHOW SLIDE
========================================================= */

function showSlide(index) {

    if (index < 0) {

        index =
            slides.length - 1;

    }


    if (index >= slides.length) {

        index = 0;

    }


    currentSlide = index;


    slides.forEach(
        (slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


    dots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


    updateFairiSize();

}


/* =========================================================
   NEXT SLIDE
========================================================= */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

}


/* =========================================================
   PREVIOUS SLIDE
========================================================= */

function previousSlide() {

    showSlide(
        currentSlide - 1
    );

}


/* =========================================================
   WAIT
========================================================= */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}


/* =========================================================
   PAGE TURN
       
   IMPORTANT:
   Fairi's layout is FROZEN while the page changes.

   We DO NOT let .big/.small visibly reposition
   Fairi during the transition.
========================================================= */

async function fairiTurnPage() {

    if (fairiTurningPage) {
        return;
    }


    if (!fairi) {
        return;
    }


    fairiTurningPage = true;


    /* -----------------------------------------
       Disable interaction
    ----------------------------------------- */

    fairi.classList.add(
        "turning-active"
    );


    /* -----------------------------------------
       Stop normal float
    ----------------------------------------- */

    const oldAnimation =
        fairi.style.animation;

    fairi.style.animation = "none";


    /* -----------------------------------------
       Stop hand animation
    ----------------------------------------- */

    leftHand
        ?.getAnimations()
        .forEach(
            animation =>
                animation.cancel()
        );


    rightHand
        ?.getAnimations()
        .forEach(
            animation =>
                animation.cancel()
        );


    /* -----------------------------------------
       Remember ORIGINAL visual state
    ----------------------------------------- */

    const originalTransform =
        fairi.style.transform;


    const startRect =
        fairi.getBoundingClientRect();


    const startCenterX =
        startRect.left +
        startRect.width / 2;


    const startCenterY =
        startRect.top +
        startRect.height / 2;


    /* -----------------------------------------
       NAVIGATION DOT TARGET
    ----------------------------------------- */

    const targetCenterX =
        window.innerWidth / 2;


    const targetCenterY =
        window.innerHeight -
        35;


    const moveX =
        targetCenterX -
        startCenterX;


    const moveY =
        targetCenterY -
        startCenterY;


    /* -----------------------------------------
       LOOK DOWN
    ----------------------------------------- */

    fairiLookingDown = true;


    await wait(250);


    /* -----------------------------------------
       HAND REACH
    ----------------------------------------- */

    if (leftHand) {

        leftHand.style.transform =
            "translate(-2px, 18px)";

    }


    await wait(200);


    /* -----------------------------------------
       MOVE FAIRI TO DOTS
       
       ONLY TRANSFORM CHANGES.
       SIZE AND POSITION DO NOT.
    ----------------------------------------- */

    const moveAnimation =
        fairi.animate(
            [
                {
                    transform:
                        originalTransform ||
                        "translate(0px, 0px)"
                },
                {
                    transform:
                        `translate(
                            ${moveX}px,
                            ${moveY}px
                        )`
                }
            ],
            {
                duration: 600,

                easing:
                    "cubic-bezier(.22,1,.36,1)",

                fill: "forwards"
            }
        );


    await moveAnimation.finished;


    /* -----------------------------------------
       HOLD EXACTLY AT DOTS
    ----------------------------------------- */

    fairi.getAnimations()
        .forEach(
            animation =>
                animation.cancel()
        );


    fairi.style.transform =
        `translate(
            ${moveX}px,
            ${moveY}px
        )`;


    /* -----------------------------------------
       NOW CHANGE THE SLIDE
       
       Fairi is already at the dots.
       The new .small/.big state happens
       underneath the frozen transform.
    ----------------------------------------- */

    nextSlide();


    /* -----------------------------------------
       WAIT FOR LAYOUT TO FINISH
    ----------------------------------------- */

    await new Promise(
        resolve => {

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        resolve
                    );

                }
            );

        }
    );


    /* -----------------------------------------
       FIND WHERE NEW FAIRI WOULD BE
    ----------------------------------------- */

    const newRect =
        fairi.getBoundingClientRect();


    const newCenterX =
        newRect.left +
        newRect.width / 2;


    const newCenterY =
        newRect.top +
        newRect.height / 2;


    /* -----------------------------------------
       Calculate correction.
       
       We want Fairi's CENTER to remain
       exactly at the dots.
    ----------------------------------------- */

    const correctionX =
        targetCenterX -
        newCenterX;


    const correctionY =
        targetCenterY -
        newCenterY;


    /* -----------------------------------------
       Combine the old movement with the
       correction required by the new layout.
    ----------------------------------------- */

    fairi.style.transform =
        `translate(
            ${correctionX}px,
            ${correctionY}px
        )`;


    await wait(50);


    /* -----------------------------------------
       RETURN TO NEW NORMAL POSITION
    ----------------------------------------- */

    const returnAnimation =
        fairi.animate(
            [
                {
                    transform:
                        `translate(
                            ${correctionX}px,
                            ${correctionY}px
                        )`
                },
                {
                    transform:
                        "translate(0px, 0px)"
                }
            ],
            {
                duration: 600,

                easing:
                    "cubic-bezier(.22,1,.36,1)",

                fill: "forwards"
            }
        );


    await returnAnimation.finished;


    /* -----------------------------------------
       CLEAN UP
    ----------------------------------------- */

    fairi.getAnimations()
        .forEach(
            animation =>
                animation.cancel()
        );


    fairi.style.transform = "";

    fairi.style.animation =
        oldAnimation;


    fairi.classList.remove(
        "turning-active"
    );


    fairiLookingDown = false;


    /* -----------------------------------------
       RESET HAND
    ----------------------------------------- */

    if (leftHand) {

        leftHand.style.transform = "";

    }


    if (rightHand) {

        rightHand.style.transform = "";

    }


    fairiTurningPage = false;


    /* -----------------------------------------
       Restart hands
    ----------------------------------------- */

    animateHands();

}


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight" ||
            event.key === " " ||
            event.key === "PageDown"
        ) {

            event.preventDefault();

            fairiTurnPage();

        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "PageUp"
        ) {

            event.preventDefault();

            previousSlide();

        }


        if (event.key === "Home") {

            showSlide(0);

        }


        if (event.key === "End") {

            showSlide(
                slides.length - 1
            );

        }

    }
);


/* =========================================================
   DOT NAVIGATION
========================================================= */

dots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (fairiTurningPage) {
                    return;
                }

                showSlide(index);

            }
        );

    }
);


/* =========================================================
   PAGE CLICK NAVIGATION
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /* Ignore dots */

        if (
            event.target.closest(".dots")
        ) {

            return;

        }


        /* Ignore buttons / links / controls */

        if (
            event.target.closest("button") ||
            event.target.closest("a") ||
            event.target.closest("input") ||
            event.target.closest("select") ||
            event.target.closest("textarea")
        ) {

            return;

        }


        if (fairiTurningPage) {
            return;
        }


        if (
            event.clientX >
            window.innerWidth / 2
        ) {

            fairiTurnPage();

        } else {

            previousSlide();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateFairiSize();

animateHands();