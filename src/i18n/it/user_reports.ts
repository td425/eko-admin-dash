const user_reports = {
  name: "Utente segnalato |||| Utenti segnalati",
  fields: {
    id: "ID",
    received_ts: "Orario del report",
    user_id: "Richiedente",
    target_user_id: "Utente segnalato",
    reason: "Ragione",
  },
  action: {
    erase: {
      title: "Elimina segnalazione",
      content:
        "È sicuro di voler eliminare questa segnalazione utente? In questo modo viene rimossa solo la segnalazione, non l'account dell'utente. Questa azione è irreversibile.",
    },
  },
};

export default user_reports;
