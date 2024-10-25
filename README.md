# SubnetCalc - Calculateur de Sous-réseaux Pédagogique 🌐

## Description
SubnetCalc est un outil web interactif conçu pour faciliter l'apprentissage et le calcul des sous-réseaux IP. Cette application combine fonctionnalité et pédagogie en fournissant non seulement les résultats des calculs mais également des explications détaillées sur la méthode utilisée.

![SubnetCalc Screenshot](screenshot.png) <!-- Vous pouvez ajouter une capture d'écran de l'application ici -->

## Fonctionnalités ✨

- Calcul automatique des informations essentielles du sous-réseau :
  - Adresse de sous-réseau
  - Première adresse utilisable
  - Dernière adresse utilisable
  - Adresse de diffusion
  - Sous-réseau suivant
  - Nombre d'hôtes disponibles
- Support des formats CIDR (/24) et décimal (255.255.255.0)
- Interface utilisateur intuitive et responsive
- Explications détaillées des calculs
- Visualisation des opérations en binaire
- Design moderne et animations fluides

## Technologies Utilisées 🛠️

- HTML5
- CSS3 (avec Flexbox et Grid)
- JavaScript (Vanilla)
- Google Fonts (Roboto)

## Installation 📦

1. Clonez le repository :
```bash
git clone https://github.com/Pascal1812/SubnetCalc.git
```

2. Accédez au répertoire du projet :
```bash
cd SubnetCalc
```

3. Ouvrez le fichier `index.html` dans votre navigateur web

## Structure du Projet 📁

```
SubnetCalc/
├── index.html
├── styles.css
├── script.js
├── README.md
```

## Utilisation 💡

1. Entrez une adresse IP dans le format XXX.XXX.XXX.XXX
2. Entrez un masque de sous-réseau (format décimal ou CIDR)
3. Cliquez sur "Calculer"
4. Consultez les résultats et survolez les cartes pour voir les explications détaillées

### Exemple
```
Adresse IP : 192.168.3.164
Masque : 255.255.255.240 ou /28
```

## Contribution 🤝

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
```bash
git checkout -b feature/AmazingFeature
```
3. Committez vos changements
```bash
git commit -m 'Add some AmazingFeature'
```
4. Poussez vers la branche
```bash
git push origin feature/AmazingFeature
```
5. Ouvrez une Pull Request

## Format de Commit

- feat: Nouvelle fonctionnalité
- fix: Correction de bug
- docs: Documentation
- style: Formatage
- refactor: Refactorisation de code
- test: Ajout de tests
- chore: Tâches diverses

## Contact 📧

Votre Nom - [@Pascal031812](https://x.com/Pascal031812)

Lien du projet : [https://github.com/Pascal1812/SubnetCalc](https://github.com/Pascal1812/SubnetCalc)

## Remerciements 🙏

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- Tous les contributeurs qui participent à l'amélioration de ce projet

---

## Versions 🔄

- **1.0.0** (25/10/2024)
  - Version initiale
  - Calculs de base des sous-réseaux
  - Interface utilisateur responsive
  - Explications des calculs

- **1.1.0** (À venir)
  - Support IPv6
  - Mode sombre
  - Export des résultats en PDF

## Roadmap 🛣️

- [ ] Ajout du support IPv6
- [ ] Mode sombre
- [ ] Sauvegarde des calculs récents
- [ ] Export des résultats en différents formats
- [ ] Support multilingue

## FAQ ❓

**Q: Puis-je utiliser l'application sur mobile ?**
R: Oui, l'application est entièrement responsive et s'adapte à tous les écrans.

**Q: Comment signaler un bug ?**
R: Vous pouvez ouvrir une issue sur GitHub en décrivant le problème rencontré.

---
Créé avec ❤️ pour la communauté réseau