import { definePanel } from '@directus/extensions-sdk';
import PanelComponent from './panel.vue';
import Preview from './preview';

export default definePanel({
	id: 'jira-form',
	name: 'JIRA Form',
	icon: 'send',
	description: 'Let your users send feedback to JIRA',
	component: PanelComponent,
	preview: Preview,
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
			field: 'project',
			name: 'Project Key',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half'
			}
		},
		{
			field: 'issuetype',
			name: 'Issue Type',
			type: 'string',
			schema: {
				default_value: 'Task',
			},
			meta: {
				interface: 'input',
				width: 'half'
			}
		},
		{
			field: 'component',
			name: 'Component',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half',
				options: {
					placeholder: 'Optional'
				}
			}
		},
		{
			field: 'template',
			name: 'Template',
			type: 'text',
			meta: {
				interface: 'textarea',
				options: {
					placeholder: 'Optional'
				}
			}
		},
	],
	minWidth: 12,
	minHeight: 8,
});
