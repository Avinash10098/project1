function locomotiveAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    setTimeout(() => {
        locoScroll.destroy();
    }, 0);
    setTimeout(() => {
        locoScroll.init();
    }, 50);
    setTimeout(() => {
        locoScroll.update();
    }, 1000);
}
locomotiveAnimation();

function loadingAnimation() {
    var tl = gsap.timeline();

    tl.from('#loader h1 ,h2', {
        y: 150,
        delay: 0.5,
        duration: 0.6,
        stagger: 0.25
    })
    tl.from('#counter-container, .loader-content-1 h2', {
        opacity: 0,
        onStart: function () {
            let count = 0;
            const crt = document.getElementById('counter');
            setInterval(function () {
                if (count < 100) {
                    crt.innerHTML = count++;
                } else {
                    crt.innerHTML = 100;
                }
            }, 27)
        },
    })

    tl.to('#loader', {
        opacity: 0,
        duration: 0.4,
        delay: 4
    })

    tl.from('#page1', {
        y: 1600,
        delay: 0.2,
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeInOut,
    })
    tl.to('#loader', {
        display: "none",
    })

    tl.from('nav', {
        opacity: 0,
    })

    tl.from("#hero1 h1,#hero2 h1,#hero3 h1,#hero4 h1", {
        y: 140,
        stagger: 0.2,
    })
}

loadingAnimation();


function cursorAnimation() {
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.43, 1, 0.320, 1)",
        duration: 1,
    });

    Shery.makeMagnet(".nav-link h4 , #logo");

    var videoContainer = document.querySelector(".video-container");
    videoContainer.addEventListener('mouseenter', function () {
        videoContainer.addEventListener('mousemove', function (dets) {
            gsap.to("#video-cursor", {
                left: dets.x - 420,
                top: dets.y - 220
            })
        })
        videoContainer.addEventListener('mouseleave', function () {
            gsap.to("#video-cursor", {
                left: "80%",
                top: "-12vh",
            })
            // gsap.to('#crsr', {
            //     opacity: 1,
            // })
        })
    })

    var video = document.querySelector('video');
    var videoCursor = document.getElementById('video-cursor');
    let flag = 0
    videoContainer.addEventListener('click', function () {
        if (flag == 0) {
            video.play();
            videoCursor.innerHTML = `<i class="ri-pause-mini-fill"></i>`
            video.style.opacity = 1;
            flag = 1;
            gsap.to("#video-cursor", {
                scale: 0.5,
            })
            flag = 1;
        } else {
            video.pause();
            videoCursor.innerHTML = `<i class="ri-play-mini-fill"></i>`
            video.style.opacity = 0;
            flag = 1;
            gsap.to("#video-cursor", {
                scale: 1,
            })
            flag = 0;
        }
    })
}

cursorAnimation();

function sheryAnimation() {
    Shery.imageEffect(".image", {
        style: 5,
        config: { "a": { "value": 5.5, "range": [0, 30] }, "b": { "value": -1, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7779671681816511 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.5, "range": [0, 10] }, "metaball": { "value": 0.33, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.01, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true,
    });
}

sheryAnimation();


document.addEventListener('mousemove', function (dets) {
    gsap.to('#flag', {
        left: dets.x,
        top: dets.y
    })
})

document.querySelector('#hero3').addEventListener('mousemove', function () {
    gsap.to('#flag', {
        opacity: 1,
    })
})
document.querySelector('#hero3').addEventListener('mouseleave', function () {
    gsap.to('#flag', {
        opacity: 0,
    })
})

gsap.from('#page4-container', {
    y: 200,
    opacity: 0,
    delay: 0.2,
    ease: "power3.out",
    duration: 1,
    scrollTrigger: {
        trigger: '#page4-container',
        scroller: '#main',
        // markers: true,
        start: 'top 70%',
    }
})






