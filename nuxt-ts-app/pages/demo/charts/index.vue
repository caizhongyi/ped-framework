<template>
    <div>
        <label v-for="value of data" :class="{ active: value.id == selected.id}">
            <input type="radio" name="a" @change="change(value)" >
        </label>
        <button type="button" @click="click()">click</button>
        <no-ssr><ve-line :data="chartData" :settings="chartSettings"> <!--<div class="data-empty">没有数据😂</div>--> </ve-line></no-ssr>
        <no-ssr><ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram></no-ssr>
        <no-ssr><ve-pie :data="chartData"></ve-pie></no-ssr>
        <no-ssr><ve-ring :data="chartData"></ve-ring></no-ssr>
        <no-ssr><ve-gauge :data="chartDataSingle"></ve-gauge></no-ssr>

        <no-ssr>
            <ve-bmap
                :settings="chartSettings"
                :series="chartSeries"
                :tooltip="chartTooltip">
            </ve-bmap>
            <ve-liquidfill :data="chartDataSingle"></ve-liquidfill>
        </no-ssr>
    </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue,Watch,Model} from "nuxt-property-decorator"
  import { State,Getter, Action, Mutation,namespace} from "vuex-class"

 // import VeLiquidfill from 'v-charts/lib/liquidfill'

  @Component({
  //  components: { VeLiquidfill }
  })
  export default class charts extends Vue {
    chartSettings = {
      labelMap: {
        date: '时间',
        value: '比值',
        percent: '占比',
      }
    };
    chartTooltip =  { show: true };
    chartSeries = [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: [
          [120, 30, 1] // 经度，维度，value，...
        ]
      }
    ];
    chartDataSingle = {
      columns: ['city', 'percent'],
      rows: [{
        city: '上海',
        percent: 0.6
      }]
    }
    chartData = {
        columns : ['date' , 'value', 'percent'],
        rows : [
          { 'date' : '2000/1/1', 'value' : 1 , 'percent' : 1000 },
          { 'date' : '2000/1/2', 'value' : 12 , 'percent' : 34 },
          { 'date' : '2000/1/3', 'value' : 60 , 'percent' : 46 },
          { 'date' : '2000/1/4', 'value' : 34 , 'percent' : 788 },
        ]
    };
    data = [
      {active: true, id: '1'},
      {active: false, id: '2'},
      {active: true, id: '3'},
      {active: false, id: '4'},
      {active: true, id: '5'},
      {active: true, id: '6'}
    ];

    selected = {
      id : 0,
      active : true,
    }
    head (){
      return {
        title : "图表" ,
        meta : [
          {
            hid: "description",
            name: "description",
            content: "Nuxt.js project"
          },
          {
            hid: "keyword",
            name: "keyword",
            content: "Nuxt.js project"
          }
        ]
        }
    }
    @Watch('selected', {deep: true})
    onChangeData(val) {
      console.log(val)
    }

    change(o) {
      this.selected = o;
    }

    mounted() {
    }

    click() {
      console.log(this.data)
    }
  }
</script>

<style lang="scss" scoped>
    .data-empty {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, .7);
        color: #888;
        font-size: 14px;
    }
</style>
