# JIRA Panels

This extension contains panels for your Directus Insights dashboards that allow your users to see tasks in JIRA or even submit their own feedback.

![Screenshot](https://github.com/Arood/directus-extension-jira-panels/blob/main/preview.png?raw=true)

## Details

- Let your users see what issues have been already submitted and being worked on, and let them submit their own feedback easily.
- This bundle contains two panels, one to create a form and one to create a list.
- Each form panel can be configured with their own project key and component, so you can filter them easily in JIRA or in the list panel.
- Each list panel is configured with JQL, so you can limit which tasks that show up.
- Possible future improvements: More authentication options, support for Trello

## Set Up Instructions

Easiest way to install is by using the NPM-package: `npm i directus-extension-jira-panels`. Alternatively download this repo, put it in your extensions-folder and run the build scripts.

This extension requires an Atlassian account with an API token. You can create [a token on this page](https://id.atlassian.com/manage-profile/security/api-tokens).

When you have your token, you can simply add the panels you want and make sure to fill out host, e-mail and API token in the panel options. Hint: If you're planning on having several lists, you can use the new duplicate panel function in Directus 10.7!

## Collaborators

- arood