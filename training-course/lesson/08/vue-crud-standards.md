# Vue普通CURD页面规范(demo)
---------------
## 页面基本构成

页面由template, script, style三部分构成
```html
<template></template>
<script></script>
<style></style>
```

## template部分

基础页面主体部分放在
```html
<el-card></el-card>
```
组件里，其中又分为以下三部分
### 操作按钮和搜索部分

例如，可以由一个添加按钮，一个输入框以及一个搜索按钮组成

```html
<div class="mar-btm-10 clearfix">
  <el-button
    type="primary"
    size="small"
    @click="addTemplateVisible = true"
  >
    <i class="fa fa-plus-circle"></i> 添加item
  </el-button>
  <div class="search-area">
    <el-input v-model="queryForm.q" placeholder="输入item名称查询" @keyup.enter.native="onSubmitQuery"></el-input>
    <el-button size="small" @click="onSubmitQuery">
      <i class="fa fa-fw fa-search"></i>
    </el-button>
  </div>
</div>
```

当一个组件属性较多时，分行属性，每行一个属性，顺序为静态属性、动态属性、事件。

### 列表展示数据及翻页部分

这部分由表格和翻页组件(*在不需要分页的时候可以省略*)两部分组成

表格默认一页15条数据，第一列默认为序号，最后一列为对数据操作的按钮

```html
<el-table :data="templateList">
  <el-table-column type="index" width="52"></el-table-column>
  <el-table-column prop="username" label="用户名"></el-table-column>
  <el-table-column label="操作" width="125">
    <template scope="scope">
      <div class="text-nowrap">
        <el-button size="small" @click="editTemplate(scope.row.id)">
          <i class="fa fa-fw fa-edit"></i>
        </el-button>
        <el-button type="danger" size="small" @click="removeTemplate(scope.row.id)">
          <i class="fa fa-fw fa-trash-o"></i>
        </el-button>
      </div>
    </template>
  </el-table-column>
</el-table>
<div class="clearfix mar-top">
  <el-pagination class="pull-right"
    layout="total, prev, pager, next"
    :total="pager.total"
    :current-page="pager.page"
    :page-size="pager.size"
    @current-change="onChangePage"
  >
  </el-pagination>
</div>
```
### 添加和修改数据的dialog部分

dialog经常与form一起使用，来编辑和新增数据

```html
<el-dialog title="添加item" v-model="addTemplateVisible" :close-on-click-modal="false">
  <el-form :model="item" label-width="75px">
    <el-form-item label="用户名">
      <el-input v-model="item.username"></el-input>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addTemplateVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSaveItem">确 定</el-button>
  </div>
</el-dialog>
```
## script部分
### 各配置选项的书写的顺序

1. 引用的组件和混合插件等
2. vue实例的数据对象，父组件传入的数据和计算属性
3. watch观察对象
4. 生命周期钩子函数
5. 自定义的方法

```js
components: {},
mixins: [],
data() {
  return {};
},
props: {},
computed: {},
watch: {},
beforeCreate(),
created() {},
beforeMount() {},
mounted() {},
beforeUpdate() {},
updated() {},
beforeDestroy() {},
destroyed() {},
methods: {},
```

### 增删改查方法的书写规范
#### 统一命名规范
* 方法分两种，所有事件绑定的方法名以**on**开头，所有会被内部调用的方法名以**动词**开头。函数名称应该可以表述行为，如：calculateFileSize，这个函数把数字字节转换为友好的格式，但这个名称给人的暗示是计算出结果然后做什么事，事实上此函数返回一个格式化的字符串，所以命名为getHumanReadableSize也许更合适（略有点长，应该尽量保持简短，比如getReadableSize也可以）。
* 若当前页面只对一个实体进行操作，那么实体相关方法名用单词**item**来指代。如onSubmitQuery能会另外调用查询列表的方法，统一叫`getItemList`，不再使用特殊的实体名称如getUserList等。其他的如`onCreateItem`, `onEditItem`, `onUpdateItem`, `onDeleteItem`, `onQueryItem`等，data属性名也是。
* 计算属性名__不应该__以动词开头，使用明确的表达。错误范例：hasFile(到底谁有文件？) isFileHave(英语语法就不对) ，正确范例：isFileExisting或者hasFileChosen等
* 一般情况下一个页面只操作一个实体的数据，若会出现多个实体，首先考虑页面拆分或者组件化，实在不行当然也可以增加，如果实体的相关属性不止一个，那么应该放置在一个名为xxx的Object中统一管理，而不是在data的顶层直接增加xxxList、xxxPage等属性。其对应方法在正常方法后加实体名称，如`onSubmitQueryXxx`，`onCreateItemXxx`等。<br/>举例说User的界面，默认的数据为items，如果同时也管理角色数据，应该放置在roles数据属性中，里面有items, pager等内容。


