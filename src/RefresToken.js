// import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate depuis react-router-dom
import { instance } from "./axios";

const jwtService = {
  refreshJwt: () => {
    const token = localStorage.getItem("token");

    console.log("tok", token);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      const tokenExpiration = decodedToken.exp;
      const refreshTokenThreshold = 300; // 5 minutes (in seconds)

      if (tokenExpiration - currentTime < refreshTokenThreshold) {
        instance
          .get("api/auth/refresh", {
            headers: { Authorization: "Bearer " + token },
          })
          .then((response) => {
            const newJwt = response.data.accessToken;
            localStorage.setItem("token", newJwt);
            console.log("new", token);
          })
          .catch((error) => {
            console.error("Erreur lors du rafraîchissement du token", error);
            // Rediriger vers la page de connexion en cas d'échec de rafraîchissement ou si le token est expiré
            // Assurez-vous d'avoir défini la route de la page de connexion dans votre application React
            localStorage.removeItem("token");
            window.location.reload();
            const history = useNavigate();
            history("/conservatoire-saint-viateur/login");
          });
      }
    }
  },
};

export default jwtService;
