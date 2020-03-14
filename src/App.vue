<template>
  <div id="app">
    <van-cell-group>
      <!-- 输入姓名 -->
      <div class="persome">
        <div class="persome-left">
          <span>联系人</span>
        </div>
        <div class="persome-right">
          <input v-model="liaison" type="text" placeholder="姓名">
        </div>
      </div>
      <!-- 选着性别 -->
      <div class="sex">
          <van-button type="default" size="small" @click="addSex('male')" :class="sexual == 'male'?'active':''">男</van-button>
          <van-button type="default" size="small" @click="addSex('female')" :class="sexual == 'female'? 'active':''" >女</van-button>
      </div>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="tel" type="tel" label="电话" placeholder="手机号码" class="label-class" :error-message="promt">
          <van-button slot="button" size="small" plain type="primary" color="#1989fa" class="van-hairline--surround">+通讯录</van-button>
      </van-field>
      <!-- 填写地址 -->
      <van-field v-model="province" label="地址"    right-icon="arrow" placeholder="选择收货地址" class="label-class" @click="showPopup"/>
      <!-- 地址选择弹出框 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-area :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" value="110000" title="选择地址" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        </van-area>
      </van-popup>
      <!-- 详细地址填写 -->
      <van-field v-model="fulladdress" label="门牌号" placeholder="例：5号楼203室" class="label-class"/>
      <!-- 备注标签 -->
      <div class="tag">
        <div class="tag-left">
            <span>标签</span>
        </div>
          <van-button type="default" size="small" @click="addMark('home')" :class="mark == 'home'?'active':''">家</van-button>
          <van-button type="default" size="small" @click="addMark('school')" :class="mark == 'school'?'active':''">学校</van-button>
          <van-button type="default" size="small" @click="addMark('firm')" :class="mark == 'firm'?'active':''">公司</van-button>
      </div>
    </van-cell-group>

    <div class="sub">
       <van-button type="primary" block color="#1989fa" @click="sumbit" :disabled="isDisbled">保存并使用</van-button>
    </div>
  </div>
</template>

<script>
import areaList from './assets/area/area.js'

export default {
  name: 'App',
  data() {
    return {
      areaList,
      show: false,
      isDisbled:false,
      liaison:'',
      tel: '',
      fulladdress:'',
      province:'',
      sexual:'',
      mark:'',
      carmodel:'',
      promt:'',
      timer:null,
    }
  },
  watch: {
    tel(val){
      if(val.length >= 11) {
        // 正则表达式判断手机号码格式
        if(!/^1(3|5|7|8)\d{9}$/.test(val)) {
          this.promt = '格式错误'
        } else {
          this.promt = ''
        }
      } else {
        this.promt = ''
      }
    }
  },
  


  methods: {

    //截流
    // sumbit(){
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(() => {
    //     console.log('提交');
    //     }, 1000);
    // },

    //防抖
    sumbit(){
    if(!this.isDisbled){
        console.log('提交');
        this.isDisbled = true;
      }
      
      this.timer = setTimeout(() => {
        this.isDisbled = false;
        clearTimeout(this.timer)
      }, 5000);
    },
    addSex(val){
      if(this.sexual == val){
        this.sexual = ''
      }else{
        this.sexual = val
      }
    },
    addMark(val){
      if(this.mark == val){
        this.mark = ''
      }else{
        this.mark = val
      }
    },
    showPopup() {
      this.show = true;
    },
    //value=0改变省，1改变市，2改变区
    onChange(picker){
        let val = picker.getValues();
        //console.log(val)//查看打印
        this.carmodel = ''
        for (var i = 0; i < val.length; i++) {
            this.carmodel = this.carmodel+(i==0?'':'/')+val[i].name
        }
        //this.carmodel = areaName;
       console.log(this.carmodel);
    },
    //确定选择城市
    onConfirm(){
        this.province ="";
        console.log(this.province);
        if(this.carmodel.indexOf('请选择') == -1){
          this.province = this.carmodel.split('/').join('');
          this.show = false//关闭弹框
        }else{
          this.$toast('请选择地区');
        }
    },
    //取消选中城市
    onCancel(){
          this.show = false
          this.$refs.myArea.reset()// 重置城市列表
    }   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;;
  color: #2c3e50;
  margin-top: 60px;
  border-color:#fff;
}


input::-webkit-input-placeholder {
    color: #969799;
  }

.active{
  border-color: #1989fa;
  color: #1989fa;
}

.van-hairline--surround{
  border:none;
}

.persome{
  display: -webkit-box;
  height: 44px;
  padding-left:16px;
}

.persome .persome-left{
  margin: 10px 0;
  width: 90px;
  height: 24px;
  font-weight: bolder;
  font-size: 14px;
}

.persome .persome-right{
  -webkit-box-flex: 1;
  padding-right:16px ;
  border-bottom:1px solid #ebedf0; 
}

.persome .persome-right input{
  padding:10px 0 9px 0;
  border:0;
  resize: none;
  right:10px;
  width: 100%;
  font-weight: bolder;
  font-size: 14px;
  height: 24px;
}

.tag{
  display: flex;
  -webkit-box-flex: 0;
  height: 44px;
  margin:0 0px 10px 16px;
  border-bottom: 1px solid #ebedf0;
}

.tag .tag-left{
  margin: 10px 0;
  width: 90px;
  height: 24px;
  font-weight: bolder;
}

.tag button{
  margin-top: 7px ;
  margin-right:10px;  
}

.sex{
  margin-left:106px;
  height: 43px;
  border-bottom:1px solid #ebedf0;
}

.sex button{
  margin-top: 7px ;
  margin-right:20px; 
}

.sex button span{
  font-size: 14px;
}

.tag span{
    font-size: 14px;
    line-height: 24px;
}

.label-class{
  font-weight: bolder;
}
.sub{
  padding:0 16px ;
}
</style>
