<template>
    <div class="table-box">
        <ProTable
            ref="proTable"
            title="用户管理"
            :columns="columns"
            :requestApi="getTableList"
            :initParam="initParam"
            :toolButton="true"
            :dataCallback="dataCallback"
            :pageableConfig="pageableConfig"
            :formatRequestParams="formatRequestParams"
        >
            <!-- 表格 header 操作按钮 -->
            <template #tableHeader="scope">
                <el-button type="primary" :icon="user" @click="createUser"> 新建用户 </el-button>
                <el-button type="success" :icon="refresh" @click="refreshTable"> 刷新 </el-button>
            </template>
            <!-- 对应 columns 中 type: "expand" 的内容 -->
            <template #expand="scope">
                {{ scope.row }}
            </template>
            <!-- 对应 columns 中 prop: "operation" 的表格操作 -->
            <template #operation="scope">
                <el-button type="delete" link :icon="delete" @click="deleteUser('删除', scope.row)"> 删除 </el-button>
            </template>
        </ProTable>
    </div>
</template>
<script setup lang="tsx" name="crud">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ColumnProps } from '@fe-components/pro-table/dist/interface'
import { useHandleData } from '@/hooks/useHandleData'

import { user } from '@element-plus/icons-vue'

import { refresh } from '@element-plus/icons-vue'

import { Res } from 'types.ts'
import { deleteUser } from 'api.ts'
const pageableConfig = {
    pageNumKey: 'pageNum',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
}
const router = useRouter()
const proTable = ref()
const initParam = reactive({})
const dataCallback = (data: any) => {
    return {
        list: data.list,
        total: data.total,
        pageNum: data[pageableConfig.pageNumKey],
        pageSize: data[pageableConfig.pageSizeKey],
    }
}
const columns: ColumnProps<Res>[] = [
    {
        type: 'selection',
        fixed: 'left',
        width: 80,
    },
    {
        type: 'index',
        label: '序号',
        width: 80,
    },
    {
        type: 'expand',
        label: 'Expand',
        width: 100,
    },
    {
        prop: 'username',
        label: '用户姓名',
        search: {
            el: 'input',
        },
    },
    {
        prop: 'gender',
        label: '性别',
        enum: [
            {
                genderLabel: '男',
                genderValue: 1,
            },
            {
                genderLabel: '女',
                genderValue: 2,
            },
        ],
        search: {
            el: 'select',
            props: {
                filterable: true,
            },
        },
        fieldNames: {
            label: 'genderLabel',
            value: 'genderValue',
        },
    },
    {
        prop: 'age',
        label: '年龄',
        search: {
            el: 'input',
        },
    },
    {
        prop: 'idCard',
        label: '身份证号',
        search: {
            el: 'input',
        },
    },
    {
        prop: 'email',
        label: '邮箱',
    },
    {
        prop: 'address',
        label: '居住地址',
    },
    {
        prop: 'status',
        label: '用户状态',
        enum: [
            {
                userLabel: '启用',
                userStatus: 1,
            },
            {
                userLabel: '禁用',
                userStatus: 0,
            },
        ],
        search: {
            el: 'select',
            props: {
                filterable: true,
            },
        },
        fieldNames: {
            label: 'userLabel',
            value: 'userStatus',
        },
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 180,
        search: {
            el: 'date-picker',
            span: 2,
            props: {
                type: 'datetimerange',
                valueFormat: 'YYYY-MM-DD HH:mm:ss',
            },
            defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
        },
    },
    {
        prop: 'operation',
        label: '操作',
        fixed: 'right',
        width: 330,
        buttons: [
            {
                type: 'delete',
                icon: 'delete',
                clickFunction: 'deleteUser',
                text: '删除',
            },
        ],
    },
]

async function deleteUser(params: Res) {
    await useHandleData(deleteUser, { id: params.id }, '提示文案')
    proTable.value.getTableList()
}
</script>
