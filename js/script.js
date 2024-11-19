window.addEventListener('DOMContentLoaded', () => {

    $(document).ready(function(){
        $('.slider').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    });

    class Stat {
        constructor(id, title, text, stat, parent) {
            this.id = id;
            this.title = title;
            this.text = text;
            this.stat = stat;
            this.parent = document.querySelector(parent);

            const statistic = document.createElement('div');
            statistic.classList.add('statistic');

            statistic.innerHTML = `
                <div class="statistic__header">
                    <h1>${this.title}</h1>
                    <p>${this.text}</p>
                </div>
                <div class="static__body">
                    <h1 id=${this.id}>> ${this.stat}</h1>
                </div>
            `

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
                
            };

            const observer = new IntersectionObserver((entries) => this.observerCallback(entries, observer), observerOptions);
            if (this.parent) {
                this.parent.append(statistic);
                observer.observe(this.parent);
            }
        }

        observerCallback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const duration = 2000,
                          end = +this.stat.replace(/\D/, ''),
                          interval = 46,
                          increment = end / (duration / interval);
    
                    let start = 0;
    
                    let counter = setInterval(() => {
                        start += increment;
    
                        if (start >= end) {
                            start = end;
                            clearInterval(counter);
                        }
                        document.getElementById(this.id).textContent = `> ${Math.floor(start).toLocaleString()}`;
                    }, interval);
                    observer.unobserve(entry.target);
                }
            });
        }
    
    }
    
    new Stat(1, 'publications', 'Was released', '1,200', '.statistic__wrapper');
    new Stat(2, 'statistics', 'Сoverage of publications', '500,000', '.statistic__wrapper');
    new Stat(3, 'seminars', 'We hold annually', '50', '.statistic__wrapper');
    new Stat(4, 'attract', 'Event participants', '2,000', '.statistic__wrapper');


    class Talent {
        constructor(img, name, position, descr, parent) {
            this.img = img;
            this.name = name;
            this.position = position;
            this.descr = descr;
            this.parent = document.querySelector(parent);

            const card = document.createElement('div');
            card.classList.add('slider__card');

            card.innerHTML = `
                <img data-color src=${this.img} alt="talent">
                <div class="card__title">
                    <h1>${this.name}</h1>
                    <p>${this.position}</p>
                </div>
                <div class="divider__about"></div>
                <div class="card__about">
                    <p>${this.descr}</p>
                </div>
            `
            if (this.parent) {
                this.parent.append(card);
            }
        }
    }

    new Talent("img/talent1.png", 'Meera Pattni', 'Head of Global Communications',
        "Meera previously served as SVP, Communications at Condé Nast where she spearheaded the company's global overhaul of its business and editorial operations. Prior, she spent almost a decade at VICE Media Group overseeing corporate and brand communications for its news, digital publishing, creative agency, studio production and television divisions. Meera started her career in journalism as a news producer for the BBC.",
        '.slider__about'
    );
    new Talent("img/talent2.png", "Al Lucca", "Head of Design",
        "Al has been leading design and creative teams for more than ten years. Before joining Semafor, he led the design teams at Axios and for streaming platforms at Paramount.  Throughout his twenty years as a designer, he has worked with a wide range of private and non-profit organizations, including the United Nations, Medicins Sans Frontieres, MTV Italy, SKY Italy, Natura, Grupo Positivo, and Grupo Lumen.",
        '.slider__about'
    );
    new Talent("img/talent3.png", "Tasneem Nashrulla", "Breaking News Editor",
        "Born and raised in Mumbai, India, Tasneem worked for the Hindustan Times before relocating to the U.S., where she earned a masters degree in journalism from Columbia University. She was previously Senior Reporter and Deputy News Director at BuzzFeed News, where she covered major national news stories including the trials of Derek Chauvin and Harvey Weinstein, the Capitol riot, and the pandemic.",
        '.slider__about'
    );
    new Talent("img/talent2.png", "Al Lucca", "Head of Design",
        "Al has been leading design and creative teams for more than ten years. Before joining Semafor, he led the design teams at Axios and for streaming platforms at Paramount.  Throughout his twenty years as a designer, he has worked with a wide range of private and non-profit organizations, including the United Nations, Medicins Sans Frontieres, MTV Italy, SKY Italy, Natura, Grupo Positivo, and Grupo Lumen.",
        '.slider__about'
    );

    $(document).ready(function(){
        $('.slider__about').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    });


    const colorImg = document.querySelectorAll('[data-color]');

    colorImg.forEach(img => {
        const src = img.src;

        img.addEventListener('mouseover', () => {
            img.animate([{ opacity: 1 }, { opacity: 0.5 }], { duration: 200, fill: 'forwards' }).onfinish = () => {
                img.src = src.replace('.png', '-color.png');
                img.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
            }
        });

        img.addEventListener('mouseout', () => {
            img.animate([{ opacity: 1 }, { opacity: 0.5 }], { duration: 200, fill: 'forwards' }).onfinish = () => {
                img.src = src;
                img.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
            }
        });
    });


    const form = document.querySelector('#form');
    const result = document.querySelector('#result')

    if (form) {
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            e.preventDefault();
    
            const obj = Object.fromEntries(formData);
            const json = JSON.stringify(obj);
    
            result.textContent = 'Please wait...';
    
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.textContent = 'Your request has been received';
                } else {
                    console.log(response);
                    result.textContent = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.textContent = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.textContent = "";
                }, 3000);
            });
        })
    }

    const hamb = document.querySelector("#hamb");
    const popup = document.querySelector("#popup");
    const body = document.body;

    const menu = document.querySelector("#menu").cloneNode(1);

    hamb.addEventListener("click", hambHandler);

    function hambHandler(e) {
        e.preventDefault();
        popup.classList.toggle("open");
        hamb.classList.toggle("active");
        body.classList.toggle("noscroll");
        renderPopup();
    }

    function renderPopup() {
        popup.appendChild(menu);
    }

    const links = Array.from(menu.children);

    links.forEach((link) => {
        link.addEventListener("click", closeOnClick);
    });

    function closeOnClick() {
        popup.classList.remove("open");
        hamb.classList.remove("active");
        body.classList.remove("noscroll");
    }
});