#### 新增数据

需要在新增数据表单验证通过之后才能上传数据，新增成功后隐藏dialog

```js
onCreateItem() {
  this.$refs.form.validate((valid) => {
    if (!valid) {
      return;
    }
    this.$http.post('item', this.item).then(() => {
      this.$message({
        showclose: true,
        type: 'success',
        message: '新增成功',
      });
      this.editing = false;
    }, (response) => {
      this.$sys.alarmResponse(response);
    });
  });
},
```
#### 删除数据

删除数据会有一个alert提示，并且在删除完成之后会再次查询列表数据

```js
onDeleteItem(id) {
  this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => (
    this.$http.delete(`item/${id}`)
  )).then(() => {
    this.getItemList();
    this.$message({
      showclose: true,
      type: 'success',
      message: '删除成功!',
    });
  }).catch((response) => {
    this.$sys.alarmResponse(response);
  });
},
```
#### 修改数据

和新增类似，需要在修改数据表单验证通过之后才能上传数据，修改成功后隐藏dialog
```js
onUpdateItem(id) {
  this.$refs.form.validate((valid) => {
    if (!valid) {
      return;
    }
    this.$http.put(`item/${id}`, this.item).then(() => {
      this.$message({
        showclose: true,
        type: 'success',
        message: '修改成功',
      });
      this.editing = false;
    }, (response) => {
      this.$xx.resp(response);
    });
  });
},
```
#### 查询数据
```js
getItemList() {
  this.$http.get('item', { params: { ...this.queryForm, page: this.currentPage },
  }).then((response) => {
    this.itemList = response.data.data;
    this.pager.total = response.data.total;
  }, (response) => {
    this.$xx.resp(response);
  });
},
```
#### 新增和修改合并

新增和修改很多时候逻辑是类似的，为了简化代码和方便维护，可以将新增和修改合并放到一个函数里维护，使用item的id属性区分新增和修改

```js
onSaveItem() {
  this.$refs.form.validate((valid) => {
    if (!valid) return;
    let url = 'item';
    if (this.item.id) {
      url = `item/${this.item.id}`;
    }
    this.$http[this.item.id ? 'put' : 'post'](url, this.item)
    .then(() => {
      this.getItemList();
      this.$message({
        showClose: true,
        message: this.item.id ? '成功修改item信息' : '成功新增item',
        type: 'success',
        duration: '1500',
      });
      this.editing = false;
    }, (response) => {
      this.$xx.resp(response);
    });
  });
},
```
为确保在新增和修改时确定按钮出现误操作，添加了参数来控制按钮的disabled属性
```js
submitting = false;
```
### 搜索及翻页方法书写规范
#### 搜索方法

```js
onSubmitQuery() {
  this.pager.page = 1;
  this.queryer = { ...this.former, ...this.pager };
  this.getItemList();
},
```
#### 翻页方法
```js
onChangePage(page) {
  this.pager.page = page;
  this.queryer.page = page;
  this.getItemList();
},
```
### 其他方法
#### 重置dialog

关闭dialog时需要重置dialog数据，否则dialog会保持关闭时的状态

当新增与编辑共用一个dialog时，需要注意除了调用element中el-form组件的resetFields方法，还需手动将绑定的对象设置成初始状态，否则关闭后dialog会保持第一次打开时的状态
```js
onDialogClose() {
  this.item = this.getEmptyItem();
  this.$refs.form.resetFields();
},
```
#### 为新建/编辑的数据对象赋值
```js
getEmptyItem() {
  return {
    name: '',
    mobile: '',
  };
},
```
### 组件和混合

* 若页面的一部分代码可以再其他页面复用，可以写一个公共组件或者混合
* 将对数据的新增修改的代码封装成一个混合Mixin，或者将整个dialog提取出做成一个组件component，这样能够让代码结构更加清晰

## style部分

1. 可以使用less/scss语言来写样式
2. 建议添加scoped属性，使样式只在当前页面生效
3. 若不加scoped属性，则应该用一个特殊的类包裹缩写样式，防止对其他页面造成污染，除非确实是全局样式

```html
<style lang="less"></style>
```
## 附录
* 可以将dialog增删改查的代码提取出来，作为一个单独的component引入
