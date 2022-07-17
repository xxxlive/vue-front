<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>Private</template>
            <el-menu-item-group>

              <el-menu-item index="1-1">
                <router-link to="/usercenter/information" exact>
                  <a>information</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/usercenter/learnprogress" exact>
                  <a>Learning Progress</a>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Course</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/usercenter/favorite" exact>
                  <a>Favorite</a>
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2">Recommended</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{ tabledata[0].nickname }}</span>
        </el-header>

        <el-main
          style="height:100%">
          <el-table
            :data="tabledata"
            height="800"
            border
            style="width: 100%">
            <el-table-column
              prop="cover"
              label="Course cover"
              width="180">
              <template slot-scope="scope">
            <span>

              <img :src="scope.row.cover" alt="" class="table-img" width="150px">
              <!--              <span class="table-title">{{ scope.row.cover }}</span>-->
            </span>
              </template>

            </el-table-column>
            <el-table-column
              prop="title"
              label="title"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gmtCreate"
              label="Course time">
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price">
            </el-table-column>
            <el-table-column
              label="Cancel Star">
              <template slot-scope="scope">
            <span>
                <el-button type="danger" icon="el-icon-delete" circle @click="unstar(scope.row.id)"></el-button>

            </span>
              </template>

            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import courseApi from '@/api/course'
import loginApi from "@/api/login"
import cookie from 'js-cookie'

export default {
  data() {
    return {
      tabledata: [{}],
      testData: [
        {
          id: "123",
          nickname: "456",
          mobile: "567",
          avatar: "1231231231"
        }
      ]
    }
  },
  created() {

    // //检查是否登陆
    // this.isLogin()

    //初始化tabledata
    this.initUserData()

  },
  methods: {
    //判断是否null
    isNotNull(data) {
      return (data == "" || data == undefined || data == null) ? false : true;
    },
    //判断是否登录
    isLogin() {
      if (this.isNotNull(cookie.get('guli_token'))) {
        console.log(cookie.get('guli_token'))
      } else {
        window.location.href = "/login"
      }
    },
    //获取userinfo
    initUserData() {

      loginApi.getLoginUserInfo()
        .then(response => {
            let memberID = response.data.data.userInfo.id;
            console.log(memberID)
            courseApi.queryStarList(memberID)
              .then(response => {
                  console.log(response)
                  this.tabledata = response.data.data.starList;
                }
              )
          }
        )
    },

    //取消star这个课程
    unstar(id) {
      console.log(id);
      loginApi.getLoginUserInfo().then(response => {
        let memberID = response.data.data.userInfo.id;
        courseApi
          .unstarOneCourse(memberID, id)
          .then(response => {
              console.log(response)
            }
          );
      }
      )

    }
  }
};
</script>

<style scoped>
.active {
  background: #bdbdbd;
}

.hide {
  display: none;
}

.show {
  display: block;
}
</style>
