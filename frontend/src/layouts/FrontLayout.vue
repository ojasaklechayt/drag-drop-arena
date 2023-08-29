<template>
    <div>
        <q-layout view="hHh lpR lFf">
            <!-- Header -->
            <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
                    <q-toolbar-title>Data Templates</q-toolbar-title>
                </q-toolbar>
            </q-header>

            <!-- Page Content -->
            <q-page-container>
                <router-view></router-view>
                <CreateTemplate v-if="showCreateTemplate" />
                <EditTemplate v-if="showEditTemplate" />
            </q-page-container>

            <!-- Sidebar -->
            <q-drawer v-model="drawer" show-if-above class="drawer">
                <q-scroll-area class="fit">
                    <div class="sidebar">
                        <div class="sidebar-content">
                            <q-btn class="data-button" color="primary" label="Create New Template" dense
                                @click="navigateTo('/template')" />
                            <div class="template-list">
                                <q-item v-for="(templateItem) in template" :key="templateItem._id">
                                    <q-item-section>
                                        <div class="template-item">
                                            <div @click="navigateTo(`/template/${templateItem._id}`)">{{ templateItem.name ?
                                                templateItem.name : "No Name" }}</div>
                                            <div class="template-buttons">
                                                <q-btn color="red" dense
                                                    @click="navigateTo(`/template/delete/${templateItem._id}`)">
                                                    <font-awesome-icon icon="trash" class="template-icon" />
                                                </q-btn>
                                                <q-btn color="primary" dense
                                                    @click="navigateTo(`/template/edit/${templateItem._id}`)">
                                                    <font-awesome-icon icon="pen" class="template-icon" />
                                                </q-btn>
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </div>
                        </div>
                    </div>
                </q-scroll-area>
            </q-drawer>
        </q-layout>
    </div>
</template>

<script>
import CreateTemplate from '../components/MainLayout.vue';
import EditTemplate from '../components/EditLayout.vue';

import { defineComponent, ref, onMounted, watch } from 'vue';
import {
    QLayout,
    QDrawer,
    QScrollArea,
    QToolbarTitle,
    QItem,
    QBtn,
} from 'quasar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

library.add(faTrash, faPen);

export default defineComponent({
    name: 'AppLayout',
    components: {
        QLayout,
        QDrawer,
        QScrollArea,
        QToolbarTitle,
        QItem,
        QBtn,
        CreateTemplate,
        EditTemplate,
        FontAwesomeIcon,
    },
    setup() {
        const drawer = ref(false);
        const buttonData = ref([]);
        const text = ref('');
        const template = ref([]);
        const showCreateTemplate = ref(false);
        const showEditTemplate = ref(false);
        const router = useRouter();

        const fetchAllTemplates = async () => {
            try {
                const templateResponse = await axios.get('https://drag-drop-arena-backend-mb5m.onrender.com/templates');
                const templates = templateResponse.data;
                template.value = templates;
                console.log(template.value);
            } catch (error) {
                console.error('Error fetching templates: ', error);
            }
        };

        onMounted(() => {
            fetchAllTemplates();
        });

        watch(template, () => {
            fetchAllTemplates();
        });

        const navigateTo = (route) => {
            router.push({ path: route });
            showCreateTemplate.value = ref(false);
        };

        const navigateEditTo = (route) => {
            router.push({ path: route });
            showEditTemplate.value = ref(false);
        };

        const gotoSpecificTemplate = (templateId) => {
            try {
                router.push({ name: 'specific-template', params: { id: templateId } });
            } catch (error) {
                console.error('There is some error: ', error);
            }
        };

        return {
            drawer,
            buttonData,
            text,
            template,
            showCreateTemplate,
            showEditTemplate,
            navigateTo,
            navigateEditTo,
            gotoSpecificTemplate,
        };
    },
});
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
}

.title-container {
    text-align: center;
    margin: 16px;
}

.title {
    font-size: 24px;
    font-weight: bold;
}

.sidebar {
    background-color: #333;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.sidebar-content {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
}

.data-button {
    width: 100%;
    margin-bottom: 16px;
}

.template-list {
    display: flex;
    flex-direction: column;
}

.template-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    background-color: #000000;
    margin-bottom: 10px;
    border-radius: 5px;
}

.template-item:hover {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}

.template-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
}

.template-button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
}

.template-icon {
    font-size: 16px;
    color: white;
}

/* Adjust the size of the delete and edit buttons */
.template-buttons q-btn {
    min-width: 32px;
    /* Adjust the width as needed */
    min-height: 32px;
    /* Adjust the height as needed */
}
</style>
  