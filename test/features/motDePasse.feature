# language: fr
Fonctionnalité: Changer son mot de passe
   Permettre de changer son mot de passe
   
   Contexte:
      Soit un site vide 

   Scénario: Changer de mot de passe
      Etant donné que je suis inscrit comme vendeur avec l'email "vendeur@example.com" et le mot de passe "pass"
      Quand je clique sur "Mot de passe oublié"
      Et que je remplis "email" avec "vendeur@example.com"
      Alors je reçois un email avec un lien 
      Si je clique sur ce lien
      Et que je remplis "password_create_new[first]" avec "monNouveauMotDePassse"
      Et que je remplis "password_create_new[second]" avec "monNouveauMotDePassse"
      Et que je clique sur "Valider"
      Alors Je peux me connecter avec l'email "vendeur@example.com" et le mot de passe "monNouveauMotDePassse"
      Et Je ne peux pas me connecter avec l'email "vendeur@example.com" et le mot de passe "pass"

      #Et je vois un le message "Bienvenue"

