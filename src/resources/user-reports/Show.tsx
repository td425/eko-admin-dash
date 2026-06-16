import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  DateField,
  DeleteButton,
  ReferenceField,
  Show,
  ShowProps,
  TextField,
  TopToolbar,
  useLocale,
  useRecordContext,
  useTranslate,
} from "react-admin";

import AvatarField from "../../components/users/fields/AvatarField";
import { useDocTitle } from "../../components/hooks/useDocTitle";
import { DATE_FORMAT } from "../../utils/date";

const LabeledField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{children}</Box>
  </Box>
);

const UserReportTitle = () => {
  const record = useRecordContext();
  const translate = useTranslate();
  const baseTitle = translate("resources.user_reports.name", { smart_count: 1 });
  const pageTitle = record ? `${baseTitle} #${record.id}` : baseTitle;
  useDocTitle(pageTitle);
  if (!record) return null;
  return <span>{pageTitle}</span>;
};

const UserReportContent = () => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <Card variant="outlined">
      <CardContent>
        <LabeledField label={translate("resources.user_reports.fields.id")}>
          <TextField source="id" label={false} />
        </LabeledField>
        <LabeledField label={translate("resources.user_reports.fields.received_ts")}>
          <DateField source="received_ts" showTime options={DATE_FORMAT} locales={locale} label={false} />
        </LabeledField>
        <LabeledField label={translate("resources.user_reports.fields.user_id")}>
          <ReferenceField source="user_id" reference="users" link="show" label={false}>
            <AvatarField source="avatar_src" sx={{ height: "40px", width: "40px" }} />
            <TextField source="id" sx={{ wordBreak: "break-all" }} />
          </ReferenceField>
        </LabeledField>
        <LabeledField label={translate("resources.user_reports.fields.target_user_id")}>
          <ReferenceField source="target_user_id" reference="users" link="show" label={false}>
            <AvatarField source="avatar_src" sx={{ height: "40px", width: "40px" }} />
            <TextField source="id" sx={{ wordBreak: "break-all" }} />
          </ReferenceField>
        </LabeledField>
        <LabeledField label={translate("resources.user_reports.fields.reason")}>
          <TextField source="reason" label={false} />
        </LabeledField>
      </CardContent>
    </Card>
  );
};

const UserReportShowActions = () => {
  const record = useRecordContext();

  return (
    <TopToolbar>
      <DeleteButton
        record={record}
        mutationMode="pessimistic"
        confirmTitle="resources.user_reports.action.erase.title"
        confirmContent="resources.user_reports.action.erase.content"
      />
    </TopToolbar>
  );
};

export const UserReportShow = (props: ShowProps) => {
  return (
    <Show
      {...props}
      actions={<UserReportShowActions />}
      title={<UserReportTitle />}
      sx={{ "& .RaShow-card": { maxWidth: { xs: "100vw", sm: "calc(100vw - 32px)" }, overflowX: "auto" } }}
    >
      <UserReportContent />
    </Show>
  );
};
