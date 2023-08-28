<template>
    <div class="page">
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
                <router-view>
                    <h1>Hello</h1>
                </router-view>
            </q-page-container>

            <!-- Sidebar -->
            <q-drawer v-model="drawer" show-if-above class="drawer">
                <q-scroll-area class="fit">
                    <div class="sidebar">
                        <div class="sidebar-content">
                            <q-btn class="data-button" color="primary" label="Create New Template" dense
                                @click="navigateTo('/template')" />
                            <div class="template-list">
                                <q-item style="gap: 50%" v-for="(templateItem) in template" :key="templateItem._id"
                                    @click="navigateTo(`/template/${templateItem._id}`)">
                                    <q-btn>
                                        {{ templateItem.name }}
                                    </q-btn>
                                    <q-item-section>
                                        <q-btn style="background-color: brown; color: black; margin-bottom: 10%;"
                                            @click.stop="deleteTemplate(templateItem._id)"><font-awesome-icon icon="trash"
                                                class="template-icon template-trash" /></q-btn>
                                        <q-btn style="background-color: aliceblue; color: black"
                                            @click.stop="editTemplate(templateItem._id)"><font-awesome-icon icon="pen"
                                                class="template-icon template-pen" /></q-btn>
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
import { defineComponent, ref, onMounted } from 'vue';
import {
    QLayout,
    QDrawer,
    QScrollArea,
    QAvatar,
    QToolbarTitle,
    QItem,
    QItemSection,
    QBtn,
} from 'quasar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';


library.add(faTrash, faPen);

export default defineComponent({
    name: 'FrontLayout',
    components: {
        QLayout,
        QDrawer,
        QScrollArea,
        QToolbarTitle,
        QItem,
        QItemSection,
        QBtn,
    },
    setup() {
        const drawer = ref(false);
        const buttonData = ref([]);
        const text = ref('');
        const template = ref([]);

        const fetchAndPopulateData = async () => {
            try {
                const dataResponse = await axios.get('https://drag-drop-arena-backend-mb5m.onrender.com/data/getdata');
                const data = dataResponse.data;
                buttonData.value = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const navigateTo = (route) => {
            router.push({ path: route });
        };

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

        const gotoSpecificTemplate = (templateId) => {
            try {
                router.push({ name: 'specific-template', params: { id: templateId } });
            } catch (error) {
                console.error('There is some error: ', error);
            }
        };

        onMounted(() => {
            fetchAllTemplates();
        });

        return {
            drawer,
            fetchAndPopulateData,
            fetchAllTemplates,
            gotoSpecificTemplate,
            template,
            text,
            navigateTo,
        };
    },
    components: {
        FontAwesomeIcon,
    }
});
</script>


<style scoped>
.page {
    display: flex;
    flex-direction: column;
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
    background-color: #000000;
}

.template-list q-item {
    padding: 16px;
    cursor: pointer;
    background-color: aqua;
}

.template-list q-item:hover {
    background-color: #444;
    color: white;
}

.template-list q-btn {
    margin-right: 8px;
}

.page-container {
    padding: 16px;
}
</style>