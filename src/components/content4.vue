<template>
  <div id="hello">
    <div>{{mySon}}</div>
		<h4 style="display: inline-block;margin:0;">测试表</h4>
    <el-button @click="second">跳转</el-button>
		<div style="display: inline-block;float: right;">
      <el-button size="mini" type="primary" @click="arraySpanMethodtest">合并测试</el-button>
			<el-button size="mini" type="primary" v-print="'#addBox'">打印数据</el-button>
			<el-button size="mini" type="primary" @click="addRow">增加行</el-button>
			<el-popconfirm title="确定删除最后行吗？" @onConfirm="delLastRow">
				<el-button slot="reference" type="primary" size="mini">删除末行</el-button>
			</el-popconfirm>
		</div>

    <el-table
      id="addBox"
      :data="testDatas" border
      style="width: 100%;margin-top:10px"
      @header-contextmenu="colRightClick"
      @cell-dblclick="celldbclick"
      :span-method="arraySpanMethodtest">
      <el-table-column v-if="testCols.length > 0" type="index" :label="'编号'" :width="50" ></el-table-column>

      <el-table-column v-for="(column, idx) in testCols" :key="idx" :index="idx">
        <!--label-->
        <template slot="header" slot-scope="scope1">
          <p v-show="column.show" @dblclick="column.show=false">
            {{column.txt}}
            <i class="el-icon-edit-outline" @click="column.show=false"></i>
          </p>
          <el-input
            size="mini"
            v-show="!column.show"
            v-model="column.txt"
            @blur="column.show=true">
          </el-input>
        </template>
        <!--prop-->
        <template slot-scope="scope"  :style="{color: color}">
          <p v-show="scope.row[column.col].show" >
            {{scope.row[column.col].content}}
            <i class="el-icon-edit-outline" @click="scope.row[column.col].show=false"></i>
          </p>
          <el-input type="textarea" :autosize="{minRows:2,maxRows:4}"
            v-show="!scope.row[column.col].show"
            v-model="scope.row[column.col].content"
            @blur="scope.row[column.col].show=true">
          </el-input>
        </template>
      </el-table-column>

    </el-table>


		<div v-show="showMenu" id="contextmenu">
			<i class="el-icon-circle-close hideContextMenu" @click="showMenu=false"></i>
			<el-button size="mini" type="primary" @click="addColumn(curColumn)">前方插入一列</el-button>
			<el-button size="mini" type="primary" @click="addColumn(curColumn+1)">后方插入一列</el-button>
			<el-popconfirm title="确定删除该列吗？" @onConfirm="delColumn">
				<el-button slot="reference" type="primary" size="mini">删除当前列</el-button>
			</el-popconfirm>
		</div>

    <div class="triangle"></div>
    <div class="line"></div>
    <svg version="1.1" >
      <circle cx="100" cy="50" r="40" stroke="black"
      stroke-width="2" fill="red" draggable="true" />
    </svg>

  </div>
</template>

