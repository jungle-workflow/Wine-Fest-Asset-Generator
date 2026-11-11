import { Booth } from "../../types";
import BoothLayout from './BoothLayout';

interface props {
  booth: Booth
  pageNum: number
  regionLabel: string
}

export function Page({ booth }: props) {
  return <div className="page">
    <div className={`bleed`}>
      <div className="bleedContent">
        <div className="buyerIdContainer" style={{ display: "flex", gap: '0px', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
          <h1>Buyer's Club #:</h1>
          <div className="buyerIdBox" style={{ flex: '1 1 auto', height: '.5in', borderRadius: '5px', marginBottom: '0' }}></div>
        </div>
        <BoothLayout booth={booth} classAttr='' key={`${booth.number}`} regionLabel={booth.bottles[0].Region} ></BoothLayout>
      </div >
    </div>
    <div className={`bleed`}>
      <div className="bleedContent">
        <div className="buyerIdContainer" style={{ display: "flex", gap: '0px', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
          <h1>Buyer's Club #:</h1>
          <div className="buyerIdBox" style={{ flex: '1 1 auto', height: '.5in', borderRadius: '5px', marginBottom: '0' }}></div>
        </div>
        <BoothLayout booth={booth} classAttr='' key={`${booth.number}`} regionLabel={booth.bottles[0].Region} ></BoothLayout>
      </div >
    </div>
  </div>
}

export default Page