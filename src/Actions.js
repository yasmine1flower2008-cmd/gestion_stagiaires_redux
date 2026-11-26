// Q4 : Gérer les inputs
export const onInput = (name, value) => ({
    type: "ON_INPUT",
    payload: { name, value }
});

// Q5 : Ajouter
export const Ajouter = (stagiaire) => ({
    type: "AJOUTER",
    payload: stagiaire
});

// Q7 : Supprimer
export const Supprimer = (id) => ({
    type: "SUPPRIMER",
    payload: id
});

// Q8 : Editer
export const Editer = (id) => ({
    type: "EDITER",
    payload: id
});

// Q9 : Modifier
export const Modifier = () => ({
    type: "MODIFIER"
});

// Q10 : Vider
export const Vider = () => ({
    type: "VIDER"
});

// Q11 : Filtrer
export const Filtrer = () => ({
    type: "FILTRER"
});

// Q13 : Initialiser la recherche
export const InitialiserRecherche = () => ({
    type: "INITIALISER_RECHERCHE"
});
