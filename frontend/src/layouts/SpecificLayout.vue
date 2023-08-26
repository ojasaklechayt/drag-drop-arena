<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div id="q-app" class="app-container">
                <div id="q-inner" class="inner-container">
                    <div class="action-button">
                        <q-btn class="route-button" color="primary">
                            <router-link to="/" class="button-link">Home</router-link>
                        </q-btn>
                        <q-btn class="button-link" color="primary" @click="exportCSV">Export CSV</q-btn>
                    </div>
                    <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
                        <!-- Before Splitter Content -->
                        <template v-slot:before>
                            <div class="content-container">
                                <div class="section-header">Before</div>
                                <div v-for="(item, index) in template.leftlabels" :key="index">
                                    <q-btn class="nested-button" color="primary" dense square>{{ item }}</q-btn>
                                </div>
                            </div>
                        </template>



                        <!-- After Splitter Content -->
                        <template v-slot:after>
                            <div class="content-container">
                                <div class="section-header">After</div>
                                <div>
                                    <div v-for="(item, index) in template.righttitle" :key="index">
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
</template>  

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { QSplitter, QBtn, QInput } from 'quasar';
import axios from 'axios';

export default defineComponent({
    props: {
        id: String
    },
    setup(props) {
        const splitterModel = ref(50);
        const splitterStyles = {
            height: '600px',
            width: '600px',
        };
        const template = ref([]);
        const exportingdata = ref({});
        const gotresponse = ref({});
        console.log(props.id);
        const fetchDataandID = async () => {
            try {
                const dataResponse = await axios({
                    method: 'get',
                    url: `https://drag-drop-arena-backend-mb5m.onrender.com/templates/${props.id}`,
                })
                const data = dataResponse.data;
                template.value = data;
                console.log(template.value);
                console.log(template.value.leftlabels);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const sendRequest = async () => {
            try {
                exportingdata.value = {};
                gotresponse.value = {};

                for (const item of template.value.righttitle) {
                    exportingdata.value[item] = 1;
                }

                const response = await axios({
                    method: "post",
                    url: "https://drag-drop-arena-backend-mb5m.onrender.com/data/giveresult",
                    data: exportingdata.value,
                    headers: { "Content-Type": "application/json" }
                });

                if (response.status === 200) {
                    gotresponse.value = response.data;
                    for (const key in gotresponse.value[0]) {
                        exportingdata.value[key] = gotresponse.value.map(item => item[key]);
                    }
                } else {
                    console.error('Non-200 status received:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const exportCSV = async () => {
            await sendRequest();

            const csvRows = [];
            const fieldNames = Object.keys(exportingdata.value);

            const headerRow = fieldNames.map((fieldName, index) => template.value.rightlabels[index] || template.value.righttitle[index]);

            csvRows.push(headerRow.join(','));

            for (let i = 0; i < exportingdata.value[fieldNames[0]].length; i++) {
                const rowData = fieldNames.map(fieldName => exportingdata.value[fieldName][i]);
                csvRows.push(rowData.join(','));
            }

            const csv = csvRows.join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rearranged-data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        };

        onMounted(() => {
            fetchDataandID();
        });

        return {
            splitterModel,
            splitterStyles,
            fetchDataandID,
            template,
            exportCSV
        };
    },
    components: {
        QSplitter,
        QBtn,
    },
    computed: {
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