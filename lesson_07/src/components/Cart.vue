<template>
  <div class="hello">
    <el-table
      :data="tableData"
      height="500"
      border
      style="width: 100%;text-align: center;">
      <el-table-column
        prop="information"
        label="商品信息"
        header-align=center>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="handleCheckedChange"></el-checkbox>
            <img v-bind:src="tableData[scope.$index].img">
            <span>{{tableData[scope.$index].information}}</span>
          </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价(￥)"
        header-align=center
        width="150">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        header-align=center
        width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity" @change="handleChange(scope.row)" :min="1" :max="100"></el-input-number>
          </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="金额(￥)"
        header-align=center
        width="150">
      </el-table-column>
      <el-table-column
        prop="edit"
        label="操作"
        header-align=center
        width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteItem(scope.$index)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="float: left;padding-left: 50px">全选</el-checkbox>
    总价：￥{{this.getTotal()}}
  </div>
</template>
<script>
export default {
  name: 'Cart',
  row: 1,
  data () {
    return {
      show: true,
      tableData: [{
        img: require('../assets/刮胡刀.jpg'),
        information: '飞科剃须刀电动男士刮胡刀全身水洗智能充电式胡须刀正品刮胡子刀',
        checked: false,
        price: 10.00.toFixed(2),
        quantity: 1,
        totalPrice: 10.00.toFixed(2)
        // edit: '上海市普陀区金沙江路 1518 弄'
      }, {
        img: require('../assets/笔记本.jpg'),
        information: 'sotitime苏铁时光b5活页纸a5活页本替芯26孔空白活页纸商务简约笔记本文具方格本',
        checked: false,
        price: 12.99.toFixed(2),
        quantity: 1,
        totalPrice: 12.99.toFixed(2)
        // edit: '上海市普陀区金沙江路 1518 弄'
      }, {
        img: require('../assets/风扇.jpg'),
        information: '格力KYT-2501台扇定时转页扇静音家用迷你学生床头鸿运台式电风扇',
        checked: false,
        price: 29.99.toFixed(2),
        quantity: 1,
        totalPrice: 29.99.toFixed(2)
        // edit: '上海市普陀区金沙江路 1518 弄'
      }, {
        img: require('../assets/马里奥网球.jpg'),
        information: '任天堂 Switch游戏 NS 马里奥网球 玛丽网球 ACE 中文版 现货',
        checked: false,
        price: 30.00.toFixed(2),
        quantity: 1,
        totalPrice: 30.00.toFixed(2)
        // edit: '上海市普陀区金沙江路 1518 弄'
      }],
      total: 0.00.toFixed(2),
      checkAll: false,
      isIndeterminate: true
    }
  },
  methods: {
    handleChange (row) {
      // console.log(row)
      row.totalPrice = (row.quantity * row.price).toFixed(2)
      // for (let i = 0; i < this.tableData.length; i++) {
      // }
    },
    getTotal () {
      let total = 0.00
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].checked) {
          total = total + this.tableData[i].price * this.tableData[i].quantity
        }
      }
      return total.toFixed(2)
    },
    handleCheckAllChange (val) {
      console.log(this.checkAll)
      if (this.checkAll) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].checked = true
        }
      } else if (!this.checkAll) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].checked = false
        }
      }
    },
    handleCheckedChange (value) {
      // let checkedCount = value.length
      // this.checkAll = checkedCount === this.cities.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.checkAll)
      let temp = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].checked) {
          temp++
        } else if (!this.tableData[i].checked) {
          temp--
        }
      }
      if (temp === this.tableData.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    deleteItem (index) {
      console.log(index)
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  color: white;
  background: forestgreen
}
.el-table .warning-row {
  background: rgb(253, 230, 230);
}
.el-table .success-row {
  background: #59fd00;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
