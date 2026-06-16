import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DateField,
  ListProps,
  Pagination,
  SearchInput,
  SimpleList,
  TextField,
  useLocale,
  useTranslate,
} from "react-admin";

import { useDocTitle } from "../../components/hooks/useDocTitle";
import { DATE_FORMAT } from "../../utils/date";
import { Datagrid, EmptyState, List } from "../../components/layout";

const UserReportPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} />;

const userReportFilters = [
  <SearchInput key="user_id" source="user_id" alwaysOn />,
  <SearchInput key="target_user_id" source="target_user_id" alwaysOn />,
];

const ellipsisSx = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

export const UserReportList = (props: ListProps) => {
  const locale = useLocale();
  const translate = useTranslate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  useDocTitle(translate("resources.user_reports.name", { smart_count: 2 }));
  return (
    <List
      {...props}
      filters={userReportFilters}
      pagination={<UserReportPagination />}
      perPage={50}
      sort={{ field: "received_ts", order: "DESC" }}
      empty={<EmptyState />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => (
            <Box component="span" sx={{ wordBreak: "break-all" }}>
              #{record.id} {record.target_user_id}
            </Box>
          )}
          secondaryText={record => new Date(record.received_ts).toLocaleDateString(locale, DATE_FORMAT)}
          tertiaryText={record => (
            <Box component="span" sx={{ wordBreak: "break-all" }}>
              {record.user_id}
            </Box>
          )}
          rowClick="show"
        />
      ) : (
        <Datagrid
          rowLabel={record => `#${record.id} ${record.target_user_id || ""}`.trim()}
          rowClick="show"
          bulkActionButtons={false}
        >
          <TextField source="id" sortable={false} label="resources.user_reports.fields.id" />
          <DateField
            source="received_ts"
            showTime
            options={DATE_FORMAT}
            sortable={true}
            label="resources.user_reports.fields.received_ts"
            locales={locale}
          />
          <TextField
            sortable={false}
            source="user_id"
            label="resources.user_reports.fields.user_id"
            sx={{ ...ellipsisSx, maxWidth: "200px", display: "inline-block" }}
          />
          <TextField
            sortable={false}
            source="target_user_id"
            label="resources.user_reports.fields.target_user_id"
            sx={{ ...ellipsisSx, maxWidth: "200px", display: "inline-block" }}
          />
          <TextField
            sortable={false}
            source="reason"
            label="resources.user_reports.fields.reason"
            sx={{ ...ellipsisSx, maxWidth: "300px", display: "inline-block" }}
          />
        </Datagrid>
      )}
    </List>
  );
};
