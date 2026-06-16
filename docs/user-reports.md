# User reports

Matrix users can report another user directly, not only a single message, and those reports collect here under **Reported users** in the sidebar. It's the moderation queue for person-level complaints, sitting next to Reported events. Each row is one user flagging another, with a free-text reason. Worth knowing before you touch anything here: deleting a report clears it from this list and does nothing else. It does not deactivate, warn, or otherwise touch the reported user. Acting on the person is a separate, manual step through their user page.

Both sides of every report are local users on your homeserver. Synapse only stores a user report when the reported account is local, and the reporter is always an authenticated local account, so both names link straight to their user pages here.

## The list

Reports arrive newest first, by the time they were filed, which is the only column you can sort on. Each row shows the report's numeric ID, when it was filed, who filed it, who was reported, and the reason. The two user IDs are truncated to fit the row; open a report for the full values.

Two filters sit in the toolbar. **Reporter** narrows the list to reports filed by a given user, and **Reported user** narrows to reports filed against one. Both match on a substring of the user ID, so a partial localpart is enough, and you can combine them to find a specific pair.

## Reading a report

Click a row to open it. A user report is thin by design: no room, no event, no message JSON, just the metadata and the two people involved. You get the ID, the time it was filed, the reporter's free-text reason, and avatar entries for the **Reporter** and the **Reported user**, each linking to that account's page so you can act without hunting for it. The reason is capped at 1000 characters and is usually where the actual complaint lives.

## Dismissing a report

Open the report and use **Delete** in its toolbar. You'll be asked to confirm, and it can't be undone. Deleting removes the report record and leaves both users exactly as they were. So handle any real moderation first: deactivate the account or remove the user from the room through their user page, then delete. Reports clear one at a time; there's no bulk action.

---

See also: [User management](./user-management.md) · [Documentation index](./README.md)
