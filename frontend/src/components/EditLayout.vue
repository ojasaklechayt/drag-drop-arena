<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div id="q-app" class="app-container">
                <div id="q-inner" class="inner-container">
                    <div class="action-button">
                        <q-btn class="button-link" color="primary" @click="edit_display()">Save Template</q-btn>
                        <q-input filled v-model="template.name" label='New Template Name'></q-input>
                    </div>
                    <q-splitter class="splitter" v-model="splitterModel" :style="splitterStyles">
                        <!-- Before Splitter Content -->
                        <template v-slot:before>
                            <div class="content-container">
                                <div class="section-header">All Fields</div>
                                <draggable class="button-design" v-model="template.leftlabels" group="people"
                                    @start="onDragStart" @end="onDragEnd" item-key="id">
                                    <template #item="{ element: first }">
                                        <q-btn class="nested-button" color="primary" dense square>{{ first }}</q-btn>
                                    </template>
                                </draggable>
                            </div>
                        </template>



                        <!-- After Splitter Content -->
                        <template v-slot:after>
                            <div class="content-container">
                                <div class="section-header">Selected Fields</div>
                                <div>
                                    <draggable class="button-design" v-model="template.righttitle" group="people"
                                        @start="onDragStart" @end="onDragEnd" item-key="id">
                                        <template #item="{ element: second, index }">
                                            <div
                                                style="display: flex; flex-direction: column; align-items: center; margin-bottom: 25px;">
                                                <q-input class="nested-input" label-color="white" sm bg-color="primary"
                                                    cursor-pointer color="white" square outlined
                                                    v-model="template.rightlabels[index]" :label="second"
                                                    style="width: 200px; height: 30px; text-align: center;"></q-input>
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
import { QSplitter, QBtn, QInput, Notify, useQuasar } from 'quasar';
import axios from 'axios';
import draggable from 'vuedraggable';

export default defineComponent({
    name: 'EditTemplate',
    props: {
        id: String
    },
    setup(props) {
        const $q = useQuasar();
        const splitterModel = ref(50);
        const splitterStyles = {
            height: '600px',
            width: '600px',
        };
        const template = ref([]);
        const drag = ref(false);
        console.log(props.id);
        const fetchDataandID = async () => {
            try {
                $q.loading.show();
                const dataResponse = await axios({

                    method: 'get',
                    url: `https://drag-drop-arena-backend-mb5m.onrender.com/templates/${props.id}`,
                })
                const data = dataResponse.data;
                template.value = data;
                $q.loading.hide();
                console.log(template.value);
                console.log(template.value.leftlabels);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const updatetemplatevalue = async () => {
            try {
                const updatetemplate = await axios({
                    method: 'put',
                    url: `https://drag-drop-arena-backend-mb5m.onrender.com/templates/${props.id}`,
                    data: template.value,
                    headers: { "Content-Type": "application/json" }
                })
                Notify.create({ message: 'Template edited successfully!!', progress: true })
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    Notify.create({ message: 'Template with same name already exists!!', progress: true })
                } else {
                    console.error('Error updating template:', error);
                }
            }
        };

        const onDragStart = () => {
            drag.value = true;
        };

        const onDragEnd = () => {
            drag.value = false;
        };

        onMounted(() => {
            fetchDataandID();
        });

        return {
            splitterModel,
            splitterStyles,
            fetchDataandID,
            template,
            drag,
            onDragStart,
            onDragEnd,
            updatetemplatevalue
        };
    },
    data() {
        return {
            check: true
        }
    },
    emits: ['emiteditdisplay'],
    methods: {
        async edit_display() {
            await this.updatetemplatevalue();
            await this.$emit('emiteditdisplay', this.check);
        }
    },
    components: {
        QSplitter,
        QBtn,
        draggable,
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