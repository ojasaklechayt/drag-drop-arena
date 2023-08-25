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
                        <q-btn v-for="(templateItem) in template" :key="templateItem._id" dense flat class="template-button">
                            <router-link :to="'/template/' + templateItem._id">
                                <div class="template-label">{{ templateItem.name }}</div>
                                <div class="template-trash">
                                    <font-awesome-icon icon="trash" />
                                </div>
                                <div class="template-pen">
                                    <font-awesome-icon icon="pen" />
                                </div>
                            </router-link>
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
    height: 520px;
}

.content-container {
    padding: 10px;
    z-index: 1;
}

.section-header {
    font-weight: bold;
    margin-bottom: 20px;
}

.section-content {
    margin-bottom: 8px;
}

.data-button {
    margin-bottom: 1%;
}

.button-header {
    display: flex;
    flex-direction: column;
    margin: 20px 20px;
    z-index: 1;
}

.nested-button {
    margin: 10px;
    font-size: 16px;
    text-transform: lowercase;
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 10%;
    height: 55px;
    border: 0.5px solid black;
}

.action-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 600px;
    gap: 10%;
    margin-bottom: 10px;
}

.button-design {
    height: 335px;
    padding-bottom: 535px;
}

.nested-input {
    margin-bottom: 10px;
}

.all-templates {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.template-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
    padding: 20px;
    border: 2px solid #ccc;
    background-color: #fff;
    border-radius: 15px;
    width: 300%;
    gap: 5%;
}

.template-button:hover {
    cursor: pointer;
}

.template-label {
    flex: 1;
    margin-right: 10px;
}

.template-trash {
    cursor: pointer;
    color: rgb(6, 5, 5);
    border: 1px solid #ccc;
    padding: 0 4px;
    border-radius: 5px;
}

.template-trash:hover {
    color: white;
    background-color: black;
    border: 1px solid #ccc;
}

.template-pen {
    cursor: pointer;
    color: rgb(2, 2, 2);
    border: 1px solid #ccc;
    padding: 0 3px;
    border-radius: 5px;
}

.template-pen:hover {
    color: white;
    background-color: black;
    border: 1px solid #ccc;
}

.button-link {
    color: #fff;
    text-decoration: none;
}
</style>  