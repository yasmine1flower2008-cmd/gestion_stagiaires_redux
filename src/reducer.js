const initialState = {

    // Q1 : Tableau des stagiaires
    Stagiaires: [
        {
            id: 1,
            matricule: 1454,
            nom: "Alaoui",
            codepostal: 20400,
            ville: "Casa",
            moyenne: 12.56
        },
        {
            id: 2,
            matricule: 1455,
            nom: "Mansouri",
            codepostal: 20400,
            ville: "Casa",
            moyenne: 14.67
        }
    ],

    // Q2 : Objet stagiaire
    stagiaire: {
        id: 3,
        matricule: "",
        nom: "",
        codepostal: "",
        ville: "",
        moyenne: ""
    },

    // Q3 : Tableau de recherche
    stagiaires2: [],

    prochainId: 3
};

function reducer(state = initialState, action) {

    switch (action.type) {

        // Q4 : Gérer les inputs
        case "ON_INPUT":
            return {
                ...state,
                stagiaire: {
                    ...state.stagiaire,
                    [action.payload.name]: action.payload.value
                }
            };

        // Q5 : Ajouter
        case "AJOUTER":
            return {
                ...state,
                Stagiaires: [
                    ...state.Stagiaires,
                    action.payload
                ],
                prochainId: state.prochainId + 1,
                stagiaire: {
                    id: state.prochainId + 1,
                    matricule: "",
                    nom: "",
                    codepostal: "",
                    ville: "",
                    moyenne: ""
                }
            };

        // Q7 : Supprimer
        case "SUPPRIMER":
            return {
                ...state,
                Stagiaires: state.Stagiaires.filter(
                    s => s.id !== action.payload
                )
            };

        // Q8 : Editer
        case "EDITER":
            return {
                ...state,
                stagiaire: {
                    ...state.Stagiaires.find(
                        s => s.id === action.payload
                    )
                }
            };

        // Q9 : Modifier
        case "MODIFIER":
            return {
                ...state,
                Stagiaires: state.Stagiaires.map(item => {

                    if (item.id === state.stagiaire.id) {
                        return {
                            ...state.stagiaire,
                            matricule: Number(state.stagiaire.matricule),
                            codepostal: Number(state.stagiaire.codepostal),
                            moyenne: Number(state.stagiaire.moyenne)
                        };
                    }

                    return item;
                }),

                stagiaire: {
                    id: state.prochainId,
                    matricule: "",
                    nom: "",
                    codepostal: "",
                    ville: "",
                    moyenne: ""
                }
            };

        // Q10 : Vider les champs sauf ID
        case "VIDER":
            return {
                ...state,
                stagiaire: {
                    ...state.stagiaire,
                    matricule: "",
                    nom: "",
                    codepostal: "",
                    ville: "",
                    moyenne: ""
                }
            };

        // Q11 : Filtrer par nom et ville
        case "FILTRER":
            return {
                ...state,
                stagiaires2: state.Stagiaires.filter(s =>
                    s.nom.toLowerCase().includes(
                        state.stagiaire.nom.toLowerCase()
                    ) &&
                    s.ville.toLowerCase().includes(
                        state.stagiaire.ville.toLowerCase()
                    )
                )
            };

        // Q13 : Initialiser la recherche
        case "INITIALISER_RECHERCHE":
            return {
                ...state,
                stagiaires2: []
            };

        default:
            return state;
    }
}

export default reducer;
