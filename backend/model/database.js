const mysql = require('mysql2/promise')

class Database{

    constructor(){
        this.pool=mysql.createPool({
            host:'localhost',
            user:'root',
            password:'adm123',
            database:'maxsoft'

        })
    }

async ExecutaComando(sql,params=[]){
    const connection = await this.pool.getConnection();
    try{
        const [rows]=await connection.query(sql,params)
        return rows
    } finally{
        connection.release();
    }

}

async ExecutaComandoNonQuery(sql,params=[]){
    const connection = await this.pool.getConnection();
    try{
        const [results]=await connection.query(sql,params)
        return results.affectedRows;
    } finally{
        connection.release();
    }

}


}


module.exports=Database