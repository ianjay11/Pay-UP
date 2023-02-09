import  pg  from  "pg"

function  connectDatabase(){
	const  pool = new  pg.Pool ({

		user :  'postgres',
		password :  'mamser',
		database :  'payup',
		host :  'localhost',
		port: 5432

	})
		return  pool
	}
    
export { connectDatabase }