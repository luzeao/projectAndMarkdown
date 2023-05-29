
export declare namespace ProNs {
  export interface ProItem {
    banners: string[],
    proid: string,
    brand: string
    proname: string,
    originprice: string | number,
    sales: number | string,
    stock: number | string,
    desc: string,
    issale: number,
    isrecommend: number,
    discount: number,
    isseckill: number,
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    [propName: string]: string | number | string[]
  }
}