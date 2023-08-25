<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div id="q-app" class="app-container">
                <div id="q-inner" class="inner-container">
                    <div class="action-button">
                        <q-btn class="route-button" color="primary">
                            <router-link to="/" class="button-link">Home</router-link>
                        </q-btn>
                        <q-input filled label="Template Name"></q-input>
                        <q-btn class="data-button" color="primary">Get Data</q-btn>
                        <q-btn class="data-button" color="primary">Save Template</q-btn>
                    </div>
                    <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
                        <!-- Before Splitter Content -->
                        <template v-slot:before>
                            <div class="content-container">
                                <div class="section-header">Before</div>
                                <div>
                                    <!-- Content that was inside the first draggable goes here -->
                                </div>
                            </div>
                        </template>

                        <!-- After Splitter Content -->
                        <template v-slot:after>
                            <div class="content-container">
                                <div class="section-header">After</div>
                                <div>
                                    <!-- Content that was inside the second draggable goes here -->
                                </div>
                            </div>
                        </template>
                    </q-splitter>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>  

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { QSplitter, QBtn, QInput } from 'quasar';
import axios from 'axios';

export default defineComponent({
    props: ['id'],
    setup() {
        const splitterModel = ref(50);
        const splitterStyles = {
            height: '600px',
            width: '600px',
        };
        const template = ref([]);

        const fetchDataandID = async (id) => {
            try {
                const dataResponse = await axios.get(`https://drag-drop-arena-backend-mb5m.onrender.com/templates/${id}`);
                const data = dataResponse.data;
                template.value = data;
                console.log(template.value);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        onMounted(() => {
            fetchDataandID();
        });

        return {
            splitterModel,
            splitterStyles,
            fetchDataandID,
        };
    },
    components: {
        QSplitter,
        QBtn,
        QInput,
    },
});
</script>

<style>
.app-container {
    background-color: #f2f2f2;
    padding: 20px;
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