<template>
	<div class="list" :class="{ 'has-header': showHeader }">
		<div>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index" clickable @click="openTask(item)">
					<div class="issuetype" v-if="item.fields?.issuetype?.iconUrl">
						<img :src="item.fields?.issuetype?.iconUrl" :alt="item.fields?.issuetype?.name" :title="item.fields?.issuetype?.name" />
					</div>
					<div class="key">{{ item.key }}</div>
					<div class="summary">{{ item.fields.summary }}</div>
					<div class="status" :class="item.fields?.status?.statusCategory?.colorName">{{ item.fields?.status?.name }}</div>
				</v-list-item>
			</v-list>
		</div>
	</div>
</template>

<script lang="ts" setup>

import { useApi } from '@directus/extensions-sdk'; 
import { onMounted, onUnmounted, ref, watch } from 'vue'; 

const api = useApi();
const items = ref<any>([]);

const props = withDefaults(
	defineProps<{
		showHeader?: boolean;
		jql?: string;
		host?: string;
		email?: string;
		apiToken?: string;
		now?: Date;
	}>(),
	{
		showHeader: false,
		jql: '',
		host: '',
		email: '',
		apiToken: ''
	}
);

const openTask = (item) => {
	window.open(props.host+'/browse/'+item.key);
};

const fetchItems = async () => {
	items.value = (await api.post("/jira-api/list", {
		jql: props.jql,
		host: props.host,
		email: props.email,
		apiToken: props.apiToken
	}))?.data?.issues
}

watch(props, () => {
	fetchItems();
});

onMounted(() => {
	window.addEventListener('jira:submitted', fetchItems);
})
onUnmounted(() => {
	window.removeEventListener('jira:submitted', fetchItems);
})

// TODO: Use Directus built-in 'Auto Refresh', currently unclear how it works
var refresh = () => {
	fetchItems();
	setTimeout(refresh, 15*60*1000);
};

refresh();

</script>

<style scoped>
.list {
	--v-list-padding: 0;
	--v-list-border-radius: 0;
	--v-list-item-border-radius: 0;
	--v-list-item-padding: 6px;
	--v-list-item-margin: 0;

	height: 100%;
	padding: 0 12px;
	overflow-y: auto;
}

.v-list-item {
	white-space: pre;
	word-break: nowrap;
	gap: 8px;
	height: 48px;
	border-top: var(--border-width) solid var(--border-subdued);
}

.v-list-item img {
	display: block;
}

.v-list-item:last-child {
	border-bottom: var(--border-width) solid var(--border-subdued);
}

.summary {
	flex: 1;
	text-overflow: ellipsis;
	overflow: hidden;
}

.key {
  color: var(--theme--foreground-subdued);
}

.key, .issuetype, .status {
	flex: 0;
}


.medium-gray {
  color: var(--theme--foreground-subdued);
}

.green {
	color: var(--green);
}

.yellow {
	color: var(--yellow);
}

.brown {
	color: var(--pink);
}

.warm-red {
	color: var(--red);
}

.blue-gray {
	color: var(--blue);
}
</style>
