import request from '@/utils/request'
import threeDimensionalModelRequestrequest from '@/utils/dongzhen/threeDimensionalModelRequest'

// 选择项目

// 获取所有项目
export function getAllServiceProjects() {
  return request({
    url: '/ServiceProject/GetAll',
    method: 'get'
  })
}

// 获取一个项目的项目属性
export function getOneServiceProjectProperties(serviceProjectID) {
  return request({
    url: `/ServiceProject/GetServiceProjectProperoties?serviceProjectID=${serviceProjectID}`,
    method: 'get'
  })
}

// 获取一个列表项
export function getOneCustomListItem(id) {
  return request({
    url: `/UserDefinedList/GetByID?id=${id}`,
    method: 'get'
  })
}


// 获取"项目来源"列表项
export function getCustomListItems() {
  return request({
    url: `/UserDefinedList/GetChild?parentID=64c5df51-9e30-49ff-b81f-b0a6362c58b5`,
    method: 'get'
  })
}

// 获取一个项目的树
export function getOneServiceProjectSimpleTree(id) {
  return request({
    url: `/ServiceProject/GetSimpleTree?id=${id}`,
    method: 'get'
  })
}

// 活动中待执行报表
export function getInActiveReports() {
  return request({
    url: `/Report/GetTaskGroupReport?isHistory=false`,
    method: 'post',
    data: {
      "queryParams": [{
        "ColumnName": "UserJobType",
        "Sign": "1",
        "Value": "1"
      }]
    }
  })
}

// 获得所有taskgroupid
export function getTaskGroupIDListBySql(idList) {
  return request({
    url: `/Sql/GetDataSetBySQLExt`,
    method: 'post',
    data: ["(select ID, 'true' as isHistory from H_TaskGroup where TaskGroupPlanItemID = '" + idList + "' limit 1) union all (select ID, 'false' as isHistory from TaskGroupEntity where TaskGroupPlanItemID = '" + idList + "' limit 1)"]
  })
}

// 获取作业组报表 GetTaskGroupTree
export function getOneTaskGroupTree(taskGroupID) {
  return request({
    url: `/Report/GetTaskGroupTree?taskGroupID=${taskGroupID}&isHistory=false&isShowAllHiddenNode=true`,
    method: 'get',
  })
}
// ------------------------------------------------------------------------------------------


// 信息窗口

// 获取一个项目
export function getOneServiceProject(id) {
  return request({
    url: `/ServiceProject/GetByID?id=${id}`,
    method: 'get',
  })
}

// 获取资产树
export function getAssetTree() {
  return request({
    url: `/Asset/GetAssetTree`,
    method: 'get',
  })
}
// ------------------------------------------------------------------------------------------


// 三维模型
// 登录
export function loginThreeDimensionalModel(data) {
  return threeDimensionalModelRequestrequest({
    url: `/f/bospersonnelservice/p022f543bd56487bb0bbc1367fb67163/users/login`,
    method: 'post',
    data
  })
}
