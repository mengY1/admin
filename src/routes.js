import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import subscribeManage from './views/operate/subscribeManage'
import trialDetail from './views/club/clubTrial/trialDetail'
import banner from './views/operate/banner'
import feedback from './views/operate/feedback'
import consumerList from './views/consumer/consumerList'
import effectiveSubscribe from './views/consumer/effectiveSubscribe'
import registerData from './views/consumer/registerData'
import subscribeTotal from './views/consumer/subscribeTotal'
import clubList from './views/club/clubList/clubList'
import clubDetail from './views/club/clubList/clubDetail'
import clubEdit from './views/club/clubList/clubEdit'
import addClub from './views/club/clubList/addClub'
import clubTrial from './views/club/clubTrial/clubTrial'
//Dashboard
import dataCount from './views/dashboard/dataCount'
// 数据统计
import contentData from './views/dataCount/contentData'
import schoolData from './views/dataCount/schoolData'
import userData from './views/dataCount/userData'
// 内容管理
import applyList from './views/contentManage/activity/applyList'
import activityList from './views/contentManage/activity/activityList'
import actuvityDetail from './views/contentManage/activity/actuvityDetail'
import addActivity from './views/contentManage/activity/addActivity'
import activityEdit from './views/contentManage/activity/activityEdit'
import activityTrial from './views/contentManage/activity/activityTrial'
import reportManage from './views/contentManage/activity/reportManage'
import contentWeightList from './views/contentManage/contentWeight/contentWeightList'
import contentWeightRevise from './views/contentManage/contentWeight/contentWeightRevise'
// 内容管理-策划
import planAdd from './views/contentManage/plan/planAdd'
import planDetail from './views/contentManage/plan/planDetail'
import planEdit from './views/contentManage/plan/planEdit'
import planList from './views/contentManage/plan/planList'
import planType from './views/contentManage/plan/planType'
import addPlanType from './views/contentManage/plan/addPlanType'
import editPlanType from './views/contentManage/plan/editPlanType'
// 内容管理-走心
import takeHeartAdd from './views/contentManage/takeHeart/takeHeartAdd'
import takeHeartDetail from './views/contentManage/takeHeart/takeHeartDetail'
import takeHeartEdit from './views/contentManage/takeHeart/takeHeartEdit'
import takeHeartList from './views/contentManage/takeHeart/takeHeartList'
// 内容管理-大爆料
import dailyManage from './views/contentManage/dailyManage/dailyManage'
import dailyDetail from './views/contentManage/dailyManage/dailyDetail'
import editDaily from './views/contentManage/dailyManage/editDaily'
import releaseDaily from './views/contentManage/dailyManage/releaseDaily'
import dailyDrafts from './views/contentManage/dailyManage/dailyDrafts'
// 内容管理-干货
import addText from './views/contentManage/driedFoodManage/addText'
import collegeDetail from './views/contentManage/driedFoodManage/collegeDetail'
import collegeManage from './views/contentManage/driedFoodManage/collegeManage'
import editCollege from './views/contentManage/driedFoodManage/editCollege'
import typeManage from './views/contentManage/driedFoodManage/typeManage'
import addType from './views/contentManage/driedFoodManage/addType'
import editType from './views/contentManage/driedFoodManage/editType'
import driedFoodDrafts from './views/contentManage/driedFoodManage/driedFoodDrafts'
// 内容管理-求职
import jobWantedList from './views/contentManage/jobWantedManage/jobWantedList'
import jobWantedDetail from './views/contentManage/jobWantedManage/jobWantedDetail'
import jobWantedEdit from './views/contentManage/jobWantedManage/jobWantedEdit'
// 内容管理-考研
import postGraduateDetail from './views/contentManage/postGraduateManage/postGraduateDetail'
import postGraduateEdit from './views/contentManage/postGraduateManage/postGraduateEdit'
import postGraduateList from './views/contentManage/postGraduateManage/postGraduateList'
// 内容管理-学术
import learningDetail from './views/contentManage/learningManage/learningDetail'
import learningEdit from './views/contentManage/learningManage/learningEdit'
import learningList from './views/contentManage/learningManage/learningList'
// 内容管理-竞赛
import competitionDetail from './views/contentManage/competitionManage/competitionDetail'
import competitionEdit from './views/contentManage/competitionManage/competitionEdit'
import competitionList from './views/contentManage/competitionManage/competitionList'
// 内容管理-本校
import ownSchoolList from './views/contentManage/ownSchool/ownSchoolList'
import contentPublishing from './views/contentManage/ownSchool/contentPublishing'
import ownSchoolEdit from './views/contentManage/ownSchool/ownSchoolEdit'
import ownSchoolDetail from './views/contentManage/ownSchool/ownSchoolDetail'
// 学校
import schoolList from './views/school/schoolList'
import recommendList from './views/recommendManage/recommendList'
import recommendSet from './views/recommendManage/recommendSet'

