import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Administrateur from "./pages/admin/Administrateur";
import Apprenant from "./pages/admin/Apprenant";
import Detaille from "./pages/admin/Detaille";
import Inscription from "./pages/apprenant/Inscription";
import FicheRenseignement from "./pages/apprenant/FicheRenseignement";
import Navbar from "./components/Navbar";
import CategorieCours from "./pages/admin/CategorieCours";
import Cours from "./pages/admin/Cours";
import DomaineCours from "./pages/admin/DomaineCours";
import Professeur from "./pages/admin/Professeur";
import DetailApprenant from "./pages/admin/DetailApprenant";
import DetailProfesseur from "./pages/admin/DetailProfesseur";
import ChoixCours from "./pages/apprenant/ChoixFormation";
import Login from "./pages/apprenant/Login";
import InterfaceApprenant from "./pages/apprenant/InterfaceApprenant";
import { ApprenantProvider } from "./context/ApprenantContext";
import ApprenantNavbar from "./components/ApprenantNavbar";
import Profil from "./pages/apprenant/Profil";
import NoFound from "./pages/NoFound";
import NavPaiement from "./components/NavPaiement";
import NoInscription from "./pages/apprenant/NoInscription";
import MoyenPaiement from "./pages/apprenant/MoyenPaiement";
import LoginAdmin from "./pages/admin/LoginAdmin";
import { AdminProvider } from "./context/AdminContext";
import EcheancierPageAdmin from "./pages/admin/EcheancierPageAdmin";
import MdpOublie from "./pages/apprenant/MdpOublie";
import ResetMdp from "./pages/apprenant/ResetMdp";
// import QRGenerator from "./components/QRGenerator";
// import QRScanner from "./components/QRScanner";
import MesCours from "./pages/apprenant/MesCours";
import MaScolarite from "./pages/apprenant/MaScolarite";
import MesExamens from "./pages/apprenant/MesExamens";
import EcheancierApprenant from "./pages/apprenant/EcheancierApprenant";
import PaiementFrais from "./pages/admin/PaiementFrais";
import PaiementScolarite from "./pages/admin/PaiementScolarite";
import { ProfesseurProvider } from "./context/ProfesseurContext";
import SidebarProf from "./components/SideBarProf";
import Accueil from "./pages/professeur/Accueil";
import Profil2 from "./pages/professeur/Profil";
import LoginProf from "./pages/professeur/LoginProf";
import Galerie from "./pages/apprenant/Galerie";
import AllCours from "./pages/admin/AllCours";
import PageContact from "./pages/apprenant/PageContact";
import Avis from "./pages/apprenant/Avis";
import AvisAdmin from "./pages/admin/Avis";
import ChangeMdp from "./pages/apprenant/ChangeMdp";
import Prestation from "./pages/apprenant/Prestation";
import Site from "./pages/apprenant/Site";
// import { GoogleFontLoader } from "react-google-font-loader";

