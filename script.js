/* =========================================================
   DESA PIANTUS
   PREMIUM JAVASCRIPT
   Compatible dengan HTML + CSS yang diberikan
========================================================= */

"use strict";

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const header = document.getElementById("header");
    const navMenu = document.getElementById("nav-menu");
    const menuToggle = document.getElementById("menu-toggle");

    const preloader = document.getElementById("preloader");

    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");

    /*
     * =====================================================
     * MUSIC
     *
     * Tidak autoplay saat halaman dibuka.
     * Browser modern memang dapat memblokir autoplay
     * audio dengan suara.
     *
     * Musik hanya dimainkan setelah tombol musik ditekan.
     * =====================================================
     */

    if (backgroundMusic) {

        backgroundMusic.preload = "auto";
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.25;

        const musicSource =
            backgroundMusic.querySelector("source");

        if (musicSource) {

            musicSource.src =
                "assets/audio/musiksbs.mp3";

        } else {

            backgroundMusic.src =
                "assets/audio/musiksbs.mp3";

        }

        /*
         * Load file musik tanpa menjalankan autoplay.
         */
        backgroundMusic.load();

    }


    const backToTop =
        document.getElementById("back-to-top");

    const currentYear =
        document.getElementById("current-year");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxClose =
        document.getElementById("lightbox-close");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section[id]");

    const counters =
        document.querySelectorAll(".counter");

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const videos =
        document.querySelectorAll("video");


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PRELOADER
    ====================================================== */

    function hidePreloader() {

        if (!preloader) return;

        preloader.classList.add("loaded");

        setTimeout(() => {

            preloader.style.display = "none";

        }, 800);

    }


    window.addEventListener("load", () => {

        setTimeout(() => {

            hidePreloader();

        }, 500);

    });


    setTimeout(() => {

        hidePreloader();

    }, 5000);


    /* =====================================================
       NAVBAR
    ====================================================== */

    function handleNavbar() {

        if (!header) return;

        const scrollPosition =
            window.scrollY;

        if (scrollPosition > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbar,
        {
            passive: true
        }
    );

    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle("active");

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Tutup menu"
                        : "Buka menu"
                );

                body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Buka menu"
                    );

                    body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });


        document.addEventListener(
            "click",
            event => {

                if (
                    navMenu.classList.contains("active") &&
                    !navMenu.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    body.classList.remove(
                        "menu-open"
                    );

                }

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight +
                        5;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href &&
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });


        if (window.scrollY < 300) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });

            const homeLink =
                document.querySelector(
                    '.nav-link[href="#beranda"]'
                );

            if (homeLink) {

                homeLink.classList.add("active");

            }

        }

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(

            ".section-header, " +
            ".intro-image, " +
            ".intro-content, " +
            ".origin-card, " +
            ".interesting-card, " +
            ".history-block, " +
            ".timeline-item, " +
            ".vision-card, " +
            ".mission-item, " +
            ".village-head, " +
            ".official-card, " +
            ".territory-grid, " +
            ".geography-item, " +
            ".population-card, " +
            ".potential-card, " +
            ".culture-card, " +
            ".legend-container, " +
            ".custom-item, " +
            ".adat-principle, " +
            ".award-card, " +
            ".video-card, " +
            ".gallery-item, " +
            ".creator-card"

        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }

            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =====================================================
       STAGGER ANIMATION
    ====================================================== */

    const staggerGroups = [

        ".interesting-card",
        ".mission-item",
        ".official-card",
        ".geography-item",
        ".population-card",
        ".potential-card",
        ".culture-card",
        ".award-card",
        ".video-card",
        ".gallery-item",
        ".custom-item"

    ];


    staggerGroups.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(
                (element, index) => {

                    element.style.setProperty(
                        "--delay",
                        `${index * 80}ms`
                    );

                }
            );

    });


    /* =====================================================
       COUNTER ANIMATION
    ====================================================== */

    function animateCounter(counter) {

        const target =
            Number(
                counter.getAttribute(
                    "data-target"
                )
            ) || 0;

        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                Math.floor(
                    easedProgress *
                    target
                );

            counter.textContent =
                currentValue.toLocaleString(
                    "id-ID"
                );


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString(
                        "id-ID"
                    );

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.5
                }

            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    } else {

        counters.forEach(counter => {

            animateCounter(counter);

        });

    }

        /* =====================================================
       GALLERY FILTER
    ====================================================== */

    if (
        filterButtons.length &&
        galleryItems.length
    ) {

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add(
                        "active"
                    );

                    const filter =
                        button.getAttribute(
                            "data-filter"
                        );


                    galleryItems.forEach(
                        item => {

                            const category =
                                item.getAttribute(
                                    "data-category"
                                );


                            if (
                                filter === "all" ||
                                filter === category
                            ) {

                                item.style.display =
                                    "";

                                requestAnimationFrame(
                                    () => {

                                        item.classList.add(
                                            "revealed"
                                        );

                                    }
                                );

                            } else {

                                item.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        });

    }


    /* =====================================================
       LIGHTBOX
    ====================================================== */

    function openLightbox(
        imageSource,
        imageAlt
    ) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightboxImage.src =
            imageSource;

        lightboxImage.alt =
            imageAlt || "";


        lightbox.classList.add(
            "active"
        );

        body.classList.add(
            "lightbox-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );

        body.classList.remove(
            "lightbox-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        if (lightboxImage) {

            setTimeout(() => {

                lightboxImage.src = "";

            }, 300);

        }

    }


    galleryItems.forEach(item => {

        const image =
            item.querySelector("img");


        if (!image) {
            return;
        }


        item.addEventListener(
            "click",
            event => {

                /*
                 * Jangan membuka lightbox jika
                 * user sedang menekan tombol/link.
                 */
                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }


                openLightbox(
                    image.currentSrc ||
                    image.src,
                    image.alt
                );

            }
        );

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       MUSIC PLAYER
       TIDAK AUTOPLAY
    ====================================================== */

    let musicPlaying = false;


    function updateMusicUI() {

        if (!musicToggle) {
            return;
        }


        if (musicPlaying) {

            musicToggle.classList.add(
                "playing"
            );

            musicToggle.setAttribute(
                "aria-label",
                "Jeda musik"
            );

            musicToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            musicToggle.classList.remove(
                "playing"
            );

            musicToggle.setAttribute(
                "aria-label",
                "Putar musik"
            );

            musicToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    if (
        backgroundMusic &&
        musicToggle
    ) {

        /*
         * Sinkronkan state ketika audio selesai
         * atau dihentikan browser.
         */
        backgroundMusic.addEventListener(
            "play",
            () => {

                musicPlaying = true;

                updateMusicUI();

            }
        );


        backgroundMusic.addEventListener(
            "pause",
            () => {

                musicPlaying = false;

                updateMusicUI();

            }
        );


        backgroundMusic.addEventListener(
            "ended",
            () => {

                musicPlaying = false;

                updateMusicUI();

            }
        );


        /*
         * Tombol musik adalah SATU-SATUNYA
         * pemicu play/pause.
         *
         * Karena event ini berasal dari klik user,
         * browser mengizinkan audio dimainkan.
         */
        musicToggle.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        backgroundMusic.paused
                    ) {

                        await backgroundMusic.play();

                        musicPlaying = true;

                    } else {

                        backgroundMusic.pause();

                        musicPlaying = false;

                    }


                    updateMusicUI();

                } catch (error) {

                    musicPlaying = false;

                    updateMusicUI();


                    console.warn(
                        "Musik tidak dapat diputar. " +
                        "Pastikan file " +
                        "assets/audio/musiksbs.mp3 " +
                        "tersedia.",
                        error
                    );

                }

            }
        );


        /*
         * Jika volume berubah menjadi 0,
         * tandai player sebagai muted.
         */
        backgroundMusic.addEventListener(
            "volumechange",
            () => {

                if (
                    backgroundMusic.volume === 0 &&
                    musicPlayer
                ) {

                    musicPlayer.classList.add(
                        "muted"
                    );

                } else if (musicPlayer) {

                    musicPlayer.classList.remove(
                        "muted"
                    );

                }

            }
        );

    }


    /*
     * Pastikan tampilan tombol benar
     * sejak halaman pertama kali dibuka.
     */
    updateMusicUI();


    /* =====================================================
       VIDEO CONTROL
       User controls play/pause.
       Tidak ada autoplay paksa.
       Hanya satu video boleh dimainkan
       pada satu waktu.
    ====================================================== */

    videos.forEach(video => {

        /*
         * Penting untuk HP/iPhone/Android.
         */
        video.playsInline = true;

        video.setAttribute(
            "playsinline",
            ""
        );


        /*
         * Jangan biarkan JavaScript
         * mengontrol play secara otomatis.
         *
         * User tetap memakai kontrol video
         * bawaan browser.
         */


        video.addEventListener(
            "play",
            () => {

                /*
                 * Kalau video A dimainkan,
                 * video B otomatis dijeda.
                 *
                 * Ini tidak mengganggu tombol
                 * play/pause video yang sedang aktif.
                 */
                videos.forEach(
                    otherVideo => {

                        if (
                            otherVideo !== video &&
                            !otherVideo.paused
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

            }
        );


        video.addEventListener(
            "error",
            () => {

                console.warn(
                    "Video gagal dimuat:",
                    video.currentSrc ||
                    video.src
                );

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );


                image.setAttribute(
                    "data-image-error",
                    "true"
                );

            }
        );

    });


    /* =====================================================
       PARALLAX HERO
    ====================================================== */

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    function heroParallax() {

        if (
            !hero ||
            !heroContent
        ) {
            return;
        }


        /*
         * Matikan efek pada mobile.
         */
        if (
            window.innerWidth < 768
        ) {

            heroContent.style.transform =
                "";

            return;

        }


        const scrollY =
            window.scrollY;


        if (
            scrollY <
            window.innerHeight
        ) {

            const movement =
                scrollY * 0.12;

            const opacity =
                Math.max(
                    0,
                    1 -
                    scrollY /
                    (
                        window.innerHeight *
                        0.9
                    )
                );


            heroContent.style.transform =
                `translateY(${movement}px)`;


            heroContent.style.opacity =
                opacity;

        }

    }


    window.addEventListener(
        "scroll",
        heroParallax,
        {
            passive: true
        }
    );


    /* =====================================================
       MOUSE PARALLAX CARD
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".interesting-card, " +
            ".potential-card, " +
            ".award-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        (y - centerY) /
                        centerY
                    ) * -3;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 3;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

        /* =====================================================
       BUTTON RIPPLE EFFECT
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .filter-btn, .music-button, .back-to-top"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "ripple"
                );


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px`;


                ripple.style.top =
                    `${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px`;


                this.appendChild(
                    ripple
                );


                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    650
                );

            }
        );

    });


    /* =====================================================
       IMAGE LAZY LOAD ENHANCEMENT
    ====================================================== */

    const lazyImages =
        document.querySelectorAll(
            'img[loading="lazy"]'
        );


    if (
        "IntersectionObserver" in window
    ) {

        const imageObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const image =
                                    entry.target;


                                image.classList.add(
                                    "image-loaded"
                                );


                                imageObserver.unobserve(
                                    image
                                );

                            }

                        }
                    );

                },

                {
                    rootMargin: "100px"
                }

            );


        lazyImages.forEach(
            image => {

                imageObserver.observe(
                    image
                );

            }
        );

    }


    /* =====================================================
       GALLERY IMAGE LOADED EFFECT
    ====================================================== */

    galleryItems.forEach(item => {

        const image =
            item.querySelector("img");


        if (!image) {
            return;
        }


        if (image.complete) {

            item.classList.add(
                "image-ready"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    item.classList.add(
                        "image-ready"
                    );

                }
            );

        }

    });


    /* =====================================================
       SECTION HEADER TEXT ANIMATION
    ====================================================== */

    const sectionTitles =
        document.querySelectorAll(
            ".section-header h2"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const titleObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "title-visible"
                                );


                                titleObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.5
                }

            );


        sectionTitles.forEach(
            title => {

                titleObserver.observe(
                    title
                );

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    const progressBar =
        document.createElement(
            "div"
        );


    progressBar.className =
        "scroll-progress";


    document.body.appendChild(
        progressBar
    );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (
            documentHeight <= 0
        ) {
            return;
        }


        const progress =
            (
                scrollTop /
                documentHeight
            ) * 100;


        progressBar.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =====================================================
       CURSOR GLOW DESKTOP
    ====================================================== */

    const cursorGlow =
        document.createElement(
            "div"
        );


    cursorGlow.className =
        "cursor-glow";


    if (
        window.innerWidth >= 1024
    ) {

        document.body.appendChild(
            cursorGlow
        );


        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       CARD IMAGE ZOOM
    ====================================================== */

    const imageCards =
        document.querySelectorAll(
            ".card-image img, " +
            ".potential-image img, " +
            ".history-image img, " +
            ".legend-image img, " +
            ".creator-photo img"
        );


    imageCards.forEach(image => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.classList.add(
                    "image-hover"
                );

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.classList.remove(
                    "image-hover"
                );

            }
        );

    });
        /* =====================================================
       RESIZE HANDLER
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        /*
                         * Tutup mobile menu
                         * ketika kembali ke desktop.
                         */
                        if (
                            window.innerWidth > 992 &&
                            navMenu
                        ) {

                            navMenu.classList.remove(
                                "active"
                            );


                            if (menuToggle) {

                                menuToggle.classList.remove(
                                    "active"
                                );

                                menuToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                                menuToggle.setAttribute(
                                    "aria-label",
                                    "Buka menu"
                                );

                            }


                            body.classList.remove(
                                "menu-open"
                            );

                        }


                        /*
                         * Refresh hero parallax.
                         */
                        heroParallax();


                    },
                    200
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       REDUCED MOTION ACCESSIBILITY
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        prefersReducedMotion.matches
    ) {

        document.documentElement.classList.add(
            "reduce-motion"
        );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       ONLINE / OFFLINE STATUS
    ====================================================== */

    function updateConnectionStatus() {

        if (!navigator.onLine) {

            body.classList.add(
                "offline-mode"
            );

        } else {

            body.classList.remove(
                "offline-mode"
            );

        }

    }


    window.addEventListener(
        "online",
        updateConnectionStatus
    );


    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    updateConnectionStatus();


    /* =====================================================
       PREVENT DOUBLE TAP ZOOM PADA BUTTON
    ====================================================== */

    document
        .querySelectorAll(
            "button, .btn, .nav-link"
        )
        .forEach(element => {

            element.style.webkitTapHighlightColor =
                "transparent";

        });


    /* =====================================================
       ACCESSIBILITY LIGHTBOX FOCUS
    ====================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "transitionend",
            () => {

                if (
                    lightbox.classList.contains(
                        "active"
                    ) &&
                    lightboxClose
                ) {

                    lightboxClose.focus();

                }

            }
        );

    }


    /* =====================================================
       CONSOLE BRANDING
    ====================================================== */

    console.log(
        "%c🌿 DESA PIANTUS",
        `
        color:#c9a227;
        font-size:24px;
        font-weight:700;
        `
    );


    console.log(
        "%cWebsite Profil Desa Piantus",
        `
        color:#31572c;
        font-size:14px;
        font-weight:600;
        `
    );


    console.log(
        "%cPremium JavaScript initialized ✓",
        `
        color:#777;
        font-size:12px;
        `
    );


    /* =====================================================
       INITIALIZATION COMPLETE
    ====================================================== */

    body.classList.add(
        "js-loaded"
    );

});