Vue.use(Router)

let routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    leaf: true,
    hidden: true,
    meta: {
      title: '奇集后台管理'
    }
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    leaf: true,
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: 'Dashboard',
    leaf: false,
    hidden: true,
    children: [
      { path: 'dataCount', component: dataCount, name: '概况', leaf: true, hidden: false, },
      {
        path: 'dataCountMenu', component: Main, name: '数据统计', leaf: false, hidden: false,
      },
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'userData', component: userData, name: '用户数据', leaf: true, hidden: false, },
      { path: 'contentData', component: contentData, name: '内容数据', leaf: true, hidden: false, },
      { path: 'schoolData', component: schoolData, name: '学校数据', leaf: true, hidden: false, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '用户',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'consumerList', component: consumerList, name: '用户列表', leaf: true, hidden: false, },
      { path: 'effectiveSubscribe', component: effectiveSubscribe, name: '有效订阅数据', leaf: true, hidden: true, },
      { path: 'subscribeTotal', component: subscribeTotal, name: '订阅总数', leaf: true, hidden: true, },
      { path: 'registerData', component: registerData, name: '注册数据', leaf: true, hidden: true, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '社团',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'clubList', component: clubList, name: '社团列表', leaf: true, hidden: false, },
      { path: 'clubDetail', component: clubDetail, name: '社团详情', leaf: true, hidden: true, },
      { path: 'trialDetail', component: trialDetail, name: '申请详情', leaf: true, hidden: true, },
      { path: 'clubEdit', component: clubEdit, name: '社团编辑', leaf: true, hidden: true, },
      { path: 'addClub', component: addClub, name: '添加社团', leaf: true, hidden: true, },
      { path: 'clubTrial', component: clubTrial, name: '社团审核', leaf: true, hidden: false, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '内容管理',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'contentWeightList', component: contentWeightList, name: '内容权重', leaf: true, hidden: false, },
      { path: 'applyList', component: applyList, name: '报名列表', leaf: true, hidden: true, },
      { path: 'actuvityDetail', component: actuvityDetail, name: '活动详情', leaf: true, hidden: true, },
      { path: 'addActivity', component: addActivity, name: '添加活动', leaf: true, hidden: true, },
      { path: 'activityEdit', component: activityEdit, name: '编辑活动', leaf: true, hidden: true, },
      { path: 'contentWeightRevise', component: contentWeightRevise, name: '内容权重修改', leaf: true, hidden: true, },
      { path: 'dailyManage', component: Main, name: '爆料管理', leaf: false, hidden: false, },
      { path: 'dailyManageList', component: dailyManage, name: '爆料列表', leaf: true, hidden: false, },
      { path: 'dailyDrafts', component: dailyDrafts, name: '爆料草稿箱', leaf: true, hidden: false, },
      { path: 'releaseDaily', component: releaseDaily, name: '发布爆料', leaf: true, hidden: true, },
      { path: 'dailyDetail', component: dailyDetail, name: '爆料详情', leaf: true, hidden: true, },
      { path: 'editDaily', component: editDaily, name: '编辑爆料', leaf: true, hidden: true, },

      { path: 'takeHeartList', component: takeHeartList, name: '走心管理', leaf: true, hidden: false, },
      { path: 'takeHeartEdit', component: takeHeartEdit, name: '走心编辑', leaf: true, hidden: true, },
      { path: 'takeHeartDetail', component: takeHeartDetail, name: '走心详情', leaf: true, hidden: true, },
      { path: 'takeHeartAdd', component: takeHeartAdd, name: '走心发布', leaf: true, hidden: true, },

      { path: 'planManage', component: Main, name: '策划管理', leaf: false, hidden: false, },
      { path: 'planList', component: planList, name: '策划列表', leaf: true, hidden: false, },
      { path: 'planType', component: planType, name: '策划分类', leaf: true, hidden: false, },
      { path: 'planAdd', component: planAdd, name: '策划发布', leaf: true, hidden: true, },
      { path: 'planDetail', component: planDetail, name: '策划详情', leaf: true, hidden: true, },
      { path: 'planEdit', component: planEdit, name: '策划编辑', leaf: true, hidden: true, },
      { path: 'addPlanType', component: addPlanType, name: '策划分类添加', leaf: true, hidden: true, },
      { path: 'editPlanType', component: editPlanType, name: '策划分类编辑', leaf: true, hidden: true, },

      { path: 'collegeDetail', component: collegeDetail, name: '大学详情', leaf: true, hidden: true, },
      { path: 'addText', component: addText, name: '添加大学文本', leaf: true, hidden: true, },
      { path: 'editCollege', component: editCollege, name: '编辑大学', leaf: true, hidden: true, },
      { path: 'collegeManage', component: Main, name: '干货管理', leaf: false, hidden: false, },
      { path: 'collegeList', component: collegeManage, name: '干货列表', leaf: true, hidden: false, },
      { path: 'typeManage', component: typeManage, name: '分类管理', leaf: true, hidden: false, },
      { path: 'driedFoodDrafts', component: driedFoodDrafts, name: '干货草稿箱', leaf: true, hidden: false, },
      { path: 'addType', component: addType, name: '添加分类', leaf: true, hidden: true, },
      { path: 'editType', component: editType, name: '编辑分类', leaf: true, hidden: true, },

      { path: 'ownSchoolManage', component: Main, name: '本校管理', leaf: false, hidden: false, },
      { path: 'ownSchoolList', component: ownSchoolList, name: '本校列表', leaf: true, hidden: false, },
      { path: 'contentPublishing', component: contentPublishing, name: '内容发布', leaf: true, hidden: true, },
      { path: 'ownSchoolEdit', component: ownSchoolEdit, name: '本校编辑', leaf: true, hidden: true, },
      { path: 'ownSchoolDetail', component: ownSchoolDetail, name: '本校详情', leaf: true, hidden: true, },
      { path: 'jobWantedList', component: jobWantedList, name: '求职管理', leaf: true, hidden: false, },
      { path: 'jobWantedEdit', component: jobWantedEdit, name: '求职管理', leaf: true, hidden: true, },
      { path: 'jobWantedDetail', component: jobWantedDetail, name: '求职详情', leaf: true, hidden: true, },
      { path: 'postGraduateList', component: postGraduateList, name: '考研管理', leaf: true, hidden: false, },
      { path: 'postGraduateEdit', component: postGraduateEdit, name: '考研编辑', leaf: true, hidden: true, },
      { path: 'postGraduateDetail', component: postGraduateDetail, name: '考研详情', leaf: true, hidden: true, },
      { path: 'learningList', component: learningList, name: '学术管理', leaf: true, hidden: false, },
      { path: 'learningEdit', component: learningEdit, name: '学术编辑', leaf: true, hidden: true, },
      { path: 'learningDetail', component: learningDetail, name: '学术详情', leaf: true, hidden: true, },
      { path: 'competitionList', component: competitionList, name: '竞赛管理', leaf: true, hidden: false, },
      { path: 'competitionEdit', component: competitionEdit, name: '竞赛编辑', leaf: true, hidden: true, },
      { path: 'competitionDetail', component: competitionDetail, name: '竞赛详情', leaf: true, hidden: true, },
      { path: 'activityList', component: activityList, name: '活动管理', leaf: true, hidden: false, },
      { path: 'activityTrial', component: activityTrial, name: '活动审核', leaf: true, hidden: false, },
      { path: 'reportManage', component: reportManage, name: '举报管理', leaf: true, hidden: false, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '学校',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'schoolList', component: schoolList, name: '学校列表', leaf: true, hidden: false, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '运营',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'subscribeManage', component: subscribeManage, name: '订阅管理', leaf: true, hidden: false, },
      { path: 'banner', component: banner, name: 'banner', leaf: true, hidden: false, },
      { path: 'feedback', component: feedback, name: '意见反馈', leaf: true, hidden: false, },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '推荐管理',
    leaf: false,
    hidden: true,
    children: [
      { path: 'main', component: Main, name: '主页', leaf: true, hidden: true, },
      { path: 'recommendList', component: recommendList, name: '推荐列表', leaf: true, hidden: false, },
      { path: 'recommendSet', component: recommendSet, name: '推荐设置', leaf: true, hidden: true, },
    ]
  },

];

export default routes;
