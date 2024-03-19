-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 26 jan. 2024 à 20:47
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_saintviateur`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL,
  `admin` varchar(250) DEFAULT NULL,
  `dte_naissance` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `mdp` varchar(100) NOT NULL,
  `nom` varchar(15) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `role` varchar(30) NOT NULL,
  `status` varchar(15) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `apprenant`
--

CREATE TABLE `apprenant` (
  `id` bigint(20) NOT NULL,
  `abonnement_expiry_date` datetime DEFAULT NULL,
  `admin` varchar(250) DEFAULT NULL,
  `change_mdp` bit(1) DEFAULT NULL,
  `dte_inscription` date NOT NULL,
  `dte_naissance` date NOT NULL,
  `frais_inscription` int(11) NOT NULL,
  `is_up_to_date_echeancier` bit(1) DEFAULT NULL,
  `is_validated_registration` bit(1) DEFAULT NULL,
  `lieu_naissance` varchar(500) NOT NULL,
  `mail` varchar(250) DEFAULT NULL,
  `mail_parent` varchar(250) DEFAULT NULL,
  `mdp` varchar(250) NOT NULL,
  `nom` varchar(500) NOT NULL,
  `nom_parent` varchar(500) DEFAULT NULL,
  `nv_scolaire` varchar(250) DEFAULT NULL,
  `password_reset_token` varchar(100) DEFAULT NULL,
  `prenom` varchar(500) NOT NULL,
  `prenom_parent` varchar(500) DEFAULT NULL,
  `profession` varchar(250) DEFAULT NULL,
  `scolarite` int(11) NOT NULL,
  `scolarite_payé` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `tel_parent` varchar(250) DEFAULT NULL,
  `telephone_domicile` varchar(250) DEFAULT NULL,
  `telephone_mobile` varchar(250) DEFAULT NULL,
  `test_is_checked` bit(1) NOT NULL,
  `token_expiry_date_time` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id` bigint(20) NOT NULL,
  `commentaire` varchar(5000) DEFAULT NULL,
  `nom` varchar(500) DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `prenom` varchar(500) DEFAULT NULL,
  `status` bit(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie_cours`
--

CREATE TABLE `categorie_cours` (
  `id` bigint(20) NOT NULL,
  `libelle` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` bigint(20) NOT NULL,
  `dte_dte_debut_cours` date NOT NULL,
  `dte_dte_fin_cours` date NOT NULL,
  `echeancier_used` bit(1) NOT NULL,
  `forfait` varchar(250) NOT NULL,
  `heure_cours` varchar(30) NOT NULL,
  `is_actif` bit(1) NOT NULL,
  `libelle` varchar(250) NOT NULL,
  `montant` int(11) NOT NULL,
  `status` varchar(250) NOT NULL,
  `domaine_categorie_id` bigint(20) DEFAULT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL,
  `professeur_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `demande_inscription`
--

CREATE TABLE `demande_inscription` (
  `id` bigint(20) NOT NULL,
  `domaine` varchar(1000) NOT NULL,
  `dte_debut_cours` date NOT NULL,
  `dte_fin_cours` date NOT NULL,
  `dte_naissance` date NOT NULL,
  `mail` varchar(250) NOT NULL,
  `mdp` varchar(250) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `nv_scolaire` varchar(250) DEFAULT NULL,
  `prenom` varchar(500) NOT NULL,
  `profession` varchar(250) DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  `telephone` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `domaine_categorie`
--

CREATE TABLE `domaine_categorie` (
  `id` bigint(20) NOT NULL,
  `libelle` varchar(250) NOT NULL,
  `place_disponible` int(11) NOT NULL,
  `status` varchar(250) NOT NULL,
  `categorie_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `echeancier`
--

CREATE TABLE `echeancier` (
  `id` bigint(20) NOT NULL,
  `date_echeance` date DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `montant` int(11) NOT NULL,
  `status` varchar(250) NOT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL,
  `cours_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `flyway_schema_history`
--
-- Erreur de lecture de structure pour la table bd_saintviateur.flyway_schema_history : #1932 - Table &#039;bd_saintviateur.flyway_schema_history&#039; doesn&#039;t exist in engine
-- Erreur de lecture des données pour la table bd_saintviateur.flyway_schema_history : #1064 - Erreur de syntaxe près de &#039;FROM `bd_saintviateur`.`flyway_schema_history`&#039; à la ligne 1

-- --------------------------------------------------------

--
-- Structure de la table `frais_inscription`
--

CREATE TABLE `frais_inscription` (
  `id` bigint(20) NOT NULL,
  `admin` varchar(250) NOT NULL,
  `date_paiement` date NOT NULL,
  `frais_inscription` int(11) NOT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `horaire_mensuel`
--

CREATE TABLE `horaire_mensuel` (
  `id` bigint(20) NOT NULL,
  `heure_mensuel` int(11) DEFAULT NULL,
  `mois` varchar(250) NOT NULL,
  `professeur` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `marque_de_presence`
--

CREATE TABLE `marque_de_presence` (
  `id` bigint(20) NOT NULL,
  `date_marque_de_presence` date DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `heure_debut` varchar(255) DEFAULT NULL,
  `heure_effectue` bigint(20) NOT NULL,
  `heure_fin` varchar(255) DEFAULT NULL,
  `presence` varchar(255) DEFAULT NULL,
  `presence_professeur` varchar(255) DEFAULT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL,
  `cours_id` bigint(20) DEFAULT NULL,
  `professeur_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` bigint(20) NOT NULL,
  `admin` varchar(250) NOT NULL,
  `date_paiement` date NOT NULL,
  `jour` date DEFAULT NULL,
  `montant` int(11) NOT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL,
  `cours_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personne`
--

CREATE TABLE `personne` (
  `id` bigint(20) NOT NULL,
  `age` blob NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE `professeur` (
  `id` bigint(20) NOT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `categorie_cours` varchar(500) NOT NULL,
  `disponibilite` varchar(500) DEFAULT NULL,
  `dte_naissance` date NOT NULL,
  `email` varchar(500) NOT NULL,
  `mdp` varchar(500) NOT NULL,
  `nom` varchar(500) NOT NULL,
  `prenom` varchar(500) NOT NULL,
  `salaire` int(11) NOT NULL,
  `status` varchar(500) NOT NULL,
  `telephone` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `professeur_domaine_categorie`
--

CREATE TABLE `professeur_domaine_categorie` (
  `professeur_id` bigint(20) NOT NULL,
  `domaine_categorie_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `seance_professeur`
--

CREATE TABLE `seance_professeur` (
  `id` bigint(20) NOT NULL,
  `date_marque_de_presence` date DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `heure_debut` varchar(255) DEFAULT NULL,
  `heure_effectue` decimal(19,2) NOT NULL,
  `heure_fin` varchar(255) DEFAULT NULL,
  `presence_professeur` varchar(255) DEFAULT NULL,
  `cours_id` bigint(20) DEFAULT NULL,
  `professeur_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `verification_token`
--

CREATE TABLE `verification_token` (
  `id` bigint(20) NOT NULL,
  `expire_time` datetime NOT NULL,
  `token` varchar(250) NOT NULL,
  `apprenant_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `apprenant`
--
ALTER TABLE `apprenant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categorie_cours`
--
ALTER TABLE `categorie_cours`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKigmj80p4l5c6hd95hyga887ds` (`domaine_categorie_id`),
  ADD KEY `FKrsslhbc998af7h71g64rde0m4` (`apprenant_id`),
  ADD KEY `FK5vnwklshnvc9w2qjsorbdv03b` (`professeur_id`);

--
-- Index pour la table `demande_inscription`
--
ALTER TABLE `demande_inscription`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `domaine_categorie`
--
ALTER TABLE `domaine_categorie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbp912d5ug6qu04y89q5i1ihd3` (`categorie_id`);

--
-- Index pour la table `echeancier`
--
ALTER TABLE `echeancier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8c9vpnpy099aqinaqaynwhyyx` (`apprenant_id`),
  ADD KEY `FKh1jsiuphekym2y0qk674gd2tw` (`cours_id`);

--
-- Index pour la table `frais_inscription`
--
ALTER TABLE `frais_inscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKspontk4clsh10pxo8o0oqmiua` (`apprenant_id`);

--
-- Index pour la table `horaire_mensuel`
--
ALTER TABLE `horaire_mensuel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeo9i6mbqgdxxkfg3436efp2q3` (`professeur`);

--
-- Index pour la table `marque_de_presence`
--
ALTER TABLE `marque_de_presence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrtjk74ly2gopxq8uo86wnws4m` (`apprenant_id`),
  ADD KEY `FK9eqylf2urvxcc8jxs9dnd9qgr` (`cours_id`),
  ADD KEY `FK2n2nty4ppme0iufu1wxgwaesw` (`professeur_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlw5qmrgoreunlsklp8cy70bjc` (`apprenant_id`),
  ADD KEY `FK1s5aeo864dgfkujogmuhvkdr7` (`cours_id`);

--
-- Index pour la table `personne`
--
ALTER TABLE `personne`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ir8458an2olys4ernof16hcv2` (`auth_token`) USING HASH;

--
-- Index pour la table `professeur_domaine_categorie`
--
ALTER TABLE `professeur_domaine_categorie`
  ADD KEY `FK8gu2aejuf8og3ukschbb57nxp` (`domaine_categorie_id`),
  ADD KEY `FK80icdi1mwoap8fu0o2jy999x8` (`professeur_id`);

--
-- Index pour la table `seance_professeur`
--
ALTER TABLE `seance_professeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3ael6nqdirnln3v731h03oi0l` (`cours_id`),
  ADD KEY `FK8etmwnq4fu7hc2w31ale2vudt` (`professeur_id`);

--
-- Index pour la table `verification_token`
--
ALTER TABLE `verification_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKoa5pu8wc40ubvu9xuotjr1nyk` (`apprenant_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `apprenant`
--
ALTER TABLE `apprenant`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categorie_cours`
--
ALTER TABLE `categorie_cours`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `demande_inscription`
--
ALTER TABLE `demande_inscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `domaine_categorie`
--
ALTER TABLE `domaine_categorie`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `echeancier`
--
ALTER TABLE `echeancier`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `frais_inscription`
--
ALTER TABLE `frais_inscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `horaire_mensuel`
--
ALTER TABLE `horaire_mensuel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `marque_de_presence`
--
ALTER TABLE `marque_de_presence`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personne`
--
ALTER TABLE `personne`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `seance_professeur`
--
ALTER TABLE `seance_professeur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `verification_token`
--
ALTER TABLE `verification_token`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
