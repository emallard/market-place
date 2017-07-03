# language: fr
Fonctionnalité: Inscription Vendeur
   Permettre l'inscription d'un vendeur
   
   Contexte:
      Soit un site vide 

   Scénario: Inscrire un vendeur
      Etant donné que je suis sur la page d'accueil
      Quand je clique sur "Devenir vendeur"
      Et que je remplis "email" avec "etienne.mallard@gmail.com"
      Et que je remplis "password" avec "password"
      Et que je clique sur le bouton "Devenir vendeur"
      Alors je dois arriver sur le tableau de bord vendeur 
      #Et je vois un le message "Bienvenue"

