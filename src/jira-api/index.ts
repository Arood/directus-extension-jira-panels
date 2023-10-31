import { defineEndpoint } from '@directus/extensions-sdk';
import { createError } from '@directus/errors';
import { Version3Client } from 'jira.js';
import { CreateIssue } from 'jira.js/out/version3/parameters';

const ServiceUnavailableException = createError('SERVICE_UNAVAILABLE', 'Service Unavailable');

const createClient = (body:any) => {
	return new Version3Client({
		host: body.host,
		authentication: {
			basic: {
				email: body.email,
				apiToken: body.apiToken
			}
		}
	});
}

export default defineEndpoint((router, { services }) => {
	const { UsersService } = services;
	router.post('/create', async (req, res, next) => {
		if (req.accountability?.user == null) { 
			res.status(403); 
			return res.send(`You don't have permission to access this.`); 
		}
		try {
			var body = req.body;
			if (!body.apiToken || !body.email || !body.host || !body.summary || !body.project) {
				throw new ServiceUnavailableException();
			}
			const client = createClient(body);

			const summary = body.summary.split("\n")[0];

			const usersService = new UsersService({ schema: req.schema, accountability: req.accountability });

			const user = await usersService.readOne(req.accountability.user);

			const payload:CreateIssue = {
				fields: {
					summary: summary,
					description: body.summary + `\n\nSubmitted by ${(user.first_name + ' ' + user.last_name).trim()} (${user.email})`,
					project: {
						key: body.project
					},
					issuetype: {
						name: 'Task'
					},
					components: [{
						name: ""
					}]
				}
			};
			if (body.component) {
				payload.fields.components = [{ name: body.component }];
			}
			var send = await client.issues.createIssue(payload);
			return res.send(send);
		} catch (ex:any) {
			return next(ex);
		}
	});
	router.post('/list', async (req, res, next) => {
		if (req.accountability?.user == null) { 
			res.status(403); 
			return res.send(`You don't have permission to access this.`); 
		}
		console.log(req.accountability.user)
		try {
			var body = req.body;
			if (!body.apiToken || !body.email || !body.host || !body.jql) {
				throw new ServiceUnavailableException();
			}
			const client = createClient(body);
			
			var search =  await client.issueSearch.searchForIssuesUsingJql({ 
				jql: body.jql,
				fields: ["key", "summary", "created", "duedate", "status", "issuetype", "project", "priority", "assignee", "reporter"],
				maxResults: 10
			});

			return res.send(search);
				
		} catch (ex:any) {
			return next(ex);
		}
	});
});
