export interface UserReport {
  id: number;
  received_ts: number;
  user_id: string;
  target_user_id: string;
  reason: string;
}
