<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>项目</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >选择项目</el-button
            >
          </div>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目名称:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.Name }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目编号:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.Name }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">开始时间:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.StartTime }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">结束时间:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.EndTime }}
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目描述:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.Description }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="grid-content">项目完成率:</div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <div class="grid-content bg-purple">
                {{ curServiceProjectBaseInfo.CompleteRate }}
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        style="height: 330px"
      >
        <el-card
          class="box-card"
          ref="ganttContainerInDetail"
          style="height: 330px"
          :body-style="{ height: '100%' }"
        >
          <div slot="header" class="clearfix">
            <span>甘特图</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="toggleFullScreenGantt"
              >{{ this.isFullScreenGantt ? "返回" : "全屏" }}</el-button
            >
          </div>
          <iframe
            style="width: 100%; height: calc(100% - 60px)"
            :src="ganttSrc"
            frameborder="0"
          ></iframe></el-card
      ></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>领料</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >选择领料全屏操作</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="material"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="名称" label="名称"> </el-table-column>
            <el-table-column prop="型号" label="型号"> </el-table-column>
            <el-table-column prop="物料代码" label="物料代码">
            </el-table-column>
            <el-table-column prop="数量" label="数量"> </el-table-column>
            <el-table-column prop="当前状态" label="当前状态">
            </el-table-column>
          </el-table>
          <el-row>临时领料</el-row>
          <el-table
            ref="multipleTable2"
            :data="tempMaterial"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="名称" label="名称"> </el-table-column>
            <el-table-column prop="型号" label="型号"> </el-table-column>
            <el-table-column prop="物料代码" label="物料代码">
            </el-table-column>
            <el-table-column prop="数量" label="数量"> </el-table-column>
            <el-table-column prop="当前状态" label="当前状态">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card
          class="box-card"
          ref="kpiContainerInDetail"
          style="height: 330px"
          :body-style="{ height: '100%' }"
        >
          <div slot="header" class="clearfix">
            <span>分析</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="toggleFullScreenKPI"
              >{{ this.isFullScreenKPI ? "返回" : "全屏" }}</el-button
            >
          </div>
          <iframe
            style="width: 100%; height: calc(100% - 60px)"
            :src="kpiSrc"
            frameborder="0"
          ></iframe
        ></el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" :body-style="{height:'400px'}">
      <div slot="header" class="clearfix">
        <span>资产树</span>
        <el-select v-model="selectedAssetID" placeholder="请选择展示的模型" @change="selectOneAssetNode()">
          <el-option
            v-for="item in assetTree"
            :key="item.ID"
            :label="item.Name"
            :value="item.ID"
          >
          </el-option>
        </el-select>
      </div>
      <el-row :gutter="20" style="height:400px">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height:400px;overflow-y: auto;">
        <el-tree
          :data="curAssetNodeTree"
          show-checkbox
          node-key="ID"
          check-strictly
          default-expand-all
          highlight-current

          :expand-on-click-node="false"
          :props="defaultProps"
        >
        <!-- @check-change="handleClick"
          @check="nodeCheck" -->
        </el-tree>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"  style="height:400px;">
        <div id="viewer">
    <input type="text" name="" id="camPosition1" value="">
    <input type="text" name="" id="camTarget1" value="">
  </div>
      </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getOneServiceProject, getOneServiceProjectProperties, getAssetTree } from '@/api/dongzhen'
