<template>
  <div>
    <div class="echart-map" ref="myEchart" @mousedown="mousedown" @mouseup="mouseup"></div>
    <!--<cakeAndzhu ref="new" :cityname="cityname"/>-->

  </div>
</template>

<script>
  import echarts from 'echarts';
  import 'echarts/map/js/china.js';
  import textAPI from '../request/api.js';
  import axios from 'axios';
  import cakeAndzhu from '../components/CakeAndZhu.vue'
  import {provinceNameArr, cityNameData, provinceNameChineseToEng, cityNameChineseToEng} from '../libs/geoNameDictionary.js'; // 引入省市对应英文名字

  export default {
    name: 'dandian',
   /* components:{
      cakeAndzhu,
    },*/
    data() {
      return {
        dialogVisible: false, //控制dialog对话框的显示与否
        echart: null,

        // echart地图的配置项
        option: {},
        cityname:'',
        // 地图拖动起止位置（用于拖动不触发返回事件）
        mouse_position: {
          beginX: '',
          beginY: '',
          endX: '',
          endY: '',
        },

        // 地区类型：country, province, city
        placeType: 'country',
        // 当前省
        province: {
          name: '',
          code: '',
        },
        // 当前市
        city: {
          name: '',
          code: '',
        },

        init:[{
          provinceName:"浙江",
          cityName:[
            "绍兴","杭州"
          ]
        },
          {
            provinceName:"江苏",
            cityName:["南京","苏州"]
          }],
        data: [{"name":"杭州","value":1}

        ],
        geoCoordMap: {},   /*地图里各个城市的坐标*/
      }
    },

    created(){
      self=this;
      textAPI.DandianAPI().then(res => {
        console.log(res.data.data);
        var point={};
        var point_data=[]
        for(var i=0;i<res.data.data.login_data.length;i++){
           var jingwei=[res.data.data.login_data[i].point_X,res.data.data.login_data[i].point_Y]
          var x=new Object()
          x.name=res.data.data.login_data[i].address
          x.value=1
           point_data.push(x)
           var ad=res.data.data.login_data[i].address
          console.log(ad)
           point[ad]=jingwei
        }
        console.log(point_data)
        window.localStorage.setItem("dandian",JSON.stringify(point_data))
        window.localStorage.setItem("point",JSON.stringify(point))
        console.log(point)
        self.geoCoordMap=point
      })
    },

    methods: {
      // 判断一个城市是否在这个省内
      cityIsInclude(provinceEngName, cityName, cityNameEng) {
        let cities = cityNameData[`cityName_${provinceEngName}`]
        for (let city in cities) {
          if ((!cityNameEng && city.indexOf(cityName) !== -1) || (cityNameEng && city.indexOf(cityName) !== -1 && cities[city] === cityNameEng)) {
            return true
          }
        }
        return false
      },

      // 将data在坐标点上展示，同时在省市情况下，过滤掉范围外的点
      convertData(data, provinceEngName, cityNameEng) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          if (provinceEngName) {
            let ret = this.cityIsInclude(provinceEngName, data[i].name, cityNameEng)
            if (ret) {
              var geoCoord = this.geoCoordMap[data[i].name]
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                })
              }
            }
          } else {
            let geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
        }
        return res;
      },

      // 设置地图的option配置项
      setMapOption(place = 'china', center = undefined) {
        this.option = {
          backgroundColor: "#0ffbff",  //地图背景颜色
          tooltip : { // 鼠标移到图里面的浮动提示框
            trigger: 'item'
          },
          // 图例
          legend: {
            show: false,
            orient: 'vertical', // 排序方式
            y: 'bottom', // y轴位置
            x:'right', // x轴位置
            data:['pm2.5', 'Top 5'], // 图例的数据数组，对应series中的name
            textStyle: { // 文字样式
              color: '#fff'
            },
            icon: 'rect',
            formatter: ``,
          },
          geo: {
            map: place,
            center: center,
            aspectScale: 0.75, // 地图长宽比
            scaleLimit: { // 放大缩小最大比例限制
              min: 0.8,
              max: 4,
            },
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#0ffbff',
                borderColor: '#0ffbff'
              },
              emphasis: {
                show: true,
                areaColor: '#3d6aff',
              }
            },
            itemStyle: {
              areaColor: '#eeeeee' // 地图本身的颜色
            }
            // emphasis: {
            //   show: false,
            // },
          },
          series: [
            {
              name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.data),
              encode: {
                value: 2
              },
              symbolSize: 4,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#3d6aff' //为空的点集的颜色
                }
              }
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              encode: {
                value: 2
              },
              symbolSize: 8,
              showEffectOn: 'render', // 何时显示特效
              effectType: 'ripple', // 特效类型，暂时只有涟漪类型
              rippleEffect: {
                period: 6,
                scale: 8,
                brushType: 'stroke'
              },
              hoverAnimation: true,
              // label: {
              //   normal: {
              //     formatter: '{b}',
              //     position: 'right',
              //     show: true
              //   }
              // },
              itemStyle: {
                normal: {
                  color: '#3d6aff',   //非空点集的颜色
                  // shadowBlur: 10,
                  // shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]
        };
      },

      // 鼠标拖动事件（使拖动不触发返回事件）
      mousedown(e) {
        this.mouse_position.beginX = e.clientX;
        this.mouse_position.beginY = e.clientY;
      },
      mouseup(e) {
        this.mouse_position.endX = e.clientX;
        this.mouse_position.endY = e.clientY;
      },

      // 判断是否拖动，当前允许存在4px误差
      isdrag(x1,y1,x2,y2) {
        if(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)) <= 4) {
          return false;
        }
        return true;
      },

      // 点击其他区域，返回上一页
      clickOther() {
        console.log(this.mouse_position);

        if (!this.isdrag(this.mouse_position.beginX, this.mouse_position.beginY, this.mouse_position.endX, this.mouse_position.endY)) {
          if (this.placeType == 'city' && this.province.name) {
            // 从市返回省
            this.placeType = 'province';
            this.city.code = '';
            this.city.name = '';
            this.setMapOption(this.province.name);
            this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(this.province.name));
            this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 5), provinceNameChineseToEng(this.province.name));
            this.echart.setOption(this.option);
          } else if (this.placeType == 'province') {
            // 从省返回国家
            this.placeType = 'country';
            this.province.code = '';
            this.province.name = '';
            this.city.code = '';
            this.city.name = '';
            this.setMapOption();
            this.echart.setOption(this.option);
          }
        }
      },

      // 渲染echart地图
      chinaConfigure() {
        this.echart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        window.onresize = this.echart.resize;
        // echart配置项
        this.setMapOption();
        this.echart.setOption(this.option);


        // 点击事件
        // 使用剪头函数，函数内部的this会指向调用函数时的this，而不是函数体内
        this.echart.on('click',  (params) => {
          event.stopPropagation(); // 阻止冒泡
          this.cityname=params.name;
          self=this;
          //初始化饼图和柱状图数据
          textAPI.CakeAPI(params.name).then(res =>{
            window.localStorage.setItem("cake",null);
            window.localStorage.setItem("zhu",null);
            console.log(res.data.data.city);
            console.log(res.data.data.top);
            window.localStorage.setItem("cake",JSON.stringify((res.data.data.city)));
            window.localStorage.setItem("zhu",JSON.stringify((res.data.data.top)));
            self.$refs.new.show(true);
          })

          if (params.componentType === 'series') {
            // 点击了单个停车场， 跳转停车场详情
            alert('跳转详情页');
            return;
          }

          // 对点击的省或者市做不同的处理
          let province = provinceNameArr.find(item => item.chineseName === params.name);
          console.log(province, this.placeType);
          if (this.placeType === 'country' && province) {
            // 点击了省

            // if (province.code.length == '6') {
            // 如果是直辖市，香港澳门台湾，则直接当成省级，进入渲染市级
            // this.setCityMap(province.chineseName, province.code)
            // } else {
            this.setProvinceMap(province.chineseName, province.code);
            // }

          } else if (this.placeType === 'province'
            // Object.keys(obj) --> 能够遍历出该对象所有的key，输出所有key的一个集合; 同理Object.values(obj)输入对象的value集合
            && Object.keys(cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]).find(item => item === params.name)
          ) {
            // 点击了市，跳转到该市
            console.log(this.province.name);
            console.log(provinceNameChineseToEng(this.province.name));
            console.log(`cityName_${provinceNameChineseToEng(this.province.name)}`);
            console.log(Object.keys(cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]).find(item => item === params.name));
            let cityCode = cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`][params.name];

            this.setCityMap(params.name, cityCode);

          } else if (this.placeType === 'city') {
            // 点击县，不做处理
          } else if (this.placeType === 'province' && !cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]) {
            // 点击直辖市、香港澳门台湾的内部，不做处理
          } else {
            /*alert('地图资源错误，请联系管理员!');*/
          }

        })
      },

      // 设置省份地图
      setProvinceMap(name, code) {
        axios.get(`/json/geometryProvince/${code}.json`).then(res => {
          this.placeType = 'province';
          this.province.name = name;
          this.province.code = code;
          this.setMapOption(name, res.data.cp);
          this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(name));
          this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 5), provinceNameChineseToEng(name));
          echarts.registerMap(name, res.data);
          this.echart.setOption(this.option);
        }).catch(err => {
          /*alert('地图资源错误，请联系管理员!');*/
        })
      },

      // 设置城市地图
      setCityMap(name, code) {
        axios.get(`/json/geometryCouties/${code}.json`).then(res => {
          this.placeType = 'city';
          this.city.name = name;
          this.city.code = code;
          this.setMapOption(name, res.data.cp);
          this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(this.province.name), code);
          this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 5), provinceNameChineseToEng(this.province.name), code);
          echarts.registerMap(name, res.data);
          this.echart.setOption(this.option);
        }).catch(err => {
          /*alert('地图资源错误，请联系管理员!');*/
        })
      },
    },
    mounted() {
      this.data = JSON.parse(localStorage.getItem('dandian'))
      this.geoCoordMap=JSON.parse(window.localStorage.getItem("point"))
      this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.echart) {
        return;
      }
      this.echart.dispose();
      this.echart = null;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .echart-map {
    margin-top:-30px;
    margin-left:-22px;
    width: 1350px;
    height: 730px;
  }

  *{
    height:100%;
    padding:0px;
    margin:0px;
  }
</style>
