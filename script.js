// ==================== ANIMATIONS AU SCROLL ====================

const els = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
    es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
        }
    }),
    {
        threshold: 0.08
    }
);

els.forEach(e => io.observe(e));


// ==================== MENU MOBILE ====================

const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

menu.onclick = () => nav.classList.toggle("open");

nav.querySelectorAll("a").forEach(
    a => a.onclick = () => nav.classList.remove("open")
);


// ==================== QUESTIONS / QUIZ ====================

const qs = [
    [
        "Quel est l'un des principaux avantages des organes artificiels ?",
        [
            "Ils peuvent remplacer certaines fonctions d'un organe défaillant.",
            "Ils guérissent toutes les maladies définitivement.",
            "Ils rendent le système immunitaire inutile."
        ],
        0
    ],
    [
        "Pourquoi les biomatériaux sont-ils importants dans les organes artificiels ?",
        [
            "Ils doivent être compatibles avec le corps humain.",
            "Ils doivent être facilement cassables.",
            "Ils doivent empêcher complètement la circulation du sang."
        ],
        0
    ],
    [
        "Quel problème peut limiter l'utilisation à long terme d'un organe artificiel ?",
        [
            "Le manque de couleur naturelle.",
            "L'usure du dispositif ou une réaction du corps.",
            "La différence de taille entre les patients."
        ],
        1
    ],
    [
        "Comment une prothèse bionique peut-elle reproduire certains mouvements du bras ?",
        [
            "En utilisant des signaux musculaires pour contrôler des moteurs électroniques.",
            "En faisant repousser automatiquement les os du bras.",
            "En fonctionnant uniquement grâce à la chaleur du corps."
        ],
        0
    ],
    [
        "Quel est le principal rôle d'un organe artificiel ?",
        [
            "Remplacer ou aider une fonction biologique défaillante.",
            "Modifier l'apparence extérieure du corps.",
            "Supprimer complètement le besoin d'une visite médicale."
        ],
        0
    ]
];

let n = 0;
let s = 0;
let ok = false;


// ==================== AFFICHAGE D'UNE QUESTION ====================

function render() {

    ok = false;

    count.textContent = `Question ${n + 1} / ${qs.length}`;

    bar.style.width = ((n + 1) / qs.length * 100) + "%";

    let x = qs[n];

    q.innerHTML = `
        <div class="question">

            <h3>${x[0]}</h3>

            <div class="answers">

                ${x[1]
                    .map(
                        (a, i) =>
                            `<button data-i="${i}">${a}</button>`
                    )
                    .join("")}

            </div>

        </div>
    `;

    q.querySelectorAll("button").forEach(
        b => b.onclick = () => answer(+b.dataset.i)
    );

    next.disabled = true;
    next.style.opacity = 0.5;
}


// ==================== VÉRIFICATION DE LA RÉPONSE ====================

function answer(i) {

    if (ok) return;

    ok = true;

    let x = qs[n];

    q.querySelectorAll("button").forEach((b, j) => {

        b.disabled = true;

        if (j === x[2]) {
            b.classList.add("correct");
        }

        if (j === i && i !== x[2]) {
            b.classList.add("wrong");
        }

    });

    if (i === x[2]) {
        s++;
    }

    next.disabled = false;
    next.style.opacity = 1;
}


// ==================== QUESTION SUIVANTE / RÉSULTAT ====================

next.onclick = () => {

    if (!ok) return;

    if (n < qs.length - 1) {

        n++;
        render();

    } else {

        q.hidden = true;
        next.hidden = true;

        result.innerHTML = `
            <h2>${s}/${qs.length}</h2>

            <p>
                ${
                    s === qs.length
                        ? "Excellent !"
                        : s >= 3
                            ? "Bravo !"
                            : "Bon début ! Relisez les différentes parties."
                }
            </p>

            <button class="btn" onclick="location.reload()">
                Recommencer
            </button>
        `;
    }
};


// ==================== LANCEMENT DU QUIZ ====================

render();


// ==================== RIGHT-CLICK NAVIGATION ====================
// Right-click anywhere (no Ctrl/Meta) scrolls to the next main <section>
document.addEventListener("contextmenu", (e) => {
    if (e.ctrlKey || e.metaKey) return; // allow normal menu with modifier
    e.preventDefault();

    const sections = Array.from(document.querySelectorAll("main section"));
    if (!sections.length) return;

    const y = window.scrollY || window.pageYOffset;
    // find next section whose top is below current scroll position + small offset
    let next = sections.find(s => s.getBoundingClientRect().top + window.scrollY > y + 10);
    if (!next) next = sections[0];

    next.scrollIntoView({ behavior: "smooth", block: "start" });
});