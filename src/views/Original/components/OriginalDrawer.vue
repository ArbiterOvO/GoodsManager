<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { addSource, editSource, getSourceById } from '@/api/source'
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
//判断是新增还是编辑 1 新增 0编辑
const drawerStatus = ref(1)
//表单数据
// 提交给父组件
const emit = defineEmits(['success'])


//表单提交
const submit = async () => {
    if (drawerStatus.value === 1) { // 新增
        const res = await addSource(formData.value)
        if (res.data.code === 1) {
            visibleDrawer.value = false
            ElMessage.success('添加成功')
            emit('success', 'add')
        } else {
            ElMessage.error('添加失败，请联系管理员')
        }
    }
    else { // 编辑
        const res = await editSource(formData.value)
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
        console.log(row.id)
        const res = await getSourceById(row.id)
        formData.value = res.data.data // 赋值给表单数据
    } else {
        drawerStatus.value = 1
        formData.value = { ...defaultForm } // 否则赋值默认数据

    }
}
defineExpose({
    open
})
//默认数据
const defaultForm = {
    name: '',
    description: '',
}

const formData = ref({ ...defaultForm })
</script>

<template>
    <el-dialog v-model="visibleDrawer" :title="formData.id ? '编辑货源' : '新增货源'" width="500">
        <el-form :model="formData" style="margin-right: 10px;">
            <el-form-item label="货源名称" label-width="80px">
                <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>

            <el-form-item label="货源描述" label-width="80px">
                <el-input v-model="formData.description" autocomplete="off" />
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