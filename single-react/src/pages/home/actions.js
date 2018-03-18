import {SALELIST} from './actionTypes'

export const saleList = (pageSize)=>({
    type:SALELIST,
    pageSize:pageSize
})