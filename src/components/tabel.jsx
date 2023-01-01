import React , {useContext} from 'react'

import { SelectItemAndChilds } from './context';

export default function Tabel() {

  const [Tabeldata, dispatchTabeldata] = useContext(SelectItemAndChilds);

  
  // if(Tabeldata){
  //   console.log(Tabeldata , 're-render tabel');
  // }

  return (
    <div style={{width:'100%' , display:'flex' , alignItems:'center' , flexDirection:'column'}}>
   <h3>Tabel</h3>
      <h2>this item name : {Tabeldata.name}</h2>
      <div>
        {Tabeldata?.childeren?.map((value,index)=>{
          return(
          <h2>this child item name : {value.name}</h2>
          )
        })}
      </div>
    </div>
  )
}
