const ventasDiariaModel = require("../models/ventaDiarias");
const ventasMesualModel = require("../models/ventasMensual");

class Mongo {

    constructor() {}
    
   async leer(base, model) {
        
       try{
           if(model == "diaria"){
            base = await ventasDiariaModel.find();
                     
           }
           if(model == "mensual"){
            base = await ventasMesualModel.find();
                        
           }
           return base
        }catch(error){
        console.log('Error al leer en Mongo:', base, error);
        } 
    }

    async guardar(data, model) {    
        try{
            if(model == "diario")            
            await ventasDiariaModel.create(data);
            if(model == "mensual")
            await ventasMesualModel.create(data);            
        }catch{
            console.log("error en guardar MONGO: " + data);
        }      
    }

    async sumarVenta(data){
        try{
        console.log(data)
        let test = await ventasMesualModel.findOne({ vendedor: data.vendedor });        
        console.log(test)
        if(test){
            await ventasMesualModel.updateOne({vendedor: data.vendedor}, {$set: {monto: data.monto}});
            
        }else{
            await ventasMesualModel.create(data);
        }
        return
        }catch(err){
            console.log("NO SE PUDO INGRESAR " + data) 
        }
        
    }    
}    


module.exports = new Mongo;
            
            

           
       
 
