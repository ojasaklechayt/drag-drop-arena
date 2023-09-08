<template>
    <div>
        <q-layout view="hHh lpR lFf">
            <!-- Header -->
            <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
                    <q-toolbar-title class="toolbar-title" @click="displayhome()">Data Templates</q-toolbar-title>
                </q-toolbar>
            </q-header>

            <!-- Page Content -->
            <q-page-container>
                <keep-alive>
                    <HomeComponent v-if="showHomeTemplate" />
                </keep-alive>
                <CreateTemplate v-if="showCreateTemplate" @emitdisplay="receiveEmit" />
                <keep-alive>
                    <DeleteTemplate v-if="showDeleteTemplate" :key="idToDelete" :id="idToDelete"
                        @emitdeletedisplay="receiveEmit" />
                </keep-alive>
                <keep-alive>
                    <EditTemplate v-if="showEditTemplate" :key="idToEdit" :id="idToEdit" @emiteditdisplay="receiveEmit" />
                </keep-alive>
                <keep-alive>
                    <SpecificTemplate v-if="showSpecificTemplate" :key="idToShow" :id="idToShow" />
                </keep-alive>
            </q-page-container>

            <!-- Sidebar -->
            <q-drawer v-model="drawer" show-if-above class="drawer">
                <q-scroll-area class="fit">
                    <div class="sidebar">
                        <div class="sidebar-content">
                            <q-btn class="data-button" color="primary" label="Create New Template" dense
                                @click="navigateTo()" />
                            <div class="template-list">
                                <q-item v-for="(templateItem) in this.template" :key="templateItem._id">
                                    <q-item-section>
                                        <div class="template-item">
                                            <div class="template-name" @click="gotoSpecificTemplate(templateItem._id)">{{
                                                    templateItem.name.length > 20 ? templateItem.name.slice(0, 20) + "..." :
                                                    (templateItem.name || "No Name") }}</div>
                                            <div class="template-buttons">
                                                <q-btn color="red" dense @click="navigateDeleteTo(templateItem._id)">
                                                    <font-awesome-icon icon="trash" class="template-icon" />
                                                </q-btn>
                                                <q-btn color="primary" dense @click="navigateEditTo(templateItem._id)">
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
import DeleteTemplate from '../components/DeleteLayout.vue';
import SpecificTemplate from '../components/SpecificLayout.vue';
import HomeComponent from '../components/WelcomeCompoent.vue'

import { defineComponent, ref } from 'vue';
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
        DeleteTemplate,
        SpecificTemplate,
        HomeComponent

    },
    data() {
        return {
            fromChild: false,
            template: [],
        }
    },
    setup() {
        const drawer = ref(false);
        const buttonData = ref([]);
        const text = ref('');
        const showCreateTemplate = ref(false);
        const showEditTemplate = ref(false);
        const showSpecificTemplate = ref(false);
        const showDeleteTemplate = ref(false);
        const showHomeTemplate = ref(true);
        const router = useRouter();
        const idToDelete = ref(null);
        const idToEdit = ref(null);
        const idToShow = ref(null);

        // watch(template, () => {
        //     fetchAllTemplates();
        // });

        const navigateTo = () => {
            // router.push({ name: 'create-template' });
            showHomeTemplate.value = false;
            showCreateTemplate.value = true;
            showEditTemplate.value = false;
            showDeleteTemplate.value = false;
            showSpecificTemplate.value = false;
            idToEdit.value = null;
            idToDelete.value = null;
            idToShow.value = null;
        }

        const navigateEditTo = (templateId) => {
            // router.push({ name: 'update-template', params: { id: templateId } });
            showHomeTemplate.value = false;
            showCreateTemplate.value = false;
            showEditTemplate.value = true;
            showDeleteTemplate.value = false;
            showSpecificTemplate.value = false;
            idToEdit.value = templateId;
            idToDelete.value = null;
            idToShow.value = null;

        };

        const displayhome = () => {
            showHomeTemplate.value = true;
            showCreateTemplate.value = false;
            showEditTemplate.value = false;
            showDeleteTemplate.value = false;
            showSpecificTemplate.value = false;
        };

        const navigateDeleteTo = (templateId) => {
            showHomeTemplate.value = false;
            showCreateTemplate.value = false;
            showEditTemplate.value = false;
            showDeleteTemplate.value = true;
            showSpecificTemplate.value = false;
            idToEdit.value = null;
            idToDelete.value = templateId;
            idToShow.value = null;
        }

        const gotoSpecificTemplate = (templateId) => {
            try {
                // router.push({ name: 'specific-template', params: { id: templateId } });
                showHomeTemplate.value = false;
                showCreateTemplate.value = false;
                showEditTemplate.value = false;
                showDeleteTemplate.value = false;
                showSpecificTemplate.value = true;
                idToShow.value = templateId;
                idToEdit.value = null;
                idToDelete.value = null;
            } catch (error) {
                console.error('There is some error: ', error);
            }
        };

        return {
            drawer,
            buttonData,
            text,
            showCreateTemplate,
            showEditTemplate,
            showSpecificTemplate,
            showDeleteTemplate,
            idToEdit,
            idToDelete,
            idToShow,
            showHomeTemplate,
            navigateTo,
            navigateEditTo,
            navigateDeleteTo,
            gotoSpecificTemplate,
            displayhome
        };
    },
    methods: {
        async fetchAllTemplates() {
            try {
                const templateResponse = await axios.get('https://drag-drop-arena-backend-mb5m.onrender.com/templates');
                const templates = templateResponse.data;
                this.template = templates;
            } catch (error) {
                console.error('Error fetching templates: ', error);
            }
        },
        async receiveEmit(value) {
            if (value == true) {
                await this.fetchAllTemplates();
                this.showHomeTemplate = true;
                this.showCreateTemplate = false;
                this.showEditTemplate = false;
                this.showDeleteTemplate = false;
                this.showSpecificTemplate = false;
            }
            console.log('Hello World!>>>>>>>>>>>>>' + this.fromChild);
        },

    },
    mounted() {
        this.fetchAllTemplates();
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

.template-name {
    padding-top: 6%;
    padding-bottom: 6%;
    text-align: left;
    font-size: 0.8rem;
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
    min-height: 32px;
}

.toolbar-title {
    cursor: pointer;
}
</style>