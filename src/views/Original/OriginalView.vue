<script setup>
import { onMounted, ref } from 'vue';
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { getSourceAll, deleteSource, searchSource } from '@/api/source'
import OriginalDrawer from '@/views/Original/components/OriginalDrawer.vue'
import { ElMessage } from 'element-plus';

const originalDrawerRef = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const inputValue = ref(
)

const onEditChannel = (row, index) => {
    console.log(row.name + index)
    originalDrawerRef.value.open(row)
}
const handleCurrentChange = (current) => {
    currentPage.value = current
}
const onDelChannel = (row, index) => {
    deleteSource(row.id).then(res => {
        if (res.data.code == 1) {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            getSource()
        } else {
            ElMessage('删除失败')
        }
    })
    console.log(row + index)
}
onMounted(() => {
    getSource()
})
const getSource = async () => {
    const res = await getSourceAll()
    tableData.value = res.data.data
    console.log(res.data.data)
}
const tableData = ref([
    {
        brandId: '1',
        name: '货源1',
        description: '货源描述',
        goodNumber: '10',
        soldNumber: '50',
    }
])

const onSearch = async () => {
    const res = await searchSource(inputValue.value)
    if (res.data.code == 1) {
        tableData.value = res.data.data
    } else {
        ElMessage('搜索失败')
    }
}
const onSuccess = () => {
    getSource()
}
</script>

<template>
    <div class="container">
        <!-- 抽屉 -->
        <original-drawer ref="originalDrawerRef" @success="onSuccess"></original-drawer>
        <el-row class="funtion">
            <el-form :inline="true" class="search-form" @submit.prevent>
                <el-form-item>
                    <el-input @clear="onSearch" @change="onSearch" v-model="inputValue" style="width: 20vw;" clearable
                        :suffix-icon="Search" placeholder="输入相关名称" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button style="margin-bottom: 2vh;margin-left: 10vw;" type="primary" round
                @click="originalDrawerRef.open({})">新增</el-button>
        </el-row>
        <el-table class="table" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe>
            <el-table-column prop="name" label="货源名称" width="300px" />
            <el-table-column prop="description" label="货源详情" width="440px" />
            <el-table-column prop="goodNumber" label="商品种类数量" width="300px" />
            <el-table-column prop="soldNumber" label="已售数量" width="300px" />
            <el-table-column label="操作" fixed="right" width="300px">
                <template #default="{ row, $index }">
                    <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(row, $index)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="onDelChannel(row, $index)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页按钮-->
        <div style="display: flex;justify-content: center;padding: 2px">
            <el-config-provider :locale="zhCn">
                <el-pagination background layout="prev, pager, next,jumper, ->, total" :hide-on-single-page="true"
                    :total="tableData.length" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="pageSize" class="pagination">
                </el-pagination>
            </el-config-provider>
        </div>

    </div>
</template>

<style scoped>
.container {
    width: 100%;
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.funtion {
    padding: 20px;
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table {
    el-table-column {
        height: 50px;
    }
}

.pagination {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

}

.search-form {
    width: 100wh;
}
</style>