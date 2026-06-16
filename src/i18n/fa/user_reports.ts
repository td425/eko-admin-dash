const user_reports = {
  name: "کاربر گزارش‌شده |||| کاربران گزارش‌شده",
  fields: {
    id: "شناسه",
    received_ts: "زمان گزارش",
    user_id: "کاربر گزارش‌دهنده",
    target_user_id: "کاربر گزارش‌شده",
    reason: "دلیل",
  },
  action: {
    erase: {
      title: "حذف گزارش",
      content:
        "آیا مطمئن هستید که می‌خواهید این گزارش کاربر را حذف کنید؟ با این کار فقط گزارش حذف می‌شود، نه حساب کاربری. این کار قابل بازگشت نیست.",
    },
  },
};

export default user_reports;