// import '@/utils/dongzhen/EIMMODEL.min.js'
// import '@/utils/dongzhen/EIMMODEL.min.css'
// import '@/utils/dongzhen/bar-custom.css'
export default {

  data() {
    return {
      serviceProjectID: '',
      curServiceProjectBaseInfo: {},
      isFullScreenGantt: false,
      ganttSrc: '',
      material: null,
      tempMaterial: null,
      isFullScreenKPI: false,
      kpiSrc: "https://47.100.235.209:89/KPI/Index/#id=FreeQuery&name=%E8%87%AA%E7%94%B1%E6%9F%A5%E8%AF%A2&treeType=3?url=https%3A%2F%2F47.100.235.209%3A89%2FKPI%2FIndex%2F%23id%3DFreeQuery%26name%3D%25E8%2587%25AA%25E7%2594%25B1%25E6%259F%25A5%25E8%25AF%25A2%26treeType%3D3&showHeader=false&showLeftbar=false&showTitle=false&showBottom=false&info=%5B%22%22%2C%22Administrator%22%2C%22superadmin%22%5D",
      assetTree: [],
      selectedAssetID: '',
      curAssetNodeTree:[],
      defaultProps: {
        children: "ChildList",
        label: "Name"
      },
    }
  },
  created() {
  },
  mounted() {
    this.serviceProjectID = this.$route.query.serviceProjectID
    this.ganttSrc = `http://localhost:80/Account/AutoLogOn/?url=http%3A%2F%2Flocalhost%3A80%2FServiceProject%2FDetail%2F%3Fid%3D${this.serviceProjectID}%23viewType%3DganttView%2Ctimeline%2CisMobile&showHeader=false&showLeftbar=false&showTitle=false&showBottom=false&info=%5B%22%22%2C%22Administrator%22%2C%221%22%5D`
    this.getOneServiceProjectInfo()
    this.getAllAssetTree()
  },
  methods: {
    getOneServiceProjectInfo() {
      const that = this
      getOneServiceProject(that.serviceProjectID).then(result => {
        if (result.IsOk) {
          console.log(result.Response)
          that.curServiceProjectBaseInfo = result.Response
        } else {
          that.$message.error(`获取项目信息失败，失败的原因为:${result.ErrorMsg}`)
        }
        getOneServiceProjectProperties(that.serviceProjectID).then(propertiesResult => {
          if (propertiesResult.IsOk) {
            console.log(propertiesResult.Response)
            const materialObj = propertiesResult.Response.find(item => item.Name == "更换清单")
            if (materialObj && materialObj.Value) {
              that.material = JSON.parse(materialObj.Value)
            }
            const tempMaterialObj = propertiesResult.Response.find(item => item.Name == "临时领料清单")
            if (tempMaterialObj && tempMaterialObj.Value) {
              that.tempMaterial = JSON.parse(tempMaterialObj.Value)
            }
            console.log(that.material);
            console.log(that.tempMaterial);
          } else {
            that.$message.error(`获取项目属性失败，失败的原因为:${result.ErrorMsg}`)
          }
        })
      })
    },
    toggleFullScreen(isFullScreen, element) {
      if (isFullScreen) {
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
    //切换全屏甘特图
    toggleFullScreenGantt() {
      this.isFullScreenGantt = !this.isFullScreenGantt;
      const element = this.$refs.ganttContainerInDetail.$el;
      this.toggleFullScreen(this.isFullScreenGantt, element)
    },
    //切换全屏KPI
    toggleFullScreenKPI() {
      this.isFullScreenKPI = !this.isFullScreenKPI;
      const element = this.$refs.kpiContainerInDetail.$el;
      this.toggleFullScreen(this.isFullScreenKPI, element)
    },
    // 获取资产树
    getAllAssetTree() {
      if (this.assetTree.length === 0) {
        getAssetTree().then(result => {
          if (result.IsOk) {
            this.assetTree = result.Response || []
          } else {
            this.$message.error(`获取资产树失败，失败的原因为:${result.ErrorMsg}`)
          }
        })
      }
    },
    selectOneAssetNode(e) {
      console.log(e)
      console.log(this.selectedAssetID)
      if(this.selectedAssetID){
        this.curAssetNodeTree = this.assetTree.filter(item=>item.ID == this.selectedAssetID)

      }
    }
  }
}
</script>
<style scoped>
.oneContainer {
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 4px, rgb(0 0 0 / 4%) 0px 0px 6px;
}
.grid-content {
  padding: 10px 0 10px 10px;
}
</style>
