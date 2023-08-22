<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div id="q-app" class="app-container">
        <div id="q-inner" class="inner-container">
          <q-btn class="data-button" color="primary" @click="fetchdata">Get Data</q-btn>
          <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
            <template v-slot:before>
              <div class="content-container">
                <div class="section-header">Before</div>
                <template  v-for="(nestedArray, index) in dummy" :key="index">
                  <template v-for="(item, nestedIndex) in nestedArray" :key="nestedIndex">
                    <q-btn class="nested-button">{{ item }}</q-btn>
                  </template>
                </template>
              </div>
            </template>
            <template v-slot:after>
              <div class="content-container">
                <div class="section-header">After</div>
                <div v-for="n in 20" :key="n" class="section-content">
                  {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                  iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                  ullam. In, libero.
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

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      dummy: [],
    };
  },
  setup() {
    const splitterModel = ref(50);
    const splitterStyles = {
      height: '600px',
      width: '600px',
    };

    return {
      splitterModel,
      splitterStyles,
    };
  },
  components: {
    QSplitter,
    QBtn,
  },
  methods: {
    async fetchdata() {
      const dataResponse = await axios.get('http://localhost:3000/data/getdata');
      this.dummy = dataResponse.data;
      console.log(this.dummy);
    },
    handleButtonClick(item) {
      console.log('Button clicked:', item);
    },
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
  margin-bottom: 10px;
}

.section-content {
  margin-bottom: 8px;
}

.data-button {
  margin-bottom: 1%;
}
</style>