function App() {
  const style = {
    fontFamily: "Poppins, sans-serif",
    // Ajoutez d'autres styles CSS au besoin
  };
  return (
    <div className="" style={style}>
      <AdminProvider>
        <ApprenantProvider>
          <ProfesseurProvider>
            <Router>
              {/* <GoogleFontLoader fonts={[{ font: "Poppins", weights: [400] }]}> */}
              <Routes>
                <Route
                  path="/espace-enseignant/login"
                  element={<LoginProf />}
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/login/mot-passe-oublie"
                  element={<MdpOublie />}
                ></Route>
                <Route
                  path="/login/reset-mot-passe-oublie"
                  element={<ResetMdp />}
                ></Route>
                {/* <Route path="/qr" element={<QRScanner />}></Route> */}
                {/* <Route path="/qr" element={<QRGenerator />}></Route> */}
                <Route
                  path="/administration/login"
                  element={<LoginAdmin />}
                ></Route>
                <Route path="*" element={<NoFound />}></Route>
                <Route
                  path="/reset/mot-de-passe"
                  element={<ChangeMdp />}
                ></Route>
                <Route path="/administration" element={<Sidebar />}>
                  <Route
                    exact
                    path="/administration"
                    element={<Dashboard />}
                  ></Route>
                  <Route
                    path="/administration/apprenant"
                    element={<Apprenant />}
                  ></Route>
                  <Route
                    path="/administration/avis"
                    element={<AvisAdmin />}
                  ></Route>
                  <Route
                    path="/administration/administrateur"
                    element={<Administrateur />}
                  ></Route>
                  <Route
                    path="/administration/cours"
                    element={<Cours />}
                  ></Route>
                  <Route
                    path="/administration/categorie-cours"
                    element={<CategorieCours />}
                  ></Route>
                  <Route
                    path="/administration/domaine-cours"
                    element={<DomaineCours />}
                  ></Route>
                  <Route
                    path="/administration/professeur"
                    element={<Professeur />}
                  ></Route>
                  <Route
                    path="/administration/paiement-frais-inscription"
                    element={<PaiementFrais />}
                  ></Route>
                  <Route
                    path="/administration/paiement-scolarite"
                    element={<PaiementScolarite />}
                  ></Route>
                  <Route
                    path={`/administration/detail/:id`}
                    element={<Detaille />}
                  ></Route>
                  <Route
                    path={`/administration/detailApprenant/:id`}
                    element={<DetailApprenant />}
                  ></Route>
                  <Route
                    path={`/administration/detailProfesseur/:id`}
                    element={<DetailProfesseur />}
                  ></Route>
                  <Route
                    path={`/administration/tous-mes-cours/:id`}
                    element={<AllCours />}
                  ></Route>
                  <Route
                    // path={`/administration/echeancier`}
                    path={`/administration/echeancier/cours/:coursId`}
                    element={<EcheancierPageAdmin />}
                  ></Route>
                </Route>
                <Route path={`/espace-enseignant`} element={<SidebarProf />}>
                  <Route
                    path={`/espace-enseignant`}
                    element={<Accueil />}
                  ></Route>
                  <Route
                    path={`/espace-enseignant/profil`}
                    element={<Profil2 />}
                  ></Route>
                </Route>
                <Route path={`/`} element={<Navbar />}>
                  <Route
                    exact
                    path="/"
                    element={<FicheRenseignement />}
                  ></Route>
                  <Route
                    path="/formulaire-inscription"
                    element={<Inscription />}
                  ></Route>
                  <Route path="/site" element={<Site />}></Route>
                  <Route path="/:prestation" element={<Prestation />}></Route>
                  <Route
                    path="/formulaire-contact"
                    element={<PageContact />}
                  ></Route>
                  <Route path="/formulaire-avis" element={<Avis />}></Route>
                  <Route path="/galerie" element={<Galerie />}></Route>
                </Route>
                <Route path="/apprenant" element={<ApprenantNavbar />}>
                  <Route
                    path="/apprenant/moncompte"
                    element={<InterfaceApprenant />}
                  ></Route>
                  <Route
                    path="/apprenant/choix-formation"
                    element={<ChoixCours />}
                  ></Route>
                  <Route path="/apprenant/profil" element={<Profil />}></Route>
                  <Route
                    path="/apprenant/mes-cours"
                    element={<MesCours />}
                  ></Route>
                  <Route
                    path="/apprenant/mes-examens"
                    element={<MesExamens />}
                  ></Route>
                  {/* <Route
                    path="/apprenant/mot-de-passe"
                    element={<ChangeMdp />}
                  ></Route> */}
                  <Route
                    path="/apprenant/ma-scolarite"
                    element={<MaScolarite />}
                  ></Route>
                  <Route
                    path="/apprenant/ma-scolarite/echeancier/:coursId"
                    element={<EcheancierApprenant />}
                  ></Route>
                </Route>
                <Route path="/inscription" element={<NavPaiement />}>
                  <Route
                    path="/inscription/accueil-paiement"
                    element={<NoInscription />}
                  ></Route>
                  <Route
                    path="/inscription/moyen-paiement"
                    element={<MoyenPaiement />}
                  ></Route>
                </Route>
              </Routes>
              {/* </GoogleFontLoader> */}
            </Router>
          </ProfesseurProvider>
        </ApprenantProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
