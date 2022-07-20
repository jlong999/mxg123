import Router from "./router";
import{getUserInfo} from "../src/api/login";

Router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("mxg-msm-token");
  if (!token) {
    if(to.path !== '/login'){
      next('/login');
    }else{
      next();
    }
  }else{
    if(to.path === '/login'){
      next()
  }else{
    const userInfo = localStorage.getItem("mxg-msm-user");
    if(userInfo){
      next();
    }else{
      getUserInfo(token).then(request=>{
        const req = request.data;
        console.log('prer', resp)
        if(req.flag){
          localStorage.setItem("mxg-msm-user", JSON.stringify(req.data));
          next();
        }else{
          next('/login')
        }
      })
    }
  }
  }
})