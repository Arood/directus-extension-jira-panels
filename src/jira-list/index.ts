import { definePanel } from '@directus/extensions-sdk';
import PanelComponent from './panel.vue';
import Preview from './preview';

export default definePanel({
	id: 'jira-list',
	name: 'JIRA List',
	icon: 'checklist',
	description: 'Display a list of tasks from JIRA',
	preview: Preview,
	component: PanelComponent,
	options: [
		{
			field: 'host',
			name: 'Host',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
				options: {
					placeholder: 'https://your-company.atlassian.net'
				}
			}
		},
		{
			field: 'email',
			name: 'E-mail',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half'
			}
		},
		{
			field: 'apiToken',
			name: 'API Token',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half',
				options: {
					masked: true
				}
			}
		},
		{
			field: 'jql',
			name: 'JQL',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full'
			}
		}
	],
	minWidth: 12,
	minHeight: 8,
});
