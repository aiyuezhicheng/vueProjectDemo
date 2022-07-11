<template>
  <div class="app-container">
    <el-header style="text-align: right; font-size: 12px">
      <el-button v-show="selectedServiceProjectID" type="primary" plain @click="jumpToDetailInfo">进入信息窗口</el-button>
      <el-button type="primary" plain @click="refresh">刷新</el-button>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="40%">
        <div
          v-for="oneProject in projectList"
          :key="oneProject.ID"
          class="oneProject"
          @click="selectOneServiceProject(oneProject.ID)"
        >
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目名称:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">{{ oneProject.Name }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目编号:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">{{ oneProject.Name }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">创建时间:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ oneProject.CreateTime }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">开始时间:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ oneProject.StartTime }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">结束时间:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">{{ oneProject.EndTime }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">ERP项目号:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">{{ oneProject.ERPNo }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目来源:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ oneProject.ProjectSource }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目描述:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ oneProject.Description }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目完成率:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ oneProject.CompleteRate }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-aside>

      <el-container>
        <el-header style="height:60%;text-align: right;">
          <div
            ref="ganttContainer"
            v-show="selectedServiceProjectID"
            class="ganttContainer"
          >
            <el-button
              class="btnToggleFullScreen el-pagination__rightwrapper"
              @click="toggleFullScreenGantt"
              >{{ this.isFullScreen ? "返回" : "全屏" }}</el-button
            >
            <iframe
              v-show="selectedServiceProjectID"
              style="width: 100%; height: 100%"
              :src="ganttSrc"
              frameborder="0"
            ></iframe>
          </div>
        </el-header>

        <el-main>
          <!-- 可执行的执行项 -->
          <el-table
            ref="singleTable"
            :data="curExecuteItems"
            highlight-current-row
            @current-change="handleCurrentChangeExecuteItem"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column property="Name" label="执行项信息" width="200">
            </el-table-column>
            <el-table-column property="TaskGroupState" label="执行项状态">
            </el-table-column>
          </el-table>
          <div style="text-align: right; margin-right: 20px">
            <el-button :disabled="taskGroupID" @click="jumpToExecute">执行</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getAllServiceProjects, getOneServiceProjectProperties, getCustomListItems, getOneServiceProjectSimpleTree, getInActiveReports, getTaskGroupIDListBySql, getOneTaskGroupTree } from '@/api/dongzhen'
import { FormatDateTimeByFormat } from '@/utils/index'

