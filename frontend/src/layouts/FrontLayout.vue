<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div id="q-app" class="app-container">
                <div class="heading">
                    <h2>Data Templates</h2>
                </div>
                <div id="q-inner" class="inner-container">
                    <div class="action-button">
                        <q-btn class="data-button" color="primary">
                            <router-link to="/template" class="button-link">Create New Template</router-link>
                        </q-btn>
                    </div>
                    <div class="all-templates">
                        <q-btn v-for="(templateItem) in template" :key="templateItem._id" dense flat
                            class="template-button">
                            <div class="template-link">
                                <div class="template-label">
                                    <router-link :to="'/template/' + templateItem._id">
                                    <div style="text-decoration: none;">{{ templateItem.name}}</div>
                                    </router-link>
                                </div>
                                <div class="template-icons">
                                    <router-link :to="'/template/delete/' + templateItem._id"><font-awesome-icon icon="trash" class="template-icon template-trash" /></router-link>
                                    <router-link :to="'/template/edit/' + templateItem._id"><font-awesome-icon icon="pen" class="template-icon template-pen" /></router-link>
                                </div>
                            </div>
                        </q-btn>
                    </div>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { QBtn } from 'quasar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faPen, faUserSecret);

export default defineComponent({
    name: 'FrontLayout',
    setup() {
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
            fetchAndPopulateData,
            fetchAllTemplates,
            gotoSpecificTemplate,
            template,
            text,
        };
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>


<style scoped>
.app-container {
    background-color: #f2f2f2;
    padding: 20px;
}

.heading {
    display: flex;
    justify-content: center;
    margin-top: 5%;
}

.inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 520px;
}

.action-button {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.data-button {
    width: 100%;
}

.all-templates {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
}

.template-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 20px;
    border: 2px solid #ccc;
    background-color: #f5f5f5;
    border-radius: 10px;
    width: 100%;
}

.template-button:hover {
    cursor: pointer;
}

.template-link {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    text-decoration: none;
    color: #333;
}

.template-label {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    margin-right: 150px;
    font-weight: bold;
    text-decoration: none;
}

.template-icons {
    display: flex;
    gap: 10px;
}

.template-icon {
    cursor: pointer;
    font-size: 18px;
    color: #333;
    transition: color 0.2s ease-in-out;
}

.template-icon:hover {
    color: #d61818;
}

.button-link {
    color: #fff;
    text-decoration: none;
}
</style> 