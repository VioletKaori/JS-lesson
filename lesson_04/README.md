ElementUI中的el-checkbox-button在解析为html时，会分解成如下所示的三个标签，
`<label role="checkbox" class="el-checkbox-button">`
    `<input type="checkbox" name="brand" class="el-checkbox-button__original" value="1">`
    `<span class="el-checkbox-button__inner">Gree/格力</span>`
`</label>`
而在对el-checkbox-button进行name命名时，命名的结果会自动分配到input标签上
`<el-checkbox-button v-for="(price, index) in prices" :label="index" :key="price" name="price">{{price}}</el-checkbox-button>`
受ElementUI自身限制，在加载页面的一瞬间无法对标签进行class添加，因为此时input标签根本不存在。因此在函数中，我添加了setTimeout函数来保证函数能够正常执行。