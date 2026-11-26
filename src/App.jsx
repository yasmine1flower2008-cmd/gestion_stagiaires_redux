import { useSelector, useDispatch } from "react-redux";

import {
    onInput,
    Ajouter as AjouterAction,
    Supprimer as SupprimerAction,
    Editer as EditerAction,
    Modifier as ModifierAction,
    Vider as ViderAction,
    Filtrer as FiltrerAction,
    InitialiserRecherche as InitialiserRechercheAction
} from "./Actions";

function App() {

    // Récupérer les données du Store
    const {
        Stagiaires,
        stagiaire,
        stagiaires2,
        prochainId
    } = useSelector(state => state);

    const dispatch = useDispatch();

    // Q4 : Gérer les inputs
    function handleInput(e) {
        const { name, value } = e.target;
        dispatch(onInput(name, value));
    }

    // Q5 : Ajouter un stagiaire
    function Ajouter() {

        if (
            stagiaire.matricule === "" ||
            stagiaire.nom === "" ||
            stagiaire.codepostal === "" ||
            stagiaire.ville === "" ||
            stagiaire.moyenne === ""
        ) {
            alert("Remplir tous les champs");
            return;
        }

        if (
            Number(stagiaire.moyenne) < 0 ||
            Number(stagiaire.moyenne) > 20
        ) {
            alert("La moyenne doit être entre 0 et 20");
            return;
        }

        let existe = Stagiaires.find(
            s => s.matricule == stagiaire.matricule
        );

        if (existe) {
            alert("Matricule déjà existant");
            return;
        }

        let nouveau = {
            ...stagiaire,
            id: prochainId,
            matricule: Number(stagiaire.matricule),
            codepostal: Number(stagiaire.codepostal),
            moyenne: Number(stagiaire.moyenne)
        };

        dispatch(AjouterAction(nouveau));
    }

    // Q6 : Afficher les stagiaires
    function Afficher() {

        return Stagiaires.map(s => (
            <tr key={s.id} className="border-b hover:bg-violet-50 transition">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.matricule}</td>
                <td className="p-3 font-medium">{s.nom}</td>
                <td className="p-3">{s.codepostal}</td>
                <td className="p-3">{s.ville}</td>
                <td className="p-3">{s.moyenne}</td>

                <td className="p-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => Supprimer(s.id)}
                            className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition"
                        >
                            Supprimer
                        </button>

                        <button
                            onClick={() => Editer(s.id)}
                            className="bg-amber-100 text-amber-700 px-3 py-2 rounded-lg hover:bg-amber-200 transition"
                        >
                            Editer
                        </button>
                    </div>
                </td>
            </tr>
        ));
    }

    // Q7 : Supprimer un stagiaire
    function Supprimer(id) {
        dispatch(SupprimerAction(id));
    }

    // Q8 : Editer un stagiaire
    function Editer(id) {
        dispatch(EditerAction(id));
    }

    // Q9 : Modifier un stagiaire
    function Modifier() {

        if (
            stagiaire.matricule === "" ||
            stagiaire.nom === "" ||
            stagiaire.codepostal === "" ||
            stagiaire.ville === "" ||
            stagiaire.moyenne === ""
        ) {
            alert("Remplir tous les champs");
            return;
        }

        if (
            Number(stagiaire.moyenne) < 0 ||
            Number(stagiaire.moyenne) > 20
        ) {
            alert("La moyenne doit être entre 0 et 20");
            return;
        }

        let existe = Stagiaires.find(
            s => s.matricule == stagiaire.matricule &&
                 s.id !== stagiaire.id
        );

        if (existe) {
            alert("Matricule déjà existant");
            return;
        }

        dispatch(ModifierAction());
    }

    // Q10 : Vider les champs
    function Vider() {
        dispatch(ViderAction());
    }

    // Q11 : Filtrer par nom et ville
    function Filtrer() {
        dispatch(FiltrerAction());
    }

    // Q12 : Afficher le résultat de recherche
    function AfficherRecherche() {

        if (stagiaires2.length === 0) {
            return (
                <p className="text-gray-500 text-center bg-gray-50 p-4 rounded-lg">
                    Tableau de recherche vide
                </p>
            );
        }

        return (
            <ul className="space-y-2">
                {stagiaires2.map(s => (
                    <li
                        key={s.id}
                        className="bg-violet-50 border border-violet-100 p-4 rounded-lg"
                    >
                        <span className="font-semibold text-violet-900">
                            {s.nom}
                        </span>
                        <span className="text-gray-600"> - {s.ville}</span>
                    </li>
                ))}
            </ul>
        );
    }

    // Q13 : Initialiser la recherche
    function InitialiserRecherche() {
        dispatch(InitialiserRechercheAction());
    }

    // Q14 : Calculer la moyenne de la classe
    function CalculerMoyenne() {

        if (Stagiaires.length === 0) {
            return 0;
        }

        let somme = Stagiaires.reduce(
            (total, s) => total + s.moyenne,
            0
        );

        return (somme / Stagiaires.length).toFixed(2);
    }

    // Q15 : Trouver le maximum et le minimum
    function CalculerMaxMin() {

        if (Stagiaires.length === 0) {
            return <p>Aucun stagiaire disponible</p>;
        }

        let max = Stagiaires[0].moyenne;
        let min = Stagiaires[0].moyenne;

        for (let i = 1; i < Stagiaires.length; i++) {

            if (Stagiaires[i].moyenne > max) {
                max = Stagiaires[i].moyenne;
            }

            if (Stagiaires[i].moyenne < min) {
                min = Stagiaires[i].moyenne;
            }
        }

        return (
            <div className="space-y-2">
                <p>
                    Meilleure moyenne :
                    <span className="font-bold text-green-700 ml-2">
                        {max}
                    </span>
                </p>

                <p>
                    Plus faible moyenne :
                    <span className="font-bold text-red-600 ml-2">
                        {min}
                    </span>
                </p>
            </div>
        );
    }

    // Q16 : Affichage principal
    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-6xl mx-auto">

                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-violet-900">
                        Gestion des stagiaires
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Gestion des informations et des résultats des stagiaires
                    </p>
                </div>

                {/* FORMULAIRE */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Informations du stagiaire
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                ID
                            </label>
                            <input
                                type="number"
                                value={stagiaire.id}
                                readOnly
                                name="id"
                                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Matricule
                            </label>
                            <input
                                onChange={handleInput}
                                type="number"
                                placeholder="Matricule"
                                value={stagiaire.matricule}
                                name="matricule"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Nom
                            </label>
                            <input
                                onChange={handleInput}
                                type="text"
                                placeholder="Nom"
                                value={stagiaire.nom}
                                name="nom"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Code postal
                            </label>
                            <input
                                onChange={handleInput}
                                type="number"
                                placeholder="Code postal"
                                value={stagiaire.codepostal}
                                name="codepostal"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Ville
                            </label>
                            <input
                                onChange={handleInput}
                                type="text"
                                placeholder="Ville"
                                value={stagiaire.ville}
                                name="ville"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Moyenne
                            </label>
                            <input
                                onChange={handleInput}
                                type="number"
                                placeholder="Moyenne"
                                value={stagiaire.moyenne}
                                name="moyenne"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            />
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">

                        <button
                            onClick={Ajouter}
                            className="bg-violet-800 text-white px-6 py-3 rounded-lg hover:bg-violet-900 transition"
                        >
                            Ajouter
                        </button>

                        <button
                            onClick={Modifier}
                            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                            Modifier
                        </button>

                        <button
                            onClick={Vider}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                        >
                            Vider
                        </button>

                    </div>
                </div>

               
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        Liste des stagiaires
                    </h2>

                    {Stagiaires.length === 0 ? (
                        <p className="text-red-600 text-center py-6">
                            Tableau des stagiaires vide
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">

                                <thead>
                                    <tr className="bg-violet-800 text-white">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Matricule</th>
                                        <th className="p-3">Nom</th>
                                        <th className="p-3">Code postal</th>
                                        <th className="p-3">Ville</th>
                                        <th className="p-3">Moyenne</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Afficher()}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>

                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Recherche des stagiaires
                    </h2>

                    <p className="text-gray-500 text-sm mb-4">
                        Utiliser les champs Nom et Ville du formulaire.
                    </p>

                    <div className="flex gap-3 flex-wrap">

                        <button
                            onClick={Filtrer}
                            className="bg-violet-800 text-white px-6 py-3 rounded-lg hover:bg-violet-900 transition"
                        >
                            Filtrer
                        </button>

                        <button
                            onClick={InitialiserRecherche}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                        >
                            Initialiser recherche
                        </button>

                    </div>

                    <div className="mt-5">
                        {AfficherRecherche()}
                    </div>

                </div>

                {/* STATISTIQUES */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        Statistiques
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="bg-violet-50 p-5 rounded-lg border border-violet-100">
                            <p className="text-gray-500 text-sm">
                                Nombre de stagiaires
                            </p>
                            <p className="text-2xl font-bold text-violet-900 mt-2">
                                {Stagiaires.length}
                            </p>
                        </div>

                        <div className="bg-violet-50 p-5 rounded-lg border border-violet-100">
                            <p className="text-gray-500 text-sm">
                                Moyenne de la classe
                            </p>
                            <p className="text-2xl font-bold text-violet-900 mt-2">
                                {CalculerMoyenne()}
                            </p>
                        </div>

                        <div className="bg-violet-50 p-5 rounded-lg border border-violet-100">
                            <p className="text-gray-500 text-sm mb-3">
                                Résultats
                            </p>
                            {CalculerMaxMin()}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
