const user_reports = {
  name: "報告されたユーザー",
  fields: {
    id: "ID",
    received_ts: "報告日時",
    user_id: "報告者",
    target_user_id: "報告されたユーザー",
    reason: "理由",
  },
  action: {
    erase: {
      title: "報告を削除",
      content:
        "このユーザー報告を削除してよろしいですか？削除されるのは報告のみで、ユーザーアカウントは削除されません。これは取り消せません。",
    },
  },
};

export default user_reports;
