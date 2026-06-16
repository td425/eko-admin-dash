const user_reports = {
  name: "Utilizador reportado |||| Utilizadores reportados",
  fields: {
    id: "ID",
    received_ts: "Reportado em",
    user_id: "Denunciante",
    target_user_id: "Utilizador reportado",
    reason: "Motivo",
  },
  action: {
    erase: {
      title: "Eliminar denúncia",
      content:
        "Tem a certeza de que pretende eliminar esta denúncia de utilizador? Isto remove apenas a denúncia, não a conta do utilizador. Esta ação não pode ser desfeita.",
    },
  },
};

export default user_reports;
