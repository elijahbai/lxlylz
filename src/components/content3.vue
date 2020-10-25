<template>
	<v-table :width="1100" :height="600" even-bg-color="#f2f2f2" :title-rows="titleRows" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :cell-edit-done="cellEditDone" is-horizontal-resize></v-table>
</template>




<style>
/*.title-cell-class-name-test1 {
	background-color: #2db7f5;
}
.title-cell-class-name-test2 {
	background-color: #2db7f5;
	}*/
	.header-first{
		background-color: rgb(142,142,147);
	}
	.time{
		background-color: rgb(67,181,129);
	}
	.data{
		background-color: rgb(79,99,217);
	}
	.name{
		background-color: rgb(248,230,230);
	}
	.header-sec01{
		background-color: rgb(67, 181, 129);
	}
	.header-sec02{
		background-color: rgb(255,64,64);
	}
	.header-sec03{
		background-color: rgb(204,237,24);
	}
	.jinkou{
		background-color: rgb(217,225,235);
	}
	.chukou{
		background-color: rgb(227,233,239);
	}
	.cell-edit-color{
		color:#2db7f5;
		font-weight: bold;
	}
</style>
<script>

	export default{
		data(){
			return {
				multipleSort: false,
				tableData: [
				{"name":"赵伟","gender":"男","height":"183","email":"zhao@gmail.com","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
				{"name":"李伟","gender":"男","height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
				{"name":"孙伟","gender":"女","height":"186","email":"sun@gmail.com","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
				{"name":"周伟","gender":"女","height":"188","email":"zhou@gmail.com","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
				{"name":"吴伟","gender":"男","height":"160","email":"wu@gmail.com","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"},
				{"name":"冯伟","gender":"女","height":"168","email":"feng@gmail.com","tel":"133*****3793","hobby":"钢琴、书法、唱歌","address":"上海市金山区龙胜路143号一层"},

				],
				columns: [
				{
					field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',
					formatter: function (rowData, index) {
						return index < 3 ? '<span style="color:none;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
					},
					isFrozen: true
				},
				{field: 'name', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'gender', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'height', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'tel', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'email', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'hobby', width: 150, columnAlign: 'center', isFrozen: true},
				{field: 'address', width: 150, columnAlign: 'left', isFrozen: true}
				],

				titleRows:[
				[{fields:['custome','name','gender','height','tel', 'email','hobby','address'],title:'锅炉记录表',titleAlign:'center',colspan:8,titleCellClassName:'header-first', isEdit:true}],

				[{fields: ['custome'], title: '项目', titleAlign: 'center', rowspan: 1,isEdit:true,formatter: function (rowData,rowIndex,pagingIndex,field){

                                   return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                               },isResize:true},
				{fields: ['name', 'gender' ], title: '一级反渗透', titleAlign: 'center', colspan: 2,titleCellClassName:'header-sec01', isEdit:true, isResize:true},
				{fields: ['height','tel', 'email'], title: '二级反渗透', titleAlign: 'center', colspan: 3,titleCellClassName:'header-sec02',isEdit:true,isResize:true},
				{fields: ['hobby','address'], title: '锅炉外壁', titleAlign: 'center', rowspan: 1,colspan: 2,titleCellClassName:'header-sec03',isEdit:true,isResize:true}],

				[{fields:['custome'],title:'名称',titleAlign:'center',rowspan:3,colspan:1,titleCellClassName:'name'},
				{fields:['name','gender'],title:'',colspan:2},
				{fields:['height','tel'],title:'进口',titleAlign:'center',colspan:2,titleCellClassName:'jinkou'},
				{fields:['email'],title:'出口',titleAlign:'center',colspan:1,titleCellClassName:'chukou'},
				{fields:['hobby','address'],title:'',colspan:2},
				],

				[{fields:['name'],title:'滑油压力',titleAlign: 'center', colspan: 1},
				{fields: ['gender'], title: '燃油压力', titleAlign: 'center', colspan: 1},
				{fields: ['height'], title: '进口温度', titleAlign: 'center', colspan: 1},
				{fields: ['tel'], title: '进口高温', titleAlign: 'center', colspan: 1},
				{fields: ['email'], title: '出口压力', titleAlign: 'center', colspan: 1},
				{fields: ['hobby',], title: '外壁温度1', titleAlign: 'center', colspan: 1},
				{fields: ['address'], title: '外壁温度2', titleAlign: 'center', colspan: 1},],

				[{fields:['name'],title:'PRESS.LO',titleAlign: 'center', colspan: 1},
				{fields: ['gender'], title: 'PRESS.RL', titleAlign: 'center', colspan: 1},
				{fields: ['height'], title: 'T.INLET', titleAlign: 'center', colspan: 1},
				{fields: ['tel'], title: 'TH.INLET', titleAlign: 'center', colspan: 1},
				{fields: ['email'], title: 'PRESS.OUTLET', titleAlign: 'center', colspan: 1},
				{fields: ['hobby',], title: 'T.WALL.01', titleAlign: 'center', colspan: 1},
				{fields: ['address'], title: 'T.WALL.02', titleAlign: 'center', colspan: 1},],

				[{fields:['custome'],title:'位号',titleAlign: 'center', rowspan:1,colspan: 1},
				{fields:['name'],title:'P101',titleAlign: 'center', colspan: 1},
				{fields: ['gender'], title: 'P102', titleAlign: 'center', colspan: 1},
				{fields: ['height'], title: 'T123', titleAlign: 'center', colspan: 1},
				{fields: ['tel'], title: 'T81', titleAlign: 'center', colspan: 1},
				{fields: ['email'], title: 'P12', titleAlign: 'center', colspan: 1},
				{fields: ['hobby',], title: 'T12', titleAlign: 'center', colspan: 1},
				{fields: ['address'], title: 'T13', titleAlign: 'center', colspan: 1},],

				[{fields:['custome'],title:'单位',titleAlign: 'center', rowspan:1,colspan: 1},
				{fields:['name'],title:'MPa',titleAlign: 'center', colspan: 1},
				{fields: ['gender'], title: 'Bar', titleAlign: 'center', colspan: 1},
				{fields: ['height'], title: '℃', titleAlign: 'center', colspan: 1},
				{fields: ['tel'], title: '℃', titleAlign: 'center', colspan: 1},
				{fields: ['email'], title: 'KPa', titleAlign: 'center', colspan: 1},
				{fields: ['hobby',], title: '℃', titleAlign: 'center', colspan: 1},
				{fields: ['address'], title: '℃', titleAlign: 'center', colspan: 1},],

				[{fields:['custome'],title:'时间',titleAlign: 'center', rowspan:1,colspan: 1,titleCellClassName:'time'},
				{fields:['name'],title:'数据',titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['gender'], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['height'], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['tel'], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['email'], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['hobby',], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},
				{fields: ['address'], title: '数据', titleAlign: 'center', colspan: 1,titleCellClassName:'data'},],
				],
			}
		},
		methods:{

            // 单元格编辑回调
            cellEditDone(newValue,oldValue,rowIndex,rowData,field){

            	this.tableData[rowIndex][field] = newValue;

                // 接下来处理你的业务逻辑，数据持久化等...
            },
 
        },
    }
</script>