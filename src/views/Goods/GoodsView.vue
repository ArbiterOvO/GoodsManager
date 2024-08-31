<script setup>
import { onMounted, ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { getGoodAll, deleteGood } from '@/api/good.js'
import GoodDrawer from '@/views/Goods/components/GoodDrawer.vue'
import { ElMessage } from 'element-plus';
const currentPage = ref(1)
const pageSize = ref(10)
//编辑商品逻辑
const onEditChannel = (row, index) => {
    console.log(row.id + '' + index)
    goodDrawerRef.value.open(row)
}
const onDelChannel = (row, index) => {
    deleteGood(row.id).then(res => {
        console.log(res)
        if (res.data.code == 1) {
            ElMessage.success('删除成功')
        } else {
            ElMessage.error('删除失败，请联系管理员')
        }
        getGoods()
    })
    console.log(row + index)
}
const handleCurrentChange = (current) => {
    currentPage.value = current
}

onMounted(() => {
    getGoods()

})
const tableData = ref([
    {
        id: '1',
        goodId: '1',
        category: '电子产品',
        name: '商品1',
        number: '100',
        soldNumber: '50',
        price: '100',
        status: '已上架',
        source: '货源1',
        brand: '品牌1'
    }
]
)
const getGoods = async () => {
    const res = await getGoodAll()
    tableData.value = res.data.data
    console.log(res.data.data)
}
const goodDrawerRef = ref()
const onSuccess = () => {
    getGoods()
}
</script>

<template>
    <div class="container">
        <!-- 新增的抽屉 -->
        <good-drawer ref="goodDrawerRef" @success="onSuccess"></good-drawer>
        <el-row class="funtion">
            <el-button type="primary" round @click="goodDrawerRef.open({})">新增</el-button>
        </el-row>
        <el-table class=" table" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe>
            <el-table-column prop="goodId" label="商品编号" width="100px" />
            <el-table-column prop="name" label="商品名称" width="200px" />
            <el-table-column prop="category" label="商品类别" width="200px" />
            <el-table-column prop="number" label="商品数量" width="150px" />
            <el-table-column prop="soldNumber" label="已售数量" width="150px" />
            <el-table-column prop="price" label="商品价格" width="150px" />
            <el-table-column prop="status" label="商品状态" width="150px" />
            <el-table-column prop="source" label="货源" width="200px" />
            <el-table-column prop="brand" label="品牌方" width="200px" />
            <el-table-column label="操作" fixed="right" width="140px">
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
    justify-content: start;
    align-items: center;
}

.table {
    el-table-column {
        height: 50px;
    }

    flex: 1;
}

.pagination {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

}
</style>