<script setup>
import { onMounted, ref } from 'vue';
import { Edit, Delete, Search } from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { getGoodAll, deleteGood, searchGood } from '@/api/good.js'
import GoodDrawer from '@/views/Goods/components/GoodDrawer.vue'
import { ElMessage } from 'element-plus';
import { getCategoryAll } from '@/api/category'
const currentPage = ref(1)
const pageSize = ref(10)
const categoryList = ref([])
const inputValue = ref()
//获取分类列表
const getCategory = async () => {
    const res = await getCategoryAll()
    console.log(res.data)
    categoryList.value = res.data.data
}
//编辑新增商品逻辑
const onEditChannel = (row, index) => {
    console.log(row.id + '' + index)
    goodDrawerRef.value.open(row)
}
//删除商品
const onDelChannel = (row, index) => {
    deleteGood(row.id).then(res => {
        console.log(res)
        if (res.data.code == 1) {
            ElMessage.success('删除成功')
        } else {
            ElMessage.error('删除失败，请联系管理员')
        }
        onSearch()
    })
    console.log(row + index)
}
//搜索
const onSearch = async () => {
    //searchDate.value.id = searchType.value == '0' ? searchDate.value.searchContent : ''
    console.log(searchType.value)
    if (searchType.value == '0')
        searchDate.value.id = inputValue.value
    else
        searchDate.value.searchContent = inputValue.value
    const res = await searchGood(searchDate.value)
    if (res.data.code == 1) {
        tableData.value = res.data.data
    } else {
        ElMessage.error('搜索失败，请联系管理员')
    }
}
const handleCurrentChange = (current) => {
    currentPage.value = current
}
const clearSearchData = () => {
    console.log('clear')
    searchDate.value.id = ''
    searchDate.value.searchContent = ''
    inputValue.value = ''
}
onMounted(() => {
    getGoods()
    getCategory()
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
//搜索方式 0 id  1 名称
const searchType = ref('1')
const searchTypeList = [
    {
        value: '1',
        label: '名称'
    },
    {
        value: '0',
        label: 'ID'
    }
]
//搜索内容
const searchDate = ref(
    {
        id: '',
        searchContent: '',
        categoryId: '',
        status: ''
    }
)
const getGoods = async () => {
    const res = await getGoodAll()
    tableData.value = res.data.data
    console.log(res.data.data)
}
const goodDrawerRef = ref()
const onSuccess = () => {
    onSearch()
}
</script>

<template>
    <div class="container">
        <!-- 新增的抽屉 -->
        <good-drawer ref="goodDrawerRef" @success="onSuccess"></good-drawer>
        <!-- 功能栏 -->
        <el-row class="funtion">

            <el-form :inline="true" v-model="searchDate" class="search-form">
                <!-- 搜索类型 -->
                <el-form-item>
                    <span class="label">搜索类型</span>
                    <el-select @change="clearSearchData" v-model="searchType" style="width: 4vw;margin-right: 0vw;">
                        <el-option v-for="item in searchTypeList" :key="item.value" :value="item.value"
                            :label="item.label" />
                    </el-select>
                </el-form-item>
                <!-- 搜索内容 -->
                <el-form-item>
                    <el-input @clear="onSearch" @change="onSearch" v-model="inputValue" style="width: 20vw;" clearable
                        :suffix-icon="Search" :placeholder="searchType == '1' ? '输入相关名称' : '输入相关ID'" />
                </el-form-item>
                <!-- 搜索按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
                <!-- 搜索类别 -->
                <el-form-item>
                    <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
                        <span class="label">商品类别</span>
                        <el-select @change="onSearch" v-model="searchDate.categoryId" placeholder="全部"
                            style="width: 8vw;">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="category in categoryList" :key="category.id" :label="category.name"
                                :value="category.id" />
                        </el-select>
                    </div>
                </el-form-item>
                <!-- 搜索状态 -->
                <el-form-item>
                    <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
                        <span class="label">商品状态</span>
                        <el-select @change="onSearch" v-model="searchDate.status" placeholder="全部" style="width: 8vw;">
                            <el-option label="全部" value=""></el-option>
                            <el-option value=" 1" label="在售">在售</el-option>
                            <el-option value="0" label="下架">下架</el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
            <el-button style="margin-bottom: 2vh;" type="primary" round @click="goodDrawerRef.open({})">新增</el-button>
        </el-row>
        <!-- 表格 -->
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

.search-form {
    width: 100wh;
}

.label {
    font-size: 18px;
    color: #444444;
    margin-left: 1vw;
    margin-right: 1vw;
}
</style>