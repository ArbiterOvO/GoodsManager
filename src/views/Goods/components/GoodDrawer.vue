<script setup>
import { ref } from 'vue';
import { getGoodById, addGood, editGood } from '@/api/good'
import { getCategoryAll } from '@/api/category'
import { getBrandAll } from '@/api/brand'
import { getSourceAll } from '@/api/source'
import { ElMessage } from 'element-plus';
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
//判断是新增还是编辑 1 新增 0编辑
const drawerStatus = ref(1)
//表单数据
// 提交给父组件
const emit = defineEmits(['success'])
const categoryList = ref([])
const brandList = ref([])
const sourceList = ref([])
const getCategory = async () => {
    const res = await getCategoryAll()
    console.log(res.data)
    categoryList.value = res.data.data
}
const getBrand = async () => {
    const res = await getBrandAll()
    brandList.value = res.data.data
}
const getSource = async () => {
    const res = await getSourceAll()
    sourceList.value = res.data.data
}
//表单提交
const submit = async () => {
    if (drawerStatus.value === 1) { // 新增
        const res = await addGood(formData.value)
        if (res.data.code === 1) {
            visibleDrawer.value = false
            ElMessage.success('添加成功')
            emit('success', 'add')
        } else {
            ElMessage.error('添加失败，请联系管理员')
        }
    }
    else { // 编辑
        const res = await editGood(formData.value)
        if (res.data.code === 1) {
            visibleDrawer.value = false
            ElMessage.success('编辑成功')
            emit('success', 'edit')
        } else {
            ElMessage.error('编辑失败，请联系管理员')
        }
    }

}
const open = async (row) => {
    visibleDrawer.value = true // 显示抽屉
    //如果有数据，则为编辑，否则为新增
    if (row.id) {
        drawerStatus.value = 0
        //需要基于 row.id 发送请求，获取编辑对应的详情数据，进行回显
        const res = await getGoodById(row.id)
        formData.value = res.data.data // 赋值给表单数据
        formData.value.status = res.data.data.status.toString()//状态转字符串
        getCategory()
        getBrand()
        getSource()
    } else {
        drawerStatus.value = 1
        formData.value = { ...defaultForm } // 否则赋值默认数据
        getCategory()
        getBrand()
        getSource()
    }
}
defineExpose({
    open
})
//默认数据
const defaultForm = {
    goodId: '',
    name: '',
    categoryId: '',
    number: '',
    price: '',
    status: '',
    sourceId: '',
    brandId: ''

}

const formData = ref({ ...defaultForm })
</script>

<template>
    <el-dialog v-model="visibleDrawer" :title="formData.id ? '编辑商品' : '新增商品'" width="500">
        <el-form :model="formData" style="margin-right: 10px;">
            <el-form-item label="商品编号" label-width="80px">
                <el-input v-model="formData.goodId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品名称" label-width="80px">
                <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品类型" label-width="80px">
                <el-select v-model="formData.categoryId" placeholder="请选择一个类型">
                    <el-option v-for="category in categoryList" :key="category.id" :label="category.name"
                        :value="category.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品数量" label-width="80px">
                <el-input v-model="formData.number" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品价格" label-width="80px">
                <el-input v-model="formData.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品状态" label-width="80px">
                <el-radio-group v-model="formData.status">
                    <el-radio value="1" size="small">在售</el-radio>
                    <el-radio value="0" size="small">下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="货源" label-width="80px">
                <el-select v-model="formData.sourceId" placeholder="请选择一个货源">
                    <el-option v-for="source in sourceList" :key="source.id" :label="source.name" :value="source.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="品牌方" label-width="80px">
                <el-select v-model="formData.brandId" placeholder="请选择一个品牌方">
                    <el-option v-for="brand in brandList" :key="brand.id" :label="brand.name" :value="brand.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submit()">
                    确认
                </el-button>
                <el-button @click="visibleDrawer = false">取消</el-button>

            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>