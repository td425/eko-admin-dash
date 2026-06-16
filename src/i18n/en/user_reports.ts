const user_reports = {
  name: "Reported user |||| Reported users",
  fields: {
    id: "ID",
    received_ts: "Reported at",
    user_id: "Reporter",
    target_user_id: "Reported user",
    reason: "Reason",
  },
  action: {
    erase: {
      title: "Delete report",
      content:
        "Are you sure you want to delete this user report? This removes the report only, not the user account. This cannot be undone.",
    },
  },
};

export default user_reports;
