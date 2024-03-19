const schedule = require("node-schedule");
const { instance } = require("./axios");

const envoieMaill = (mail) => {
  instance
    .post(`envoie-email`, mail)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
};

function planifierEnvoiEmail(dateEnvoi, mail) {
  schedule.scheduleJob(dateEnvoi, () => {
    envoieMaill(mail);
  });
}

module.exports = {
  planifierEnvoiEmail,
};