export default {
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
      selectedServiceProjectID: '',
      projectList: [],
      toExecuteTaskGroupIDs: [],
      allPlanToExecuteTaskGroupIDs: {},
      allExecuteItems: {},
      curExecuteItems: [],
      taskGroupID: '',
      isFullScreen:false,
      ganttSrc:''
    }
  },
  created() {
  },
  mounted() {
    this.showAllProject()
  },
  methods: {
    // 显示所有项目
    showAllProject() {
      this.projectList = []
      getAllServiceProjects().then(result => {
        if (result.IsOk) {
          if (result.Response && result.Response.length > 0) {
            this.projectList = result.Response.filter(item => !item.IsCompleted);
            if (this.projectList && this.projectList.length > 0) {
              let customListItemList = [];
              getCustomListItems().then(_customListItemsResult => {
                if (_customListItemsResult.IsOk) {
                  customListItemList = _customListItemsResult.Response
                } else {
                  this.$message.error(`获取自定义列表项失败，失败的愿意为:${_customListItemsResult.ErrorMsg}`)
                }
                var getOneServiceProjectPropertiesWithUser = (_index => {
                  if (_index >= this.projectList.length) {
                    return;
                  }
                  let oneProject = this.projectList[_index]
                  if (oneProject.StartTime.indexOf('999') > -1) {
                    oneProject.StartTime = ""
                  } else {
                    oneProject.StartTime = oneProject.StartTime.replace('T', ' ')
                  }
                  if (oneProject.EndTime.indexOf('999') > -1) {
                    oneProject.EndTime = ""
                  } else {
                    oneProject.EndTime = oneProject.EndTime.replace('T', ' ')
                  }

                  const oneServiceProjectID = oneProject["ID"]
                  getOneServiceProjectProperties(oneServiceProjectID).then(_result => {
                    if (_result.IsOk) {
                      oneProject["ProjectSource"] = ""
                      oneProject["ERPNo"] = ""
                      oneProject["CreateTime"] = ""
                      const source = _result.Response.find(_item => _item["Name"] == "项目来源")
                      if (source) {
                        if (source.Value) {
                          const oneCustomListItem = customListItemList.find(oneCustomListItem => oneCustomListItem.ID == source.Value)
                          oneProject["ProjectSource"] = oneCustomListItem ? oneCustomListItem["Name"] : ""
                        }
                        if (source.ValueInputTime) {
                          if (source.ValueInputTime.indexOf('999') > -1) {
                            oneProject["CreateTime"] = ""
                          } else {
                            oneProject["CreateTime"] = FormatDateTimeByFormat("yyyy-MM-dd hh:mm:ss", new Date(source.ValueInputTime))
                          }
                        }
                      }
                      const erpNo = _result.Response.find(_item => _item["Name"] == "ERP项目号")
                      if (erpNo && erpNo.Value) {
                        oneProject["ERPNo"] = erpNo.Value
                      }
                    } else {
                      this.$message.error(`获取一个项目的属性失败，失败的原因为:${_result.ErrorMsg}`)
                    }
                    _index++
                    getOneServiceProjectPropertiesWithUser(_index)
                  })
                })
                getOneServiceProjectPropertiesWithUser(0);
              })
            }

          }
        } else {
          this.$message.error(`获取所有项目失败，失败的原因为:${result.ErrorMsg}`)
        }
      })
    },
    //刷新
    refresh() {
      if(this.selectedServiceProjectID){
        this.taskGroupID = ""
        this.selectOneServiceProject(this.selectedServiceProjectID)
      }else{
        this.showAllProject()
      }
    },
    // 获取一个项目的待执行的作业组ID
    getOneServiceProjectToExecuteTaskGroupIDs(oneServiceProjectID, callback) {
      if (this.allPlanToExecuteTaskGroupIDs[oneServiceProjectID]) {
        callback(this.allPlanToExecuteTaskGroupIDs[oneServiceProjectID])
      } else {
        getOneServiceProjectSimpleTree(oneServiceProjectID).then(_result => {
          if (_result.IsOk) {
            let executeItemIDsInSimpleTree = []; // 执行项ID，即作业组ID
            const nodes = _result.Response && _result.Response.Nodes ? _result.Response.Nodes : []
            if (nodes && nodes.length > 0) {
              for (let i = 0; i < nodes.length; i++) {
                const oneNode = nodes[i];
                if (oneNode.Children && oneNode.Children.length > 0) {
                  for (let j = 0; j < oneNode.Children.length; j++) {
                    let oneChild = oneNode.Children[j]
                    executeItemIDsInSimpleTree.push(oneChild.ID);
                    if (oneChild.Children && oneChild.Children.length > 0) {
                      for (let k = 0; k < oneChild.Children.length; k++) {
                        executeItemIDsInSimpleTree.push(oneChild.Children[k].ID);
                      }
                    }
                  }
                }
              }
            }
            if (executeItemIDsInSimpleTree && executeItemIDsInSimpleTree.length > 0) {
              let allPlanTaskGroupIDInOneServiceProject = []
              var getOneTaskGroupInfo = (index => {
                if (index >= executeItemIDsInSimpleTree.length) {
                  this.getToExecuteInActivityTaskGroupIDs(() => {
                    //找到待执行活动中报表的id和项目的执行项id相同的id
                    const sameTaskGroupIDs = allPlanTaskGroupIDInOneServiceProject.reduce((previousValue, current) => {
                      if (this.toExecuteTaskGroupIDs.indexOf(current) > -1) {
                        previousValue.push(current)
                      }
                      return previousValue
                    }, [])
                    this.allPlanToExecuteTaskGroupIDs[oneServiceProjectID] = sameTaskGroupIDs
                    callback(sameTaskGroupIDs)
                  })
                  return;
                }
                const oneExecuteItemID = executeItemIDsInSimpleTree[index]
                getTaskGroupIDListBySql(oneExecuteItemID).then(__result => {
                  if (__result.IsOk) {
                    if (__result.Response && __result.Response.Rows[0] && __result.Response.Rows[0].Cells && __result.Response.Rows[0].Cells[0]) {
                      const oneTaskGroupID = __result.Response.Rows[0].Cells[0]
                      if (allPlanTaskGroupIDInOneServiceProject.indexOf(oneTaskGroupID) == -1)
                        allPlanTaskGroupIDInOneServiceProject.push(oneTaskGroupID)
                    }
                  } else {
                    this.$message.error(`获取作业组ID失败，失败的原因为:${__result.ErrorMsg}`)
                  }
                  index++
                  getOneTaskGroupInfo(index)
                })
              })
              getOneTaskGroupInfo(0)
            }
          }
          else {
            this.$message.error(`获取项目树失败，失败的原因为:${_result.ErrorMsg}`)
          }
        })
      }
    },
    // 获取一个项目的待执行的执行项信息
    getOneServiceExecuteItems(oneServiceProjectID) {
      if (!this.allExecuteItems[oneServiceProjectID]) {
        this.allExecuteItems[oneServiceProjectID] = []
        const planToExecuteTaskGroupIDs = this.allPlanToExecuteTaskGroupIDs[oneServiceProjectID]
        var getOneTaskGroupTreeInfo = (index) => {
          if (index >= planToExecuteTaskGroupIDs.length) {
            return;
          }
          const oneTaskGroupID = planToExecuteTaskGroupIDs[index]
          getOneTaskGroupTree(oneTaskGroupID).then(result => {
            if (result.IsOk) {
              if (result.Response && result.Response.Root && result.Response.Root && result.Response.Root.Content && result.Response.Root.ID) {
                const id = result.Response.Root.ID
                if (!this.allExecuteItems[oneServiceProjectID].find(item => item.ID == id)) {
                  const content = result.Response.Root.Content
                  let taskGroupState = ''
                  if (content.ExtValue) {
                    const extValue = JSON.parse(content.ExtValue)
                    if (extValue) {
                      taskGroupState = extValue.TaskGroupState
                    }
                  }
                  const obj = {
                    Name: content.Name,
                    ID: id,
                    TaskGroupState: taskGroupState
                  }
                  this.curExecuteItems.push(obj)
                  this.allExecuteItems[oneServiceProjectID].push(obj)
                }
              }
            } else {
              this.$message.error(`获取作业树失败，失败的原因为:${result.ErrorMsg}`)
            }
            index++
            getOneTaskGroupTreeInfo(index)
          })
        }
        getOneTaskGroupTreeInfo(0)
      } else {
        this.curExecuteItems = this.allExecuteItems[oneServiceProjectID]
      }
    },
    // 选中一个项目
    selectOneServiceProject(oneServiceProjectID) {
      const that = this
      this.taskGroupID = ''
      this.curExecuteItems = []
      this.selectedServiceProjectID = oneServiceProjectID
      const oneServiceProject = this.projectList.find(oneServiceProject => oneServiceProjectID == oneServiceProject.ID)
      if (oneServiceProject) {
        this.$store.commit('SET_SERVICEPROJECTID',oneServiceProjectID);
        this.ganttSrc = `http://localhost:80/Account/AutoLogOn/?url=http%3A%2F%2Flocalhost%3A80%2FServiceProject%2FDetail%2F%3Fid%3D${oneServiceProjectID}%23viewType%3DganttView%2Ctimeline%2CisMobile&showHeader=false&showLeftbar=false&showTitle=false&showBottom=false&info=%5B%22%22%2C%22Administrator%22%2C%221%22%5D`
        this.getOneServiceProjectToExecuteTaskGroupIDs(oneServiceProjectID, () => {
          that.getOneServiceExecuteItems(oneServiceProjectID)
        })
      }
    },
    // 获取待执行活动中报表
    getToExecuteInActivityTaskGroupIDs(callback) {
      if (this.toExecuteTaskGroupIDs.length == 0) {
        getInActiveReports().then(_result => {
          if (_result.IsOk) {
            if (_result.Response && _result.Response.Rows && _result.Response.Rows.length > 0) {
              _result.Response.Rows.forEach(item => {
                if (item.Cells && item.Cells[0] && this.toExecuteTaskGroupIDs.indexOf(item.Cells[0]) == -1) {
                  this.toExecuteTaskGroupIDs.push(item.Cells[0])
                }
              })
            }
          } else {
            this.$message.error(`获取待执行活动中报表失败，失败的原因为:${_result.ErrorMsg}`)
          }
          callback()
        })
      } else {
        callback()
      }
    },
    // 切换待执行作业组
    handleCurrentChangeExecuteItem(obj) {
      this.taskGroupID = obj.ID
    },
    // 跳转到执行页面
    jumpToExecute(){
     this.$router.push({ path: '/execute',query:{taskGroupID:this.taskGroupID} })
    },
    // 切换全屏显示甘特图
    toggleFullScreenGantt() {
      this.isFullScreen = !this.isFullScreen;
      const element = this.$refs.ganttContainer;
      if (this.isFullScreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    },
    // 跳转到信息窗口
    jumpToDetailInfo(){
      this.$router.push({ path: '/detailInfo' ,query:{serviceProjectID:this.selectedServiceProjectID} })
    }
  }
  //
}
</script>
<style scoped>
.oneProject {
  margin: 15px;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 4px, rgb(0 0 0 / 4%) 0px 0px 6px;
}
.grid-content {
  padding: 10px 0 10px 10px;
}
.ganttContainer {
  position:relative;
  width: 100%;
  height: 100%;
  background-color: white;
}
.btnToggleFullScreen {
  position:absolute;
  top:10px;
  right:5px;
}
</style>
