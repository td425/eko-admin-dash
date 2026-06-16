const user_reports = {
  name: "Utilisateur signalé |||| Utilisateurs signalés",
  fields: {
    id: "Identifiant",
    received_ts: "Date du signalement",
    user_id: "Rapporteur",
    target_user_id: "Utilisateur signalé",
    reason: "Raison",
  },
  action: {
    erase: {
      title: "Supprimer le signalement",
      content:
        "Voulez-vous vraiment supprimer ce signalement d’utilisateur ? Cela supprime uniquement le signalement, pas le compte de l’utilisateur. Cette action est irréversible.",
    },
  },
};

export default user_reports;
