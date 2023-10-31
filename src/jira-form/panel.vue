<template>
	<div class="textarea" :class="{ 'has-header': showHeader }">
		<v-notice v-if="success" type="success">Your submission was successful.</v-notice>
		<v-textarea :disabled="loading" v-model="summary" />
		<v-button :disabled="!canSend || loading" full-width @click="send">
			<v-progress-circular v-if="loading" small indeterminate />
			<template v-else>Send</template>
		</v-button>
	</div>
</template>

<script lang="ts" setup>

import { useApi } from '@directus/extensions-sdk'; 
import { computed, ref, watch } from 'vue';

const api = useApi();

const props = withDefaults(
	defineProps<{
		showHeader?: boolean;
		host?: string;
		email?: string;
		apiToken?: string;
		project?: string;
		component?: string;
		template?: string;
	}>(),
	{
		showHeader: false,
		host: '',
		email: '',
		apiToken: '',
		project: '',
		component: '',
		template: ''
	}
);

const loading = ref(false);
const success = ref(false);
const summary = ref(props.template);

const canSend = computed(() => {
	return summary.value !== "" && summary.value !== props.template;
});

const send = async () => {
	loading.value = true;
	var send = await api.post("/jira-api/create", {
		host: props.host,
		email: props.email,
		apiToken: props.apiToken,
		project: props.project,
		component: props.component,
		summary: summary.value
	});
	if (send) {
		summary.value = props.template;
		success.value = true;
		window.dispatchEvent(new Event("jira:submitted"));
		setTimeout(() => {
			success.value = false;
		}, 3000);
	}
	loading.value = false;
}

watch(props, () => {
	if (summary.value == "" && summary.value !== props.template) {
		summary.value = props.template;
	}
});

</script>

<style scoped>
.textarea {
	padding: 12px;
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 8px;
}

.textarea.has-header {
	padding: 0 12px 12px;
}

.v-textarea {
	flex: 1;
	max-height: none;
}
</style>
