# language: fr
Fonctionnalité: Inscription Vendeur
   Permettre l'inscription d'un vendeur
   
   Contexte:
      Soit un site vide 

   Scénario: Inscrire un vendeur
      Etant donné que je suis sur la page d'accueil
      Quand je clique sur "Devenir Vendeur"
      Et que je clique sur le radio "Un homme"
      Et que je remplis "prenom" avec "bob"
      Et que je remplis "nom" avec "sinclar"
      Et que je remplis "email" avec "bob.sinclar@example.com"
      Et que je remplis "password" avec "password"
      Et que je remplis "confirmerpassword" avec "password"
      Et que je clique sur le bouton "Devenir vendeur"
      Alors je dois arriver sur le tableau de bord vendeur 
      #Et je reçois un email à "etienne.mallard@gmail.com"
      #Et je vois un le message "Bienvenue"

