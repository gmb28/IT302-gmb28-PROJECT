/*
Gabriel Bozza
3/1/24
IT 302-002 
Phase 2 Assignment
gmb28@njit.edu
*/
import ffxivDataDAO from '../dao/ffxivDataDAO.js'

export default class ffxivDataController {
  static async apiGetData(req,res,next) {
    const ffxivDataPerPage = req.query.dataPerPage ? parseInt(req.query.dataPerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.UrlType){
      filters.UrlType = req.query.UrlType
    } else if(req.query.Name){
      filters.Name = req.query.Name
    }

    const { dataList, totalNumData } = await ffxivDataDAO.getData({
    filters, page, dataPerPage: ffxivDataPerPage})

    let response = {
      dataPieces: dataList,
      page: page,
      filters: filters,
      entries_per_page: ffxivDataPerPage,
      total_results: totalNumData,
    }
    res.json(response)
   }
}