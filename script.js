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


// ==================== VIDÉO ====================

document.getElementById("vid").onclick = () =>
    window.open(
        "https://www.youtube.com/results?search_query=organes+artificiels+medecine",
        "_blank"
    );


// ==================== QUESTIONS / QUIZ ====================

const qs = [

    [
        "Quel est l'objectif principal d'un organe artificiel?",
        [
            "Décorer le corps",
            "Remplacer ou assister une fonction biologique",
            "Changer la couleur du corps",
            "Remplacer tous les médicaments"
        ],
        1
    ],

    [
        "Quelle technique fabrique couche par couche?",
        [
            "Impression 3D",
            "Radiographie",
            "Échographie",
            "Dialyse"
        ],
        0
    ],

    [
        "La dialyse remplace certaines fonctions de quel organe?",
        [
            "Cœur",
            "Poumon",
            "Rein",
            "Cerveau"
        ],
        2
    ],

    [
        "Quel élément peut provoquer une panne?",
        [
            "Un composant mécanique ou électronique",
            "La couleur",
            "La lumière uniquement",
            "La taille uniquement"
        ],
        0
    ],

    [
        "Pourquoi le coût peut-il être une limite?",
        [
            "La recherche et le suivi peuvent être coûteux",
            "Tout est gratuit",
            "Aucun matériel n'est nécessaire",
            "Il n'y a pas de recherche"
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
                    s === 5
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