const user_reports = {
  name: "Gemeldeter Benutzer |||| Gemeldete Benutzer",
  fields: {
    id: "ID",
    received_ts: "Meldezeit",
    user_id: "Meldender",
    target_user_id: "Gemeldeter Benutzer",
    reason: "Grund",
  },
  action: {
    erase: {
      title: "Meldung löschen",
      content:
        "Sind Sie sicher, dass Sie diese Benutzermeldung löschen möchten? Dadurch wird nur die Meldung entfernt, nicht das Benutzerkonto. Diese Aktion kann nicht rückgängig gemacht werden.",
    },
  },
};

export default user_reports;
