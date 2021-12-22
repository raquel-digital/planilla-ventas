var loginOk = false;
var adminOk = false;

const middlewares = {

    isLogin : function (req, res, next) {
        // console.log(req.user)
        // if (req.user) return next();
        // res.redirect('/');
        let log = req.body
        const user = {usuario: "raquelmino", contraseña: "local2492" }
        const admin = {usuario: "capriadmin", contraseña: "capri2665" }
        if(admin.usuario == log.usuario && admin.contraseña == log.contraseña){
            
            adminOk = true;
            res.redirect('/')
            next()
        }
        if(user.usuario == log.usuario && user.contraseña == log.contraseña){
            loginOk = true;
              res.redirect('/')
              return next()
        }else{
            res.redirect('/login')
            return next();
        } 
    },
    logged : function (req, res, next) {
        if(loginOk || adminOk){
              return next()
        }else{
            res.redirect('/login')
            return next();
        }
    },
    superAdmin : function (req, res, next){
        if(adminOk){
            next()
      }else{
          res.redirect('/login')
          return next();
      }
    },
    superAdminCheck : function () {
        if(adminOk){
            return true;
        }else{
            return false;
        }
    }
    
};
module.exports = middlewares;