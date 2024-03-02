/*
Gabriel Bozza
3/1/24
IT 302-002 
Phase 2 Assignment
gmb28@njit.edu
*/
let ffxivData

export default class ffxivDataDAO {
  static async injectDB(conn) {
    if (ffxivData) {
      return
    } try {
      ffxivData = await conn.db(process.env.FFXIV_DB_URI_NS).collection('FFXIVstats_gmb28')
    } catch(e) {
      console.error(`unable to connect in ffxivDataDAO: ${e}`)
    }
  }
  
  static async getData({filters = null,page = 0,dataPerPage = 10,} = {}){
      let query = {}
      if(filters) {
        if("Name" in filters) {
          query = { $text: { $search: filters['Name']}}
        } else if("UrlType" in filters) {
          query = { "Data type": { $eq: filters['UrlType']}}
        }
      }
    let cursor
    try {
      cursor = await ffxivData
        .find(query)
        .limit(dataPerPage)
        .skip(dataPerPage * page)
      const dataList = await cursor.toArray()
      const totalNumData = await ffxivData.countDocuments(query)
      
      return {dataList, totalNumData}
    } catch(e) {
      console.error(`Unable to issue find command, ${e}`)
      console.error(e)
      return { dataList: [], totalNumData: 0 }
    }
  }
}