<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div id="q-app" class="app-container">
        <div id="q-inner" class="inner-container">
          <div class="action-button">
            <q-btn class="data-button" color="primary" @click="fetchAndPopulateData">Get Data</q-btn>
            <q-btn class="data-button" color="primary" @click="exportCSV">Export CSV</q-btn>
          </div>
          <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
            <!-- Before Splitter Content -->
            <template v-slot:before>
              <div class="content-container">
                <div class="section-header">Before</div>
                <div class="buttons-design">
                  <draggable v-model="buttonData" group="people" @start="onDragStart" @end="onDragEnd" item-key="id">
                    <template #item="{ element: first }">
                      <q-btn class="nested-button" color="primary" dense square>{{ first.name }}</q-btn>
                    </template>
                  </draggable>
                </div>
              </div>
            </template>

            <!-- After Splitter Content -->
            <template v-slot:after>
              <div class="content-container">
                <div class="section-header">After</div>
                <div class="button-design">
                  <draggable v-model="reorderedButtonData" group="people" @start="onDragStart" @end="onDragEnd"
                    item-key="id">
                    <template #item="{ element: second }">
                      <q-btn class="nested-button" color="primary" dense square>{{ second.name }}</q-btn>
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
import { defineComponent, ref } from 'vue';
import { QSplitter, QBtn } from 'quasar';
import axios from 'axios';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const splitterModel = ref(50);
    const splitterStyles = {
      height: '600px',
      width: '600px',
    };

    const buttonData = ref([]);
    const reorderedButtonData = ref([]);
    const drag = ref(false);
    const arrayreference = ref([]);

    const fetchAndPopulateData = async () => {
      try {
        const dataResponse = await axios.get('https://drag-drop-arena-backend-mb5m.onrender.com/data/getdata');
        const data = dataResponse.data;
        reorderedButtonData.value = [];
        buttonData.value = data.flatMap((nestedArray, i) => nestedArray.map((item, j) => ({ id: `${i}-${j}`, name: item })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const exportCSV = () => {
      arrayreference.value = []
      for(let i of reorderedButtonData.value){
        arrayreference.value.push(i.name);
      }
      const csv = arrayreference.value.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rearranged-data.csv';
      a.click();
      window.URL.revokeObjectURL(url);         
    }

    const onDragStart = () => {
      drag.value = true;
    };

    const onDragEnd = () => {
      drag.value = false;
    };

    return {
      splitterModel,
      splitterStyles,
      buttonData,
      reorderedButtonData,
      drag,
      fetchAndPopulateData,
      onDragStart,
      onDragEnd,
      exportCSV
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
}

.content-container {
  padding: 10px;
  background-color: #fff;
}

.section-header {
  font-weight: bold;
  margin-bottom: 20px;
  z-index: -1;
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
}

.nested-button {
  margin: 10px;
  font-size: 0.8rem;
  text-transform: lowercase;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 10%;
}

.action-button{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 600px;
  gap: 10%;
  margin-bottom: 10px;
}
</style>