<script>
export default {
 name: 'demo',
 props:["mySon"],
  data(){
	 return{
      color:"",
			testCols: [
				{col: "name", txt: 'name', show: true},
				{col: "age", txt: 'age', show: true},
				{col: "city", txt: 'city', show: true},
				{col: "tel", txt: 'tel', show: true}
			],
			testDatas: [{
					name: {id: 1, content: '张三', show: true,rowIndex: 1,columnIndex: 1},
					age: {id : 2, content: 24, show: true,rowIndex: 1,columnIndex: 2},
					city: {id : 3, content: '广州', show: true,rowIndex: 1,columnIndex: 3},
					tel: {id: 4, content: '13312345678', show: true,rowIndex: 1,columnIndex: 4}
				},{
					name: {id: 5,content: '李四', show: true,rowIndex: 2,columnIndex: 1},
					age: {id: 6,content: 25, show: true,rowIndex: 2,columnIndex: 2},
					city: {id: 7,content: '九江', show: true,rowIndex: 2,columnIndex: 3},
					tel: {id: 8,content: '18899998888', show: true,rowIndex: 2,columnIndex: 4}
				}
			],
			count_col: 0,
			showMenu: false,
			curColumn: null,
	 }
  },
	methods:{
    second(){
      let routeUrl = this.$router.resolve({
        path: "/total01",
      });
      window.open(routeUrl .href, '_blank');
    },
    //合并行或列的计算方法
    arraySpanMethod({ row, column, rowIndex, columnIndex }){
      //console.log(row, column, rowIndex, columnIndex)
      // 打印出的数据就是表格当前行的数据,当前列的数据,索引
      if (rowIndex === 1) {
        // 合并第二行
        if (columnIndex === 1) {
          // 从第二列开始
          return [1, 3]
          // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
          // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
          // return {
          //    rowspan: 1,
          //    colspan: 3,
          //  }
          // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
          // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [0, 0]
        }
      }
    },
    arraySpanMethodtest({ row, column, rowIndex, columnIndex }){
      //console.log(row, column, rowIndex, columnIndex)
      // 打印出的数据就是表格当前行的数据,当前列的数据,索引
      if (rowIndex === 0) {
        // 合并第二行
        if (columnIndex === 4) {
          // 从第二列开始
          return [2, 1]
          // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
          // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
          // return {
          //    rowspan: 1,
          //    colspan: 3,
          //  }
          // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
          // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
        } else if (rowIndex === 2 ) {
          return [0]
        }
      }
    },
    celldbclick(row, column, cell, event){
      this.color = '#2e24c3';
      //console.log(row, column, cell, event);

    },
		colRightClick(column,event) {
			window.event.returnValue = false; //阻止浏览器自带的右键菜单弹出
			if(!column.index && column.index !== 0) return;
			this.curColumn = column.index
			this.showMenu = true
			var ele = document.getElementById('contextmenu')
			ele.style.top = event.clientY + 'px';
			ele.style.left = event.clientX + 'px';
			if(window.innerWidth - 140 < event.clientX) {
				ele.style.left = 'unset'
				ele.style.right = 0
			}
		},
		addRow() { // 新增行
			this.showMenu = false
			var obj = {}
			this.testCols.map(p => {
				obj[p.col] = {content: '', show: true}
			})
			this.testDatas.push(obj)
		},
		// 当row中存在一“主键”可唯一标识row的下标时（如：编号放在testDatas内），可借此实现行的自由插入与删除
		addColumn(idx) { // 新增列
			this.showMenu = false
			var obj = {col: 'col_' + this.count_col++, txt: '', show: true}
			if(idx || idx === 0) this.testCols.splice(idx, 0, obj);
			else this.testCols.push(obj);
			var _this = this
			this.testDatas.map(p => { // 新增的对象无法被vue监听到
				_this.$set(p, obj.col, {content: '', show: true})
//				p[obj.col] = {content: '', show: true}
			})
		},
		delColumn() { // 删除列
			this.showMenu = false
			var colKey = this.testCols[this.curColumn].col;
			this.testCols.splice(this.curColumn, 1);
			this.testDatas.map(p => {
				delete p[colKey];
			});
		},
		delLastRow() { // 删除行
			this.showMenu = false
			var len = this.testDatas.length;
			if(len > 0) this.testDatas.splice(len - 1, 1);
			else this.$message.error('没有可删除行');
		},
		consoleDatas() {
			// console.log('表头',this.testCols);
			// console.log('数据',this.testDatas);
		}
	}
}
</script>

<style scoped>
#hello {position: relative;}
#contextmenu {
	position:absolute;
	top: 0;
	left: 0;
  height:auto;
  width:120px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  padding: 10px;
	z-index: 12;
}
#contextmenu button {display: block;margin: 0 0 5px;}
.hideContextMenu {position: absolute;top: 5px;right: 5px;}

.triangle{
  width: 0;
  height: 0;
  margin: 100px auto;
  border-top: 50px solid transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}
.line{
  width: 100px;
  height: 1px;
  background: red;
}
</style>
