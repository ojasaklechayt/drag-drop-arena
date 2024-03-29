<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div id="q-app" class="app-container">
                <div id="q-inner" class="inner-container">
                    <div class="action-button">
                        <q-btn class="button-link" color="negative" @click="this.showDeleteConfirmation = true">Delete
                            Template</q-btn>
                    </div>
                    <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
                        <!-- Before Splitter Content -->
                        <template v-slot:before>
                            <div class="content-container">
                                <div class="section-header">All Fields</div>
                                <div v-for="(item, index) in this.template.leftlabels" :key="index">
                                    <q-btn class="nested-button" color="primary" dense square>{{ item }}</q-btn>
                                </div>
                            </div>
                        </template>

                        <!-- After Splitter Content -->
                        <template v-slot:after>
                            <div class="content-container">
                                <div class="section-header">Selected Fields</div>
                                <div>
                                    <div v-for="(item, index) in this.template.righttitle" :key="index">
                                        <q-btn class="nested-button" color="primary" dense square>{{ item }}</q-btn>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </q-splitter>
                </div>
            </div>
        </q-page-container>
    </q-layout>

    <!-- Confirmation Dialog -->
    <q-dialog v-model="this.showDeleteConfirmation">
        <div class="q-dialog-plugin">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Are you sure you want to delete this template?</div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Cancel" color="primary" @click="this.showDeleteConfirmation = false" />
                    <router-link to="/" style="padding-left: 2%;"><q-btn label="Yes" color="negative"
                            @click="this.delete_display" /></router-link>
                </q-card-actions>
            </q-card>
        </div>
    </q-dialog>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { Notify, useQuasar } from 'quasar';

export default defineComponent({
    name: 'DeleteTemplate',
    data() {
        return {
            check: true,
            template: [],
            showDeleteConfirmation: false
        }
    },
    props: {
        id: String
    },
    setup(props) {
        const splitterModel = ref(50);
        const splitterStyles = {
            height: '600px',
            width: '600px',
        };

        return {
            splitterModel,
            splitterStyles,
            props
        };
    },
    emits: ['emitdeletedisplay'],
    methods: {
        async fetchDataandID() {
            try {
                const $q = useQuasar();
                $q.loading.show({});
                const dataResponse = await axios({
                    method: 'get',
                    url: `https://drag-drop-arena-backend-mb5m.onrender.com/templates/${this.props.id}`,
                });
                const data = dataResponse.data;
                this.template = data;
                $q.loading.hide();
                console.log(this.template);
                console.log(this.template.leftlabels);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async deleteTemplate() {
            try {
                await axios.delete(`https://drag-drop-arena-backend-mb5m.onrender.com/templates/${this.props.id}`);
                this.showDeleteConfirmation = false;
                Notify.create({ message: 'Template deleted successfully!!', progress: true })

            } catch (error) {
                console.error('Error deleting template:', error);
            }
        },
        async delete_display() {
            await this.deleteTemplate();
            await this.$emit('emitdeletedisplay', this.check);
        }
    },
    mounted() {
        this.fetchDataandID();
    },
});
</script>

<style>
.app-container {
    background-color: #f2f2f2;
}

.inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 750px;
}

.splitter {
    border: 1px solid #ccc;
    background-color: #fff;
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
    gap: 2%;
    margin-bottom: 10px;
}

.button-design {
    height: 335px;
    padding-bottom: 535px;
}

.nested-input {
    margin-bottom: 10px;
}

.button-link {
    color: #fff;
    text-decoration: none;
}
</style>  