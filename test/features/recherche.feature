# language: fr
Fonctionnalité: Recherche de produits
   Teste la recherche par nom
   
      Etant donné le produit ayant pour nom "chaussures rouges" 
      Et le produit ayant pour nom "shampoing" 
      Et le produit ayant pour nom "chaussures vertes" 

   Scénario: rechercher un produit par nom
      
      Et que je suis sur la page d'accueil
      Et que je remplis "nom" avec "chaussures"
      Et que je clique sur le bouton "Rechercher"
      #Alors je vois dans les resultats le produits ayant pour nom "chaussures rouges"
      #Et je vois dans les resultats le produits ayant pour nom "chaussures vertes"

