const XLSX = require('xlsx')
const excelToJson = function (arrayBuffer) {
  const data = new Uint8Array(arrayBuffer)
  const workbook = XLSX.read(data, {
    type: 'array'
  })
  const result = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
  return result
}

const jsonToExcel = function (jsonArray, sheetName) {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(jsonArray)
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
  const wbout = XLSX.write(workbook, wopts)
  return wbout
}
module.exports = {
  excelToJson,
  jsonToExcel
}
