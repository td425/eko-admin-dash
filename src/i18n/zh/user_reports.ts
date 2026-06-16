const user_reports = {
  name: "被举报用户",
  fields: {
    id: "ID",
    received_ts: "报告时间",
    user_id: "报告者",
    target_user_id: "被举报用户",
    reason: "原因",
  },
  action: {
    erase: {
      title: "删除举报",
      content: "确定要删除该用户举报吗？此操作仅删除举报记录，不会删除用户账户。此操作不可撤销。",
    },
  },
};

export default user_reports;
