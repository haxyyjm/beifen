/**
 * Created by hax on 2018/1/10.
 */
import * as API from './'

export default {
  //查询列表
  findList: params => {
    return API.GET('/json', params)
  },
  findById: id => {
    return API.GET(`/api/enterprise/list/${id}`)
  }
}
