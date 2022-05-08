# cacestcool

### Technologies utilisées

- Backend: NodeJS + ExpressJS
- Frontend: VueJS
- Base de données: MongoDB + Mongoose

### Requis pour faire tourner l'application

#### Une base de donnée MongoDB
- Nom: cacestcool
- Collections : posts, users

#### Modifier le .env si c'est nécessaire

### Features

- Ajout d utilisateurs
- Connexion (Tant qu il y a un token valide dans le Localstorage, l utilisateur reste conncecter à l application, même si il ferme et réouvre le navigaterur)
- Impossibilité de se rendre sur les pages login et register si on est connecter. (Utilisation des navigation guards de Vue-Router)
```javascript
	router.beforeEach(async (to, from, next) => { //Appelé avant chaque arrivée sur une page
        if (!store.state.isLogged._id) {         
            if (localStorage.getItem('token')) { //Si il y a un token dans le localstorage
                store.dispatch("checkToken")     //Alors on appel la méthode CheckToken qui
                    .then(response => {          //va vérifier si le token est bien valide et va
                        if (response) {         //connecter l'utilisateur si c'est le cas.
			     //Si l'utilisateur essaye de se rendre sur la page register ("/") ou la page
			    //login, il est regirigé vers la page d'accueil ("/home")
                            if (to.path === "/" || to.path === "/login") next("/home"); 
                            else next();
                        } else { //Si le token n'est pas valide il est redirigé vers la page Login
                            if (to.path !== "/login" && to.path !== "/") next("/login");
                            else next();
                        }
                    })
            } else {
                if (to.path !== "/login" && to.path !== "/") next('/login');
                else next();
            }
        } else {
            next();
        }
    })
```
- Déconnexion (Page "Mon Compte")
- Ajout / Modification / Suppression de post 
- Possibilité de mettre ou non une image sur son post
- Ajout / Suppression de commentaires
- Possibilité de laisser un like sur les posts (pas les siens)
- Ajouter / Modifier / Supprimer sa photo de profil (Page "Mon compte")
- Modification de son nom d utilisateur, adresse email et mot de passe (page "Mon compte"
- Utilisation de JSON Web Token pour sécuriser l'API
- Utilisation de Bcrypt pour hasher les mots de passe
