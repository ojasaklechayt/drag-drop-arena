<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div id="q-app" class="app-container">
        <div id="q-inner" class="inner-container">
          <div class="action-button">
            <q-btn class="route-button" color="primary"><router-link to="/" class="button-link">Home</router-link></q-btn>
            <q-input filled v-model="text" label="Template Name"></q-input>
            <q-btn class="data-button" color="primary" @click="saveTemplate">Save Template</q-btn>
          </div>
          <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
            <!-- Before Splitter Content -->
            <template v-slot:before>
              <div class="content-container">
                <div class="section-header">Before</div>
                <div>
                  <draggable class="button-design" v-model="buttonData" group="people" @start="onDragStart"
                    @end="onDragEnd" item-key="id">
                    <template #item="{ element: first }">
                      <q-btn class="nested-button" color="primary" dense square>{{ first }}</q-btn>
                    </template>
                  </draggable>
                </div>
              </div>
            </template>

            <!-- After Splitter Content -->
            <template v-slot:after>
              <div class="content-container">
                <div class="section-header">After</div>
                <div>
                  <draggable class="button-design" v-model="reorderedButtonData" group="people" @start="onDragStart"
                    @end="onDragEnd" item-key="id">
                    <template #item="{ element: second, index }">
                      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 25px;">
                        <q-input class="nested-input" label-color="white" sm bg-color="primary" color="white" square
                          outlined v-model="columnTitles[index]" :label="second"
                          style="width:200px; height: 30px; text-align: center;"></q-input>
                      </div>
                    </template>
                  </draggable>
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
import { QSplitter, QBtn, Notify } from 'quasar';
import axios from 'axios';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'CreateTemplate',
  setup() {
    const splitterModel = ref(50);
    const splitterStyles = {
      height: '600px',
      width: '600px',
    };

    const buttonData = ref([]);
    const reorderedButtonData = ref([]);
    const drag = ref(false);
    const exportingdata = ref({});
    const gotresponse = ref({});
    const columnTitles = ref([]);
    const Templateobject = ref({});
    const text = ref('');

    const fetchAndPopulateData = async () => {
      try {
        const dataResponse = await axios.get('https://drag-drop-arena-backend-mb5m.onrender.com/data/getdata');
        const data = dataResponse.data;
        buttonData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const saveTemplate = async () => {
      try {
        Templateobject.value = {
          'name': text.value,
          'leftlabels': buttonData.value,
          'rightdata': exportingdata.value,
          'rightlabels': columnTitles.value,
          'righttitle': reorderedButtonData.value
        };


        const save = await axios({
          method: "post",
          url: "https://drag-drop-arena-backend-mb5m.onrender.com/templates",
          data: Templateobject.value,
          headers: { "Content-Type": "application/json" }
        });

        Notify.create({ message: 'Template created successfully!!', progress: true})
      } catch (error) {
        if (error.response && error.response.status === 422) {
          Notify.create({ message: 'Template with the same name already exists.', progress: true})
        } else {
          console.error('Error updating template:', error);
        }
      }
    };


    const sendRequest = async () => {
      try {
        exportingdata.value = {};
        gotresponse.value = {};

        for (const item of reorderedButtonData.value) {
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

      const headerRow = fieldNames.map((fieldName, index) => columnTitles.value[index] || reorderedButtonData.value[index]);

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

    const onDragStart = () => {
      drag.value = true;
    };

    const onDragEnd = () => {
      drag.value = false;
    };

    onMounted(() => {
      fetchAndPopulateData();
    })

    return {
      splitterModel,
      splitterStyles,
      buttonData,
      reorderedButtonData,
      drag,
      onDragStart,
      onDragEnd,
      exportCSV,
      columnTitles,
      saveTemplate,
      text
    };
  },
  components: {
    QSplitter,
    QBtn,
    draggable,
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